---
title: Intro to SQL
draft: true
---

## Introduction to what is SQL

### Why a Database

### SQL vs NoSQL

### Flavors of SQL

#### Welcome to Postgres 

### Tables
### Columns
### Rows

### DEMO: create a database and ERD for Library

### Queries

#### CREATE TABLE

```sql

CREATE TABLE books (
  id              SERIAL PRIMARY KEY,
  title           TEXT NOT NULL,
  primary_author  TEXT, 
  year_published  INT
);
```


#### ALTER TABLE

```sql
ALTER TABLE books ADD COLUMN genre TEXT 
```

#### INSERT

```sql 
INSERT INTO books (title,  primary_author, year_published, genre) 
VALUES ('Night of the Living Dummy', 'R. L. Stine', 1993, 'horror');

INSERT INTO books (title,  primary_author, year_published, genre) 
VALUES ('A Shocker on Shock Street', 'R. L. Stine', 1995, 'horror');

INSERT INTO books (title,  primary_author, year_published, genre) 
VALUES ('The Lost World', 'Michael Crichton', 1995, 'sci-fi');

INSERT INTO books (title,  primary_author, year_published, genre) 
VALUES ('Harry Potter and Goblet of Fire', 'J.K. Rowling', 2000, 'fantasy');


INSERT INTO books (title,  primary_author, year_published, genre) 
VALUES ('The Hobbit', 'J.R.R. Tolkien', 1937, 'fantasy');

INSERT INTO books (title,  primary_author, year_published, genre) 
VALUES ('The Lord of the Rings: The Return of the King', 'J.R.R. Tolkien', 1955, 'fantasy');

INSERT INTO books (title,  primary_author, year_published, genre) 
VALUES ('The Lord of the Rings: The Fellowship of the Ring', 'J.R.R. Tolkien', 1954, 'fantasy');

INSERT INTO books (title,  primary_author, year_published, genre) 
VALUES ('The Lord of the Rings: The Two Towers', 'J.R.R. Tolkien', 1954, 'fantasy');

INSERT INTO books (title,  primary_author, year_published, genre) 
VALUES ('Hitchhikers Guide to the Galaxy', 'Douglas Adams', 1979, 'sci-Fi');

INSERT INTO books (title,  primary_author, year_published, genre) 
VALUES ('Cujo', 'Stephen King', 1981, 'horror');

INSERT INTO books (title,  primary_author, year_published, genre) 
VALUES ('It', 'Stephen King', 1986, 'horror');

INSERT INTO books (title,  primary_author, year_published, genre) 
VALUES ('Howls Moving Castle', 'Diana Wynne Jones', 1986, 'fantasy');

```

#### SELECT 

```sql
SELECT * FROM books;

SELECT title, primary_author from books;

SELECT title, primary_author from books where genre = 'horror';

SELECT title, primary_author from books where genre = 'fantasy' OR genre = 'sci-fi';

SELECT title, primary_author from books where genre = 'horror' ORDER BY title;

SELECT title, primary_author from books where title LIKE 'The Lord of the Rings%' ORDER BY title;

```

#### UPDATE

```sql
UPDATE books set genre='kids horror' where primary_author='R. L. Stine';

```


#### DELETE 

```sql

DELETE FROM books WHERE year_published=1995

```
