# INSERT INTO Student (knowledge) VALUES ('SQL')

Every application uses data in some way. This will help you set up your development environment as well as get used to querying databases.

## Objectives

- Install Postgres
- Create a database for Employees
- Write some queries to use the database

## Requirements

- Set up postgres by following [these directions.](https://suncoast.io/handbook/tools/postgresql/)

### Explorer Mode

- [ ] Install Postgres
- [ ] Create a database:
  - C#: called `CompanyDatabase`
  - Ruby: called `company_database`
- [ ] Create a table:
  - C#: named `Employees`
  - Ruby: named 'employees'
- [ ] Add the following columns to the table, Use your best judgement for data types
  - C#
    - FullName
    - Salary
    - JobPosition
    - PhoneExtension
    - IsPartTime
  - Ruby
    - full_name
    - salary
    - job_position
    - phone_extension
    - part_time
- [ ] Create queries that can do the following:

  - [ ] Select all columns for all employees
  - [ ] Select only the Full Name and Phone Extension for only Full Time employees
  - [ ] Insert a new part time employee, as a software developer, part time, with a salary of 450
  - [ ] Update all employees that are the cooks to have a salary of 500
  - [ ] Delete all employees that have the full name of "Lazy Lynn"
  - [ ] Update all employees to be full time
  - [ ] Add a column to the table
    - C#: called `ParkingSpotNumber` as a string that up to 10 characters long
    - Ruby: called `parking_spot_number` as a string that up to 10 characters long

- [ ] Turn in the above queries as a gist

### Adventure Mode

- [ ] Work on the Koans
- [ ] Work on your final project

### Epic Mode

- [ ] Investigate working with C#/Ruby and Postgres

## Additional Resources

- [PostgreSQL 10 Documentation](https://www.postgresql.org/docs/10/static/index.html)

## Recommended Practice:

- For more practice, Hackerrank has a [SQL Track](https://www.hackerrank.com/domains/sql)
