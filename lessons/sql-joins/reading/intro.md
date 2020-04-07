import CodePen from '@handbook/CodePen'

# Introduction to joins

## Relational Databases and Data Normalization

In this topic we are going to develop a database to keep information about movies. Along the way we will need to track information about the movie that isn't singular information. With a single table we store information in columns that is singular. We also want to avoid repeating information. For instance, the movie's title is a single piece of information while the list of actors in the cast are multiple pieces of information. Similarly, the `rating` (G, PG, etc) would be repeated information per row. We will learn how to create `relations` to store this information in separate tables and _join_ / _relate_ it back to the movies.

### Creating our database

```sh
createdb suncoast_movies
```

This is the database we will use for the rest of this discussion.

```sh
pgcli suncoast_movies
```

### Primary Keys

Since we will be relating information between multiple tables we need a way to uniquely identify a row of data in a table. This is known as the table's `PRIMARY KEY` and is a special attribute of the column that says that it uniquely identifies the row and also cannot repeat.

You might have an existing column that you feel uniquely identify the row. For instance, you might think that the movie's title would uniquely identify the movie. However, we know that sometimes a movie's title changes during the production, or even uses the name of a movie that has existed in the past. So if we used the title to uniquely identify it we would run into many issues.

Fortunately databases provide their own way of supplying a unique value for each row in the database. We call this `SERIAL` column.

So when creating our Movie table we will use this schema:

```sql
CREATE TABLE movies (
  id               SERIAL PRIMARY KEY,
  title            TEXT NOT NULL,
  primary_director TEXT,
  year_released    INT,
  genre            TEXT
);
```

We now have a column `id` that the database will ensure is unique and identifies the row (`PRIMARY KEY`) and is automatically generated sequentially by the database (`SERIAL`)

#### Lets add some movies to our database:

```sql
INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('The Lost World', 'Steven Spielberg', 1997, 'sci-fi');

INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('Pirates of the Caribbean: The Curse of the Black Pearl', 'Gore Verbinski', 2003, 'fantasy');

INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('Harry Potter and Goblet of Fire', 'Mike Newell', 2005, 'fantasy');

INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('The Hobbit: An Unexpected Journey', 'Peter Jackson', 2012, 'fantasy');

INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('The Hobbit: The Desolation of Smaug', 'Peter Jackson', 2013, 'fantasy');

INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('The Hobbit: The Battle of the Five Armies', 'Peter Jackson', 2014, 'fantasy');

INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('The Lord of the Rings: The Return of the King', 'Peter Jackson', 2003, 'fantasy');

INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('The Lord of the Rings: The Fellowship of the Ring', 'Peter Jackson', 2001, 'fantasy');

INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('The Lord of the Rings: The Two Towers', 'Peter Jackson', 2002, 'fantasy');

INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('Hitchhikers Guide to the Galaxy', 'Garth Jennings', 2005, 'sci-fi');

INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('Cujo', 'Lewis Teague', 1983, 'horror');

INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('It', 'Andrés Muschietti', 2017, 'horror');

INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('It', 'Tommy Lee Wallace', 1990, 'horror');

INSERT INTO movies (title,  primary_director, year_released, genre)
VALUES ('Howls Moving Castle', 'Hayao Miyazaki', 2005, 'fantasy');
```

### Foreign Keys

In order to keep track of the rating for any given movie we will add a single table, named `ratings` that will store the name of the rating. Since we also want to uniquely identify the ratings, we'll ensure this table also has a serial primary key.

```sql
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  rating TEXT
);
```

#### Lets insert some ratings:

```sql
INSERT INTO ratings (rating) VALUES ('G');
INSERT INTO ratings (rating) VALUES ('PG');
INSERT INTO ratings (rating) VALUES ('PG-13');
INSERT INTO ratings (rating) VALUES ('R');
```

Lets also add a table to keep information about our actors. For this table we want to know the full name of the actor and their birthday. We'll also create an `id` that is a `PRIMARY KEY` and is `SERIAL`

```sql
CREATE TABLE actors (
  id        SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  birthday  DATE
);
```

#### Lets also insert some actors

```sql
INSERT INTO actors (full_name,  birthday)
VALUES ('Orlando Bloom', '1977-01-13');

INSERT INTO actors (full_name,  birthday)
VALUES ('Warwick Davis', '1970-02-03');

INSERT INTO actors (full_name,  birthday)
VALUES ('Martin Freeman', '1971-09-08');
```

So now we have a way to identify each movie, rating, and actor. Next we will talk about how to relate the three sets of information together.

### One to Many

When we have a relationship such as the ratings for a movie, we say that this is a "One to Many" relationship. That is, a movie has one rating (e.g. the movie _Bambi_ is rated _G_), but a rating applies to many movies (e.g. there are many movies with a _G_ rating)

When describing our database it is often usual to have a visualization of the structure. These diagrams are called _Entity Relationship Diagrams_, or `ERD`s

The ERD of our movies and ratings looks likes the following. (_NOTE_ We'll add in the actors soon...)

```
+----------------------------+         +-----------------------+
|         MOVIES             |         |       RATINGS         |
|                            |         |                       |
| id                  SERIAL |         |                       |
| title               TEXT   |         |   id        SERIAL    |
| primary_director    TEXT   |         |   rating    TEXT      |
| year_released       INT    |         |                       |
| genre               TEXT   |         +-----------------------+
+----------------------------+
```

Lets add a new column to our `movies` to indicate _WHICH_ rating is associated to each row representing a movie.

The column we are adding is a `rating_id` that is an integer since this is the same data type as a `SERIAL` which we are going to relate to. The `NULL` indicates that we are allowed to have no value and the value to place in the column when no data is present is `NULL`. Next we indicate that this is a foreign key (we are _relating_ this table) to the `ratings` table. We also specify the column in the other table, in this case `id` in `ratings`, we mean to match.

```sql
ALTER TABLE movies ADD COLUMN rating_id INTEGER NULL REFERENCES ratings (id);
```

Now our ERD looks like this. The `rating_id` from `movies` _links_ (_joins_) us to the `ratings` table

```
+----------------------------+                  +-----------------------+
|         MOVIES             |                  |       RATINGS         |
|                            |                  |                       |
| id                  SERIAL |        +--------->   id        SERIAL    |
| title               TEXT   |        |     one |   rating    TEXT      |
| primary_director    TEXT   |        |         |                       |
| year_released       INT    |        |         |                       |
| genre               TEXT   | many   |         +-----------------------+
| rating_id           INT    <--------+
|                            |
+----------------------------+
```

Now we can specify the `rating_id` associated to each movie when we insert the movie.

```sql
UPDATE movies SET rating_id = 1 WHERE id in (8,9,10);
```

### Joining tables

So now that we have these two tables, how do we _join_ them together so that we can retrieve information about movies and their ratings or get information about a rating and the associated movies.

#### Query movies and also get their rating

```sql
SELECT *
FROM movies
JOIN ratings ON movies.rating_id = ratings.id;
```

```
+------+---------------------------------------------------+--------------------+-----------------+---------+-------------+------+----------+
| id   | title                                             | primary_director   | year_released   | genre   | rating_id   | id   | rating   |
|------+---------------------------------------------------+--------------------+-----------------+---------+-------------+------+----------|
| 8    | The Lord of the Rings: The Fellowship of the Ring | Peter Jackson      | 2001            | fantasy | 1           | 1    | G        |
| 9    | The Lord of the Rings: The Two Towers             | Peter Jackson      | 2002            | fantasy | 1           | 1    | G        |
| 10   | Hitchhikers Guide to the Galaxy                   | Garth Jennings     | 2005            | sci-fi  | 1           | 1    | G        |
+------+---------------------------------------------------+--------------------+-----------------+---------+-------------+------+----------+
SELECT 3
```

This query will give us movies and their ratings, but only for movies that have a `rating_id` that matches an `id` from the ratings table. That is, any `movie` with a `null` value for `rating_id` (or a value that doesn't match an `id`) will not be in the results.

This default kind of join is called an `INNER JOIN` and can be seen in the diagram below

![](https://i.stack.imgur.com/VQ5XP.png)

See this [blog post](https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/) for a more detailed description of the various joins.

If we want to see _ALL_ the `movies` and include the `ratings` table information when there is a match we modify the query to use `LEFT JOIN`

#### Query all the movies and include ratings when possible

```sql
SELECT *
FROM movies
LEFT JOIN ratings ON movies.rating_id = ratings.id;
```

```
+------+--------------------------------------------------------+--------------------+-----------------+---------+-------------+--------+----------+
| id   | title                                                  | primary_director   | year_released   | genre   | rating_id   | id     | rating   |
|------+--------------------------------------------------------+--------------------+-----------------+---------+-------------+--------+----------|
| 1    | The Lost World                                         | Steven Spielberg   | 1997            | sci-fi  | <null>      | <null> | <null>   |
| 2    | Pirates of the Caribbean: The Curse of the Black Pearl | Gore Verbinski     | 2003            | fantasy | <null>      | <null> | <null>   |
| 3    | Harry Potter and Goblet of Fire                        | Mike Newell        | 2005            | fantasy | <null>      | <null> | <null>   |
| 4    | The Hobbit: An Unexpected Journey                      | Peter Jackson      | 2012            | fantasy | <null>      | <null> | <null>   |
| 5    | The Hobbit: The Desolation of Smaug                    | Peter Jackson      | 2013            | fantasy | <null>      | <null> | <null>   |
| 6    | The Hobbit: The Battle of the Five Armies              | Peter Jackson      | 2014            | fantasy | <null>      | <null> | <null>   |
| 7    | The Lord of the Rings: The Return of the King          | Peter Jackson      | 2003            | fantasy | <null>      | <null> | <null>   |
| 11   | Cujo                                                   | Lewis Teague       | 1983            | horror  | <null>      | <null> | <null>   |
| 12   | It                                                     | Andrés Muschietti  | 2017            | horror  | <null>      | <null> | <null>   |
| 13   | It                                                     | Tommy Lee Wallace  | 1990            | horror  | <null>      | <null> | <null>   |
| 14   | Howls Moving Castle                                    | Hayao Miyazaki     | 2005            | fantasy | <null>      | <null> | <null>   |
| 8    | The Lord of the Rings: The Fellowship of the Ring      | Peter Jackson      | 2001            | fantasy | 1           | 1      | G        |
| 9    | The Lord of the Rings: The Two Towers                  | Peter Jackson      | 2002            | fantasy | 1           | 1      | G        |
| 10   | Hitchhikers Guide to the Galaxy                        | Garth Jennings     | 2005            | sci-fi  | 1           | 1      | G        |
+------+--------------------------------------------------------+--------------------+-----------------+---------+-------------+--------+----------+
```

The _left join_ indicates that we want everything from the left table, in this case `movies`, and matches from the `ratings` table. For `movies` that have no matching `ratings` row the information will be `null`

### Many to Many

For the list of actors in the cast we might say "A movie has many cast members" but also "A cast member has appeared in many movies." In this case we need to relate these two tables in a different way.

The ERD of this looks like:

```
+--------------------------------+           +---------------------------+
|            MOVIES              |           |         RATINGS           |
|                                |           |                           |
|    id                  SERIAL  |           |     id        SERIAL      |
|    title               TEXT    |many    one|     rating    TEXT        |
|    primary_director    TEXT    +-----------+                           |
|    year_released       INT     |           +---------------------------+
|    genre               TEXT    |
|                                |
+------------+-------------------+
             |
             | many
             |
             |
             |                   +-------------------------+
             |                   |        ACTORS           |
             |                   |                         |
             |              many |    id          SERIAL   |
             +-------------------+    full_name   TEXT     |
                                 |    birthday    DATE     |
                                 |                         |
                                 +-------------------------+
```

In the case of a _many-to-many_ relationship we cannot place the foreign keys on either of the tables. In this case we need a third table, commonly referred to as a _join table_ to store the relationships. In this table, we will place two foreign keys, one to the left (movies) and the other to the right (to the actor.) We attempt to name this table based on the relationship between the two tables.

In this case we are trying to represent the relationship between a movie and the actors. We could call this relationship `roles`

```sql
CREATE TABLE roles (
  id       SERIAL PRIMARY KEY,
  movie_id  INTEGER REFERENCES movies (id),
  actor_id  INTEGER REFERENCES actors (id)
);
```

```
+--------------------------------+           +---------------------------+
|            MOVIES              |           |         RATINGS           |
|                                |           |                           |
|    id                  SERIAL  |           |     id        SERIAL      |
|    title               TEXT    | many  one |     rating    TEXT        |
|    primary_director    TEXT    <----------->                           |
|    year_released       INT     |           +---------------------------+
|    genre               TEXT    |
|                                |
+-------------^------------------+
              | one
              |
              |
              |
              |
              | many
      +-------v---------------+               +-------------------------+
      |        ROLES          |               |          ACTORS         |
      |                       | many      one |                         |
      |   id       SERIAL     <--------------->    id          SERIAL   |
      |                       |               |    full_name   TEXT     |
      |                       |               |    birthday    DATE     |
      |                       |               |                         |
      +-----------------------+               +-------------------------+

```

_Create cast membership for Orlando Bloom in Pirates & LOTR. The three LOTR movies are `id` 7, 8 and 9. The Pirates movie is `id` 2. Orlando Bloom's id is 1_

_NOTE_: In the queries below, `--` is a SQL comments (like a JavaScript `//`)

```sql
-- The movie "Pirates of the Caribbean: The Curse of the Black Pearl" had the actor "Orlando Bloom"
INSERT INTO roles (movie_id, actor_id) VALUES (2,1);

-- The movie "The Lord of the Rings: The Return of the King" had the actor "Orlando Bloom"
INSERT INTO roles (movie_id, actor_id) VALUES (7,1);

-- The movie "The Lord of the Rings: The Fellowship of the Ring'" had the actor "Orlando Bloom"
INSERT INTO roles (movie_id, actor_id) VALUES (8,1);

-- The movie "The Lord of the Rings: The Two Towers" had the actor "Orlando Bloomn"
INSERT INTO roles (movie_id, actor_id) VALUES (9,1);
```

_Create cast membership for Warick Davis in Harry Potter and Hitchhikers. Harry Potter's movie `id` is 3, and Warrik's actor `id` is 2_

```sql
-- The movie "Harry Potter and Goblet of Fire" had the actor "Warwick Davis"
INSERT INTO roles (movie_id, actor_id) VALUES (3,2);

-- The movie "Hitchhikers Guide to the Galaxy" had the actor "Warwick Davis"
INSERT INTO roles (movie_id, actor_id) VALUES (10,2);
```

_Create cast membership for Martin Freeman (`actor` `id` is 3) in the Hobbit (`movie` `ids` are 4, 5, and 6) & Hitchhikers (`movie` `id` 10)_

```sql
-- The movie "The Hobbit: An Unexpected Journey" had the actor Martin Freeman
INSERT INTO roles (movie_id, actor_id) VALUES (4,3);

-- The movie "The Hobbit: The Desolation of Smaug" had the actor Martin Freeman
INSERT INTO roles (movie_id, actor_id) VALUES (5,3);

-- The movie "The Hobbit: The Battle of the Five Armies" had the actor Martin Freeman
INSERT INTO roles (movie_id, actor_id) VALUES (6,3);

-- The movie "Hitchhikers Guide to the Galaxy" had the actor Martin Freeman
INSERT INTO roles (movie_id, actor_id) VALUES (10,3);
```

### Query for the casts and actors

In order to tie `movies` to `actors` we need to join the movies first to the `roles` and then join the `roles` to the actors. Since the `roles` table has relations to each of these tables, it acts as the link in the chain between the two tables.

Notice for the `actors` entry Orlando Bloom there are _TWO_ entries in `roles` since he has appeared in two of our `movies`

```sql
SELECT movies.title, actors.full_name
FROM movies
LEFT JOIN roles ON roles.movie_id = movies.id
LEFT JOIN actors on actors.id = roles.actor_id;
```

```
+--------------------------------------------------------+----------------+
| title                                                  | full_name      |
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
| Cujo                                                   | <null>         |
| It                                                     | <null>         |
| It                                                     | <null>         |
| The Lost World                                         | <null>         |
| Howls Moving Castle                                    | <null>         |
+--------------------------------------------------------+----------------+
```

### Adding information to the join table.

What if we wanted to capture the name of the character the actor played? Where would we put that attribute (column). It can't go on the `movies` table since it isn't distinct to a movie. It can't go on the `actors` table since it isn't unique to that either. The correct place here is to place that column on the `roles` table.

Let's call this new column `character_name` and add it to the `roles` table.

```sql
ALTER TABLE roles ADD COLUMN character_name TEXT NULL;
```

Now that we have done that, we can add in a few character names. In order to know what rows to update, lets add the `roles.id` to our query above.

```sql
SELECT roles.id, movies.title, actors.full_name, roles.character_name
FROM movies
LEFT JOIN roles ON roles.movie_id = movies.id
LEFT JOIN actors on actors.id = roles.actor_id;
```

```
+--------+--------------------------------------------------------+----------------+------------------+
| id     | title                                                  | full_name      | character_name   |
|--------+--------------------------------------------------------+----------------+------------------|
| 1      | Pirates of the Caribbean: The Curse of the Black Pearl | Orlando Bloom  | <null>           |
| 2      | The Lord of the Rings: The Return of the King          | Orlando Bloom  | <null>           |
| 3      | The Lord of the Rings: The Fellowship of the Ring      | Orlando Bloom  | <null>           |
| 4      | The Lord of the Rings: The Two Towers                  | Orlando Bloom  | <null>           |
| 5      | Harry Potter and Goblet of Fire                        | Warwick Davis  | <null>           |
| 6      | Hitchhikers Guide to the Galaxy                        | Warwick Davis  | <null>           |
| 7      | The Hobbit: An Unexpected Journey                      | Martin Freeman | <null>           |
| 8      | The Hobbit: The Desolation of Smaug                    | Martin Freeman | <null>           |
| 9      | The Hobbit: The Battle of the Five Armies              | Martin Freeman | <null>           |
| 10     | Hitchhikers Guide to the Galaxy                        | Martin Freeman | <null>           |
| <null> | Cujo                                                   | <null>         | <null>           |
| <null> | It                                                     | <null>         | <null>           |
| <null> | It                                                     | <null>         | <null>           |
| <null> | The Lost World                                         | <null>         | <null>           |
| <null> | Howls Moving Castle                                    | <null>         | <null>           |
+--------+--------------------------------------------------------+----------------+------------------+
```

Now lets update the roles for Martin Freeman

```sql
-- Martin Freeman played Arthur Dent in Hitchhikers Guide to the Galaxy (role ID 6)
UPDATE roles SET character_name = 'Arthur Dent' WHERE id = 6;

-- Martin Freeman played Bilbo in all three Hobbit movies (IDs 7, 8, and 9)
UPDATE roles SET character_name = 'Bilbo' WHERE id IN (7,8,9);
```

We could do the same for Orlando Bloom and for Warwick Davis. However, Warwick Davis played more than one role in the Harry Potter movie. To achieve this we would have to insert more rows, each with the name of the character he played.

Let's see what our query looks like now:

````
+--------+--------------------------------------------------------+----------------+------------------+
| id     | title                                                  | full_name      | character_name   |
|--------+--------------------------------------------------------+----------------+------------------|
| 1      | Pirates of the Caribbean: The Curse of the Black Pearl | Orlando Bloom  | <null>           |
| 2      | The Lord of the Rings: The Return of the King          | Orlando Bloom  | <null>           |
| 3      | The Lord of the Rings: The Fellowship of the Ring      | Orlando Bloom  | <null>           |
| 4      | The Lord of the Rings: The Two Towers                  | Orlando Bloom  | <null>           |
| 5      | Harry Potter and Goblet of Fire                        | Warwick Davis  | <null>           |
| 10     | Hitchhikers Guide to the Galaxy                        | Martin Freeman | <null>           |
| 6      | Hitchhikers Guide to the Galaxy                        | Warwick Davis  | Arthur Dent      |
| 7      | The Hobbit: An Unexpected Journey                      | Martin Freeman | Bilbo            |
| 8      | The Hobbit: The Desolation of Smaug                    | Martin Freeman | Bilbo            |
| 9      | The Hobbit: The Battle of the Five Armies              | Martin Freeman | Bilbo            |
| <null> | Cujo                                                   | <null>         | <null>           |
| <null> | It                                                     | <null>         | <null>           |
| <null> | It                                                     | <null>         | <null>           |
| <null> | The Lost World                                         | <null>         | <null>           |
| <null> | Howls Moving Castle                                    | <null>         | <null>           |
+--------+--------------------------------------------------------+----------------+------------------+```

### Resources

- [SQL Joins Explained](http://www.sql-join.com)

import Nav from './Nav'

<Nav/>
````
