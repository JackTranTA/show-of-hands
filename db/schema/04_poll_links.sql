DROP TABLE IF EXISTS poll_links CASCADE;
CREATE TABLE poll_links
(
  id         SERIAL PRIMARY KEY            NOT NULL,
  poll_id    INTEGER REFERENCES polls (id) NOT NULL,
  type       VARCHAR(50)                   NOT NULL,
  url        VARCHAR(2083)                 NOT NULL,
  identifier VARCHAR(50)                   NOT NULL
);
