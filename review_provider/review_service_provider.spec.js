const { Verifier } = require("@pact-foundation/pact");
const { runServer, closeServer } = require("./review_service");
const ReviewsDatabase = require("./reviews_db");

describe("review service provider test", () => {
  let server;

  beforeEach(async () => {
    server = await runServer(4000);
  });

  afterEach(async () => {
    await closeServer(server);
  });

  test("verifies the contract", async () => {
    const database = new ReviewsDatabase();
    const pact = new Verifier({
      pactUrls: ["./pacts/ReviewConsumer-ReviewService.json"],
      providerBaseUrl: "http://localhost:4000",
      logLevel: "error",
      stateHandlers: {
        "a review with film ID 1 exists": () => {
          database.clear();
          database.save({
            filmid: 1,
            title: "Dracula",
            rating: 3,
          });
        },
        "no reviews exist": () => {
          database.clear();
        },
      },
    });
    await pact.verifyProvider();
  });
});
