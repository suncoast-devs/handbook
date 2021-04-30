---
title: INSERT INTO "Student" ("Knowledge") VALUES ('SQL')
tags: ['sql']
---

Every application uses data in some way. In many of our applications, we will be storing information in a database. In this assignment, we will be practicing using SQL databases.

## Objectives

- Create a database
- Write some queries to use the database

## Setup

1. Fork [this repository](https://github.com/suncoast-devs/sql-intro) to your own account.
2. Change into your project's directory.
3. Clone your repository:
   `hub clone sql-intro`
4. Change into your newly cloned project's directory: `cd sql-intro`
5. `code .`
6. All your SQL queries should be placed inside the `queries.sql` file.

## Additional Resources

- [Quick Reference to Helpful Postgres Commands](https://handbook.suncoast.io/lessons/misc-quick-reference/postgres)
- [Quick Reference to Navigating in pgcli](https://handbook.suncoast.io/lessons/misc-quick-reference/pgcli)
- [Quick Reference to Common SQL Queries](https://handbook.suncoast.io/lessons/misc-quick-reference/sql)
- [pgcli/psql CheatSheet](https://tomcam.github.io/postgres/)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)
- [Hint for a useful data type](https://www.postgresql.org/docs/current/datatype-boolean.html)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Explorer Mode

- Create a database: `CompanyDatabase`.
- Create a table: `Employees` with the following columns. Use your best judgment for data types. Copy the query you used to create this table and paste it into `queries.sql`.

  - `FullName`
  - `Salary`
  - `JobPosition`
  - `PhoneExtension`
  - `IsPartTime`

- Create a few employees. Review the requirements below to see some examples of the values you may need. For instance, you may need employees of certain job positions, employees with certain names, etc. Add enough data (maybe 10 rows) such that you can validate your queries. _Copy the queries you used to create your data into `queries.sql`_
- Create queries that can do the following. **Each query** should be attempted in your database. When it works, copy the query to `queries.sql`. You may optionally copy and paste the query output to your queries.sql if you wish.

  - Select all columns for all employees.
  - Select only the full names and phone extensions for only full-time employees.
  - Insert a new part-time employee, as a software developer, with a salary of 450. Make up values for the other columns.
  - Update all employees that are cooks to have a salary of 500.
  - Delete all employees that have the full name of "Lazy Larry".
  - Add a column to the table: `ParkingSpot` as textual information that can store _up to_ 10 characters.

### Adventure Mode

- Add queries to `queries.sql` that show how to:
  - Recreate your database and tables and use `NOT NULL` for columns you feel are required.
  - Add a primary key named `Id` to your table.

### Epic Mode

- Add queries to `queries.sql` that show how to:
  - Create a second table: `Departments` that has these columns:
    - `Name`
    - `BuildingNumber`
  - Create a column on the `Employees` table named `DepartmentId` to relate to the `Departments` table. Make it a foreign key.
  - Insert employees and related departments.
