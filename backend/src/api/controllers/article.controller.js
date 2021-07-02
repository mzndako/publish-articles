const httpStatus = require('http-status');
const Article = require('../models/article.model');

/**
 * Create article
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const article = await new Article({ ...req.body, user: req.user._id }).save();
    res.status(httpStatus.CREATED);
    res.json(article);
  } catch (error) {
    next(error);
  }
};

/**
 * Get articles
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const data = await Article.list(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Article
 * @param id article Id
 * @public
 */
exports.remove = (req, res, next) => {
  const { articleId } = req.params;

  Article.remove({ _id: articleId })
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
