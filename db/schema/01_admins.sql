DROP TABLE IF EXISTS admins CASCADE;
CREATE TABLE admins
(
  id          SERIAL PRIMARY KEY NOT NULL,
  name        VARCHAR(255)       NOT NULL,
  email       VARCHAR(320)       NOT NULL
);
