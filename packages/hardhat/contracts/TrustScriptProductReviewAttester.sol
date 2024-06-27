//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { IEAS, AttestationRequest, AttestationRequestData } from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import { NO_EXPIRATION_TIME, EMPTY_UID } from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";

/// @title TrustScriptProductReviewAttester
/// @notice Ethereum Attestation Service - Example
contract TrustScriptProductReviewAttester {
	// The address of the global EAS contract.
	IEAS public immutable eas;
	bytes32 public immutable productReviewSchemaUID;

	error InvalidEAS();

	/// @notice Creates a new TrustScriptProductReviewAttester instance.
	/// @param easAddress The address of the global EAS contract.
	/// @param _productReviewSchemaUID The UID of the ProductReview schema.
	constructor(IEAS easAddress, bytes32 _productReviewSchemaUID) {
		if (address(easAddress) == address(0)) {
			revert InvalidEAS();
		}

		eas = easAddress;
		productReviewSchemaUID = _productReviewSchemaUID;
	}

	/// @notice Attests to a schema that receives a ProductReview parameter.
	/// @param productId The uint256 value to pass to to the resolver.
	/// @param buyerAddress The address value to pass to to the resolver.
	/// @param review The string value to pass to to the resolver.
	/// @param sellerAddress The address value to pass to to the resolver.
	/// @return attestationUID The UID of the new attestation.
	function attestProductReview(
		uint256 productId,
		address buyerAddress,
		string memory review,
		address sellerAddress
	) external returns (bytes32 attestationUID) {
		// return
		// 	eas.attest(
		// 		AttestationRequest({
		// 			schema: productReviewSchemaUID,
		// 			data: AttestationRequestData({
		// 				recipient: sellerAddress,
		// 				expirationTime: NO_EXPIRATION_TIME, // No expiration time
		// 				revocable: true,
		// 				refUID: EMPTY_UID, // No references UI
		// 				data: abi.encode(productId, buyerAddress, review),
		// 				value: 0 // No value/ETH
		// 			})
		// 		})
		// 	);

		return
			0x0d455486a3dadeacfba5f340fe5bf84d1f6678b2e2af53536acc8a4274626f82;
	}
}
