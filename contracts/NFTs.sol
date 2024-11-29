// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UniqueProductNFT is ERC721URIStorage, Ownable {
    uint256 public constant MAX_PRODUCTS = 10000; // Maximum number of unique products
    uint256 public totalMinted; // Tracks the total number of minted NFTs
    mapping(uint256 tokenId => string) public _tokenURIs;
    mapping(address => bool) private checkin;

    // Event emitted when a product is redeemed
    event ProductRedeemed(address indexed redeemer, uint256 indexed tokenId);

    constructor() ERC721("WalkToken", "WLK") Ownable(msg.sender) {}

    /**
     * @dev Mints a new product NFT with a token URI.
     * @param to The address that will receive the minted NFT.
     * @param tokenURI The token URI pointing to the image or metadata.
     */
    function mintProduct(address to, string memory tokenURI) external returns (uint256) {
        require(totalMinted < MAX_PRODUCTS, "All products have been minted");
        uint256 tokenId = totalMinted + 1; // Token IDs start from 1
        _tokenURIs[tokenId] = tokenURI;
        _safeMint(to, tokenId);
        totalMinted++;
        return tokenId;
    }

    function getAllNFTs(address owner) external view returns (uint256[] memory) {
        uint256 totalSupply = MAX_PRODUCTS;
        uint256[] memory tokens = new uint256[](balanceOf(owner));
        uint256 index = 0;

        for (uint256 tokenId = 1; tokenId <= totalSupply; tokenId++) {
            if (_ownerOf(tokenId) == address(0)) {
                return tokens;
            }
            if (_ownerOf(tokenId) == owner) {
                tokens[index] = tokenId;
                index++;
            }
        }
        return tokens;
    }

    function getTokenURIs(address owner) external view returns (string[] memory) {
        uint256 totalSupply = MAX_PRODUCTS;
        string[] memory tokens = new string[](balanceOf(owner));
        uint256 index = 0;

        for (uint256 tokenId = 1; tokenId <= totalSupply; tokenId++) {
            if (_ownerOf(tokenId) == address(0)) {
                return tokens;
            }
            if (_ownerOf(tokenId) == owner) {
                tokens[index] = _tokenURIs[tokenId];
                index++;
            }
        }
        return tokens;
    }

    function getALLTokenURIs() external view returns (string[] memory) {
        string[] memory tokens = new string[](totalMinted);
        uint256 index = 0;

        for (uint256 tokenId = 1; tokenId <= totalMinted; tokenId++) {
            tokens[index] = _tokenURIs[tokenId];
            index ++;
        }
        return tokens;
    }

    function mintCheckInProduct(address to, string memory tokenURI) external returns (uint256) {
        checkin[to] = true;
        require(totalMinted < MAX_PRODUCTS, "All products have been minted");
        uint256 tokenId = totalMinted + 1; // Token IDs start from 1
        _tokenURIs[tokenId] = tokenURI;
        _safeMint(to, tokenId);
        totalMinted++;
        return tokenId;
    }

    function isCheckedIn(address _address) public view returns (bool) {
        return checkin[_address];
    }
}
