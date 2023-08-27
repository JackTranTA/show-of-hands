DROP TABLE IF EXISTS poll_selections CASCADE;
CREATE TABLE poll_selections
(
  id             SERIAL PRIMARY KEY                                     NOT NULL,
  poll_choice_id INTEGER REFERENCES poll_choices (id) ON DELETE CASCADE NOT NULL,
  user_id        INTEGER REFERENCES users (id) ON DELETE CASCADE        NOT NULL,
  poll_id        INTEGER REFERENCES polls (id) ON DELETE CASCADE        NOT NULL,
  score          INTEGER DEFAULT 0
);
