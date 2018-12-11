---
title: INSERT INTO Student (knowledge) VALUES ('SQL')
draft: true
---

Every application uses data in some way. This will help you set up your development environment as well as get used to querying databases.


## Objectives

* Install Postgres
* Create a database for Employees
* Write some queries to use the database

## Requirements


### For Mac:

Use homebrew to install Postgres

```sh
brew install postgres
brew services start postgresql
```

### Windows:

- head here and download the install https://www.enterprisedb.com/downloads/postgres-postgresql-downloads and follow the prompts

### Explorer Mode

* [ ] Install Postgres
* [ ] Create a database:
  - C#: called `CompanyDatabase`
  - Ruby: called `company_database`
* [ ] Create a table:
  - C#: named `Employees`
  - Ruby: named 'employees'
* [ ] Add the following columns to the table, Use your best judgement for data types
    - C#
      - Id (Primary Key)
      - FullName
      - Salary
      - Position
      - PhoneExtension
      - IsPartTime
    - Ruby
      - id (Primary Key)
      - full_name
      - salary
      - position
      - phone_extension
      - part_time
* [ ] Create queries that can do the following:
    - [ ] Select all columns for all employees
    - [ ] Select only the Full Name and Phone Extension for only Full Time employees
    - [ ] Insert a new part time employee, as a software developer, part time, with a salary of 450
    - [ ] Update all employees that are the cooks to have a salary of 500
    - [ ] Delete all employees that have the full name of "Lazy Lynn"
    - [ ] Update all employees to be full time
    - [ ] Add a column to the table
      - C#: called `ParkingSpotNumber` as a string that up to 10 characters long
      - Ruby: called `parking_spot_number` as a string that up to 10 characters long

* [ ] Turn in the above queries as a gist


### Adventure Mode

* [ ] Work on the Koans
* [ ] Work on your final project

### Epic Mode

* [ ] Investigate working with C#/Ruby and Postgres

## Additional Resources

* [https://www.postgresql.org/docs/10/static/index.html](https://www.postgresql.org/docs/10/static/index.html)

## Recommended Practice:

* For more practice, Hackerrank has a [SQL Track](https://www.hackerrank.com/domains/sql)
