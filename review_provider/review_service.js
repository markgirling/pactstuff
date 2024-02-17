const express = require("express");
const ReviewsDatabase = require("./reviews_db");

const app = express();
const database = new ReviewsDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ apiVersion: 1 });
});

app.get("/reviews/:filmid", (req, res) => {
  const data = database.get(parseInt(req.params.filmid));

  if (data) {
    return res.json(data);
  }

  return res.status(404).json({});
});

module.exports = {
  runServer: (port, callback = () => {}) => {
    return new Promise((resolve) => {
      const server = app.listen(port, () => {
        callback();
        resolve(server);
      });
    });
  },

  closeServer: (server) => {
    return new Promise((resolve) => {
      server.close(() => resolve());
    });
  },
};
