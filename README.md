## General idea / Description (The problem it solves)
  TrustShop tackles online marketplace woes: lack of trust, low-quality reviews, and unclear transactions. By rewarding honest reviews with TST tokens on the blockchain, TrustShop incentivizes user participation, promotes product quality, and fosters a secure and transparent shopping experience.

 ## Technologies we used
  - Ethereum
  - BASE
  - Solidity
  - Next.js
  - Hardhat
  - Scaffold-ETH 2
  - Ethereum Attestation Service

 ## How to run a transaction on TrustShop
  - Enter the app and add connect your wallet
  - make sure you have enough eth to purchase
  - once you have bought and paid you will directed to Review page, where you drop your review and      attest.


## # our Contracts!!

1. TrustScriptShop contract:
    1. an onchain shop built on  base for sellers to sell product and get paid via eth.
    2. what is unique is that as buyer make a purchase they are redirected to attest what is being bought.
    3. buyers are immediatedly credited with TST token as a thank you for attesting a product bought.

2. TrustScriptProductReviewAttester contract: 
    1. Handles the submission of the review into the 
    2. stores attestation as Attestation UID which can be view on easscan.org

3. TrustScriptToken contract: 
    1. store of the Token that is being minted after a buyer successfully attest their review.   


    future Use case implementation: 
     we would want Attestation to be done after Product has been recived hence the satisfaction of a buyer is fully earned , possible the attestion is given a period before the attester is verifed to be allowed to attest based on product delivery. 
