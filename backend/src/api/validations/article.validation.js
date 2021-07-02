const Joi = require('joi');

module.exports = {

  // GET /v1/article
  listArticles: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      userId: Joi.string(),
    },
  },

  // POST /v1/article
  createArticle: {
    body: {
      title: Joi.string().min(3).max(128).required(),
      description: Joi.string().required(),
    },
  },
};
