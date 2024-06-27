//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TrustScriptToken is ERC20, Ownable {
	mapping(address => bool) public allowedMinters;

	error TrustScriptToken__DisallowedMinter(address minterAddress);

	modifier onlyAllowedMinters() {
		if (!allowedMinters[msg.sender])
			revert TrustScriptToken__DisallowedMinter(msg.sender);
		_;
	}

	constructor(address ownerAddress) ERC20("TrustScript", "TST") {
		super.transferOwnership(ownerAddress);

		allowedMinters[ownerAddress] = true;
		_mint(ownerAddress, 1000 * 10 ** decimals());
	}

	function mint(
		address beneficiary,
		uint256 amountOfToken
	) external onlyAllowedMinters {
		_mint(beneficiary, amountOfToken);
	}

	function allowMinter(address minter) public onlyOwner {
		allowedMinters[minter] = true;
	}
}
