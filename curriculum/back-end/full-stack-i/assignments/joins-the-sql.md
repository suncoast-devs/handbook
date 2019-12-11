# Foreign Keys - The SQL

As we continue to explore databases and ideas, this project will help you practice model databases and relationships, as well as help you get started on your capstone project.

First, you will expand your CompanyDatabase to have `Departments`, `Products` and `Orders`. You will be crafting queries for these new tables.

After that, this weekend is the next big push your final project, work on the HTML and CSS; As well as the database schema.

## Objectives

- Work with Foreign Keys
- Craft Queries
- Further your final project

## Requirements

- Add a few tables and foreign keys to an existing database
- Create the Schema for your final project
- Work on the HTML & CSS for your final project

### Explorer Mode

- [ ] In your Company Database, add a table named `Departments`. Give this table a few columns:
  - `Id` as a primary key
  - `DepartmentName` as text
  - `Building` as text
- [ ] Add a Foreign key `DepartmentId` to your `Employee` Table
- [ ] Add tables named `Products` and `Orders`.
  - `Orders` should have the columns
    - `OrderNumber` as string
    - `Id` as a primary key
    - `DatePlaced` as datetime
    - `Email` as string
  - `Product` should have the columns
    - `Id` as a primary key
    - `Price` as double
    - `Name` as string
    - `Description` as string
    - `NumberInStock` as int
- [ ] In our company, 1 `Order` can have many `Products` and 1 `Product` can have many `Orders`. This will be a Many-to-Many relationship. Create the 3 tables (`Orders`, `Products` and `ProductOrders`) and foreign keys needed for this to happen

* [ ] Create queries that can do the following:
  - [ ] Given a department id, give me all employees in the department
  - [ ] Given a department name, give me the phone extensions
  - [ ] Find all orders that contain the product id of `2`
  - [ ] Given an order id, display on the `OrderNumber`, and all the product names
  - [ ] Inserts a new product
  - [ ] Inserts a new order
  - [ ] Adds a product to an order
  - [ ] Adds a new employee to a department
  - [ ] Updating a employee's department
  - [ ] Removing a product from an order

- [ ] Turn in the above queries as a gist

### Adventure Mode

- [ ] Work on your final project. Do not sleep on this.
- [ ] Start drafting of your database schema for your final project.
- [ ] Give these [SQL Koans](https://sqlkoans.com/) a try.

### Epic Mode

- [ ] Investigate working with C#/Ruby and Postgres

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [SQL Notes](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/sql/intro-to-sql/)
- [Join Notes](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/sql/intro-to-joins/)

## Recommended Practice:

- For more practice, Hackerrank has a [SQL Track](https://www.hackerrank.com/domains/sql)
