const ReviewService = require("./review_service");
const filmFixture = require("./fixtures/review");
const emptyFilmFixture = require("./fixtures/empty_review");

const path = require("node:path");
const { PactV3, MatchersV3 } = require("@pact-foundation/pact");

const provider = new PactV3({
  dir: path.resolve(process.cwd(), "pacts"),
  consumer: "ReviewConsumer",
  provider: "ReviewService",
});

const reviewBodyTemplate = MatchersV3.like(filmFixture.outputReview);

describe("review service contract tests", () => {
  test("returns found status and review object for valid id", async () => {
    provider
      .given("there are reviews")
      .uponReceiving("a request for a review")
      .withRequest({
        method: "GET",
        path: "/reviews/1",
        headers: { Accept: "application/json" },
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: reviewBodyTemplate,
      });

    return provider.executeTest(async (mockserver) => {
      const service = new ReviewService(mockserver.url);
      const response = await service.get(filmFixture.inputId);
      expect(response).toStrictEqual(filmFixture.outputReview);
    });
  });

  test("returns not found status and empty object for invalid id", async () => {
    provider
      .given("there are reviews")
      .uponReceiving("a request for a non-existent review")
      .withRequest({
        method: "GET",
        path: "/reviews/xyz",
        headers: { Accept: "application/json" },
      })
      .willRespondWith({
        status: 404,
        headers: { "Content-Type": "application/json" },
        body: emptyFilmFixture.outputReview,
      });

    return provider.executeTest(async (mockserver) => {
      const service = new ReviewService(mockserver.url);
      const response = await service.get(emptyFilmFixture.inputId);
      expect(response).toStrictEqual(emptyFilmFixture.outputReview);
    });
  });
});
