truncate table poll_options CASCADE;
ALTER SEQUENCE poll_options_id_seq RESTART WITH 1;
INSERT INTO poll_options (poll_id, title, description)
VALUES (1, 'option 1', 'desc for option 1'),
       (1, 'option 2', ''),
       (1, 'option 3', 'desc for option 3'),
       (1, 'option 4', 'desc for option 4'),
       (1, 'option 5', 'desc for option 5');
