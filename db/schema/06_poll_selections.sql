DROP TABLE IF EXISTS poll_selections CASCADE;
CREATE TABLE poll_selections
(
  id             SERIAL PRIMARY KEY                                     NOT NULL,
  poll_option_id INTEGER REFERENCES poll_options (id) ON DELETE CASCADE NOT NULL,
  voter_id        INTEGER REFERENCES voters (id) ON DELETE CASCADE        NOT NULL,
  poll_id        INTEGER REFERENCES polls (id) ON DELETE CASCADE        NOT NULL,
  score          INTEGER DEFAULT 0
);
