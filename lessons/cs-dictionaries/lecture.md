Theme: Next, 1

# [fit] Dictionaries

# [fit] Tracking related data

---

So far, we've worked with single variables of various types and have discovered arrays and lists. There is another kind of variable that is very useful named the `Dictionary`.

---

# Lookups and Values

A `Dictionary` in `C#` acts much like a physical dictionary, something that has information to lookup (perhaps a word) and an associated kind of information (perhaps a definition).

When creating a dictionary, we need to tell `C#` the type of our lookup key and the type of the associated information.

---

# Example

Let's say we are trying to store the score associated with each player on our team. In this case, the lookup type will be a `string` (for the name), and the associated type will be an `int` (for the score).

---

# Defining a Dictionary

That definition looks like:

```csharp
var playerScores = new Dictionary<string, int>();
```

---

# Adding to a Dictionary

And we can add information like this:

```csharp
playerScores.Add("Robbie Lakeman", 1_247_700);
```

---

# Finding information in a Dictionary

We can look up information with the same `[]` bracket syntax.

```csharp
var score = playerScores["Robbie Lakeman"];
```

---

# Missing Keys

However, if we look up a key that doesn't exist, we receive an exception, and our program stops. Later on, we'll see how to avoid, as well as handle, these kinds of errors.

---

# Missing Keys

We can ask the `Dictionary` if it has a key.

```csharp
var hasKey = playerScores.ContainsKey("Billy Mitchell"); // false
```

---

# Changing information in a dictionary

Let's say that Robbie's score has increased by `100` to `1_247_800`, and we want to update this information.

We can use the `[]` lookup syntax on the **left hand side** of an assignment to _set_ a value in a dictionary.

```csharp
playerScores["Robbie Lakeman"] = 1_247_800;
```

---

# Keys are case sensitive (value-sensitive)

Since `string`s are case-sensitive, we need to be careful when using them as keys.

The value at `playerScores["Robbie Lakeman"]` is different from the value at `playerScores["robbie lakeman"]`.

---

### Looping through a dictionary

Like a `List`, a `Dictionary` can be looped through.

```csharp
foreach (var playerScore in playerScores)
{
	Console.WriteLine($"{playerScore.Key} has a score of {playerScore.Value}")
}
```

- Each element in the dictionary has a key part and a value part
- The variable `playerScore` will have a type known as a `KeyValuePair`
- The `KeyValuePair` has two properties, the `Key` and the `Value`.

# Dictionaries are powerful

Any time we are _tabulating_ data or summarizing data based on a key, we can use a dictionary. You will find them appearing in data analysis tasks and are often valuable for solving code katas on sites such as [codewars](https://codewars.com)
