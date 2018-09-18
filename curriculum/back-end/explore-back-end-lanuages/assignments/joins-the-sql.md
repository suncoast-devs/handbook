---
title: Foreign Keys - The SQL
draft: true
---

As we continue to explore databases and ideas, this project will help you practice model databases and relationships, as well as help you get started on your capstone project. 

First you will expand you CompanyDatabase to have `Departments`, `Products` and `Orders`. You will be crafting a queries for these new tables. 

After that, this weekend is the next big push your final project, work on the HTML and CSS; As well as the database schema. 

## Objectives

* Work with Foreign Keys
* Craft Queries
* Further you final project

## Requirements

* Add a few tables and foreign keys to an existing database
* Create the Schema for your final project
* Work on the HTML & CSS for your final project

### Optional

Install [pgcli](https://www.pgcli.com/install)

- For Mac you can brew
- For Windows you need to install python and pip

### Explorer Mode

* [ ] In your Company Database, add a table called `Departments`. Give this a few columns
* [ ] Add a Foreign key call `DepartmentId` to your `Employee` Table
* [ ] Add Table Called `Products` and a table called `Orders`. Give each table a few columns
* [ ] In our company, 1 `Order` can have many `Products` and 1 `Product` can have many `Orders`. This will be a Many to Many relationship. Create the tables and foreign keys needed for this to happen


* [ ] Create queries that can do the following:
    - [ ] Given a Department Id, Give me all employees in the department
    - [ ] Given a Department Name, give me the phone extensions
    - [ ] Find all Orders that contain the Product Id of `2`
    - [ ] Given an OrderId, Display on the `OrderNumber`, and all the product names
    - [ ] Insert a new Product
    - [ ] Creating a new Order
    - [ ] Adding an Product to an Order 
    - [ ] Adding a new employee to a department
    - [ ] Updating a employee's department
    - [ ] Removing a Product from an Order


* [ ] Turn in the above queries as a gist 
* [ ] Work on your final project HTML. DO not sleep on this. You have the time and resources to get a good bit of this done this weekend.
* [ ] Complete your first draft of your database schema for your final project.

### Adventure Mode

* [ ] Work on the Koans
* [ ] Give these a try : [https://sqlkoans.com/](https://sqlkoans.com/)

### Epic Mode

* [ ] Investigate working with C#/Ruby and Postgres

## Additional Resources

* [https://www.postgresql.org/docs/10/static/index.html](https://www.postgresql.org/docs/10/static/index.html
)
## Recommended Practice:

* For more practice, Hackerrank has a [SQL Track](https://www.hackerrank.com/domains/sql)