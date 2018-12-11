---
title: Intro to joins
draft: true
---

## Data Normalization

### Foreign Keys

### 1 to Many

### Many to Many

### Code Demo: Create a movie database

#### Create the ERD

#### CREATE TABLE

```sql

CREATE TABLE movies (
  id              SERIAL PRIMARY KEY,
  title           TEXT NOT NULL,
  primary_directory  TEXT,
  year_released  INT,
  genre TEXT
);

CREATE TABLE Ratings (
  id SERIAL PRIMARY KEY,
  Rating TEXT
);


```


#### ADD FOREIGN KEY

```sql
ALTER TABLE movies ADD COLUMN ratingId INTEGER NULL REFERENCES ratings (id);
```

#### INSERT SOME DATA

``` sql
INSERT INTO ratings (rating) VALUES ('G');
INSERT INTO ratings (rating) VALUES ('PG');
INSERT INTO ratings (rating) VALUES ('PG-13');
INSERT INTO ratings (rating) VALUES ('R');

```


```sql

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('The Lost World', 'Steven Spielberg', 1997, 'sci-fi');

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('Pirates of the Caribbean: The Curse of the Black Pearl', 'Gore Verbinski', 2003, 'fantasy');

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('Harry Potter and Goblet of Fire', 'Mike Newell', 2005, 'fantasy');

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('The Hobbit: An Unexpected Journey', 'Peter Jackson', 2012, 'fantasy');

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('The Hobbit: The Desolation of Smaug', 'Peter Jackson', 2013, 'fantasy');

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('The Hobbit: The Battle of the Five Armies', 'Peter Jackson', 2014, 'fantasy');

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('The Lord of the Rings: The Return of the King', 'Peter Jackson', 2003, 'fantasy');

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('The Lord of the Rings: The Fellowship of the Ring', 'Peter Jackson', 2001, 'fantasy');

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('The Lord of the Rings: The Two Towers', 'Peter Jackson', 2002, 'fantasy');

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('Hitchhikers Guide to the Galaxy', 'Garth Jennings', 2005, 'sci-Fi');

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('Cujo', 'Lewis Teague', 1983, 'horror');

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('It', 'Andrés Muschietti', 2017, 'horror');

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('It', 'Tommy Lee Wallace', 1990, 'horror');

INSERT INTO movies (title,  primary_directory, year_released, genre)
VALUES ('Howls Moving Castle', 'Hayao Miyazaki', 2005, 'fantasy');

```

### ADD THE FOREIGN KEYS for 1 TO MANY :

- Update Harry Potter
- Update It
- Update The Hobbit Movies

#### SELECT

```sql
SELECT * FROM movies;

SELECT * FROM movies JOIN books ON books.id = movies.sourceBook

```
### INNER vs OUTER; LEFT vs RIGHT

https://i.stack.imgur.com/VQ5XP.png


### MANY to MANY

```sql

CREATE TABLE actors (
  id        SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  birthday  DATE
);


CREATE TABLE casts (
  id       SERIAL PRIMARY KEY,
  movieId  INTEGER REFERENCES movies (id) ,
  actorId  INTEGER REFERENCES actors (id)
);

INSERT INTO actors (full_name,  birthday)
VALUES ('Orlando Bloom', '1977-01-13');

INSERT INTO actors (full_name,  birthday)
VALUES ('Warwick Davis', '1970-02-03');

INSERT INTO actors (full_name,  birthday)
VALUES ('Martin Freeman', '1971-09-08');

```


- Update Orlando Bloom for Pirates & LOTR
- Update Warick for Harry Potter and Hitchhikers
- Update Martin Freeman for the Hobbit & Hitchhikers



### Query for the casts and actors

- Order bys,
- WHere by year
