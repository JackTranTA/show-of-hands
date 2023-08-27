DROP TABLE IF EXISTS poll_choices CASCADE;
CREATE TABLE poll_choices
(
  id                      SERIAL PRIMARY KEY                              NOT NULL,
  poll_id                 INTEGER REFERENCES polls (id) ON DELETE CASCADE NOT NULL,
  option_title            VARCHAR(255)                                    NOT NULL,
  description_description TEXT
);
