CREATE TABLE "users" ("id" serial NOT NULL, "first_name" varchar, "last_name" varchar, "email" varchar);
CREATE TABLE "addresses" ("id" serial NOT NULL, "user_id" integer, "street" varchar, "city" varchar, "state" varchar, "zip" integer);
CREATE TABLE "items" ("id" serial NOT NULL, "title" varchar, "category" varchar, "description" text, "price" integer);
CREATE TABLE "orders" ("id" serial NOT NULL, "user_id" integer, "item_id" integer, "quantity" integer);
