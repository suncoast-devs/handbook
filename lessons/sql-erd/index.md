---
title: Entity Relationship Diagram
---

When modeling our systems, we need to represent real-world things in a format
that lends itself to being stored in a relational database. One of our jobs as a
software developer is to understand the business process and the business
problem well enough that we can accurately model not only the current problem
but also create a structure that can bend and change to future requirements.

One tool we can use to translate from the world of business requirements to a
database structure is the Entity Relationship Diagram (ERD). ERD diagrams are a
way to represent the structure of our business entities in a way that we can
translate into database tables and relationships.

## Representing our business logic and problem in natural language

When working on a business problem, we should be on the lookout for statements
that reveal the types and structure of data we want to manage.

> "Keep track of students, the courses the students they are taking, and the
> course's teacher."

> "Record the customer's order, the items on each order, and which of the
> customer's addresses to ship to."

> "Record the author, time of creation, and contents of the blog post. Also
> record comments including who commented and when."

Within these descriptions, we are looking for different types of words to help
guide us. We should be looking for:

- Nouns: a thing, such as a student, a customer, or an order.
- Verbs: an action, such as enroll or ship.
- Adjectives: a describing word such as posted or approved.

## The components of an ERD

### Entities

The first component of an ERD is an entity. These typically represent the major
_nouns_ of our system.

> "Keep track of students, the courses the students they are taking, and the
> course's teacher."

```
+---------------+      +---------------+      +---------------+
|               |      |               |      |               |
|    Student    |      |     Course    |      |    Teacher    |
|               |      |               |      |               |
+---------------+      +---------------+      +---------------+
```

### Attributes

Next, we will determine the attributes of each of these nouns. These would be
things like "the student's name," "the student's age," "the student's birthday,"
"the course's name," "the course's description," and "the teacher's name."

```
+-------------+      +---------------+      +-----------+
|  Student    |      |   Course      |      |  Teacher  |
+-------------+      +---------------+      +-----------+
|  Name       |      |   Name        |      |  Name     |
|  Age        |      |   Description |      |           |
|  Birthday   |      |               |      |           |
+-------------+      +---------------+      +-----------+
```

You'll notice that all the attributes are singularly named and store a single
value. If we had a multiple-value attribute of an entity, say multiple phone
numbers for a `Teacher,` we'd create another entity to track those.

In addition to the names of the attributes, we may also capture the type of data
the attribute represents. `Name,` for instance, would be text while `Age` is a
number, and `Birthday` is a date. These data types will become column types
eventually in our database.

### Relationships

After identifying the entities and their attributes, we can identify the
relationships.

```
+-------------+                     +--------------+                   +-----------+
|  Student    |                     |  Course      |                   |  Teacher  |
+-------------+                     +--------------+                   +-----------+
|  Name       |                     |  Name        |                   |  Name     |
|  Age        | <-- enrolled in --> |  Description | <-- taught by --> |           |
|  Birthday   |                     |              |                   |           |
+-------------+                     +--------------+                   +-----------+
```

If we determine that a relationship, in this case, _enrolled in_ needs extra
data stored along with it, say the date the student enrolled, we'll create
another entity to hold that.

```
+-------------+                     +--------------+                          +--------------+                   +-----------+
|  Student    |                     |  Enrollment  |                          |  Course      |                   |  Teacher  |
+-------------+                     +--------------+                          +--------------+                   +-----------+
|  Name       |                     |  Date        |                          |  Name        |                   |  Name     |
|  Age        | <-- has many -->    |              | <-- assigned to one -->  |  Description | <-- taught by --> |           |
|  Birthday   |                     |              |                          |              |                   |           |
+-------------+                     +--------------+                          +--------------+                   +-----------+
```

## Translating to our database

If we take the time to map out the entities, attributes, and relations in an ERD
diagram we can begin to see the data structure in our application. ERD diagrams
also serve as good documentation for your project and allow you to review with
the various _stakeholders_ since the diagrams are also easy for non-developers
to understand (perhaps with a little help).

## Resources

There are many software tools for generating ERD diagrams. If you'd like to try
these tools, we suggest these:

- [LucidChart](https://www.lucidchart.com)
- [Draw.io](Draw.io)
