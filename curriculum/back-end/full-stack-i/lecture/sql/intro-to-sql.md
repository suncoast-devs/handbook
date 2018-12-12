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
As far as databases are concern, there are two over arching types of databases: SQL and NoSQL. 

SQL is a table-based storage paradigm, that stores data  arranged in an Excel-like format, that focuses on normalizing our data by focusing on relationships and structure.

NoSQL can be thought of the opposite of SQL. At a high level, a NoSQL database stores data in form other the tablular structure in SQL. This looseness of data structure allows developers to more freely control what and how the data is store. NoSQL databases, though have existed for while, have become popular in modern day data science and big data. 


Since the majority of apps use a SQL database, let's explore what a SQL database is and what it can do.

## SQL Basics

In SQL our data is arranged into tables, thats have columns and rows.
### Tables

Tables are the containers for our data. Usually a database has multiple tables, one for each "thing" we are storing. 

For instance, if you want to store books for a library, there would have a database called `book_collection` and in that database, there would be one table, called `books`. 

### Columns

Columns are the part of the table that define the schema (structure) of the data we are storing. This where we define was parts of the "thing" we are storing. Every column has a datatype that restricts what type of data we can insert into each column. 

In our `books` table, we will want to store details, such as `title`, `primary_author` and `genre`. Each of these columns have a type of `TEXT`.  Checkout the [Postgres docs on types](https://www.postgresql.org/docs/current/datatype.html) to see all the available types. Note that some of these are not part of the SQL specification and are just a part of Postgres.

### Rows

Rows are where our data is actually store. Each row represents one point of data. This can be thought of being similar to a row of data in an Excel spreadsheet. 

To continue the `book_collection` database, in the `books` table, a row of data would contain 'The Cat in the Hat', 'Dr. Suess', and 'kids'.

### Getting started with Postgres

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


After connected to a new database, we need to create a table to store our information. This table will have rows(data) and columns (structure). 

```sql

CREATE TABLE books (
  id              SERIAL PRIMARY KEY,
  title           TEXT NOT NULL,
  primary_author  TEXT,
  year_published  INT
);
```


#### ALTER TABLE

These tables are a not set in stone, they can added at a later date use the `ALTER TABLE` command. 

```sql
ALTER TABLE books ADD COLUMN genre TEXT
```

#### INSERT

To create a new row in our database, we need to use the `INSERT` statement. A `INSERT` statement looks like this: 

```sql
INSERT INTO table_name (columnA, columnB, columnC)
VALUES ('columnAValue', 'columnBValue', 'columnCValue')
```

Example `INSERT` Statements: 

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

`SELECT` statements allow us to query our data and return a new view of the data. We can use the `WHERE` clause to help filter down our table to only see rows that satisfy the conditions supplied. For example: 

``` sql
SELECT title, primary_author from books where genre = 'horror';
```

Only returns the `title` and `primary_author` of `horror` books;


More examples: 

```sql
SELECT * FROM books;

SELECT title, primary_author from books;

SELECT title, primary_author from books where genre = 'horror';

SELECT title, primary_author from books where genre = 'fantasy' OR genre = 'sci-fi';

SELECT title, primary_author from books where genre = 'horror' ORDER BY title;

SELECT title, primary_author from books where title LIKE 'The Lord of the Rings%' ORDER BY title;

```

#### UPDATE

To change data in our database, we use an `UPDATE` statement. The general structure of an `UPDATE` is: 

``` sql
UPDATE table_name
SET columnA = 'new value'
WHERE columnB = 'some value'
```

The above update statement will update all rows that have `columnB = 'some value` with the new value. 

Word of warning, if the `WHERE` clause is left off, then **all** rows will updated. 


Example: 
```sql
UPDATE books set genre='children horror' where primary_author='R. L. Stine';

```


#### DELETE

To remove one or many rows, we can use the `DELETE` statement.

Example:
```sql

DELETE FROM books WHERE year_published=1995

```
