const axios = require("axios");

module.exports = class ReviewService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async get(filmid) {
    return axios(`${this.endpoint}/reviews/${filmid}`, {
      headers: { Accept: "application/json" },
    })
      .then((result) => result.data)
      .catch((error) => {
        const { status, data } = error.response;

        if (status === 404) {
          return data;
        }

        throw error;
      });
  }
};
