CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "name" varchar NOT NULL,
  "business_name" varchar,
  "phone_no" varchar NOT NULL,
  "phone_to_text" varchar,
  "website" varchar,
  "facebook" varchar,
  "instagram" varchar,
  "yelp" varchar,
  "street" varchar NOT NULL,
  "city" varchar NOT NULL,
  "zip_code" integer NOT NULL,
  "state" varchar NOT NULL,
  "county" varchar NOT NULL
);

