class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  async displayReview(filmid) {
    const review = await this.reviewService.get(filmid);

    if (!review.rating) {
      return "Review not found!";
    }

    const { title, rating } = review;
    const stars = "*".repeat(rating);

    return `${title}: ${stars}`;
  }
}

module.exports = ReviewController;
