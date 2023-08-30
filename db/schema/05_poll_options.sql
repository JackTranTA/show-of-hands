DROP TABLE IF EXISTS poll_options CASCADE;
CREATE TABLE poll_options
(
  id                 SERIAL PRIMARY KEY                              NOT NULL,
  poll_id            INTEGER REFERENCES polls (id) ON DELETE CASCADE NOT NULL,
  title       VARCHAR(255)                                    NOT NULL,
  description TEXT
);
