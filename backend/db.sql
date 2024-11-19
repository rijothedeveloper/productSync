CREATE TABLE users (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "userName" varchar NOT NULL UNIQUE,
  "email" varchar NOT NULL,
  "business_name" varchar,
  "phone" varchar NOT NULL,
  "password" varchar NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO users (name, "userName", email, business_name, phone, password)
-- VALUES ('rijo', 'rijo7', 'rijo7@gmail.com', null, '5103860112', 'pass')

