---
title: Dictionary
---

## Dictionaries

So far, we've worked with single variables of various types and have discovered
arrays and lists. There is another kind of variable that is very useful named
the `Dictionary`.

If your intuition about what this kind of variable contains follows from the
word itself, you are not far off. A `Dictionary` acts just like an actual
dictionary, which has information to look up (a word) and associated information
(a definition).

When creating a dictionary, we need to tell `C#` the type of our lookup key and
the type of the associated information.

Let's say we are trying to store the score associated with each player on our
team. In this case, the lookup type will be a `string` (for the name), and the
associated type will be an `int` (for the score).

### Defining a Dictionary

That definition looks like:

```csharp
var playerScores = new Dictionary<string, int>();
```

### Adding to a Dictionary

And we can add information like this:

```csharp
playerScores.Add("Robbie Lakeman", 1_247_700);
```

### Finding information in a Dictionary

We can look up information with the same `[]` bracket syntax.

```csharp
var score = playerScores["Robbie Lakeman"];
```

However, if we look up a key that doesn't exist, we receive an exception, and
our program stops. Later on, we'll see how to avoid, as well as handle, these
kinds of errors.

### Changing information in a dictionary

Let's say that Robbie's score has increased by `100` to `1_247_800`, and we want
to update this information.

We can use the `[]` lookup syntax on the ** left-hand side** of an assignment to
_set_ a value in a dictionary.

```csharp
playerScores["Robbie Lakeman"] = 1_247_800;
```

This syntax will overwrite the existing value with the new one. If there was no
value for `"Robbie Lakeman"` then we would be setting a new value.

### Keys are case sensitive (value-sensitive)

Since `string`s are case-sensitive, we need to be careful when using them as
keys. The value at `playerScores["Robbie Lakeman"]` is different from the value
at `playerScores["robbie lakeman"]`.

### Looping through a dictionary

Like a `List`, a `Dictionary` can loop through its contents.

```csharp
foreach (var playerScore in playerScores)
{
	Console.WriteLine($"{playerScore.Key} has a score of {playerScore.Value}")
}
```

Since each element in the dictionary has a key part and a value part, the
variable `playerScore` will have a type known as a `KeyValuePair`. The
`KeyValuePair` has two properties, the `Key` and the `Value`. In our example the
`Key` is a `string` and the `Value` is an `int`. This is because the
`Dictionary` is of type `Dictionary<string, int>`.
