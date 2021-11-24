//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./CountryImmigration.sol";

enum State {
    PENDING,
    CANCELED, //SHOP CANCEL ORDER
    REJECTED, //ADMIN REJECT ORDER'S REFUNDS
    APPROVED, //ORDER IS REFUNABLE
    CONFIRMED, //ORDER ARRIVED AT OTHER COUNTRY
    REFUNDED
}

struct Shop {
    address shopAddr;
    string shopName;
    string country;
    bool exists;
}

struct Admin {
    bool isAdmin;
    string country;
}

struct Order {
    bytes16 id;
    string name;
    uint256 price;
    uint256 amount;
    State state;
    address buyer;
    Shop shop;
}

contract TaxRefundStorage is Ownable {
    using SafeMath for uint256;
    mapping(bytes16 => Order) public orders;
    mapping(address => Shop) public shops;
    mapping(string => address) public refundAddress;
    // mapping (address => byte16[]) private _ordersByShop;
    mapping(address => bytes16[]) private _ordersByBuyer;
    mapping(address => Admin) public admins;

    constructor() {
        admins[owner()] = Admin({ isAdmin: true, country: "NONE" });
    }

    modifier onlyShop() {
        require(isShop(msg.sender), "Order Creator is not Shop.");
        _;
    }

    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "Permission Denied");
        _;
    }

    modifier buyerHasOrder(address buyer, bytes16 id) {
        require(
            orders[id].buyer == buyer,
            "Invalid Buyer / Invalid Order's id"
        );
        _;
    }

    function compareString(string memory stringA, string memory stringB)
        public
        pure
        returns (bool)
    {
        return
            keccak256(abi.encodePacked(stringA)) ==
            keccak256(abi.encodePacked(stringB));
    }

    function isAdmin(address addr) public view returns (bool) {
        return admins[addr].isAdmin;
    }

    function isShop(address addr) public view returns (bool) {
        return shops[addr].exists;
    }

    function createShop(
        address addr,
        string memory _name,
        string memory _country
    ) public onlyAdmin {
        Shop memory _shop = Shop({
            shopAddr: addr,
            shopName: _name,
            country: _country,
            exists: true
        });
        shops[addr] = _shop;
    }

    function createAdmin(address addr, string memory _country)
        public
        onlyAdmin
    {
        Admin memory _admin = Admin({ isAdmin: true, country: _country });
        admins[addr] = _admin;
    }

    //function removeAdmin(){}

    function createOrder(
        address payable buyer,
        string calldata name,
        uint256 price,
        uint256 amount
    ) public onlyShop {
        require(price > 0, "Invalid Price");
        require(amount > 0, "Invalid Amount");
        Order memory _order;
        _order.id = bytes16(
            keccak256(abi.encodePacked(msg.sender, blockhash(block.number - 1)))
        );
        _order.name = name;
        _order.price = price;
        _order.amount = amount;
        _order.buyer = buyer;
        _order.state = State.PENDING;
        _order.shop = shops[msg.sender];

        // _ordersByShop[msg.sender].push(_order);
        _ordersByBuyer[buyer].push(_order.id);
        orders[_order.id] = _order;
    }

    function setRefundAddress(string memory countryCode, address _refundAddress)
        public
        onlyAdmin
    {
        refundAddress[countryCode] = _refundAddress;
    }

    function cancelOrder(address buyer, bytes16 id)
        public
        onlyShop
        buyerHasOrder(buyer, id)
        returns (bool)
    {
        require(orders[id].shop.shopAddr == msg.sender, "Permission Denied");
        require(orders[id].state == State.PENDING, "Invalid Order's State");
        orders[id].state = State.CANCELED;
        return true;
    }

    function rejectOrder(address buyer, bytes16 id)
        public
        onlyAdmin
        buyerHasOrder(buyer, id)
        returns (bool)
    {
        require(orders[id].state == State.PENDING, "Invalid Order's State");
        require(
            compareString(admins[msg.sender].country, orders[id].shop.country),
            "Different country as the order created"
        );
        orders[id].state = State.REJECTED;
        return true;
    }

    function approveOrder(address buyer, bytes16 id)
        public
        onlyAdmin
        buyerHasOrder(buyer, id)
        returns (bool)
    {
        require(orders[id].state == State.PENDING, "Invalid Order's State");
        require(
            compareString(admins[msg.sender].country, orders[id].shop.country),
            "Different country as the order created"
        );
        orders[id].state = State.APPROVED;
        return true;
    }

    function confirmOrder(address buyer, bytes16 id)
        public
        onlyAdmin
        buyerHasOrder(buyer, id)
        returns (bool)
    {
        require(orders[id].state == State.APPROVED, "Invalid Order's State");
        require(
            !compareString(admins[msg.sender].country, orders[id].shop.country),
            "Same country as the order created"
        );
        orders[id].state = State.CONFIRMED;
        return true;
    }

    function getAllOrdersByBuyer(address buyer)
        public
        view
        returns (Order[] memory)
    {
        bytes16[] memory _orderIds = _ordersByBuyer[buyer];
        Order[] memory _order = new Order[](_orderIds.length);
        for (uint256 i = 0; i < _orderIds.length; i++) {
            _order[i] = orders[_orderIds[i]];
        }
        return _order;
    }

    function getRefundAmount(address buyer, string memory countryCode)
        public
        view
        returns (uint256)
    {
        Order[] memory _order = getAllOrdersByBuyer(buyer);
        uint256 refundedAmount = 0;
        for (uint256 i = 0; i < _order.length; i++) {
            uint256 _price = _order[i].price;
            uint256 _amount = _order[i].amount;

            if (
                compareString(_order[i].shop.country, countryCode) &&
                _order[i].state == State.CONFIRMED
            ) {
                refundedAmount = refundedAmount.add((_price).mul(_amount));
            }
        }
        CountryImmigration _countryImmigration = CountryImmigration(
            payable(refundAddress[countryCode])
        );
        return _countryImmigration.getRefundAmount(refundedAmount);
    }

    function refund(address payable buyer, string memory countryCode)
        public
        onlyAdmin
        returns (uint256)
    {
        require(
            !compareString(admins[msg.sender].country, countryCode),
            "Same country as the order created"
        );
        Order[] memory _order = getAllOrdersByBuyer(buyer);
        uint256 refundedAmount = 0;
        for (uint256 i = 0; i < _order.length; i++) {
            bytes16 id = _order[i].id;
            uint256 _price = _order[i].price;
            uint256 _amount = _order[i].amount;

            if (
                compareString(_order[i].shop.country, countryCode) &&
                _order[i].state == State.CONFIRMED
            ) {
                orders[id].state = State.REFUNDED;
                refundedAmount = refundedAmount.add((_price).mul(_amount));
            }
        }
        CountryImmigration _countryImmigration = CountryImmigration(
            payable(refundAddress[countryCode])
        );
        return _countryImmigration.refund(refundedAmount, buyer);
    }
}
