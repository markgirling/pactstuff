const ReviewService = require("./review_service");
const filmFixture = require("./fixtures/review");
const emptyFilmFixture = require("./fixtures/empty_review");

const path = require("node:path");
const { PactV3, MatchersV3 } = require("@pact-foundation/pact");

const provider = new PactV3({
  dir: path.resolve(process.cwd(), "pacts"),
  consumer: "ReviewConsumer",
  provider: "ReviewService",
  logLevel: "error",
});

const reviewBodyTemplate = MatchersV3.like(filmFixture);

describe("get /reviews/id", () => {
  test("returns found status and review object for existing film id", async () => {
    provider
      .given("a review with film ID 1 exists")
      .uponReceiving("a request for a review")
      .withRequest({
        method: "GET",
        path: "/reviews/1",
        headers: { accept: "application/json" },
      })
      .willRespondWith({
        status: 200,
        headers: { "content-type": "application/json" },
        body: reviewBodyTemplate,
      });

    return provider.executeTest(async (mockserver) => {
      const service = new ReviewService(mockserver.url);
      const response = await service.get(1);
      expect(response).toStrictEqual(filmFixture);
    });
  });

  test("returns not found status and empty object for nonexisting film id", async () => {
    provider
      .given("no reviews exist")
      .uponReceiving("a request for a review")
      .withRequest({
        method: "GET",
        path: "/reviews/1",
        headers: { accept: "application/json" },
      })
      .willRespondWith({
        status: 404,
        headers: { "content-type": "application/json" },
        body: emptyFilmFixture,
      });

    return provider.executeTest(async (mockserver) => {
      const service = new ReviewService(mockserver.url);
      const response = await service.get(1);
      expect(response).toStrictEqual(emptyFilmFixture);
    });
  });
});
