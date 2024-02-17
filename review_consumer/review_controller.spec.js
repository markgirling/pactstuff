const ReviewController = require("./review_controller");
const filmFixture = require("./fixtures/review");
const emptyFilmFixture = require("./fixtures/empty_review");

jest.mock("./review_service");

class StubbedReviewService {
  async get(filmid) {
    if (filmid === 1) {
      return filmFixture;
    }

    return emptyFilmFixture;
  }
}

const controller = new ReviewController(new StubbedReviewService());

describe("ReviewController", () => {
  test("outputs film title and stars", async () => {
    const result = await controller.displayReview(1);
    expect(result).toEqual("Dracula: ***");
  });

  test("outputs not found message", async () => {
    const result = await controller.displayReview(2);
    expect(result).toEqual("Review not found!");
  });
});
