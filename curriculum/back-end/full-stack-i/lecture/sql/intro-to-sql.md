---
title: Intro to SQL
draft: true
---

## Introduction to what is SQL

> SQL (Structured Query Language) is a descriptive computer language designed for updating, retrieving, and calculating data in table-based databases.
> - Mozilla Developer Network

### Why a Database

When creating programs, not only is the business logic important but arguably, the data we use is just important, if not more important. 

Using a database is one of the best ways to store, persist and query data that need for our applications. This is not the only way to store our data, but it does offer the best tools and practices to create rich data-driven apps. 

### SQL vs NoSQL

As far as databases are concern, there are two over arching types of databases design: SQL and NoSQL. 

SQL is a table-based storage paradigm, that stores data  arranged in an Excel-like format, that focuses on normalizing our data by focusing on relationships and structure.

NoSQL can be thought of the opposite of SQL. At a high level, a NoSQL database stores data in form other the tablular structure in SQL. This looseness of data structure allows developers to more freely control what and how the data is store. NoSQL databases, though have existed for while, have become popular in modern day data science and big data. 

#### Welcome to Postgres

### Tables
### Columns
### Rows

### DEMO: create a database and ERD for Library

First we need to create a database. After you have installed Postgres, use the command:

``` bash
  createdb book_collection
```

to create a new, empty database. 

To connect to that database and start running queries against it, use the command: 

``` bash

psql book_collection

```


As with most things in programming, there are tools to help make developers lives easier; `pgcli` is one of those tools. This tool offers intellisense, and few other handy tools to make things a bit easier when working with Postgres. 


### Queries

Here are some sample queries to help get you started. 

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
INSERT INTO books (title,  author, published_year, genre)
VALUES ('Night of the Living Dummy', 'R. L. Stine', 1993, 'horror');

INSERT INTO books (title,  author, published_year, genre)
VALUES ('A Shocker on Shock Street', 'R. L. Stine', 1995, 'horror');

INSERT INTO books (title,  author, published_year, genre)
VALUES ('The Lost World', 'Michael Crichton', 1995, 'sci-fi');

INSERT INTO books (title,  author, published_year, genre)
VALUES ('Harry Potter and Goblet of Fire', 'J.K. Rowling', 2000, 'fantasy');


INSERT INTO books (title,  author, published_year, genre)
VALUES ('The Hobbit', 'J.R.R. Tolkien', 1937, 'fantasy');

INSERT INTO books (title,  author, published_year, genre)
VALUES ('The Lord of the Rings: The Return of the King', 'J.R.R. Tolkien', 1955, 'fantasy');

INSERT INTO books (title,  author, published_year, genre)
VALUES ('The Lord of the Rings: The Fellowship of the Ring', 'J.R.R. Tolkien', 1954, 'fantasy');

INSERT INTO books (title,  author, published_year, genre)
VALUES ('The Lord of the Rings: The Two Towers', 'J.R.R. Tolkien', 1954, 'fantasy');

INSERT INTO books (title,  author, published_year, genre)
VALUES ('Hitchhikers Guide to the Galaxy', 'Douglas Adams', 1979, 'sci-Fi');

INSERT INTO books (title,  author, published_year, genre)
VALUES ('Cujo', 'Stephen King', 1981, 'horror');

INSERT INTO books (title,  author, published_year, genre)
VALUES ('It', 'Stephen King', 1986, 'horror');

INSERT INTO books (title,  author, published_year, genre)
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
UPDATE books set genre='children horror' where primary_author='R. L. Stine';

```


#### DELETE

```sql

DELETE FROM books WHERE year_published=1995

```
