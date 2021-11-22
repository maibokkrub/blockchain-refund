//SPDX-License-Identifier: Unlicense PEAK KA BOOM!!!!!
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
contract CountryImmigration is Ownable{
    using SafeMath for uint256;
    string public countryCode;
    address public taxRefundAddress;

    //decimal 2 it means 0000800 is 8 percent
    uint256 public vatRatio;
    constructor(string memory _countryCode, uint256 _vatRatio,address _taxRefundAddress){
        countryCode = _countryCode;
        vatRatio = _vatRatio;
        taxRefundAddress = _taxRefundAddress;
    }

    function setNewVatRatio(uint256 _newVatRatio) public onlyOwner {
        require(_newVatRatio >= 0, "Invalid VAT");
        vatRatio = _newVatRatio;
    }

    function getRefundAmount(uint256 beforeAmount) public view returns (uint256)  {
        require(beforeAmount > 0, "beforeAmount shoud be greater than 0" );
        return beforeAmount.mul(vatRatio).div(100);
    }

    function refund(uint256 beforeAmount,address payable buyer) public {
        require(msg.sender == taxRefundAddress,"Did not call via TaxRefundStorage");
        uint256 afterAmount = getRefundAmount(beforeAmount);
        require(address(this).balance > afterAmount,"Eth not enough to refund");
        if (!buyer.send(beforeAmount)){
            revert("Failed to send Ether");
        }
    }


    receive() external payable{}
}