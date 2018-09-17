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

``` 
brew install postgres
```

### Windows: 

- head here and download the install https://www.enterprisedb.com/downloads/postgres-postgresql-downloads and follow the prompts

### Explorer Mode

* [ ] Install Postgres
* [ ] Create a database called `CompanyDatabase`
* [ ] Create a table Called `Employees`
* [ ] Add the following columns to the table, Use your best judgement for data types
    - Id (Primary Key)
    - FullName
    - Salary
    - Position
    - PhoneExtension
    - IsPartTime

* [ ] Create queries that can do the following:
    - [ ] Select all columns for all employees
    - [ ] Select only the FullName and Phone Extension for Only Full Time employees
    - [ ] Insert a new Part time employee, as a software developer, part time, with a salary of 450
    - [ ] Update all Employees that are the Cooks to have a salary of 500
    - [ ] Delete all Employees that have the full name of "Lazy Lynn"
    - [ ] Update all Employees to be full time
    - [ ] Add a column to the table called `ParkingSpotNumber` as a string that up to 10 characters long

* [ ] Turn in the above queries as a gist 
 

### Adventure Mode

* [ ] Work on the C# Koans
* [ ] Work on your final project

### Epic Mode

* [ ] Investigate working with C# and Postgres

## Additional Resources

* [https://www.postgresql.org/docs/10/static/index.html](https://www.postgresql.org/docs/10/static/index.html
)
## Recommended Practice:

* For more practice, Hackerrank has a [SQL Track](https://www.hackerrank.com/domains/sql)