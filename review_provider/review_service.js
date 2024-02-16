const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ apiVersion: 1 });
});

app.get("/reviews/:filmid", (req, res) => {
  const id = req.params.filmid;

  if (id === "1") {
    return res.json({ filmid: 1, title: "Dracula", rating: 3 });
  }

  if (id === "2") {
    return res.json({ filmid: 2, title: "The Shining", rating: 4 });
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
