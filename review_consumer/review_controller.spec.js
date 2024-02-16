const ReviewController = require("./review_controller");
const filmFixture = require("./fixtures/review");
const emptyFilmFixture = require("./fixtures/empty_review");

jest.mock("./review_service");

class StubbedReviewService {
  async get(filmid) {
    if (filmid === filmFixture.inputId) {
      return filmFixture.outputReview;
    }

    if (filmid === emptyFilmFixture.inputId) {
      return emptyFilmFixture.outputReview;
    }

    throw new Error("Invalid film ID used in StubbedReviewService");
  }
}

const controller = new ReviewController(new StubbedReviewService());

describe("ReviewController", () => {
  test("outputs film title and stars", async () => {
    const result = await controller.displayReview(filmFixture.inputId);
    expect(result).toEqual("Dracula: ***");
  });

  test("outputs not found message", async () => {
    const result = await controller.displayReview(emptyFilmFixture.inputId);
    expect(result).toEqual("Review not found!");
  });
});
