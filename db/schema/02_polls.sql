DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls
(
  id               SERIAL PRIMARY KEY             NOT NULL,
  admin_id         INTEGER REFERENCES admins (id) NOT NULL,
  title            VARCHAR(255)                   NOT NULL,
  created_at       TIMESTAMP                      NOT NULL,
  expired_at       TIMESTAMP,
  allow_anonymous  BOOLEAN DEFAULT FALSE,
  send_result      BOOLEAN DEFAULT FALSE,
  admin_identifier VARCHAR(50)                    NOT NULL,
  voter_identifier VARCHAR(50)                    NOT NULL
);
