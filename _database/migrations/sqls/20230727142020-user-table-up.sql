CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY NOT NULL,
    username varchar(25) NOT NULL,
    first_name varchar(50),
    last_name varchar(50),
    "password" varchar NOT NULL,
    CONSTRAINT uk_username UNIQUE (username)
);
