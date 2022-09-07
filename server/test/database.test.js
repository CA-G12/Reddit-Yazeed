const connection = require('../database/config/connection');
const build = require('../database/config/build');
const queries = require('../database/queries');

beforeEach(() => build());

afterAll(() => connection.end());

describe('Testing posts queries', () => {
  test('test adding new post', () => {
    const expeted = {
      title: 'This is a test post',
      content: 'this is test content',
      category: 'all',
      type: 'text',
      userId: 1,
      imageUrl: 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png',
    };

    return queries.postsQueries.addPostQuery(expeted).then((data) => {
      expect(data.title).toBe(expeted.title);
      expect(data.content).toBe(expeted.content);
      expect(data.type).toBe(expeted.type);
      expect(data.category).toBe(expeted.category);
      expect(data.userId).toBe(expeted.userId);
      expect(data.imageUrl).toBe(expeted.imageUrl);
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
