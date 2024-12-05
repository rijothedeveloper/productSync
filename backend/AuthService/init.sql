-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Users_id_seq";

-- Table Definition
CREATE TABLE "Users" (
    "id" int4 NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    "email" text NOT NULL UNIQUE,
    "userName" text NOT NULL UNIQUE,
    "name" text,
    "phone" text,
    "password" text NOT NULL,
    "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "busines_name" text,
    PRIMARY KEY ("id")
);


-- INSERT INTO users (name, "userName", email, business_name, phone, password)
-- VALUES ('rijo', 'rijo7', 'rijo7@gmail.com', null, '5103860112', 'pass')

