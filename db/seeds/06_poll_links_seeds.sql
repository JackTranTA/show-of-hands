truncate table poll_links CASCADE;
ALTER SEQUENCE poll_links_id_seq RESTART WITH 1;
INSERT INTO poll_links (poll_id, type, url, identifier)
VALUES (1, 'admin', 'http://localhost:8080/links/admin', 'admin'),
       (1, 'voter', 'http://localhost:8080/links/voter', 'voter');
