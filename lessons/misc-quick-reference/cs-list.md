---
title: C# List
---

A `C#` list is a flexible way to store a series of similar data types in one
variable. Whenever we need to store a sequence, of say `int` or `string`, or
even a more complex data type like a `class Movie`, we can use a `List`.

# List is a _generic_ type

Every time we declare a `List` we will put the data type for the kinds of data
to be stored in the list within a set of `<>` after the `List` keyword.

# Declaring a List

We can declare a list in several ways:

## Without any default values:

```C#
var numbers = new List<int>();

// or

List<int> numbers;
```

## With default values:

```C#
var numbers = new List<int>() { 42, 100, 50, -12, 98 };

// or

List<int> numbers = new List<int>() { 42, 100, 50, -12, 98 };
```

# Asking a list how many elements it has

We can ask for the `Count` property of a list as follows:

```C#
int howManyNumbers = numbers.Count
```

# Adding an element to the list

Unlike an `array`, our `List` can add elements (at the end of the list) with
this syntax:

```C#
List<string> people = new List<string> { "Fred", "Wilma", "Barney" };
people.Add("Betty");
people.Add("The Great Gazoo");
```

# Adding an element to a specific place in the list

If we know the index within the list where we want to add a new element, we can
use that index in the call to `Add`. All the elements in the existing list will
be "moved down one" to make space for the new element.

```C#
people.Add(2, "Pebbles");   // Add Pebbles at index 2 (moving Barney, Betty, and The Great Gazoo down one spot...)
people.Add(0, "Bamm Bamm"); // Adds Bamm Bamm at the beginning of the list (index 0)
```

# Removing an element from the list

If we know the value of an element in the list we can remove it. The method
returns `true` if it removed the element and `false` otherwise.

> NOTE: This will remove _all_ the values that match. So in the following code
> if we had multiple "Bamm Bamm" strings, all of them would be removed.

```C#
bool wasRemoved = people.Remove("Bamm Bamm");
```

We can also remove an element at a specific index:

```C#
people.RemoveAt(0); // Remove the first element of the list
```

# Getting the element at a specific index

Using the `[]` syntax we can get an element at a specific index.

```C#
var numbers = new List<int>() { 42, 100, 50, -12, 98 };

var firstNumber = numbers[0]; // Will be 42
var lastNumber = numbers[4]; // Will be 98
```

> NOTE: That the index is 0 based, so the _LAST_ element is at index
> `numbers.Count - 1`, or `5 - 1`, or index `4`.

# Removing all the elements

Calling `Clear` will remove all the elements

```C#
var numbers = new List<int>() { 42, 100, 50, -12, 98 };

var countBefore = numbers.Count; // Will be 5

numbers.Clear();

var countAfter = numbers.Count; // Will be 0
```

# Reversing a List

Sometimes an algorithm works best when we can go through a list in reverse. We
can ask for the elements of a list in reverse:

```C#
List<string> people = new List<string> { "Fred", "Wilma", "Barney" };
people.Reverse();
// people will be "Barney", "Wilma", "Fred"
```

We could combine this with `foreach` loop (see below) to loop through a list in
reverse order:

```C#
List<string> people = new List<string> { "Fred", "Wilma", "Barney" };

people.Reverse()
foreach(string person in people)
{
   Console.WriteLine(person);
}
// This will print:
// Barney
// Wilma
// Fred
```

# Sorting a List

If the elements in the list have a _natural ordering_, that is they can be
compared in a consistent order, we can use the `Sort()` method to put them in
order. This works very well for types like `string`, `int`, `decimal`, etc. For
more complex types like classes (e.g. `class Movie`) we need to provide a method
to `Sort` or move to `LINQ` to preform sorting.

```C#
var numbers = new List<int>() { 42, 100, 50, -12, 98 };

var sortedNumbers = numbers.Sort(); // sortedNumbers is -12, 42, 50, 98, 100
```

# Looping through a list

There are two easy ways to loop through a list.

## If you also need to know the `index` of each element as you go:

```C#
List<string> people = new List<string> { "Fred", "Wilma", "Barney" };

for (int index = 0; index < people.Count; index++)
{
  string currentPerson = numbers[index];

  // Do something with currentPerson
}
```

## If you need to loop through the list but _don't_ need the `index`

```C#
foreach(string person in people)
{
  // Do something with person
}
```
