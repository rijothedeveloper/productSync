CREATE TABLE users (
  "id" SERIAL PRIMARY KEY,
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

-- INSERT INTO users (name, business_name, phone_no, phone_to_text, website, facebook, instagram, yelp, street, city, zip_code, "state", county)
-- VALUES ('rijo', null, '5103860112', null, null, null, null, null,'570 w tramonto dr', 'tracy', '95391','california','USA')

