// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

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

    // Variables for quest functionality
    uint256 private date = block.timestamp / 1 days;
    uint256 private steps = 15000 + (uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), date))) % 5001);

    // Mapping to store quest data per user
    mapping(address => uint256) private userQuestDate; // Tracks the date user got the quest
    mapping(address => bool) private hasDoneQuestToday; // Tracks if user has completed the quest today

    event QuestUpdated(address indexed user, uint256 steps);

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
     * @dev Mint tokens based on steps walked.
     * Each address can only receive tokens once per day.
     * If the user has an active quest, they receive double tokens.
     * @param to The address to receive the tokens.
     * @param stepsWalked The number of steps walked.
     */
    function mintTokens(address to, uint256 stepsWalked) external {
        uint256 currentDay = block.timestamp / 1 days;

        // Ensure the address hasn't received tokens today
        require(_lastMintedDay[to] < currentDay, "Address can only receive tokens once per day");

        uint256 tokensToMint = stepsToTokens(stepsWalked);
        require(tokensToMint > 0, "Not enough steps");
        require(totalSupply() + tokensToMint <= _totalSupplyCap, "Total supply cap exceeded");

        // Update the last mint day for the address
        _lastMintedDay[to] = currentDay;

        _mint(to, tokensToMint);
    }

    /**
     * @dev Convert steps to tokens. Each step gives 0.001 tokens.
     * @param stepsWalked The number of steps walked.
     * @return The number of tokens to mint (in atomic units).
     */
    function stepsToTokens(uint256 stepsWalked) public pure returns (uint256) {
        // Since each step gives 0.001 tokens, and decimals is 3, each step gives 1 atomic unit
        return stepsWalked;
    }

    /**
     * @dev Returns the current unissued amount of the token.
     * @return The number of tokens that are yet to be minted (in atomic units).
     */
    function getUnissuedTokens() public view returns (uint256) {
        return _totalSupplyCap - totalSupply();
    }

    /**
     * @dev Burn tokens from a specified address.
     * @param from The address from which the tokens will be burned.
     * @param amount The number of tokens to burn (in atomic units).
     */
    function burnTokens(address from, uint256 amount) external {
        _burn(from, amount);
    }

    /**
     * @dev Finish the quest for a user.
     * @param _address The address of the user who finished the quest.
     */
    function finishQuest(address _address) public {
        hasDoneQuestToday[_address] = true;
        _mint(_address, 10000);
    }

    /**
     * @dev Get a quest for a user.
     * If it's a new day, update the date and steps, and reset user quests.
     * @param _address The address of the user requesting the quest.
     */
    function takeQuest(address _address) public {
        uint256 currentDate = block.timestamp / 1 days;

        if (currentDate != date) {
            date = currentDate;
            // Generate a random number between 15000 and 20000 using date as seed
            steps = 15000 + (uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), date))) % 5001);
        }

        if (userQuestDate[_address] != currentDate) {
            userQuestDate[_address] = currentDate;
            hasDoneQuestToday[_address] = false;
        }

        emit QuestUpdated(_address, steps);
    }

    /**
     * @dev Check if a user has completed the quest today.
     * @param _address The address of the user.
     * @return True if the user has completed the quest today, false otherwise.
     */
    function hasDoneQuest(address _address) public view returns (bool) {
        return hasDoneQuestToday[_address];
    }

    /**
     * @dev Check if a user has a quest today.
     * @param _address The address of the user.
     * @return True if the user has a quest today, false otherwise.
     */
    function hasQuest(address _address) public view returns (bool) {
        uint256 currentDate = block.timestamp / 1 days;
        return userQuestDate[_address] == currentDate;
    }
}