const supertest = require('supertest');
const app = require('../app');

test('Testing getting all posts route', (done) => {
  supertest(app)
    .get('/api/v1/posts')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .end((err, res) => {
      if (err) done(err);
      expect (JSON.parse(res.text).result.length).toBe(3);
      done();
    });
});

test('Testing getting all  posts by vote route', (done) => {
  supertest(app)
    .get('/api/v1/posts/hot')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .end((err, res) => {
      if (err) done(err);
      expect (JSON.parse(res.text).result.length).toBe(3);
      done();
    });
});

test('Testing getting all  posts by newest route', (done) => {
  supertest(app)
    .get('/api/v1/posts/new')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .end((err, res) => {
      if (err) done(err);
      expect (JSON.parse(res.text).result.length).toBe(3);
      done();
    });
});
