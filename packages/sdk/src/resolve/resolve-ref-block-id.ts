import {
  isTransaction,
  Ok,
  initInteraction,
  pipe,
} from "../interaction/interaction"
import * as ixModule from "../interaction/interaction"
import {response} from "../response/response"
import {config} from "@onflow/config"
import {decodeResponse} from "../decode/decode"
import {getBlock} from "../build/build-get-block"
import {invariant} from "@onflow/util-invariant"
import {Buffer} from "@onflow/rlp"
import {send as defaultSend} from "@onflow/transport-http"

async function getRefId(opts?: {[key: string]: any}): Promise<string> {
  const node = await config().get("accessNode.api")
  const sendFn: any = await config.first(
    ["sdk.transport", "sdk.send"],
    defaultSend
  )

  invariant(
    sendFn,
    `Required value for sdk.transport is not defined in config. See: ${"https://github.com/onflow/fcl-js/blob/master/packages/sdk/CHANGELOG.md#0057-alpha1----2022-01-21"}`
  )

  var ix
  ix = await pipe(initInteraction(), [getBlock()])
  ix = await sendFn(ix, {config, response, Buffer, ix: ixModule}, {node})
  ix = await decodeResponse(ix)
  return ix.id
}

export function resolveRefBlockId(opts?: {[key: string]: any}) {
  return async (ix: any) => {
    if (!isTransaction(ix)) return Ok(ix)
    if (ix.message.refBlock) return Ok(ix)

    ix.message.refBlock = await getRefId(opts)

    return Ok(ix)
  }
}
