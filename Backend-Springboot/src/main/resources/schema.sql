CREATE TABLE IF NOT EXISTS app_init_flag (
    id INT PRIMARY KEY,
    initialized BOOLEAN NOT NULL
);

INSERT INTO app_init_flag (id, initialized) VALUES (1, false);