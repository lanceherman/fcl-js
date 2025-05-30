import {initInteraction} from "../interaction/interaction"
import {authorizations, authorization} from "./build-authorizations"

describe("Build Authorizations", () => {
  test("build authorizer", async () => {
    let ix = await (
      await authorizations([
        authorization("0xabc123", () => ({signature: "123"}), 1, 123),
      ])
    )(initInteraction())

    const authorizerAccount =
      ix.accounts[ix.authorizations as unknown as string]

    expect(authorizerAccount.addr).toEqual("0xabc123")
    expect(authorizerAccount.role).toEqual({
      authorizer: true,
      payer: false,
      proposer: false,
      param: false,
    })
  })
})
