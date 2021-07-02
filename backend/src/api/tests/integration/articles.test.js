/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const app = require('../../../index');
const User = require('../../models/user.model');
const Article = require('../../models/article.model');

describe('Article API', async () => {
  let userAccessToken;
  let dbUsers;

  const password = '123456';
  const passwordHashed = await bcrypt.hash(password, 1);

  beforeEach(async () => {
    dbUsers = {
      branStark: {
        email: 'branstark@gmail.com',
        password: passwordHashed,
        name: 'Bran Stark'
      },
      jonSnow: {
        email: 'jonsnow@gmail.com',
        password: passwordHashed,
        name: 'Jon Snow',
      },
    };

    user = {
      email: 'sousa.dfs@gmail.com',
      password,
      name: 'Daniel Sousa',
    };

    article = {
      title: 'article title',
      description: 'article description'
    };

    await User.deleteMany({});
    await Article.deleteMany({});
    await User.insertMany([dbUsers.branStark, dbUsers.jonSnow]);
    await Article.create(article);
    dbUsers.branStark.password = password;
    dbUsers.jonSnow.password = password;
    userAccessToken = (await User.findAndGenerateToken(dbUsers.jonSnow)).accessToken;
  });

  describe('POST /v1/articles', () => {
    it('should create a new article when request is okay', () => {
      return request(app)
        .post('/v1/articles')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send(article)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body).to.include(article);
        });
    });

    it('should report error when title or description is not provided', () => {
      return request(app)
        .post('/v1/articles')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .send({title: "", description: ""})
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          const { field } = res.body.errors[0];
          const { location } = res.body.errors[0];
          expect(field).to.be.equal('title');
          expect(location).to.be.equal('body');
        });
    });
  });

  describe('GET /v1/articles', () => {
    it('should get all articles', () => {
      return request(app)
        .get('/v1/articles')
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(httpStatus.OK)
        .then(async (res) => {
          expect(res.body.articles).to.be.an('array');
          expect(res.body.articles).to.have.lengthOf(1);
        });
    });
  });

  describe('DELETE /v1/articles', () => {
    it('should delete article', async () => {
      const id = (await Article.findOne({}))._id;

      return request(app)
        .delete(`/v1/articles/${id}`)
        .set('Authorization', `Bearer ${userAccessToken}`)
        .expect(httpStatus.NO_CONTENT)
        .then(() => request(app).get('/v1/articles'))
        .then(async () => {
          const users = await Article.find({});
          expect(users).to.have.lengthOf(0);
        });
    });
  });
});
