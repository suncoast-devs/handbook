---
title: SQL
---

# SQL Commands

## CREATE TABLE

This command creates a new table

```sql
CREATE TABLE "TableNameGoesHere" (
  "ColumnOneNameGoesHere"  TEXT,
  "ColumnTwoNameGoesHere"  TEXT,
);
```

Example:

```sql
CREATE TABLE "Books" (
  "Title"          TEXT NOT NULL,
  "PrimaryAuthor"  TEXT,
  "YearPublished"  INT,
);
```

### Column types

These are the most common column types, but they certainly aren't the only ones

| Type       | Description                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| CHAR(N)    | A "string" that stores up to N characters, the rest padded with spaces                                  |
| VARCHAR(N) | A "string" that stores up to N characters, the rest is NOT padded with spaces                           |
| TEXT       | A "string" that can store a very long string of characters and is the most flexible                     |
| INT        | Stores an integer value                                                                                 |
| NUMERIC    | Stores a number with values of any precision and scale that can be stored                               |
| BOOLEAN    | Stores a `true` or `false` value                                                                        |
| DATE       | Stores a year, month, and day together. Use `YYYY-MM-DD` format such as `'2020-07-04'` when adding data |
| TIMESTAMP  | Stores a precise time, Use `YYYY-MM-DD HH:MM:DD` format such as `'2020-07-04 15:45:12` when adding data |

### NULL versus NOT NULL

By default all the column types above are `NULLable` meaning that you do not
have to specify a value and thus can be the special value `NULL` that means
_"lacks a value_"

If you want a column that must be supplied, add `NOT NULL` to it's
specification.

Example:

```sql
CREATE TABLE "Books" (
  "Title"          TEXT NOT NULL,
  "PrimaryAuthor"  TEXT,
  "YearPublished"  INT,
);
```

### PRIMARY KEY

To create a primary key column we add the qualifier `PRIMARY KEY`. It is also
useful to use the `SERIAL` type which creates an automatically increasing
integer for each row inserted. This allows us to **omit** that column and allow
the database to supply it and automatically keep track of it

```sql
CREATE TABLE "Books" (
  "Id"             SERIAL PRIMARY KEY
  "Title"          TEXT NOT NULL,
  "PrimaryAuthor"  TEXT,
  "YearPublished"  INT,
);
```

## INSERT data

To insert data we can use the `INSERT INTO` command.

> NOTE: Notice textual values are surrounded by **SINGLE** quotes.

Format:

```sql
INSERT INTO "TableName" ("ColumnA", "ColumnB", "ColumnC")
VALUES ('columnAValue', 'columnBValue', 'columnCValue');
```

For an example of inserting data into our `Books` table:

```sql
INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('Night of the Living Dummy', 'R. L. Stine', 1993, 'horror');

INSERT INTO "Books" ("Title",  "PrimaryAuthor", "YearPublished", "Genre")
VALUES ('The Lost World', 'Michael Crichton', 1995, 'sci-fi');
```

## SELECT data

To selected data:

```sql
SELECT <column names>
FROM <table name>
```

Example:

```sql
SELECT "Title", "YearPublished"
FROM "Books";
```

You can also use the special name `*` to mean _All Columns_

```sql
SELECT *
FROM "Books";
```

## We can also do computations with `SELECT`

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

## SELECT data but limit the rows to return

Using a `WHERE` clause we can limit which rows are selected.

For example, to see all the books published before `1990` we use:

```sql
SELECT *
FROM "Books"
WHERE "YearPublished" < 1990
```

To see all the books published by `Michael Crichton`:

```sql
SELECT *
FROM "Books"
WHERE "Primary Author" = 'Michael Critchton';
```

## SELECT data but order the results

The data from a `SELECT` statement will come back in an unpredictable order.
Even though running the same `SELECT` twice may give the data in the same order,
it is not guaranteed.

To specify an order:

```sql
SELECT *
FROM "Books"
ORDER BY "Genre";
```

You can also order descending:

```sql
SELECT *
FROM "Books"
ORDER BY "Genre" DESC;
```

The `ORDER BY` can also order numeric types.

## UPDATE existing data

To **change** a value in existing rows we use the `UPDATE` command. The UPDATE
command will make the changes specified in the `SET` statements for **ALL** rows
that match the `WHERE`

Format:

```sql
UPDATE "TableName"
SET "ColumnA" = 'new value'
WHERE "ColumnB" = 'some value'
```

Example:

> Word of warning, if the `WHERE` clause is left off, then **all** rows will be
> updated.

Example, change the `Genre` into `children horror` for all the books where the
`PrimaryAuther` is `R. L. Stine`

```sql
UPDATE "Books" SET "Genre" = 'children horror' WHERE "PrimaryAuthor" = 'R. L. Stine';
```

> NOTE: You can apply multiple changes with the SET command

```sql
UPDATE "Books" SET "Genre" = 'children horror', "YearPublished" = 1995 WHERE "PrimaryAuthor" = 'R. L. Stine';
```

## DELETE existing data

We use the `DELETE` statement to remove multiple rows from the database.

Format:

```sql
DELETE
FROM "TableName"
WHERE "ColumnB" = 'some value'
```

Example:

> Word of warning, if the `WHERE` clause is left off, then **all** rows will be
> delete.

Example, to delete all the rows where the `PrimaryAuther` is `R. L. Stine`

```sql
DELETE FROM "Books"  WHERE "PrimaryAuthor" = 'R. L. Stine';
```

## ALTER TABLE - Renaming a table

We can rename a table if we use the wrong name.

Example of renaming a table:

```sql
ALTER TABLE "Band" RENAME TO "Bands";
```

```sql
ALTER TABLE "OldName" RENAME TO "NewName";
```

## ALTER TABLE - Adding a column, Renaming a Column, Changing a Type

The structure of our tables is not set in stone. They can be modified at a later
date by using the `ALTER TABLE` query.

Example of adding a column:

```sql
ALTER TABLE "Books" ADD COLUMN "Genre" VARCHAR(15);
```

Example of renaming a column:

```sql
ALTER TABLE "Books" RENAME COLUMN "Genre" TO "SpecificGenre";
```

Example of changing a column data type:

```sql
ALTER TABLE table_name ALTER COLUMN column_name [SET DATA] TYPE new_data_type;
```

To change our YearPublished to a TEXT column:

```sql
ALTER TABLE "Books" ALTER COLUMN "YearPublished" TYPE TEXT;
```

## FOREIGN KEYS - Adding to an existing table

To add a foreign key to an existing table:

```sql
ALTER TABLE "ExistingTableNameHere" ADD COLUMN "SinuglarNameOfOtherTableFollowedById" INTEGER NULL REFERENCES "NameOfOtherTableHere" ("Id");
```

Example of adding a column to `Books` to relate to the `Ratings` table.

```sql
ALTER TABLE "Books" ADD COLUMN "RatingId" INTEGER NULL REFERENCES "Ratings" ("Id");
```

## FOREIGN KEYS - Adding to the list of columns when you CREATE a table

```sql
CREATE TABLE "Books" (
  "Id"             SERIAL PRIMARY KEY
  "Title"          TEXT NOT NULL,
  "PrimaryAuthor"  TEXT,
  "YearPublished"  INT,
  "RatingId"       INTEGER REFERENCES "Ratings" ("Id"),
);
```
