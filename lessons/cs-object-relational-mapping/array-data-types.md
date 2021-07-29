---
title: Array Data Types
order: 3
---

So far, we have seen column types that can only store a single value. However,
some databases have an array data type that can store multiple values.

# Array Data Types

The database we are using in this course, PostgreSQL, has an array data type. We
would define a column as an array of a specific type. For instance, a column
that stores an array of integers. The SQL code for this is:

```sql
CREATE TABLE "Players" ("Name" text, "Scores" integer[]);
```

# Inserting into an array column

To insert values, we need a slightly different SQL syntax. We need to specify
the value is an array.

```SQL
INSERT INTO "Players" ("Name", "Scores")
VALUES ('Sally', ARRAY [95, 92, 96, 97, 98] );
```

# Selecting values

Using `SELECT` we can select the array values.

```SQL
SELECT * FROM "Players";
```

```
+--------+----------------------+
| Name   | Scores               |
+--------+----------------------|
| Sally  | [95, 92, 96, 97, 98] |
+--------+----------------------+
```

# Using a WHERE statement to filter based on the array values

Again the syntax for this type of comparison is slightly different.

| Operator       | Returns | Description                                                |
| -------------- | ------- | ---------------------------------------------------------- |
| int[] && int[] | boolean | overlap — true if arrays have at least one common element  |
| int[] @> int[] | boolean | contains — true if left array contains right array         |
| int[] <@ int[] | boolean | contained — true if left array is contained in right array |

Examples:

## Overlap

```SQL
SELECT * FROM "Players" WHERE "Scores" && ARRAY [98, 100];
```

This query returns `Sally` since there is an overlap between the two arrays.

## Contains

```SQL
SELECT * FROM "Players" WHERE "Scores" @> ARRAY [98];
```

This returns `Sally` since the scores includes the value 98.

## Contained

```SQL
SELECT * FROM "Players" WHERE "Scores" <@ ARRAY [95,92,96,97,98,100];
```

This returns `Sally` since the array `[95,92,96,97,98]` is contained in the
array`[95,92,96,97,98,100]`.

# Using this from C#

To make this work in C# by defining a class with a `List<int>` property.

```C#
public class Player
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<int> Scores { get; set; }
}
```

We can then write code such as this to add a new player.

```csharp
var context = new DatabaseContext();

var player = new Player
{
    Name = "Sandy",
    Scores = new List<int> { 5, 10, 22, 100 }
};

context.Players.Add(player);
context.SaveChanges();
```

And we can use `Contains` to check if the player has a score of 100.

```csharp
  var players = context.Players.Where(player => player.Scores.Contains(100));
  Console.WriteLine($"There are {players.Count()} players with a score of 100");
```

# Complications and Issues

Generating syntax for intersection and containment is a bit tricky from C#. The
`Contains` example above is likely to meet many of your requirements. However,
if your array needs get complex, you might find it easier to use a joined table.

You might be inclined to make an array of `ID` integers that link to other
tables. Using an array of IDs is often not a good solution as you cannot easily
"JOIN" against a column that is an array, and thus you lose some of the benefits
of the _relational_ aspects of a `Relational Database`.

Also, be aware that not all databases support this type of array. If you use
this type in your models, you will be restricted to a database that supports it.

If you find yourself needing a small array of data associated to a table,
consider the array type. However, also consider that a separate table is often a
better solution.
