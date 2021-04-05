---
title: PGCLI
---

# pgcli

`pgcli` is a third party command line utility for interacting with PostgreSQL
databases. `pgcli` is a more capable verison of the built in `psql` command.

To use `pgcli` you must specify the database to connect to:

```shell
pgcli MyDatabaseNameHere
```

Example:

```
Server: PostgreSQL 13.2
Version: 3.1.0
Chat: https://gitter.im/dbcli/pgcli
Home: http://pgcli.com
MyDatabaseNameHere>



 [F2] Smart Completion: ON  [F3] Multiline: OFF  [F4] Emacs-mode
```

## Multiline

When typing long SQL statements it is often preferred to type them on multiple
lines. To turn on `Multiline` support press the `F3` key on your keyboard.

Notice in the example above I can enter each part of my SQL on it's own line.
This is helpful because when you need to edit you can use the arrow key to move
up/down lines easily.

Also, after running this command once, you can use the UP ARROW of your keyboard
to recall this command and then use your left/right as well as up/down arrows to
edit the command.

```
TacoTuesdayDatabase> SELECT *
 FROM "Restaurants"
 WHERE "Name" = 'Something';
+------+--------+---------------+-----------+-------------+----------+------------+-------------+------------+
| Id   | Name   | Description   | Address   | Telephone   | UserId   | Latitude   | Longitude   | PhotoURL   |
|------+--------+---------------+-----------+-------------+----------+------------+-------------+------------|
+------+--------+---------------+-----------+-------------+----------+------------+-------------+------------+
```

## Pager

If your select statement returns multiple lines of data you may find yourself
stuck in what is known as a "page".

A "pager" is a utility meant to provide pagination to a command line tool, much
like how a "Page: 1, 2, 3, ..." set of links do on a web application.

In the command line we can see we are in a pager when we see the text `(END)` or
`(MORE)` or `(PAGE)`. In the following example the "pager" is telling us we are
at the end of the data results:

```
TacoTuesdayDatabase> SELECT *
 FROM "Restaurants";
(END)...skipping...
+------+---------------------------+--------------------------------------------+--------------------------------------------+--------------+----------+--------------------+
| Id   | Name                      | Description                                | Address                                    | Telephone    | UserId   | Latitude           |
|------+---------------------------+--------------------------------------------+--------------------------------------------+--------------+----------+--------------------+
| 1    | Thoughtbeat               | Inverse zero administration benchmark      | 07 Meadow Vale Drive                       | 314-651-9791 | 0        | 0.0                |
| 2    | Dabtype                   | Organized stable firmware                  | 7 Miller Park                              | 523-760-6681 | 0        | 0.0                |
| 3    | Topdrive                  | Object-based interactive application       | 65 Eliot Lane                              | 650-993-7074 | 0        | 0.0                |
| 4    | Avaveo                    | Persistent zero defect process improvement | 2 Clarendon Junction                       | 715-663-5265 | 0        | 0.0                |
| 5    | Taco Mania                | <null>                                     | 444 Main Street                            | <null>       | 1        | 0.0                |
| 7    | Tacos by Mandy            |                                            | 456 Mandy Street.                          |              | 2        | 0.0                |
| 9    | Other Casita              |                                            | 2663 Central Ave, St. Petersburg, FL 33713 |              | 1        | 27.771217          |
| 10   | New Restaurant with Image | Got an Image                               | 123 Main Street, St Pete, FL 33701         |              | 1        | 39.23574647227224  |
| 11   | Else                      | Else                                       | Else                                       |              | 1        | -34.15781021118164 |
| 8    | Casita!!!!!!              | Best tacos in town                         | 2701 4th St N, St. Petersburg, FL 33704    | 727-555-1212 | 1        | 27.796928          |
+------+---------------------------+--------------------------------------------+--------------------------------------------+--------------+----------+--------------------+
SELECT 10
(END)
```

### Navigating forward and backward

Press the `spacebar` to move to the next page of results. Press the `b` key to
go back one page of results.

### Exiting the pager

Press the `q` key to exit the pager.
