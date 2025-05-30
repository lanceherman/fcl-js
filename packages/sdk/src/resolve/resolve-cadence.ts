import {isTransaction, isScript, get} from "../interaction/interaction"
import {invariant} from "@onflow/util-invariant"
import {config} from "@onflow/config"
import * as logger from "@onflow/util-logger"
import {withPrefix} from "@onflow/util-address"
import {Interaction} from "@onflow/typedefs"

const isFn = (v: any): v is Function => typeof v === "function"
const isString = (v: any): v is string => typeof v === "string"

const oldIdentifierPatternFn = (): RegExp => /\b(0x\w+)\b/g
function isOldIdentifierSyntax(cadence: string): boolean {
  return oldIdentifierPatternFn().test(cadence)
}

const newIdentifierPatternFn = (): RegExp => /import\s+"(\w+)"/g
function isNewIdentifierSyntax(cadence: string): boolean {
  return newIdentifierPatternFn().test(cadence)
}

function getContractIdentifierSyntaxMatches(
  cadence: string
): IterableIterator<RegExpMatchArray> {
  return cadence.matchAll(newIdentifierPatternFn())
}

export async function resolveCadence(ix: Interaction): Promise<Interaction> {
  if (!isTransaction(ix) && !isScript(ix)) return ix

  var cadence = get(ix, "ix.cadence", null)

  invariant(
    isFn(cadence) || isString(cadence),
    "Cadence needs to be a function or a string."
  )
  if (isFn(cadence)) cadence = await cadence({} as Record<string, never>)
  invariant(isString(cadence), "Cadence needs to be a string at this point.")
  invariant(
    !isOldIdentifierSyntax(cadence) || !isNewIdentifierSyntax(cadence),
    "Both account identifier and contract identifier syntax not simultaneously supported."
  )
  if (isOldIdentifierSyntax(cadence)) {
    cadence = await config()
      .where(/^0x/)
      .then(d =>
        Object.entries(d).reduce((cadence, [key, value]) => {
          const regex = new RegExp("(\\b" + key + "\\b)", "g")
          return cadence.replace(regex, value)
        }, cadence)
      )
  }

  if (isNewIdentifierSyntax(cadence)) {
    for (const [fullMatch, contractName] of getContractIdentifierSyntaxMatches(
      cadence
    )) {
      const address: string | null = await config().get(
        `system.contracts.${contractName}`
      )
      if (address) {
        cadence = cadence.replace(
          fullMatch,
          `import ${contractName} from ${withPrefix(address)}`
        )
      } else {
        logger.log({
          title: "Contract Placeholder not found",
          message: `Cannot find a value for contract placeholder ${contractName}. Please add to your flow.json or explicitly add it to the config 'contracts.*' namespace.`,
          level: logger.LEVELS.warn,
        })
      }
    }
  }

  // We need to move this over in any case.
  ix.message.cadence = cadence

  return ix
}
