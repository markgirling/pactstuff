const { Verifier } = require("@pact-foundation/pact");
const { runServer, closeServer } = require("./review_service");

describe("review service provider test", () => {
  let server;

  beforeEach(async () => {
    server = await runServer(4000);
  });

  afterEach(async () => {
    await closeServer(server);
  });

  test("verifies the contract", async () => {
    const pact = new Verifier({
      pactUrls: ["./pacts/ReviewConsumer-ReviewService.json"],
      providerBaseUrl: "http://localhost:4000",
      logLevel: "info",
    });
    await pact.verifyProvider();
  });
});
