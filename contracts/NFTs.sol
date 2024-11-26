// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UniqueProductNFT is ERC721URIStorage, Ownable {
    uint256 public constant MAX_PRODUCTS = 10000; // Maximum number of unique products
    uint256 public totalMinted; // Tracks the total number of minted NFTs

    // Event emitted when a product is redeemed
    event ProductRedeemed(address indexed redeemer, uint256 indexed tokenId);

    constructor() ERC721("WalkToken", "WLK") Ownable(msg.sender) {}

    /**
     * @dev Mints a new product NFT with a token URI. Only the contract owner can call this function.
     * @param to The address that will receive the minted NFT.
     * @param tokenURI The token URI pointing to the image or metadata.
     */
    function mintProduct(address to, string memory tokenURI) external onlyOwner {
        require(totalMinted < MAX_PRODUCTS, "All products have been minted");
        uint256 tokenId = totalMinted + 1; // Token IDs start from 1
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI); // Set the token URI for metadata
        totalMinted++;
    }

    /**
     * @dev Allows the holder of an NFT to redeem it for the actual product.
     *      This will burn the NFT, making it non-transferable.
     * @param tokenId The ID of the NFT to redeem.
     */
    function redeemProduct(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "You do not own this token");
        _burn(tokenId); // Burn the NFT
        emit ProductRedeemed(msg.sender, tokenId);
    }

}
