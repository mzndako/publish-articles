const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

/**
 * Article Schema
 * @private
 */
const articleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 128,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
});

/**
 * Statics
 */
articleSchema.statics = {


  /**
   * List articles in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of articles to be skipped.
   * @param {number} limit - Limit number of articles to be returned.
   * @param {string} user - Id of the user
   * 
   * @returns {Promise<User[]>}
   */
  async list({
    page = 1, perPage = 5, userId
  }) {
    const options = {};
    if (userId) {
      options.user = userId;
    }
    const totalDoc = await this.countDocuments(options);
    const articles = await this.find(options)
      .populate('user', '_id, name')
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
    return {
      articles,
      pagination: {
        totalDoc,
        currentPage: page,
        perPage
      }
    }
  },
};

/**
 * @typedef Article
 */
module.exports = mongoose.model('Article', articleSchema);
