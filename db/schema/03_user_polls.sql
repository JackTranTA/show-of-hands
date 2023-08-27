DROP TABLE IF EXISTS user_polls CASCADE;
CREATE TABLE user_polls
(
  id        SERIAL PRIMARY KEY                              NOT NULL,
  user_id   INTEGER REFERENCES users (id) ON DELETE CASCADE NOT NULL,
  poll_id   INTEGER REFERENCES polls (id) ON DELETE CASCADE NOT NULL,
  comment   TEXT
);
