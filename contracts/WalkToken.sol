// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title WalkToken
 * @dev ERC20 token with a cap on total supply and minting based on steps.
 */
contract WalkToken is ERC20, Ownable {
    // Custom decimals, set to 3
    uint8 private _customDecimals = 3;

    // Total supply cap of 1,000,000 tokens (in atomic units)
    uint256 private immutable _totalSupplyCap = 1_000_000 * (10 ** uint256(_customDecimals));

    // Mapping to store the last mint day for each address
    mapping(address => uint256) private _lastMintedDay;

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor() ERC20("WalkToken", "WLK") Ownable(msg.sender){
        // Pre-mint 20 tokens to the contract owner
        uint256 initialTokens = 20 * (10 ** uint256(_customDecimals));
        _mint(msg.sender, initialTokens);
    }

    /**
     * @dev Override decimals function to return custom decimals.
     */
    function decimals() public view virtual override returns (uint8) {
        return _customDecimals;
    }

    /**
     * @dev Mint tokens based on steps walked. Only owner can call.
     * Each address can only receive tokens once per day.
     * @param to The address to receive the tokens.
     * @param steps The number of steps walked.
     */
    function mintTokens(address to, uint256 steps) external onlyOwner {
        uint256 currentDay = block.timestamp / 1 days;

        // Ensure the address hasn't received tokens today
        require(_lastMintedDay[to] < currentDay, "Address can only receive tokens once per day");

        uint256 tokensToMint = stepsToTokens(steps);
        require(tokensToMint > 0, "Not enough steps");
        require(totalSupply() + tokensToMint <= _totalSupplyCap, "Total supply cap exceeded");

        // Update the last mint day for the address
        _lastMintedDay[to] = currentDay;

        _mint(to, tokensToMint);
    }


    /**
     * @dev Convert steps to tokens. Each step gives 0.001 tokens.
     * @param steps The number of steps walked.
     * @return The number of tokens to mint (in atomic units).
     */
    function stepsToTokens(uint256 steps) public pure returns (uint256) {
        // Since each step gives 0.001 tokens, and decimals is 3, each step gives 1 atomic unit
        return steps;
    }

    /**
     * @dev Returns the current unissued amount of the token.
     * @return The number of tokens that are yet to be minted (in atomic units).
     */
    function getUnissuedTokens() public view returns (uint256) {
        return _totalSupplyCap - totalSupply();
    }
}