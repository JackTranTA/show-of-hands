truncate table poll_selections CASCADE;
ALTER SEQUENCE poll_selections_id_seq RESTART WITH 1;
INSERT INTO poll_selections (poll_option_id, voter_id, score)
VALUES (1, 1, 2),
       (2, 1, 1),
       (3, 1, 0),
       (1, 2, 0),
       (2, 2, 2),
       (3, 2, 0),
       (1, 3, 1),
       (2, 3, 0),
       (3, 3, 2);
