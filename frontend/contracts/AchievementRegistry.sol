// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AchievementRegistry
 * @notice Registry contract for querying and verifying career achievements across wallets
 * @dev Works alongside CareerCredentials for aggregated queries
 */
contract AchievementRegistry {
    address public owner;
    address public credentialsContract;

    struct AchievementSummary {
        address holder;
        uint256 totalCredentials;
        uint256 certifications;
        uint256 interviewScores;
        uint256 roadmapCompletions;
        uint256 careerAchievements;
        uint256 lastUpdated;
    }

    // Wallet address -> summary
    mapping(address => AchievementSummary) public summaries;

    // Verified recruiter addresses
    mapping(address => bool) public verifiedRecruiters;

    // Events
    event SummaryUpdated(address indexed holder, uint256 totalCredentials);
    event RecruiterVerified(address indexed recruiter);
    event RecruiterRevoked(address indexed recruiter);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(address _credentialsContract) {
        owner = msg.sender;
        credentialsContract = _credentialsContract;
    }

    /**
     * @notice Update achievement summary for a holder
     * @dev Called by the platform after minting a new credential
     */
    function updateSummary(
        address _holder,
        uint256 _totalCredentials,
        uint256 _certifications,
        uint256 _interviewScores,
        uint256 _roadmapCompletions,
        uint256 _careerAchievements
    ) external onlyOwner {
        summaries[_holder] = AchievementSummary({
            holder: _holder,
            totalCredentials: _totalCredentials,
            certifications: _certifications,
            interviewScores: _interviewScores,
            roadmapCompletions: _roadmapCompletions,
            careerAchievements: _careerAchievements,
            lastUpdated: block.timestamp
        });

        emit SummaryUpdated(_holder, _totalCredentials);
    }

    /**
     * @notice Get achievement summary for a wallet
     * @param _holder Address to query
     */
    function getSummary(address _holder)
        external
        view
        returns (AchievementSummary memory)
    {
        return summaries[_holder];
    }

    /**
     * @notice Register a verified recruiter
     */
    function addRecruiter(address _recruiter) external onlyOwner {
        verifiedRecruiters[_recruiter] = true;
        emit RecruiterVerified(_recruiter);
    }

    /**
     * @notice Remove a recruiter
     */
    function removeRecruiter(address _recruiter) external onlyOwner {
        verifiedRecruiters[_recruiter] = false;
        emit RecruiterRevoked(_recruiter);
    }

    /**
     * @notice Check if an address is a verified recruiter
     */
    function isRecruiter(address _addr) external view returns (bool) {
        return verifiedRecruiters[_addr];
    }

    /**
     * @notice Update the credentials contract address
     */
    function setCredentialsContract(address _newContract) external onlyOwner {
        credentialsContract = _newContract;
    }

    /**
     * @notice Transfer ownership
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        owner = _newOwner;
    }
}
