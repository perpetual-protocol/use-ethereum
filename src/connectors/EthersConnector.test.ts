import { providers } from "ethers"
import { EthersConnector } from "./EthersConnector"

describe("EthersConnector", () => {
    const network = providers.getNetwork("homestead")

    it("returns same network as argument of constructor", async () => {
        const connector = new EthersConnector(network)
        const provider = await connector.getProvider()
        expect(provider.network.name).toEqual("homestead")
    })

    it("always returns null account", async () => {
        const connector = new EthersConnector(network)
        const account = await connector.getAccount()
        expect(account).toBeNull()
    })
})
