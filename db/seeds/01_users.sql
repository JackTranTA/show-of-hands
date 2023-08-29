truncate table users CASCADE;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
INSERT INTO users (name, email, is_admin)
VALUES ('admin', 'admin@email.com', true),
       ('voter1', 'voter1@email.com', false),
       ('voter2', 'voter2@email.com', false),
       ('voter3', 'voter3@email.com', false);
