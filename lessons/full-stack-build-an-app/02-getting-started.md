---
title: Start With User Stories and a Wireframe
order: 2
---

# Getting Started

With any application, we should start by gathering the general use stories for
our application. In this case, we would like to gather all of the taco producers
in town in an organized way while allowing users to rank and review them.

As such our user stories might be something like the following:

- As a user, I should be able to view and search for taco restaurants.
- As a user, I should be able to view the details of a specific restaurant,
  including:
  - Name
  - Description
  - Address and phone number
  - A list of reviews
  - The average rating
- As a user, I should be able to anonymously post a new taco restaurant.
- As a user, I should be able to review an existing restaurant.
- As a user, I should be able to rate a restaurant.

# Generate a wireframe

Based on the user stories we should be able to generate a rough wireframe of the
user interface that would support these features. We would try to imagine a user
experience that would make a usable application that implements the "Minimum
Viable Product".

For an application we expect to charge users for, this would be the least amount
of features and thus effort for which they would pay us. For an application that
we are building for private, or internal, use, this would be the least amount of
features that our users would adopt the system in place of whatever system they
are presently using.

![](https://brianpagan.net/wp-content/uploads/2015/08/Bya3nBvCQAASBGi.png)

> Via
> https://brianpagan.net/2015/lean-startup-mvp-how-to-make-meaningful-products/

Here we see the elements an application requires.

- Functionality: The actual functions of the system must exist and do what they
  claim they do
- Reliable: The system must be reliable. It must stay running, it must be
  resistant to user input errors, must return the data the user expects, and not
  lose existing data during the development process.
- Usable: Users should be able to quickly learn the system and use it. It must
  not be cumbersome, certainly not more cumbersome than the system it replaces.
- Emotional Design: The design of the system must inspire users to want to use
  the application. It must anticipate the user's needs and be consistent in its
  behavior and responses.

These are lofty goals and we cannot focus the entire time on any one level of
this pyramid. We must iterate through vertical slices as we visit each function
of our application. That is when working on each part of the system we want to
include all four of these aspects in some amount. As we proceed through the
features we will make discoveries that will allow us to revisit each of these
aspects on all the features. We may also discover, through iteration, that
certain features and functions may elimiated, saving us a tremendous amount of
time.

> No code is easier to develop and executes more efficiently than code you never
> have to write.

## Home Page Wireframe

![wireframe](./assets/taco-tuesday-home-screen.png)

---

# ERD

From these wireframes, we can start to collect the details of the entities our
system needs to represent. From the user stories and wireframe we can see we may
have the following entities:

```text
Restaurant
----------
Name
Description
Address
Telephone
Average Stars?
Review Count?
```

and

```text
Review
------
Summary
Body
Stars
Creation Timestamp
Restaurant
```

and we would describe the relationships between these two entities as:

```text
Restaurants have many Reviews
Review belongs to one Restaurant
```

## Validate the ERD

Validate that this ERD supports the data on the wireframes we have generated in
the previous step. See if you can identify what entities, and potentially what
queries, generate the data on each of the pages. What data does the page need to
operate? For instance, a page showing the details of a single restaurant will
need the restaurant ID (which we'll likely get from the URL and React Router)
while the main listing page will need a collection of many of the restaurants,
perhaps filtered by a phrase.
