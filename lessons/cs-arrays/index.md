---
title: Arrays and Lists
---

Arrays and Lists are common data types in many languages. They are an excellent
choice for storing a collection (ordered) of items. In C# we have two kinds, an
`array` and a `List`. This lesson will show both kinds with `List` being the
more common type in `C#`.

## Arrays

So far we have only been able to store a single value inside a variable. Take
our `var name = "Mark";` example. What if we were writing an application to keep
track of all the names of the students on a work or sports team? We could try
something like:

```csharp
var name1 = "Mark";
var name2 = "Paula";
var name3 = "Sandy";
var name4 = "Bill";
```

But we'd have to keep inventing variable names as our team grew, and we'd have
unused names if we removed someone from the team.

This is a great case for using a type called an `array`. An array allows us to
store more than one value and maintains the order of the items.

```csharp
var names = new string[] { "Mark", "Paula", "Sandy" , "Bill" };
```

On the right-hand side we list the initial elements of the array and place them
inside `{ }` braces.

This syntax also works to declare an array:

```csharp
string[] names = { "Mark", "Paula", "Sandy" , "Bill" };
```

Now we can access the elements of the array much like we did the individual
characters of the string.

```csharp
var firstName = names[0];
var secondName = names[1];
```

We can also ask for the length of the array.

```csharp
var nameCount = names.Length;
```

Unfortunately `array`s come with some limitations:

- Once an array is created, it's size cannot change
- If we access an index that does not exist our program will crash. For example
  `names[42]` will cause our program to have an exception and stop.
- Arrays can only store data of the same type

Luckily there is a more flexible type that provides the features we'd want from
a list of data. Even more fortunate, it is conveniently named: `List`

## Lists

Lists are more flexible than arrays while maintaining some of their key
features.

To create a list of strings with some data:

```csharp
var names = new List<string>()  { "Mark", "Paula", "Sandy" , "Bill" };
```

> NOTE, the `string[] names = ` style of declaration only works for arrays. We
> cannot use it here for a `List`

You will notice some new syntax here. First is the `List<string>` and the `()`
that follows.

The `new` keyword indicates to `C#` that we are creating a new `object` of a
specific `class`. We cover objects and classes in another lesson, so for now
just remember that this is the syntax for creating a new `List`. The `()`
afterward are where we would put information about how to create the list and is
part of the required syntax.

Now that we have our list we can work with it.

The `List` is still accessed with the `[]` bracket syntax and is still zero
indexed:

```csharp
var firstName = names[0];
var secondName = names[1];
```

We can find out how many elements are in the list:

```csharp
var numberOfNamesInList = names.Count;
```

Finally, since these `List`s are more flexible we can **add** elements to the
list.

```csharp
names.Add("George");
```

We can create `List`s of other types as well.

```csharp
var listOfScores = new List<int>();
listOfScores.Add(12);
listOfScores.Add(100);
listOfScores.Add(55);
listOfScores.Add(44);
```

## Lists must contain items of the same type

This code won't work:

```csharp
var listOfScores = new List<int>();
listOfScores.Add(12);

// This code won't run because our list can only contain integers.
listOfScores.Add("Bianca");
```

## Other helpful List features

The `List` has other features that are useful. The following list is not
complete. The
[full list](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=net-5.0)
of `List` features is in the official .NET documentation. While programming
documentation can be difficult to read you should start getting familiar with
the style and language used.

We will be using `List` often in our time with `C#` so here are some helpful
methods and how they work.

### Clear

This method removes all the elements from the current list.

```csharp
var listOfScores = new List<int>();
listOfScores.Add(12);
listOfScores.Add(100);
listOfScores.Add(55);
listOfScores.Add(44);

Console.WriteLine($"Our list now has {listOfScores.Count} elements"); // Prints 4

listOfScores.Clear();

Console.WriteLine($"Our list now has {listOfScores.Count} elements"); // Prints 0

listOfScores.Add(42);

Console.WriteLine($"Our list now has {listOfScores.Count} elements"); // Prints 1
```

### IndexOf

This method looks for an element that matches the value we supply. If the value
is in the list, we receive the `0-based-index` of the element. That is, if the
value is found in the very first position we receive `0` as the result. If it is
in the second position we receive `1`. returned if it is found. If the value is
not in the list, the special value `-1` is returned. Since `-1` can never be a
valid index it indicates _"not found"_

```csharp
var listOfScores = new List<int>();
listOfScores.Add(12);
listOfScores.Add(100);
listOfScores.Add(55);
listOfScores.Add(44);

var indexOfFiftyFive = listOfScores.IndexOf(55);
Console.WriteLine($"Found 55 at index {indexOfFiftyFive}"); // Prints 2

var indexOfFourtyTwo = listOfScores.IndexOf(42);
Console.WriteLine($"Didn't find 42 so this index is {indexOfFourtyTwo}"); // Prints -1
```

### Insert

Inserts a new value at the index specified. The first value supplied to `Insert`
is the index position and the second element is the value to insert.

```csharp
var listOfScores = new List<int>();
listOfScores.Add(12);
listOfScores.Add(100);
listOfScores.Add(55);
listOfScores.Add(44);

// Insert the number `42` so it placed at index 2 (in this case after the 100)
listOfScores.Insert(2, 42);

// Now our list has: 12, 100, 42, 55, and 44
```

### Remove

Removes the value from the list. Only the first occurrence of the value is
removed. For instance in the example below, there are two `55`s in the list.
After calling `Remove(55)` there is still one `55` in the list.

```csharp
var listOfScores = new List<int>();
listOfScores.Add(12);
listOfScores.Add(100);
listOfScores.Add(55);
listOfScores.Add(44);
listOfScores.Add(55);

Console.WriteLine($"Our list has {listOfScores.Count} values"); // Prints 5
listOfScores.Remove(55);

Console.WriteLine($"Our list has {listOfScores.Count} values"); // Prints 4
```

### RemoveAt

If we want to remove a value at a specific instance we can call `RemoveAt` and
supply the index.

```csharp
var listOfScores = new List<int>();
listOfScores.Add(12);
listOfScores.Add(100);
listOfScores.Add(55);
listOfScores.Add(44);
listOfScores.Add(55);

Console.WriteLine($"Our list has {listOfScores.Count} values"); // Prints 5

// This will remove the `44` since it's index 3.
listOfScores.RemoveAt(3);

Console.WriteLine($"Our list has {listOfScores.Count} values"); // Prints 4
```

### Reverse

This reverses the list in place.

```csharp
var listOfScores = new List<int>();
listOfScores.Add(12);
listOfScores.Add(100);
listOfScores.Add(55);
listOfScores.Add(44);
listOfScores.Add(55);

listOfScores.Reverse();

// Now our list has 55 44 55 100 12
```

### Sort

This orders the values in place.

```csharp
var listOfScores = new List<int>();
listOfScores.Add(12);
listOfScores.Add(100);
listOfScores.Add(55);
listOfScores.Add(44);
listOfScores.Add(55);

listOfScores.Sort();

// Now our list has 12 44 55 55 100
```
