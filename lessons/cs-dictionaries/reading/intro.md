---
title: Dictionary
---

## Dictionaries

So far we've worked with single variables of various types and have discovered
arrays and lists. There is another kind of variable that is very useful named
the `Dictionary`.

If your intuition about what this kind of variable contains follows from the
word itself, you are not far off. A `Dictionary` acts just like an actual
dictionary, something that has a kind of information to lookup (say a word) that
returns an associated kind of information (say a definition).

When creating a dictionary we need to tell `C#` what kind of data our lookup key
has and what kind of data our associated information is.

Let's say we are trying to store the score associated to each player on our
team. In this case the lookup type will be a `string` (for the name) and the
associated type will be an `int` (for the score).

That definition looks like:

```csharp
var playerScores = new Dictionary<string, int>();
```

And we can add information like this:

```csharp
playerScores.Add("Robbie Lakeman", 1247700);
```

We can look up information with the same `[]` bracket syntax.

```csharp
var score = playerScores["Robbie Lakeman"];
```

However, if we look up a key that doesn't exist we receive an exception and our
program stops. Later on, we'll see how to avoid, as well as handle, these kinds
of errors.
