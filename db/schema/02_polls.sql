DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls
(
  id          SERIAL PRIMARY KEY            NOT NULL,
  creator_id  INTEGER REFERENCES users (id) NOT NULL,
  title       VARCHAR(255)                  NOT NULL,
  created_at  TIMESTAMP                     NOT NULL,
  expired_at  TIMESTAMP,
  visit_count INTEGER DEFAULT 0
);
