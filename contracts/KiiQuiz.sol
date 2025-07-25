// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract KiiQuiz {
    address public owner;
    bool public isQuizActive;
    uint256 public round;
    uint256 public maxScorePerRound = 2000; // ❗️Optional: kamu bisa ubah nilai ini jika mau batas skor

    mapping(uint256 => mapping(address => uint256)) public scores;
    mapping(uint256 => mapping(address => bool)) public hasSubmitted;

    event ScoreSubmitted(address indexed player, uint256 indexed round, uint256 score);

    constructor() {
        owner = msg.sender;
        isQuizActive = true;
        round = 1;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    function setQuizActive(bool active) external onlyOwner {
        isQuizActive = active;

        // Jika aktif, naik ke ronde berikutnya
        if (active) {
            round += 1;
        }
    }

    function setMaxScorePerRound(uint256 maxScore) external onlyOwner {
        require(maxScore > 0, "Max score must be > 0");
        maxScorePerRound = maxScore;
    }

    function submitScore(uint256 score) external {
        require(isQuizActive, "Quiz is not active");
        require(!hasSubmitted[round][msg.sender], "Already submitted this round");
        require(score > 0, "Score must be greater than 0");
        require(score <= maxScorePerRound, "Score exceeds maximum");

        scores[round][msg.sender] = score;
        hasSubmitted[round][msg.sender] = true;

        emit ScoreSubmitted(msg.sender, round, score);
    }

    function getMyScore(uint256 r) external view returns (uint256) {
        return scores[r][msg.sender];
    }

    function getScore(address user, uint256 r) external view returns (uint256) {
        return scores[r][user];
    }

    function hasUserSubmitted(address user, uint256 r) external view returns (bool) {
        return hasSubmitted[r][user];
    }
}
