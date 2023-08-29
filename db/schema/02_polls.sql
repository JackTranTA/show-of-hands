DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls
(
  id               SERIAL PRIMARY KEY            NOT NULL,
  admin_id       INTEGER REFERENCES admins (id) NOT NULL,
  title            VARCHAR(255)                  NOT NULL,
  description      TEXT,
  created_at       TIMESTAMP                     NOT NULL,
  expired_at       TIMESTAMP,
  send_results   BOOLEAN DEFAULT FALSE,
  allow_anonymous  BOOLEAN DEFAULT FALSE,
  admin_identifier VARCHAR(50)                   NOT NULL,
  voter_identifier VARCHAR(50)                   NOT NULL
);
