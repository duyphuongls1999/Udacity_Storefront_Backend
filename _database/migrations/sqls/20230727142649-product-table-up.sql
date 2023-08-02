CREATE TABLE IF NOT EXISTS product(
    id SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    price NUMERIC NOT NULL,
    category VARCHAR(50),
    "description" TEXT
);