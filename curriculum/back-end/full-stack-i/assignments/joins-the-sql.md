# Foreign Keys - The SQL

As we continue to explore databases and ideas, this project will help you practice model databases and relationships, as well as help you get started on your capstone project.

First, you will expand you CompanyDatabase to have `Departments`, `Products` and `Orders`. You will be crafting queries for these new tables.

After that, this weekend is the next big push your final project, work on the HTML and CSS; As well as the database schema.

## Objectives

- Work with Foreign Keys
- Craft Queries
- Further you final project

## Requirements

- Add a few tables and foreign keys to an existing database
- Create the Schema for your final project
- Work on the HTML & CSS for your final project

### Optional

Install [pgcli](https://www.pgcli.com/install)

- For Mac you can `brew install pgcli`
- For Windows you need to install python and pip

### Explorer Mode

- [ ] In your Company Database, add a table named:
  - C#: `Departments`. Give this table a few columns
  - Ruby: `departments`. Give this table a few columns
- [ ] Add a Foreign key named:
  - C# `DepartmentId` to your `Employee` Table
  - Ruby: `department_id` to your `employees` table
- [ ] Add tables named:
  - C#: `Products` and `Orders`. Give each table a few columns
  - Ruby: `products` and a 'orders`. Give each table a few columns
- [ ] In our company, 1 `Order` can have many `Products` and 1 `Product` can have many `Orders`. This will be a Many-to-Many relationship. Create the tables and foreign keys needed for this to happen

* [ ] Create queries that can do the following:
  - [ ] Given a department id, give me all employees in the department
  - [ ] Given a department name, give me the phone extensions
  - [ ] Find all orders that contain the product id of `2`
  - [ ] Given an order id, display on the `OrderNumber`, and all the product names
  - [ ] Inserts a new product
  - [ ] Creates a new order
  - [ ] Adds a product to an order
  - [ ] Adds a new employee to a department
  - [ ] Updating a employee's department
  - [ ] Removing a product from an order

- [ ] Turn in the above queries as a gist
- [ ] Work on your final project HTML. DO not sleep on this. You have the time and resources to get a good bit of this done this weekend.
- [ ] Complete your first draft of your database schema for your final project.

### Adventure Mode

- [ ] Work on the Koans
- [ ] Give these a try : [https://sqlkoans.com/](https://sqlkoans.com/)

### Epic Mode

- [ ] Investigate working with C#/Ruby and Postgres

## Additional Resources

- [https://www.postgresql.org/docs/10/static/index.html](https://www.postgresql.org/docs/10/static/index.html)

## Recommended Practice:

- For more practice, Hackerrank has a [SQL Track](https://www.hackerrank.com/domains/sql)
