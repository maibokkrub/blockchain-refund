//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


enum State { PENDING, CANCELED, CONFIRMED, REJECTED, REFUNDED }

struct Shop {
    string name;
    string country;
    bool exists;
}

struct Admin{
    bool isAdmin;
    string country;
}

struct Order {
    bytes16 id;
    string name;
    int price;
    int amount;
    State state;
    address buyer;
    Shop shop;
}

contract TaxRefundStorage is Ownable {
    using SafeMath for uint256;
    mapping (bytes16 => Order) orders;
    mapping (address => Shop) public shops;
    // mapping (address => byte16[]) private _ordersByShop;
    mapping (address => bytes16[]) private _ordersByBuyer;
    mapping (address => Admin) private _admins;

    // DECIMAL: 3 -> 00001000 = 1%
    mapping (string => uint256) public vatPercentageByCountry;

    constructor() {
        _admins[owner()] = Admin({isAdmin: true, country: "NONE"});
    }

    modifier onlyShop {
        require(isShop(msg.sender), "Order Creator is not Shop.");
        _;
    }
    
    modifier onlyAdmin {
        require(isAdmin(msg.sender), "Permission Denied");
        _;
    }

    modifier buyerHasOrder(address buyer, bytes16 id) {
        require(orders[id].buyer == buyer, "Invalid Buyer / Invalid Order's id");
        _; 
    }

    function isAdmin(address addr) public view returns(bool){
        return _admins[addr].isAdmin;
    }

    function isShop(address addr) public view returns(bool) {
        return shops[addr].exists;
    }

    function createShop(address addr, string memory _name, string memory _country) public onlyAdmin {
        Shop memory _shop = Shop({name: _name, country:_country, exists: true});
        shops[addr] = _shop;
    }

    function createAdmin(address addr, string memory _name, string memory _country) public onlyAdmin {
        Shop memory _shop = Shop({name: _name, country:_country, exists: true});
        shops[addr] = _shop;
    }

    function createOrder(address buyer, string calldata name, int price, int amount) public onlyShop{
        Order memory _order;
        _order.id = bytes16(keccak256(abi.encodePacked(msg.sender, blockhash(block.number-1))));
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

    
    function cancelOrder(address buyer, bytes16 id) onlyShop buyerHasOrder(buyer, id) public returns (bool) {
        require(orders[id].state != State.CONFIRMED, "Invalid State");
        require(orders[id].state != State.REFUNDED, "Invalid State");
        orders[id].state = State.CANCELED;
        return true;
    }

    function confirmOrder(address buyer, bytes16 id) onlyAdmin buyerHasOrder(buyer, id) public returns (bool)  {
        bytes32 _adminCountry = keccak256(abi.encodePacked(_admins[msg.sender].country));
        bytes32 _orderCountry = keccak256(abi.encodePacked(orders[id].shop.country));
        require(_adminCountry != _orderCountry, "Same country as the order created");
        orders[id].state = State.CONFIRMED;
        return true;
    }

    function rejectOrder(address buyer, bytes16 id) onlyAdmin buyerHasOrder(buyer, id) public returns (bool){
        bytes32 _adminCountry = keccak256(abi.encodePacked(_admins[msg.sender].country));
        bytes32 _orderCountry = keccak256(abi.encodePacked(orders[id].shop.country));
        require(_adminCountry != _orderCountry, "Same country as the order created");
        orders[id].state = State.REJECTED;
        return true;
    }

    function getAllOrdersByBuyer(address buyer) public view returns (Order[] memory){
        bytes16[] memory _orderIds = _ordersByBuyer[buyer];
        Order[] memory _order;
        for (uint i = 0; i < _orderIds.length;i++ ){
            _order[i] = orders[_orderIds[i]];
        }
        return _order;
    }


    function refund(bytes16[] memory _orderIds) onlyAdmin public {
        uint256 refundedAmount = 0;
        Order[] memory _refundedOrders;
        for (uint i = 0; i < _orderIds.length; i++){
            
        }
        
    }

}
