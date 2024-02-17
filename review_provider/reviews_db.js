const fs = require("fs");

const dbFilePath = `${__dirname}/db.json`;

class ReviewsDatabase {
  save(review) {
    if (fs.existsSync(dbFilePath)) {
      const data = fs.readFileSync(dbFilePath).toString("utf-8");
      const { reviews } = JSON.parse(data);
      reviews.push(review);
      fs.writeFileSync(dbFilePath, JSON.stringify({ reviews }));
    } else {
      fs.writeFileSync(dbFilePath, JSON.stringify({ reviews: [review] }));
    }
  }

  get(filmid) {
    const data = fs.readFileSync(dbFilePath).toString("utf-8");
    const { reviews } = JSON.parse(data);
    return reviews.find((review) => review.filmid === filmid);
  }

  clear() {
    fs.writeFileSync(dbFilePath, JSON.stringify({ reviews: [] }));
  }
}

module.exports = ReviewsDatabase;
