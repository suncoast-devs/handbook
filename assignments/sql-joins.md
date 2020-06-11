---
title: Foreign Keys - The SQL
tags: ["sql"]
---

As we continue to explore databases and ideas, this project will help you
practice model databases and relationships.

We will be expanding on our `CompanyDatabase` from the
[sql-intro assignment](/assignments/sql-intro). You will be adding new tables
and be writing queries for these new tables.

Reuse the same repository from that assignment for this assignment. Add the new
queries _below_ the queries from that assignment such that the one repository
will have both sets of queries. Use the same repository URL to turn in tonight's
homework.

## Objectives

- Work with foreign keys
- Craft queries that join tables

### Explorer Mode

- [ ] In your `CompanyDatabase`, add a table named `Departments` with the
      following columns:
  - `Id` as a primary key
  - `DepartmentName` as text
  - `Building` as text
- [ ] Add a Foreign key `DepartmentId` to your `Employees` Table. If you have
      trouble, remove the existing employees by running
      `truncate table "Employees"`.
- [ ] Add tables named `Products` and `Orders`.
  - `Orders` should have the columns
    - `Id` as a primary key
    - `OrderNumber` as a string
    - `DatePlaced` as a datetime
    - `Email` as a string
  - `Products` should have the columns
    - `Id` as a primary key
    - `Price` as a double
    - `Name` as a string
    - `Description` as a string
    - `QuantityInStock` as an integer
- [ ] In our company, one `Order` can have many `Products` and one `Product` can
      have many `Orders`. This will be a Many-to-Many relationship. Create the
      necessary table `ProductOrders`, foreign keys, and the
      `OrderQuantity`field needed for this to happen.

* [ ] Create queries that can do the following:

  - [ ] Insert the following `Departments`

  | Department Name | Building |
  | --------------- | -------- |
  | Development     | Main     |
  | Marketing       | North    |

  - [ ] Insert the following `Employees`

  | FullName       | Salary | JobPosition | PhoneExtension | IsPartTime | Department Id |
  | -------------- | ------ | ----------- | -------------- | ---------- | ------------- |
  | Tim Smith      | 40000  | Programmer  | 123            | false      | 1             |
  | Barbara Ramsey | 80000  | Manager     | 234            | false      | 1             |
  | Tom Jones      | 32000  | Admin       | 456            | true       | 2             |

- [ ] Insert the following `Products`

  | Price | Name    | Description          | QuantityInStock |
  | ----- | ------- | -------------------- | --------------- |
  | 12.45 | Widget  | The Original Widget  | 100             |
  | 99.99 | Flowbee | Perfect for haircuts | 3               |

* [ ] Insert a new order with order number `X529`, placed on Jan 1st, 2020 at
      4:55PM, by someone with the email address "person@example.com"
* [ ] Add an order quantity of `3` for the product named `Widget` to the order
      `X529`
* [ ] Add an order quantity of `2` for the product named `Flowbee` to the order
      `X529`
* [ ] Given a department id, return all employees in the department.
* [ ] Given a department name, return all the phone extensions.
* [ ] Find all orders that contain the product id of `2`.
* [ ] Remove the `Flowbee` product from order with order number `X529`.

### Adventure Mode

### Epic Mode

- [ ] Give these [SQL Koans](https://sqlkoans.com/) a try.

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
