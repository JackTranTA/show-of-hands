truncate table polls CASCADE;
ALTER SEQUENCE polls_id_seq RESTART WITH 1;
INSERT INTO polls (creator_id, title, created_at)
VALUES (1, 'sample poll', now());
