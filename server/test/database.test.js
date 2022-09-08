const connection = require('../database/config/connection');
const build = require('../database/config/build');
const queries = require('../database/queries');

beforeEach(() => build());

afterAll(() => connection.end());

describe('Testing posts queries', () => {
  test('test adding new post', () => {
    const expected = {
      content: 'This is a test post',
      userId: 1,
      title: 'his is a test post',
      category: 'all',
      type: 'text',
      imageUrl: 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png',
    };

    return queries.postsQueries.addPostQuery(expected)
      .then((data) => data.rows[0])
      .then((result) => {
        console.log(result);
        expect(result.title).toBe(expected.title);
        expect(result.content).toBe(expected.content);
        expect(result.type).toBe(expected.type);
        expect(result.category).toBe(expected.category);
        expect(result['user_id']).toBe(expected.userId);
        expect(result['image_url']).toBe(expected.imageUrl);
      });
  });

  test('test returning all posts', () => queries.postsQueries.allPostsQuery()
    .then((data) => {
      expect(data.rows.length).toBe(3);
    }));

  test('test returning all posts ordered by vote', () => queries.postsQueries.allPostsOrderedByVoteQuery()
    .then((data) => {
      expect(data.rows.length).toBe(3);
      expect(data.rows.length).toBe(3);
    }));

  test('test returning all posts ordered by date', () => queries.postsQueries.allPostsOrderedByDateQuery()
    .then((data) => {
      expect(data.rows.length).toBe(3);
      expect(data.rows.length).toBe(3);
    }));
});
