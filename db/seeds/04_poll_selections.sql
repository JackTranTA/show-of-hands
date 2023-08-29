truncate table poll_selections CASCADE;
ALTER SEQUENCE poll_selections_id_seq RESTART WITH 1;
INSERT INTO poll_selections (poll_option_id, user_id, poll_id, score)
VALUES (1, 2, 1, 2),
       (2, 2, 1, 1),
       (3, 2, 1, 0),
       (1, 3, 1, 0),
       (2, 3, 1, 2),
       (3, 3, 1, 0),
       (1, 4, 1, 1),
       (2, 4, 1, 0),
       (3, 4, 1, 2);
