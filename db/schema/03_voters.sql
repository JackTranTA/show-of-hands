DROP TABLE IF EXISTS voters CASCADE;
CREATE TABLE voters
(
  id       SERIAL PRIMARY KEY NOT NULL,
  poll_id  INTEGER REFERENCES polls (id) ON DELETE CASCADE,
  name     VARCHAR(255) DEFAULT 'anonymous',
  email    VARCHAR(320),
  comment TEXT
)
