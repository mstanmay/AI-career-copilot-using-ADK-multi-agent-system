// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CareerCredentials
 * @notice ERC-721 compatible NFT for career achievement credentials on Polygon
 * @dev Stores career achievements as non-transferable soulbound tokens
 */
contract CareerCredentials {
    string public name = "Career Copilot Credentials";
    string public symbol = "CAREER";

    address public owner;
    uint256 private _tokenIdCounter;

    enum AchievementType {
        CERTIFICATION,
        INTERVIEW_SCORE,
        ROADMAP_COMPLETION,
        CAREER_ACHIEVEMENT
    }

    struct Credential {
        uint256 tokenId;
        address holder;
        AchievementType achievementType;
        bytes32 dataHash;
        string metadataURI;
        uint256 timestamp;
        bool revoked;
    }

    // Mappings
    mapping(uint256 => Credential) public credentials;
    mapping(address => uint256[]) public holderCredentials;
    mapping(bytes32 => bool) public hashExists;

    // Events
    event CredentialMinted(
        uint256 indexed tokenId,
        address indexed holder,
        AchievementType achievementType,
        bytes32 dataHash,
        uint256 timestamp
    );

    event CredentialRevoked(uint256 indexed tokenId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
        _tokenIdCounter = 1;
    }

    /**
     * @notice Mint a new career credential NFT
     * @param _holder The wallet address receiving the credential
     * @param _achievementType Type of achievement
     * @param _dataHash Hash of the achievement data (e.g., keccak256 of score + metadata)
     * @param _metadataURI IPFS or HTTP URI for full metadata
     */
    function mintCredential(
        address _holder,
        AchievementType _achievementType,
        bytes32 _dataHash,
        string calldata _metadataURI
    ) external onlyOwner returns (uint256) {
        require(!hashExists[_dataHash], "Credential already exists");
        require(_holder != address(0), "Invalid holder address");

        uint256 tokenId = _tokenIdCounter++;

        credentials[tokenId] = Credential({
            tokenId: tokenId,
            holder: _holder,
            achievementType: _achievementType,
            dataHash: _dataHash,
            metadataURI: _metadataURI,
            timestamp: block.timestamp,
            revoked: false
        });

        holderCredentials[_holder].push(tokenId);
        hashExists[_dataHash] = true;

        emit CredentialMinted(tokenId, _holder, _achievementType, _dataHash, block.timestamp);

        return tokenId;
    }

    /**
     * @notice Verify a credential by token ID
     * @param _tokenId The token to verify
     * @return isValid Whether the credential is valid and not revoked
     * @return credential The full credential data
     */
    function verifyCredential(uint256 _tokenId)
        external
        view
        returns (bool isValid, Credential memory credential)
    {
        credential = credentials[_tokenId];
        isValid = credential.holder != address(0) && !credential.revoked;
        return (isValid, credential);
    }

    /**
     * @notice Get all credentials for a holder
     * @param _holder Wallet address to query
     * @return tokenIds Array of token IDs
     */
    function getHolderCredentials(address _holder)
        external
        view
        returns (uint256[] memory)
    {
        return holderCredentials[_holder];
    }

    /**
     * @notice Verify a credential by data hash
     * @param _dataHash The hash to check
     */
    function verifyByHash(bytes32 _dataHash) external view returns (bool) {
        return hashExists[_dataHash];
    }

    /**
     * @notice Revoke a credential (only owner)
     * @param _tokenId Token to revoke
     */
    function revokeCredential(uint256 _tokenId) external onlyOwner {
        require(credentials[_tokenId].holder != address(0), "Token does not exist");
        credentials[_tokenId].revoked = true;
        emit CredentialRevoked(_tokenId);
    }

    /**
     * @notice Get total number of credentials minted
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter - 1;
    }

    /**
     * @notice Transfer ownership of the contract
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        owner = _newOwner;
    }
}
