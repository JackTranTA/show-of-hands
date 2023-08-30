truncate table admins CASCADE;
ALTER SEQUENCE admins_id_seq RESTART WITH 1;
INSERT INTO admins (name, email)
VALUES ('admin', 'admin@email.com');
