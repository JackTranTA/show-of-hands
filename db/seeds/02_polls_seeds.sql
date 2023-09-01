truncate table polls CASCADE;
ALTER SEQUENCE polls_id_seq RESTART WITH 1;
INSERT INTO polls (admin_id, title, description, created_at, admin_identifier, voter_identifier)
VALUES (1, 'sample poll', 'sample poll description', now(), 'admin', 'voter');
