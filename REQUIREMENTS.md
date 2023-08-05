# Storefront Backend Requirements

## API Endpoints

#### Authentication
- Register (POST `/auth/register`)
- Login (POST `/auth/login`)

#### Product
- Index [token required] (GET `/product` )
- Show [token required] (GET `/product/:id`)
- Create [token required] (POST `/product`)
- Update [token required] (PUT `/product/:id`)
- Delete [token required] (DELETE `/product/:id`)

#### User
- Index [token required] (GET `/user`)
- Show [token required] (GET `/user/:id`)
- Show [token required] (GET `/user/username/:username`)
- Update [token required] (PUT `/user/:id`)
- Delete [token required] (DELETE `/user/:id`)

#### Order
- Index [token required] (GET `/order`)
- Show [token required] (GET `/order/:id`)
- Create [token required] (POST `/order`)
- Update [token required] (PUT `/order/:id`)
- Delete [token required] (DELETE `/order/:id`)

## Data Shapes

#### User
The table includes the following fields:
- id
- username
- first_name
- last_name
- password
The SQL schema for this table is as follows:
```sql
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY NOT NULL,
    username varchar(25) NOT NULL,
    first_name varchar(50),
    last_name varchar(50),
    "password" varchar NOT NULL,
    CONSTRAINT uk_username UNIQUE (username)
);

```

#### Product
The table includes the following fields: 
- id
- name
- price
- category
- description
The SQL schema for this table is as follows: 
```sql
CREATE TABLE IF NOT EXISTS product(
    id SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    price NUMERIC NOT NULL,
    category VARCHAR(50),
    "description" TEXT
);
```

#### Order
The table includes the following fields:
- id
- user_id
- product_id
- quantity
- status
The SQL schema for this table is as follows:
```sql
CREATE TABLE IF NOT EXISTS "order" (
    id SERIAL PRIMARY KEY  NOT NULL,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    "status" VARCHAR(50) NOT NULL,

    FOREIGN KEY (product_id) REFERENCES "product"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

## Testing

You should write unit tests for the following database actions:

- Register a user
- Login

- Getting a user by ID
- Getting a user by username
- Getting all users
- Updating a user by ID
- Deleting a user by ID

- Creating a product
- Getting a product by ID
- Getting all products
- Updating a product by ID
- Deleting a product by ID

- Creating an order
- Getting an order by ID
- Getting all orders
- Updating an order by ID
- Deleting an order by ID

You should also write endpoint tests for all the API endpoints mentioned above.

## Environment Variables

You should use `dotenv` to create environment variables. Please make sure to include the `.env` file in the `.gitignore` file to secure your database access information.