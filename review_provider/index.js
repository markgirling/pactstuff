const { runServer } = require("./review_service");

const port = process.env.PORT || 3000;

runServer(port, () => {
  console.log(`Example app listening on port ${port}`);
});
