//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./TrustScriptToken.sol";
import "./TrustScriptProductReviewAttester.sol";

contract TrustScriptShop is Ownable {
	struct Product {
		uint256 id;
		string name;
		uint256 priceInETH;
		uint256 priceInToken;
	}

	struct ProductReview {
		bytes32 attestationUID;
		uint256 productId;
		address buyerAddress;
		string review;
	}

	TrustScriptToken public trustScriptToken;
	uint256 public constant TOKENS_PER_ETH = 1000;
	uint256 public constant REVIEW_PRODUCT_REWARD = 5;
	mapping(uint256 => bool) public productsMapping;
	Product[] public productsArray;
	mapping(uint256 => Product) public products;
	uint256 public numberOfProducts;
	ProductReview[] public productReviewsArray;
	uint256 public numberOfProductReviews;
	mapping(address => bool) public allowedAttesters;
	TrustScriptProductReviewAttester public trustScriptProductReviewAttester;

	event AddProduct(address sellerAddress, Product product);
	event BuyProductWithETH(address buyerAddress, Product product);
	event BuyProductWithToken(address buyerAddress, Product product);
	event ReviewProduct(address buyerAddress, ProductReview productReview);
	event MintTokenToBuyer(address buyerAddress, uint256 amountOfToken);
	event WithdrawETH(uint256 amountOfETH);
	event WithdrawToken(uint256 amountOfToken);

	error TrustScriptShop__ExistedProductId(uint256 productId);
	error TrustScriptShop__NotExistedProductId(uint256 productId);
	error TrustScriptShop__UnequalPriceInETHAndPriceInToken(
		uint256 priceInETH,
		uint256 priceInToken
	);
	error TrustScriptShop__UnequalAmountOfETHAndPriceInETH(
		uint256 amountOfETH,
		uint256 priceInETH
	);
	error TrustScriptShop__UnequalAmountOfTokenAndPriceInToken(
		uint256 amountOfToken,
		uint256 priceInToken
	);
	error TrustScriptShop__FailedToSendETH();
	error TrustScriptShop__DisallowedAttester(address attesterAddress);

	modifier onlyAllowedAttesters() {
		if (!allowedAttesters[msg.sender])
			revert TrustScriptShop__DisallowedAttester(msg.sender);
		_;
	}

	constructor(
		address ownerAddress,
		address trustScriptTokenAddress,
		address trustScriptProductReviewAttesterAddress
	) {
		super.transferOwnership(ownerAddress);
		trustScriptToken = TrustScriptToken(trustScriptTokenAddress);
		trustScriptProductReviewAttester = TrustScriptProductReviewAttester(
			trustScriptProductReviewAttesterAddress
		);
	}

	function addProduct(Product memory product) public onlyOwner {
		if (productsMapping[product.id]) {
			revert TrustScriptShop__ExistedProductId(product.id);
		}

		if (
			product.priceInETH *
				TOKENS_PER_ETH *
				10 ** trustScriptToken.decimals() !=
			product.priceInToken * 1 ether
		) {
			revert TrustScriptShop__UnequalPriceInETHAndPriceInToken(
				product.priceInETH,
				product.priceInToken
			);
		}

		productsMapping[product.id] = true;
		productsArray.push(product);
		products[product.id] = product;
		numberOfProducts++;

		emit AddProduct(msg.sender, product);
	}

	function buyProductWithETH(uint256 id) public payable {
		if (!productsMapping[id]) {
			revert TrustScriptShop__NotExistedProductId(id);
		}

		uint256 priceInETH = products[id].priceInETH;
		if (msg.value != priceInETH) {
			revert TrustScriptShop__UnequalAmountOfETHAndPriceInETH(
				msg.value,
				priceInETH
			);
		}

		if (!allowedAttesters[msg.sender]) {
			allowedAttesters[msg.sender] = true;
		}

		(bool success, ) = owner().call{ value: priceInETH }("");
		if (!success) {
			revert TrustScriptShop__FailedToSendETH();
		}

		emit BuyProductWithETH(msg.sender, products[id]);
	}

	function buyProductWithToken(uint256 id, uint256 amountOfToken) public {
		if (!productsMapping[id]) {
			revert TrustScriptShop__NotExistedProductId(id);
		}

		uint256 priceInToken = products[id].priceInToken;
		if (amountOfToken != priceInToken) {
			revert TrustScriptShop__UnequalAmountOfTokenAndPriceInToken(
				amountOfToken,
				priceInToken
			);
		}

		if (!allowedAttesters[msg.sender]) {
			allowedAttesters[msg.sender] = true;
		}

		trustScriptToken.transferFrom(msg.sender, owner(), amountOfToken);

		emit BuyProductWithToken(msg.sender, products[id]);
	}

	function reviewProduct(
		uint256 id,
		string memory review
	) public onlyAllowedAttesters {
		if (!productsMapping[id]) {
			revert TrustScriptShop__NotExistedProductId(id);
		}

		bytes32 attestationUID = trustScriptProductReviewAttester
			.attestProductReview(id, msg.sender, review, owner());

		ProductReview memory productReview = ProductReview(
			attestationUID,
			id,
			msg.sender,
			review
		);

		emit ReviewProduct(msg.sender, productReview);

		productReviewsArray.push(productReview);
		numberOfProductReviews++;

		trustScriptToken.mint(
			msg.sender,
			REVIEW_PRODUCT_REWARD * 10 ** trustScriptToken.decimals()
		);

		emit MintTokenToBuyer(
			msg.sender,
			REVIEW_PRODUCT_REWARD * 10 ** trustScriptToken.decimals()
		);
	}

	function withdrawETH() public onlyOwner {
		uint256 amountOfETH = address(this).balance;

		(bool success, ) = msg.sender.call{ value: amountOfETH }("");
		if (!success) {
			revert TrustScriptShop__FailedToSendETH();
		}

		emit WithdrawETH(amountOfETH);
	}

	function withdrawToken() public onlyOwner {
		uint256 amountOfToken = trustScriptToken.balanceOf(address(this));
		trustScriptToken.transfer(msg.sender, amountOfToken);

		emit WithdrawToken(amountOfToken);
	}

	function getAllProducts()
		public
		view
		returns (Product[] memory allProducts)
	{
		if (numberOfProducts == 0) {
			return new Product[](0);
		}

		allProducts = new Product[](numberOfProducts);
		for (uint i = 0; i < numberOfProducts; i++) {
			allProducts[i] = productsArray[i];
		}
		return allProducts;
	}

	function getAllProductReviews()
		public
		view
		returns (ProductReview[] memory allProductReviews)
	{
		if (numberOfProductReviews == 0) {
			return new ProductReview[](0);
		}

		allProductReviews = new ProductReview[](numberOfProductReviews);
		for (uint i = 0; i < numberOfProductReviews; i++) {
			allProductReviews[i] = productReviewsArray[i];
		}
		return allProductReviews;
	}
}
