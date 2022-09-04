BEGIN;

DROP TABLE posts, users, comments, votes IF EXISTS CASCADE; 

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  avatar_url VARCHAR(255)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  type VARCHAR(30) NOT NULL,
  category VARCHAR(50),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  user_id INT NOT NULL,
  CONSTRAINT post_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT comment_post_fk FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  CONSTRAINT comment_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE votes (
  type INT NOT NULL,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT vote_post_fk FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  CONSTRAINT vote_user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT post_user_pk PRIMARY KEY (post_id, user_id)
);

COMMIT;



INSERT INTO users (username, email, password, avatar_url) 
VALUES
('ysalem', 'yazeed.salem.it@hotmail.com', '123456',"https://usveteransmagazine.com/wp-content/webp-express/webp-images/uploads/2017/10/Interview-Tips-1.jpg.webp"),
('sdm91', 'sdm91@hotmail.com', '123456',"https://usveteransmagazine.com/wp-content/webp-express/webp-images/uploads/2017/10/Interview-Tips-1.jpg.webp");


INSERT INTO posts (title, content, type, category, image_url, user_id) 
VALUES
(
  'My first post',
  'Hi guys, this is my first post on reddit. please give me your feedback.', 
  'text', 
  'all', 
  NULL,
  1
),

(
  'My second post',
  'How are you guys, I hope that you are ok.',
  'text',
  'all',
  NULL,
  2
),

(
  'My small heart song, Meshari Alefasi',
  'https://www.youtube.com/watch?v=R9g6UPVNa-o',
  'link',
  'music',
  NULL, 
  1
),

INSERT INTO comments (content, post_id, user_id)
VALUES 
('Awesome post, please continue posting', 2, 1),
('Well done for this video, I love Mishari AlAfasi, he has a great voice', 3, 1),
('this is my second comment', 1, 2),
('Thanks for this post', 2, 2),
('Great video', 3, 2),

INSERT INTO votes (type, post_id, user_id)
VALUES 
(1, 2, 1),
(1, 3, 1),
(-1, 1, 2),
(1, 2, 2),
(-1, 3, 2)

