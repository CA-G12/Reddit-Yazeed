INSERT INTO users (username, email, password, avatar_url) 
VALUES
('ysalem', 'yazeed.salem.it@hotmail.com', '123456','https://usveteransmagazine.com/wp-content/webp-express/webp-images/uploads/2017/10/Interview-Tips-1.jpg.webp'),
('sdm91', 'sdm91@hotmail.com', '123456','https://usveteransmagazine.com/wp-content/webp-express/webp-images/uploads/2017/10/Interview-Tips-1.jpg.webp');


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
);

INSERT INTO comments (content, post_id, user_id)
VALUES 
('Awesome post, please continue posting', 2, 1),
('Well done for this video, I love Mishari AlAfasi, he has a great voice', 3, 1),
('this is my second comment', 1, 2),
('Thanks for this post', 2, 2),
('Great video', 3, 2);

INSERT INTO votes (type, post_id, user_id)
VALUES 
(1, 2, 1),
(1, 3, 1),
(-1, 1, 2),
(1, 2, 2),
(-1, 3, 2);
