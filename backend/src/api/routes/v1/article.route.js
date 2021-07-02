const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/article.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const {
  listArticles,
  createArticle,
} = require('../../validations/article.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/articles List Articles
   * @apiDescription Get a list of articles
   * @apiVersion 1.0.0
   * @apiName ListArticles
   * @apiGroup Article
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Article's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Articles per page
   * @apiParam  {String}             [userId]       User's id
   *
   * @apiSuccess {Object[]} articles List of articles.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated articles can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(LOGGED_USER), validate(listArticles), controller.list)
  /**
   * @api {post} v1/articles Create Article
   * @apiDescription Create a new article
   * @apiVersion 1.0.0
   * @apiName CreateArticle
   * @apiGroup Article
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Article's access token
   *
   * @apiParam  {String{3..128}}     title  Article's title
   * @apiParam  {String}             description     Article's description
   *
   * @apiSuccess (Created 201) {String}  id           Article's id
   * @apiSuccess (Created 201) {String}  title        Article's title
   * @apiSuccess (Created 201) {String}  description  Article's description
   * @apiSuccess (Created 201) {Date}    createdAt    Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated articles can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(LOGGED_USER), validate(createArticle), controller.create);

router
  .route('/:articleId')
  /**
   * @api {delete} v1/articles/:id Delete Article
   * @apiDescription Delete an article
   * @apiVersion 1.0.0
   * @apiName DeleteArticle
   * @apiGroup Article
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Article's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Article does not exist
   */
  .delete(authorize(LOGGED_USER), controller.remove);


module.exports = router;
