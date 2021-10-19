---
title: Terminology
order: 1000
---

| Term                              | Definition                                                                                                                                                                                                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary Key                       | When relating information between multiple tables this is a special attribute of the column that says that it uniquely identifies the row and also cannot repeat.                                                                                           |
| SERIAL                            | Databases provide their own way of supplying a unique value for each row in the database. (e.g. CREATE TABLE "Movies" ("Id" SERIAL PRIMARY KEY);)                                                                                                           |
| Entity Relationship Diagram (ERD) | The diagrams used when describing our database because it is often useful to have a visualization of the                                                                                                                                                    |
| structure.                        |
| Foreign Key                       | Used to indicate that the current table is related to another table. (e.g. ALTER TABLE "Movies" ADD COLUMN "RatingId" INTEGER NULL REFERENCES "Ratings" ("Id");)                                                                                            |
| JOIN                              | Linking two tables from our database together through the use of a Foreign Key, then through that link we are able to get information from both tables in one query. (e.g. SELECT \* FROM "Movies" JOIN "Ratings" ON "Movies"."RatingId" = "Ratings"."Id";) |
| One to Many Relationship          | Each row of data in one table is linked to one or more rows in the second table. It is the most common type of relationship. A one-to-many relationship happens when the primary key of one table becomes foreign keys in another table.                    |
| Many to Many Relationship         | Occurs when multiple records in one table are associated with multiple records in another table.                                                                                                                                                            |
| join table                        | A table used to store the two relationships in a many-to-many relationship. In this table, we will place two foreign keys, one to the left and the other to the right. We attempt to name this table based on the relationship between the two tables.      |
