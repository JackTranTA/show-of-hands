truncate table voters CASCADE;
ALTER SEQUENCE voters_id_seq RESTART WITH 1;
INSERT INTO voters (poll_id, name)
VALUES (1, 'voter1'),
       (1, 'voter2'),
       (1, 'voter3');
