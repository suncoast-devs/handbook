---
title: Intro to SQL
assignments:
  - sql-intro
---

## Introduction to what is SQL

> SQL (Structured Query Language) is a descriptive computer language designed
> for updating, retrieving, and calculating data in table-based databases.
>
> Mozilla Developer Network

### Why a Database

When creating programs, understanding and correctly implementing the business
logic is important but we must also ensure that we are correctly and safely
storing the business data.

Let's consider some of the ways we might store data for our database.

#### Storing data just in memory

You might first consider just storing information in memory. When our users add
data to our programs we store their data in various structures: arrays, objects,
dictionaries, etc. At first, this might seem simple to think about and easy to
implement. However, problems soon arise. First, whenever our programs are shut
down and restarted we lose all the information in memory. Second, it is
difficult, if not impossible, to share information between users running the
program on different local machines, or even on different "servers" if we have a
back-end. This approach does not work for multi-user systems.

#### Storing data in text files

Next, we might consider storing data in local `.json` files, or `.csv`, or any
other _linear_ file storage format. This is a natural extension of storing the
data in memory and is often called a _serialization_ format. The concept of
serialization is to take the information we have stored in memory and represent
it as a series of characters/bytes that can be stored in a file. Additionally,
we have a way of _reading back_ those same characters/bytes from the file to
recreate the objects.

This approach works well but has several flaws that might make it a poor choice
for a way to store data. First, these types of files are very easy to _append
to_ but are difficult to _delete from_ or _modify within_. This is because they
are meant to be a _stream_ of information and do not easily support internal
modification without often rewriting the entire file. While this might be
acceptable for small applications where the time to rewrite the entire file is
low, for large applications this will not work well. Second, if multiple users,
or servers, are attempting to write to the file at the same time we will
encounter conflicts. As such this approach does not work well for multi-user
systems.

#### Database

Using a database is one of the best ways to store, persist and query data that
we need for our applications. Databases achieve this due to following the
concept of `ACID` (which stands for
`Atomicity, Consistency, Isolation, Durability`)

- Atomicity - Updates to the database allow for multiple changes to be requested
  at once and either all of them fail, or all of them succeed. For instance, if
  our application is a banking application and we want to withdraw \$10 from
  Andy's account and add it to Barbara's account, we might first write a
  statement to decrease Andy's balance by 10. Then a second statement would
  increase Barbara's balance by 10. If these two statements aren't guaranteed to
  succeed in pairs we have the possibility that we would decrease Andy's balance
  without correspondingly increase Barabara's. In an `atomic` system, either we
  would both decrease Andy's balance and increase Barbara's balance - _or_ - if
  an error occurs, their balances are as they were at the start.

- Consistency - The data we store is consistent. That is any rules the database
  enforces are applied when asking for changes. An example is when creating a
  user to a system we _require_ the user to have an email address and a
  password. If we attempt to create a row in the `Users` table but the `Email`
  field is blank, we do not allow the row. This ensures that our expectations of
  the contents of the database are always upheld.

- Isolation - This allows for multiple database requests to be handled
  concurrently (e.g. reading and writing to multiple tables/rows at the same
  time) This feature is what allows databases to be a great choice for
  multi-user systems.

- Durability - This ensures that once data is written to the database, the
  database does not lose the information in the case of a database, computer, or
  system crash. For instance, once a database says that a row is updated, a
  power loss to the system should not lose the data that was updated.

### SQL vs NoSQL

As far as databases are concerned, there are two overarching types: SQL and
NoSQL.

SQL is a table-based storage paradigm, that stores data arranged in an
Excel-like format, that focuses on normalizing our data by focusing on
relationships and structure. This is often referred to as "Relational Databases"

NoSQL can be thought of the opposite of SQL. At a high level, a NoSQL database
stores data in form other the table structure in SQL. This looseness of data
structure allows developers to more freely control what and how the data is
stored. NoSQL databases have become popular with the rise of data science and
big data.

Currently "Relational/SQL Databases" are the most common databases, we will
explore what a SQL database is and what it can do.

## SQL Basics

As we mentioned, a SQL (relational) database stores and arranges our data into
tables. These tables are made up of rows where each row has the same set of
columns. For an analogy, you can think of a database as an Excel spreadsheet, a
table as "sheet" within that spreadsheet, rows as the rows of the sheet, and
columns as _named_ versions of the familiar "Column A", "Column B" style of
spreadsheets.

### Tables

Tables are the containers for our data. Usually, a database has multiple tables,
one for each "thing" we are storing.

For instance, let's imagine we are designing and building a system to manage
books for a library. We could create a database named `Library` and in that
database, there would be one table, called `Books`.

Into this `Books` table, we would design columns that represent the specific
data about books we wish to track. Each row in the `Books` table would represent
a unique book in our collection.

### String Columns

Columns are the part of the table that defines the structure (what we often call
the `schema`) of the data we are storing. This is where we define the attributes
of the "thing" represented by the table. Every column has a data type that
defines and restricts what type of data we can place into each column.

In our `Books` table, we will want to store specific details, such as the title,
the primary author, the year published, and the genre of the book. We will name
these columns `Title`, `PrimaryAuthor`, and `Genre`. In a language such as
JavaScript, Ruby, or C# we would naturally define each of these as a `string` --
In a database, we have a few choices for the data type:

- `char(N)` - The `N` represents the largest number of characters this column
  can store. If we supply _less_ than `N` characters the rest of the column will
  be padded with spaces. This ensures the column is _always_ `N` characters long
- `varchar(N)` - Again the `N` represents the largest number of characters the
  column can store, however, the width of the data is variable. If we supply
  _less_ than `N` characters the column is _not_ filled with spaces.
- `text` - Allows for a variable number of characters, but has a much larger
  limit than what a `char` or `varchar` can support. In some cases many
  megabytes, or gigabytes of text.

In our case, `varchar` or `text` make the most sense for our columns.

### Numeric Columns

For a column like `YearPublished` we can use a numeric type.

There are several types of numeric types and they may vary based on the specific
database engine you are using.

For us Postgres provides the types smallint, integer, and bigint store whole
numbers.

The type integer is the common choice, as it offers the best balance between
range, storage size, and performance. The smallint type is generally only used
if disk space is at a premium. The bigint type is designed to be used when the
range of the integer type is insufficient.

### Boolean Types

Sometimes a column simply needs to record a true or false value. For a book
perhaps we want to know if it was a best seller. We could make this column a
'boolean' column with this syntax in our list of columns:

```
"BestSeller" boolean
```

### Date

If we wanted to know the date of publication rather than the year, an `INT`
column would no longer be appropriate. In Postgres we would define such a column
as a `DATE`

```
"DatePublished" DATE
```

The format for inputting dates varies. You can see the full list in the
[Postgres documentation on dates and times](https://www.postgresql.org/docs/current/datatype-datetime.html)
but the simplest version is `YYYY-MM-DD` such as `2020-07-04`

```sql
INSERT INTO "Books" ("DatePublished") VALUES ("2020-07-04");
```

### Date and Time

If we wanted to know the exact time a book was published we would also need the
time component.

For this we would use the `timestamp` column type.

```
"PublishedAt" TIMESTAMP
```

And we would insert values like this:

```sql
INSERT INTO "Books" ("PublishedAt") VALUES ("2020-07-04 10:23:54");
```

We should note here that having a specific time also involves dealing with time
zones, which is beyond the scope of this introduction.

### Other Types

Check out the
[Postgres docs on types](https://www.postgresql.org/docs/current/datatype.html)
to see all the available types. Note that some of these are not part of the SQL
specification and are just a part of Postgres.

### Rows

Rows are where our data is actually stored. Each row represents one "thing", in
our case one "book". In our example, a row of data would contain 'The Cat in the
Hat' (`Title`), 'Dr. Suess' (`Author`), and 'kids' (`Genre`).

## Getting started with Postgres

First, we need to create a database. After you have installed Postgres, use the
command:

```shell
createdb Library
```

to create a new, empty database.

To connect to that database and start running queries against it, use the
command:

```shell
pgcli Library
```

As with most things in programming, there are tools to help make developers
lives easier; `pgcli` is one of those tools. This tool offers intellisense and a
few other handy tools to make things a bit easier when working with Postgres.

### Queries

SQL databases use the `S`tructured `Q`uery `L`anguage to both define the
`schema` (structure) of our database and as a way to create, read, update, and
delete data within it. We call the statements we ask a database to do for us a
`query`, even if the statement's purpose is to create tables, or delete rows.
Here are some sample queries to help get you started.

#### NOTE

If you are using `pgcli`, ensure `MULTILINE` is `ON` before starting. You can
turn this feature on and off by using the `F3` key.

#### CREATE TABLE

After connecting to a new database, we need to create a table to store our
information. This table will have rows (data) and columns (structure).

Let's start by creating the table with only the `Title`, `PrimaryAuthor`, and
the `YearPublished` columns for our `Books`

```sql
CREATE TABLE "Books" (
  "Title"          TEXT NOT NULL,
  "PrimaryAuthor"  TEXT,
  "YearPublished"  INT,
  "Id"             SERIAL PRIMARY KEY
);
```

#### ALTER TABLE

The structure of our tables is not set in stone. They can be modified at a later
date by using the `ALTER TABLE` query.

To demonstrate this, let's add the `Genre` column we omitted when creating our
table. We will make it a small text field since genre descriptions are typically
short.

```sql
ALTER TABLE "Books" ADD COLUMN "Genre" VARCHAR(15);
```

Now our table has four columns. You might be wondering what value the `Genre`
column will have for any existing rows. Each database engine (Postgres, MySQL,
Oracle, Microsoft SQL Server for instance) may have different rules. In our
case, with Postgres, it will use a `null` value for `Genre` for existing rows.
That is, the database considers that those rows have _NO_ value for that column.
This is different from having a value for that column, but being blank. In SQL,
`null` is different than empty (`""`)

#### INSERT

To create a new row in our database, we need to use `INSERT`. A `INSERT`
statement looks like this:

```sql
INSERT INTO "TableName" ("ColumnA", "ColumnB", "ColumnC")
VALUES ('columnAValue', 'columnBValue', 'columnCValue');
```

The insert statement has several components. The first is `table_name` to tell
the database which table we are inserting into. The second is the list of
columns we are going to be supplying and in _what order_. The third and last is
the specific values for those columns _in the same order_ as we previously
stated.

Example `INSERT` Statements:

```sql
INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('Night of the Living Dummy', 'R. L. Stine', 1993, 'horror');

INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('A Shocker on Shock Street', 'R. L. Stine', 1995, 'horror');

INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('The Lost World', 'Michael Crichton', 1995, 'sci-fi');

INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('Harry Potter and Goblet of Fire', 'J.K. Rowling', 2000, 'fantasy');

INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('The Hobbit', 'J.R.R. Tolkien', 1937, 'fantasy');

INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('The Lord of the Rings: The Return of the King', 'J.R.R. Tolkien', 1955, 'fantasy');

INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('The Lord of the Rings: The Fellowship of the Ring', 'J.R.R. Tolkien', 1954, 'fantasy');

INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('The Lord of the Rings: The Two Towers', 'J.R.R. Tolkien', 1954, 'fantasy');

INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('Hitchhikers Guide to the Galaxy', 'Douglas Adams', 1979, 'sci-fi');

INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('Cujo', 'Stephen King', 1981, 'horror');

INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('It', 'Stephen King', 1986, 'horror');

INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('Howls Moving Castle', 'Diana Wynne Jones', 1986, 'fantasy');
```

Notice that we supplied the title, primary_author, year, and genre in the
`VALUES` section in the same order as the list of columns.

#### SELECT

`SELECT` statements allow us to query and return a new view of the data.

```sql
SELECT * FROM "Books";
```

This query will give us back all the columns (`*`) from all the rows in the
`Books` table. Regardless if there are ten rows or ten million rows, this
statement will return them all.

Often we do not want _all_ the columns from the table so we can specify specific
columns.

```sql
SELECT "Title" FROM "Books";
```

While this will still return all the rows, we will only see the `Title` column
for all those rows.

We can use the `WHERE` clause to help filter down our table to only see rows
that satisfy the conditions supplied. For example:

```sql
SELECT "Title", "PrimaryAuthor" FROM "Books" WHERE "Genre" = 'horror';
```

This query only returns the `Title` and `PrimaryAuthor` of books that have a
genre of `horror`

More examples:

```sql
SELECT * FROM "Books";

SELECT "Title", "PrimaryAuthor" FROM "Books";
SELECT "Title", "PrimaryAuthor" FROM "Books" WHERE "Genre" = 'horror';
SELECT "Title", "PrimaryAuthor" FROM "Books" WHERE "Genre" = 'fantasy' OR "Genre" = 'sci-fi';
SELECT "Title", "PrimaryAuthor" FROM "Books" WHERE "Genre" = 'horror' ORDER BY "Title";
SELECT "Title", "PrimaryAuthor" FROM "Books" WHERE "Title" LIKE 'The Lord of the Rings%' ORDER BY "Title";
```

We can also do computations with `SELECT`

To see the number of books:

```sql
SELECT COUNT(*)
FROM "Books";
```

To see the average, largest, and smallest year of publication

```sql
SELECT AVG("YearPublished"), MAX("YearPublished"), MIN("YearPublished")
FROM "Books";
```

#### UPDATE

To change data in our database, we use an `UPDATE` statement. The general
structure of an `UPDATE` is:

```sql
UPDATE "TableName"
SET "ColumnA" = 'new value'
WHERE "ColumnB" = 'some value'
```

The above update statement will update all rows that have
`ColumnB = 'some value` and change `ColumnA` to contain `new value`.

NOTE: The same syntax for `WHERE` clauses from `SELECT` apply here. We can use
multiple conditions and combine them with `AND` and `OR`

> Word of warning, if the `WHERE` clause is left off, then **all** rows will be
> updated.

Example:

```sql
UPDATE "Books" SET "Genre" = 'children horror' WHERE "PrimaryAuthor" = 'R. L. Stine';
```

#### DELETE

To remove one or many rows, we can use the `DELETE` statement.

Example:

```sql
DELETE FROM "Books" WHERE "YearPublished" = 1995;
```

This will delete all the books with a `YearPublished` of 1995.

As with the `UPDATE` statement the `DELETE` statement can use the same `WHERE`
syntax to filter which rows will be deleted.

> Word of warning, if the `WHERE` clause is left off, then **all** rows will be
> deleted.

## Additional Resources

- [pgcli/psql CheatSheet](https://tomcam.github.io/postgres/)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
