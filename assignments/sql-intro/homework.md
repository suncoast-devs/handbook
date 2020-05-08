---
title: INSERT INTO Student (knowledge) VALUES ('SQL')
---

Every application uses data in some way. In many of our applications we will be
storing information in a database. In this assignment we will be practicing
using SQL databases.

## Objectives

- Create a database
- Write some queries to use the database

## Setup

Create a new directory named `sql-intro` for this homework. You will be creating
one file, `queries.sql` in the directory which you will turn in.

## Turning in the project.

When you are done:

```shell
hub create sql-intro
git add .
git commit -m "Queries"
git push
```

### Explorer Mode

- [ ] Create a database: `CompanyDatabase`
- [ ] Create a table: `Employees` with the following columns. Use your best
      judgement for data types.

  - `FullName`
  - `Salary`
  - `JobPosition`
  - `PhoneExtension`
  - `IsPartTime`

- [ ] Create a file named `queries.sql` to store the queries you create.
- [ ] Create queries that can do the following:

  - [ ] Select all columns for all employees.
  - [ ] Select only the full names and phone extensions for only full time
        employees.
  - [ ] Insert a new part time employee, as a software developer, with a salary
        of 450.
  - [ ] Update all employees that are cooks to have a salary of 500.
  - [ ] Delete all employees that have the full name of "Lazy Larry".
  - [ ] Add a column to the table: `ParkingSpotNumber` as a string that can
        store up to 10 characters.

### Adventure Mode

### Epic Mode

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
