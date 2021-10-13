// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract TeigashitsuArtNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("TeigashitsuArt", "TAN") {}

    /**
     * Override isApprovedForAll to auto-approve OS's proxy contract
     */
    function isApprovedForAll(address _owner, address _operator)
        public
        view
        override
        returns (bool isOperator)
    {
        // if OpenSea's ERC721 Proxy Address is detected, auto-return true
        if (_operator == address(0x58807baD0B376efc12F5AD86aAc70E78ed67deaE)) {
            return true;
        }

        // otherwise, use the default ERC721.isApprovedForAll()
        return ERC721.isApprovedForAll(_owner, _operator);
    }

    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function ownedTokens() public view onlyOwner returns (string[] memory) {
        uint256 balance = balanceOf(msg.sender);
        if (balance == 0) {
            return new string[](0);
        } else {
            string[] memory result = new string[](balance);
            uint256 mintedCount = _tokenIds.current();
            uint256 resultIndex = 0;
            uint256 tokenId = 1;
            while (tokenId <= mintedCount) {
                result[resultIndex] = tokenURI(tokenId);
                resultIndex = resultIndex + 1;
                tokenId = tokenId + 1;
            }
            return result;
        }
    }
}
