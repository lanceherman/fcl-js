import * as logger from "@onflow/util-logger"
// Base
export {build} from "./build/build"
export {resolve} from "./resolve/resolve"
export {
  send,
  subscribe,
  rawSubscribe,
  SubscriptionsNotSupportedError,
} from "./transport"
export {decode} from "./decode/sdk-decode"
export {
  encodeTransactionPayload,
  encodeTransactionEnvelope,
  encodeTxIdFromVoucher,
} from "./encode/encode"

// Utils
export {
  interaction, // deprecated
  initInteraction,
  isOk,
  isBad,
  why,
  pipe,
  get,
  put,
  update,
  destroy,
  isUnknown,
  isScript,
  isTransaction,
  isGetTransaction,
  isGetTransactionStatus,
  isGetAccount,
  isGetEvents,
  isPing,
  isGetBlock,
  isGetBlockHeader,
  isGetCollection,
  isGetNetworkParameters,
  isGetNodeVersionInfo,
} from "./interaction/interaction"
import type {CadenceArgument} from "./interaction/interaction"
export {CadenceArgument} // Workaround for babel https://github.com/babel/babel/issues/8361
import type {InteractionBuilderFn} from "./interaction/interaction"
export {InteractionBuilderFn}

export {createSignableVoucher, voucherToTxId} from "./resolve/voucher"
export {encodeMessageFromSignable} from "./wallet-utils/encode-signable"
export {template as cadence} from "@onflow/util-template"
export {template as cdc} from "@onflow/util-template"

import type {Voucher} from "./wallet-utils/encode-signable"
export {Voucher}

// Helpers
export {account} from "./account/account"
export {block} from "./block/block"
export {nodeVersionInfo} from "./node-version-info/node-version-info"

// Builders
export {authorizations, authorization} from "./build/build-authorizations"
export {atBlockHeight} from "./build/build-at-block-height"
export {atBlockId} from "./build/build-at-block-id"
export {atLatestBlock} from "./build/build-at-latest-block"
export {getAccount} from "./build/build-get-account"
export {getEvents} from "./build/build-get-events"
export {getEventsAtBlockHeightRange} from "./build/build-get-events-at-block-height-range"
export {getEventsAtBlockIds} from "./build/build-get-events-at-block-ids"
export {getBlock} from "./build/build-get-block"
export {getBlockHeader} from "./build/build-get-block-header"
export {getCollection} from "./build/build-get-collection"
export {getTransactionStatus} from "./build/build-get-transaction-status"
export {getTransaction} from "./build/build-get-transaction"
export {getNetworkParameters} from "./build/build-get-network-parameters"
export {getNodeVersionInfo} from "./build/build-get-node-version-info"
export {limit} from "./build/build-limit"
export {args, arg} from "./build/build-arguments"
export {proposer} from "./build/build-proposer"
export {payer} from "./build/build-payer"
export {ping} from "./build/build-ping"
export {ref} from "./build/build-ref"
export {script} from "./build/build-script"
export {transaction} from "./build/build-transaction"
export {validator} from "./build/build-validator"
export {invariant} from "./build/build-invariant"
export {voucherIntercept} from "./build/build-voucher-intercept"
export {subscribeEvents} from "./build/build-subscribe-events"

// Resolvers
export {resolveCadence} from "./resolve/resolve-cadence"
export {resolveFinalNormalization} from "./resolve/resolve-final-normalization"
export {resolveProposerSequenceNumber} from "./resolve/resolve-proposer-sequence-number"
export {resolveArguments} from "./resolve/resolve-arguments"
export {resolveAccounts} from "./resolve/resolve-accounts"
export {response} from "./response/response"
export {resolveSignatures} from "./resolve/resolve-signatures"
export {resolveValidators} from "./resolve/resolve-validators"
export {resolveRefBlockId} from "./resolve/resolve-ref-block-id"
export {resolveVoucherIntercept} from "./resolve/resolve-voucher-intercept"

export {config} from "@onflow/config"

// Deprecated
export const params = (params: never) =>
  logger.log.deprecate({
    pkg: "FCL/SDK",
    message: `The params builder has been removed from the Flow JS-SDK/FCL.`,
    transition:
      "https://github.com/onflow/flow-js-sdk/blob/master/packages/sdk/TRANSITIONS.md#0001-deprecate-params",
    level: logger.LEVELS.error,
  })
export const param = (params: never) =>
  logger.log.deprecate({
    pkg: "FCL/SDK",
    message: `The param builder has been removed from the Flow JS-SDK/FCL.`,
    transition:
      "https://github.com/onflow/flow-js-sdk/blob/master/packages/sdk/TRANSITIONS.md#0001-deprecate-params",
    level: logger.LEVELS.error,
  })

import * as TestUtils from "./test-utils"
export {TestUtils}

export {VERSION} from "./VERSION"

export {flowMainnet, flowTestnet, flowEmulator} from "./constants"

export * from "@onflow/typedefs"

import * as types from "@onflow/types"
export {types as t}
