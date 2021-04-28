---
title: Introduction to joins
assignments:
  - sql-joins
---

## Relational Databases and Data Normalization

In this topic we are going to develop a database to keep information about
movies. Along the way we will need to track information about the movie that
isn't singular information. With a single table we store information in columns
that is singular. We also want to avoid repeating information. For instance, the
movie's title is a single piece of information while the list of actors in the
cast are multiple pieces of information. Similarly, the `rating` (G, PG, etc)
would be repeated information per row. We will learn how to create `relations`
to store this information in separate tables and _join_ / _relate_ it back to
the movies.

### Creating our database

```shell
createdb SuncoastMovies
```

This is the database we will use for the rest of this discussion.

```shell
pgcli SuncoastMovies
```

### Primary Keys

Since we will be relating information between multiple tables we need a way to
uniquely identify a row of data in a table. This is known as the table's
`PRIMARY KEY` and is a special attribute of the column that says that it
uniquely identifies the row and also cannot repeat.

You might have an existing column that you feel uniquely identify the row. For
instance, you might think that the movie's title would uniquely identify the
movie. However, we know that sometimes a movie's title changes during the
production, or even uses the name of a movie that has existed in the past. So if
we used the title to uniquely identify it we would run into many issues.

Fortunately databases provide their own way of supplying a unique value for each
row in the database. We call this `SERIAL` column.

So when creating our Movie table we will use this schema:

```sql
CREATE TABLE "Movies" (
  "Id"               SERIAL PRIMARY KEY,
  "Title"            TEXT NOT NULL,
  "PrimaryDirector"  TEXT,
  "YearReleased"     INT,
  "Genre"            TEXT
);
```

We now have a column `Id` that the database will ensure is unique and identifies
the row (`PRIMARY KEY`) and is automatically generated sequentially by the
database (`SERIAL`)

#### Lets add some movies to our database:

```sql
INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('The Lost World', 'Steven Spielberg', 1997, 'sci-fi');

INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('Pirates of the Caribbean: The Curse of the Black Pearl', 'Gore Verbinski', 2003, 'fantasy');

INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('Harry Potter and Goblet of Fire', 'Mike Newell', 2005, 'fantasy');

INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('The Hobbit: An Unexpected Journey', 'Peter Jackson', 2012, 'fantasy');

INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('The Hobbit: The Desolation of Smaug', 'Peter Jackson', 2013, 'fantasy');

INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('The Hobbit: The Battle of the Five Armies', 'Peter Jackson', 2014, 'fantasy');

INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('The Lord of the Rings: The Return of the King', 'Peter Jackson', 2003, 'fantasy');

INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('The Lord of the Rings: The Fellowship of the Ring', 'Peter Jackson', 2001, 'fantasy');

INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('The Lord of the Rings: The Two Towers', 'Peter Jackson', 2002, 'fantasy');

INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('Hitchhikers Guide to the Galaxy', 'Garth Jennings', 2005, 'sci-fi');

INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('Cujo', 'Lewis Teague', 1983, 'horror');

INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('It', 'Andrés Muschietti', 2017, 'horror');

INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('It', 'Tommy Lee Wallace', 1990, 'horror');

INSERT INTO "Movies" ("Title",  "PrimaryDirector", "YearReleased", "Genre")
VALUES ('Howls Moving Castle', 'Hayao Miyazaki', 2005, 'fantasy');
```

### Foreign Keys

In order to keep track of the rating for any given movie we will add a single
table, named `Ratings` that will store the name of the rating. Since we also
want to uniquely identify the ratings, we'll ensure this table also has a serial
primary key.

```sql
CREATE TABLE "Ratings" (
  "Id" SERIAL PRIMARY KEY,
  "Description" TEXT
);
```

#### Lets insert some ratings:

```sql
INSERT INTO "Ratings" ("Description") VALUES ('G');
INSERT INTO "Ratings" ("Description") VALUES ('PG');
INSERT INTO "Ratings" ("Description") VALUES ('PG-13');
INSERT INTO "Ratings" ("Description") VALUES ('R');
```

Lets also add a table to keep information about our actors. For this table we
want to know the full name of the actor and their birthday. We'll also create an
`id` that is a `PRIMARY KEY` and is `SERIAL`

```sql
CREATE TABLE "Actors" (
  "Id"       SERIAL PRIMARY KEY,
  "FullName" TEXT NOT NULL,
  "Birthday" DATE
);
```

#### Lets also insert some actors

```sql
INSERT INTO "Actors" ("FullName", "Birthday")
VALUES ('Orlando Bloom', '1977-01-13');

INSERT INTO "Actors" ("FullName", "Birthday")
VALUES ('Warwick Davis', '1970-02-03');

INSERT INTO "Actors" ("FullName", "Birthday")
VALUES ('Martin Freeman', '1971-09-08');
```

So now we have a way to identify each movie, rating, and actor. Next we will
talk about how to relate the three sets of information together.

### One to Many

When we have a relationship such as the ratings for a movie, we say that this is
a "One to Many" relationship. That is, a movie has one rating (e.g. the movie
_Bambi_ is rated _G_), but a rating applies to many movies (e.g. there are many
movies with a _G_ rating)

When describing our database it is often usual to have a visualization of the
structure. These diagrams are called _Entity Relationship Diagrams_, or `ERD`s

The ERD of our movies and ratings looks likes the following. (_NOTE_ We'll add
in the actors soon...)

```
+----------------------------+         +-----------------------+
|         Movies             |         |       Ratings         |
|                            |         |                       |
| Id                  SERIAL |         |                       |
| Title               TEXT   |         |   Id          SERIAL  |
| PrimaryDirector     TEXT   |         |   Description TEXT    |
| YearReleased        INT    |         |                       |
| Genre               TEXT   |         +-----------------------+
+----------------------------+
```

Lets add a new column to our `Movies` to indicate _WHICH_ rating is associated
to each row representing a movie.

The column we are adding is a `RatingId` that is an integer since this is the
same data type as a `SERIAL` which we are going to relate to. The `NULL`
indicates that we are allowed to have no value and the value to place in the
column when no data is present is `NULL`. Next we indicate that this is a
foreign key (we are _relating_ this table) to the `Ratings` table. We also
specify the column in the other table, in this case `Id` in `Ratings`, we mean
to match.

```sql
ALTER TABLE "Movies" ADD COLUMN "RatingId" INTEGER NULL REFERENCES "Ratings" ("Id");
```

Now our ERD looks like this. The `RatingId` from `Movies` _links_ (_joins_) us
to the `Ratings` table

```
+----------------------------+                  +-----------------------+
|         Movies             |                  |       Ratings         |
|                            |                  |                       |
| Id                  SERIAL |        +--------->   Id           SERIAL |
| Title               TEXT   |        |     one |   Description  TEXT   |
| PrimaryDirector     TEXT   |        |         |                       |
| YearReleased        INT    |        |         |                       |
| Genre               TEXT   | many   |         +-----------------------+
| RatingId            INT    <--------+
|                            |
+----------------------------+
```

Now we can specify the `RatingId` associated to each movie when we insert the
movie.

```sql
UPDATE "Movies" SET "RatingId" = 2 WHERE "Id" in (10);
UPDATE "Movies" SET "RatingId" = 3 WHERE "Id" in (1, 2, 3, 4, 5, 6, 7, 8,9 );
UPDATE "Movies" SET "RatingId" = 4 WHERE "Id" in (11, 12, 13 );
```

### Joining tables

So now that we have these two tables, how do we _join_ them together so that we
can retrieve information about movies and their ratings or get information about
a rating and the associated movies.

#### Query movies and also get their rating

```sql
SELECT *
FROM "Movies"
JOIN "Ratings" ON "Movies"."RatingId" = "Ratings"."Id";
```

```
+------+--------------------------------------------------------+-------------------+----------------+---------+------------+------+---------------+
| Id   | Title                                                  | PrimaryDirector   | YearReleased   | Genre   | RatingId   | Id   | Description   |
|------+--------------------------------------------------------+-------------------+----------------+---------+------------+------+---------------|
| 10   | Hitchhikers Guide to the Galaxy                        | Garth Jennings    | 2005           | sci-fi  | 2          | 2    | PG            |
| 1    | The Lost World                                         | Steven Spielberg  | 1997           | sci-fi  | 3          | 3    | PG-13         |
| 2    | Pirates of the Caribbean: The Curse of the Black Pearl | Gore Verbinski    | 2003           | fantasy | 3          | 3    | PG-13         |
| 3    | Harry Potter and Goblet of Fire                        | Mike Newell       | 2005           | fantasy | 3          | 3    | PG-13         |
| 4    | The Hobbit: An Unexpected Journey                      | Peter Jackson     | 2012           | fantasy | 3          | 3    | PG-13         |
| 5    | The Hobbit: The Desolation of Smaug                    | Peter Jackson     | 2013           | fantasy | 3          | 3    | PG-13         |
| 6    | The Hobbit: The Battle of the Five Armies              | Peter Jackson     | 2014           | fantasy | 3          | 3    | PG-13         |
| 7    | The Lord of the Rings: The Return of the King          | Peter Jackson     | 2003           | fantasy | 3          | 3    | PG-13         |
| 8    | The Lord of the Rings: The Fellowship of the Ring      | Peter Jackson     | 2001           | fantasy | 3          | 3    | PG-13         |
| 9    | The Lord of the Rings: The Two Towers                  | Peter Jackson     | 2002           | fantasy | 3          | 3    | PG-13         |
| 11   | Cujo                                                   | Lewis Teague      | 1983           | horror  | 4          | 4    | R             |
| 12   | It                                                     | Andrés Muschietti | 2017           | horror  | 4          | 4    | R             |
| 13   | It                                                     | Tommy Lee Wallace | 1990           | horror  | 4          | 4    | R             |
+------+--------------------------------------------------------+-------------------+----------------+---------+------------+------+---------------+
SELECT 3
```

This query will give us movies and their ratings, but only for movies that have
a `RatingId` that matches an `Id` from the ratings table. That is, any `movie`
with a `null` value for `RatingId` (or a value that doesn't match an `id`) will
not be in the results.

This default kind of join is called an `INNER JOIN` and can be seen in the
diagram below

![](https://i.stack.imgur.com/VQ5XP.png)

See this
[blog post](https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/)
for a more detailed description of the various joins.

If we want to see _ALL_ the `movies` and include the `ratings` table information
when there is a match we modify the query to use `LEFT JOIN`

#### Query for all movies that are "R", adding a WHERE clause

We can still add a `WHERE` clause when using a `JOIN` but now we specify the
table and column we want to filter by. We do this since we have more than one
table involved.

```sql
SELECT *
FROM "Movies"
JOIN "Ratings" ON "Movies"."RatingId" = "Ratings"."Id";
WHERE "Ratings"."Description" = 'R'
```

```
+------+--------------------------------------------------------+-------------------+----------------+---------+------------+------+---------------+
| Id   | Title                                                  | PrimaryDirector   | YearReleased   | Genre   | RatingId   | Id   | Description   |
|------+--------------------------------------------------------+-------------------+----------------+---------+------------+------+---------------|
| 11   | Cujo                                                   | Lewis Teague      | 1983           | horror  | 4          | 4    | R             |
| 12   | It                                                     | Andrés Muschietti | 2017           | horror  | 4          | 4    | R             |
| 13   | It                                                     | Tommy Lee Wallace | 1990           | horror  | 4          | 4    | R             |
+------+--------------------------------------------------------+-------------------+----------------+---------+------------+------+---------------+
```

#### Query all the movies and include ratings when possible

```sql
SELECT *
FROM "Movies"
LEFT JOIN "Ratings" ON "Movies"."RatingId" = "Ratings"."Id";
```

```
+------+--------------------------------------------------------+-------------------+----------------+---------+------------+--------+---------------+
| Id   | Title                                                  | PrimaryDirector   | YearReleased   | Genre   | RatingId   | Id     | Description   |
|------+--------------------------------------------------------+-------------------+----------------+---------+------------+--------+---------------|
| 14   | Howls Moving Castle                                    | Hayao Miyazaki    | 2005           | fantasy | <null>     | <null> | <null>        |
| 10   | Hitchhikers Guide to the Galaxy                        | Garth Jennings    | 2005           | sci-fi  | 2          | 2      | PG            |
| 1    | The Lost World                                         | Steven Spielberg  | 1997           | sci-fi  | 3          | 3      | PG-13         |
| 2    | Pirates of the Caribbean: The Curse of the Black Pearl | Gore Verbinski    | 2003           | fantasy | 3          | 3      | PG-13         |
| 3    | Harry Potter and Goblet of Fire                        | Mike Newell       | 2005           | fantasy | 3          | 3      | PG-13         |
| 4    | The Hobbit: An Unexpected Journey                      | Peter Jackson     | 2012           | fantasy | 3          | 3      | PG-13         |
| 5    | The Hobbit: The Desolation of Smaug                    | Peter Jackson     | 2013           | fantasy | 3          | 3      | PG-13         |
| 6    | The Hobbit: The Battle of the Five Armies              | Peter Jackson     | 2014           | fantasy | 3          | 3      | PG-13         |
| 7    | The Lord of the Rings: The Return of the King          | Peter Jackson     | 2003           | fantasy | 3          | 3      | PG-13         |
| 8    | The Lord of the Rings: The Fellowship of the Ring      | Peter Jackson     | 2001           | fantasy | 3          | 3      | PG-13         |
| 9    | The Lord of the Rings: The Two Towers                  | Peter Jackson     | 2002           | fantasy | 3          | 3      | PG-13         |
| 11   | Cujo                                                   | Lewis Teague      | 1983           | horror  | 4          | 4      | R             |
| 12   | It                                                     | Andrés Muschietti | 2017           | horror  | 4          | 4      | R             |
| 13   | It                                                     | Tommy Lee Wallace | 1990           | horror  | 4          | 4      | R             |
+------+--------------------------------------------------------+-------------------+----------------+---------+------------+--------+---------------++
```

The _left join_ indicates that we want everything from the left table, in this
case `movies`, and matches from the `ratings` table. For `movies` that have no
matching `ratings` row the information will be `null`

### Many to Many

For the list of actors in the cast we might say "A movie has many cast members"
but also "A cast member has appeared in many movies." In this case we need to
relate these two tables in a different way.

The ERD of this looks like:

```
+--------------------------------+           +---------------------------+
|            Movies              |           |         Ratings           |
|                                |           |                           |
|    Id                  SERIAL  |           |     Id          SERIAL    |
|    Title               TEXT    |many    one|     Description TEXT      |
|    PrimaryDirector     TEXT    +-----------+                           |
|    YearReleased        INT     |           +---------------------------+
|    Genre               TEXT    |
|    RatingId            INT     |
|                                |
+------------+-------------------+
             |
             | many
             |
             |
             |                   +-------------------------+
             |                   |        ACTORS           |
             |                   |                         |
             |              many |    Id          SERIAL   |
             +-------------------+    FullName    TEXT     |
                                 |    Birthday    DATE     |
                                 |                         |
                                 +-------------------------+
```

In the case of a _many-to-many_ relationship we cannot place the foreign keys on
either of the tables. In this case we need a third table, commonly referred to
as a _join table_ to store the relationships. In this table, we will place two
foreign keys, one to the left (movies) and the other to the right (to the
actor.) We attempt to name this table based on the relationship between the two
tables.

In this case we are trying to represent the relationship between a movie and the
actors. We could call this relationship `Roles`

```sql
CREATE TABLE "Roles" (
  "Id"       SERIAL PRIMARY KEY,
  "MovieId"  INTEGER REFERENCES "Movies" ("Id"),
  "ActorId"  INTEGER REFERENCES "Actors" ("Id")
);
```

```
+--------------------------------+           +---------------------------+
|            Movies              |           |         Ratings           |
|                                |           |                           |
|    Id                  SERIAL  |           |     Id           SERIAL   |
|    Title               TEXT    | many  one |     Description  TEXT     |
|    PrimaryDirector     TEXT    <----------->                           |
|    YearReleased        INT     |           +---------------------------+
|    Genre               TEXT    |
|    RatingId            INT     |
|                                |
+-------------^------------------+
              | one
              |
              |
              |
              |
              | many
      +-------v---------------+               +-------------------------+
      |        Roles          |               |          Actors         |
      |                       | many      one |                         |
      |   Id       SERIAL     <--------------->    Id          SERIAL   |
      |   MovieId  INT        |               |    FullName    TEXT     |
      |   RatingId INT        |               |    Birthday    DATE     |
      |                       |               |                         |
      +-----------------------+               +-------------------------+

```

_Create cast membership for Orlando Bloom in Pirates & LOTR. The three LOTR
movies are `id` 7, 8 and 9. The Pirates movie is `id` 2. Orlando Bloom's id is
1_

_NOTE_: In the queries below, `--` is a SQL comments (like a JavaScript `//`)

```sql
-- The movie "Pirates of the Caribbean: The Curse of the Black Pearl" had the actor "Orlando Bloom"
INSERT INTO "Roles" ("MovieId", "ActorId") VALUES (2,1);

-- The movie "The Lord of the Rings: The Return of the King" had the actor "Orlando Bloom"
INSERT INTO "Roles" ("MovieId", "ActorId") VALUES (7,1);

-- The movie "The Lord of the Rings: The Fellowship of the Ring" had the actor "Orlando Bloom"
INSERT INTO "Roles" ("MovieId", "ActorId") VALUES (8,1);

-- The movie "The Lord of the Rings: The Two Towers" had the actor "Orlando Bloom"
INSERT INTO "Roles" ("MovieId", "ActorId") VALUES (9,1);
```

_Create cast membership for Warwick Davis in Harry Potter and Hitchhikers. Harry
Potter's movie `id` is 3, and Warwick's actor `id` is 2_

```sql
-- The movie "Harry Potter and Goblet of Fire" had the actor "Warwick Davis"
INSERT INTO "Roles" ("MovieId", "ActorId") VALUES (3,2);

-- The movie "Hitchhikers Guide to the Galaxy" had the actor "Warwick Davis"
INSERT INTO "Roles" ("MovieId", "ActorId") VALUES (10,2);
```

_Create cast membership for Martin Freeman (`actor` `id` is 3) in the Hobbit
(`movie` `ids` are 4, 5, and 6) & Hitchhikers (`movie` `id` 10)_

```sql
-- The movie "The Hobbit: An Unexpected Journey" had the actor Martin Freeman
INSERT INTO "Roles" ("MovieId", "ActorId") VALUES (4,3);

-- The movie "The Hobbit: The Desolation of Smaug" had the actor Martin Freeman
INSERT INTO "Roles" ("MovieId", "ActorId") VALUES (5,3);

-- The movie "The Hobbit: The Battle of the Five Armies" had the actor Martin Freeman
INSERT INTO "Roles" ("MovieId", "ActorId") VALUES (6,3);

-- The movie "Hitchhikers Guide to the Galaxy" had the actor Martin Freeman
INSERT INTO "Roles" ("MovieId", "ActorId") VALUES (10,3);
```

### Query for the casts and actors

In order to tie `Movies` to `Actors` we need to join the movies first to the
`Roles` and then join the `Roles` to the actors. Since the `Roles` table has
relations to each of these tables, it acts as the link in the chain between the
two tables.

Notice for the `actors` entry Orlando Bloom there are multiple entries in
`roles` since he has appeared in several of our `movies`

```sql
SELECT "Movies"."Title", "Actors"."FullName"
FROM "Movies"
JOIN "Roles" ON "Roles"."MovieId" = "Movies"."Id"
JOIN "Actors" on "Actors"."Id" = "Roles"."ActorId";
```

```
+--------------------------------------------------------+----------------+
| Title                                                  | FullName       |
|--------------------------------------------------------+----------------|
| Pirates of the Caribbean: The Curse of the Black Pearl | Orlando Bloom  |
| The Lord of the Rings: The Return of the King          | Orlando Bloom  |
| The Lord of the Rings: The Fellowship of the Ring      | Orlando Bloom  |
| The Lord of the Rings: The Two Towers                  | Orlando Bloom  |
| Harry Potter and Goblet of Fire                        | Warwick Davis  |
| Hitchhikers Guide to the Galaxy                        | Warwick Davis  |
| The Hobbit: An Unexpected Journey                      | Martin Freeman |
| The Hobbit: The Desolation of Smaug                    | Martin Freeman |
| The Hobbit: The Battle of the Five Armies              | Martin Freeman |
| Hitchhikers Guide to the Galaxy                        | Martin Freeman |
+--------------------------------------------------------+----------------+
```

### Adding information to the join table.

What if we wanted to capture the name of the character the actor played? Where
would we put that attribute (column). It can't go on the `Movies` table since it
isn't distinct to a movie. It can't go on the `Actors` table since it isn't
unique to that either. The correct place here is to place that column on the
`Roles` table.

Let's call this new column `CharacterName` and add it to the `Roles` table.

```sql
ALTER TABLE "Roles" ADD COLUMN "CharacterName" TEXT NULL;
```

Now that we have done that, we can add in a few character names. In order to
know what rows to update, lets add the `Roles.Id` to our query above.

```sql
SELECT "Roles"."Id", "Movies"."Title", "Actors"."FullName", "Roles"."CharacterName"
FROM "Movies"
JOIN "Roles" ON "Roles"."MovieId" = "Movies"."Id"
JOIN "Actors" on "Actors"."Id" = "Roles"."ActorId";
```

```
+------+--------------------------------------------------------+----------------+-----------------+
| Id   | Title                                                  | FullName       | CharacterName   |
|------+--------------------------------------------------------+----------------+-----------------|
| 1    | Pirates of the Caribbean: The Curse of the Black Pearl | Orlando Bloom  | <null>          |
| 2    | The Lord of the Rings: The Return of the King          | Orlando Bloom  | <null>          |
| 3    | The Lord of the Rings: The Fellowship of the Ring      | Orlando Bloom  | <null>          |
| 4    | The Lord of the Rings: The Two Towers                  | Orlando Bloom  | <null>          |
| 5    | Harry Potter and Goblet of Fire                        | Warwick Davis  | <null>          |
| 6    | Hitchhikers Guide to the Galaxy                        | Warwick Davis  | <null>          |
| 7    | The Hobbit: An Unexpected Journey                      | Martin Freeman | <null>          |
| 8    | The Hobbit: The Desolation of Smaug                    | Martin Freeman | <null>          |
| 9    | The Hobbit: The Battle of the Five Armies              | Martin Freeman | <null>          |
| 10   | Hitchhikers Guide to the Galaxy                        | Martin Freeman | <null>          |
+------+--------------------------------------------------------+----------------+-----------------+
```

Now lets update the roles for all of our actors

```sql
-- Orlando Bloom played Will Turner in Pirates (ID 1)
UPDATE "Roles" set "CharacterName" = 'Will Turner' where "Id" in (1);

-- Orlando Bloom played Legolas in the Lord of the Rings movies
UPDATE "Roles" set "CharacterName" = 'Legolas' where "Id" in (2,3,4);

-- Warwick Davis played Filius Flitwick in Harry Potter (5)
UPDATE "Roles" set "CharacterName" = 'Filius Flitwick' where "Id" = 5;

-- Warwick Davis played Marvin in Hitchhikers (6)
UPDATE "Roles" set "CharacterName" = 'Marvin' where "Id" = 6;

-- Martin Freeman played Bilbo in all three Hobbit movies (IDs 7, 8, and 9)
UPDATE "Roles" set "CharacterName" = 'Bilbo' where "Id" IN (7,8,9);

-- Martin Freeman played Arthur Dent in Hitchhikers Guide to the Galaxy (role ID 10)
UPDATE "Roles" set "CharacterName" = 'Arthur Dent' where "Id" = 10;
```

Let's see what our query looks like now:

```
+------+--------------------------------------------------------+----------------+-----------------+
| Id   | Title                                                  | FullName       | CharacterName   |
|------+--------------------------------------------------------+----------------+-----------------|
| 1    | Pirates of the Caribbean: The Curse of the Black Pearl | Orlando Bloom  | Will Turner     |
| 2    | The Lord of the Rings: The Return of the King          | Orlando Bloom  | Legolas         |
| 3    | The Lord of the Rings: The Fellowship of the Ring      | Orlando Bloom  | Legolas         |
| 4    | The Lord of the Rings: The Two Towers                  | Orlando Bloom  | Legolas         |
| 5    | Harry Potter and Goblet of Fire                        | Warwick Davis  | Filius Flitwick |
| 6    | Hitchhikers Guide to the Galaxy                        | Warwick Davis  | Marvin          |
| 7    | The Hobbit: An Unexpected Journey                      | Martin Freeman | Bilbo           |
| 8    | The Hobbit: The Desolation of Smaug                    | Martin Freeman | Bilbo           |
| 9    | The Hobbit: The Battle of the Five Armies              | Martin Freeman | Bilbo           |
| 10   | Hitchhikers Guide to the Galaxy                        | Martin Freeman | Arthur Dent     |
+------+--------------------------------------------------------+----------------+-----------------++
```

### Resources

- [pgcli/psql CheatSheet](https://tomcam.github.io/postgres/)
- [SQL Joins Explained](http://www.sql-join.com)
