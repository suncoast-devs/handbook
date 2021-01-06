Theme: Next, 1

<!-- prettier-ignore-start -->

# [fit] Arrays and Lists
# [fit] Tracking more than one thing

![](https://i.pinimg.com/originals/dc/9c/d8/dc9cd8cb84ecf2deeaaa7ba8df5f3748.gif)

---

So far we've only been able to keep track of one thing per variable.

[.column]

Keeping track of more than one thing.

[.column]

```csharp
var name1 = "Mark";
var name2 = "Paula";
var name3 = "Sandy";
var name4 = "Bill";
```

---

#  Arrays

```csharp

//               Type
//               |   
//               |   Array
//               |    ||
//               |    ||  Start of list of values
//               |    ||   |
//               |    ||   |            Values
//               |    ||   |             |
//               |    ||   |             |                    End of list
//               |    ||   |             |                     |
//               |    ||   |             |                     |
//               v    vv   v             v                     v
var names = new string[]   { "Mark", "Paula", "Sandy" , "Bill" };
```

---

# Accessing elements

Bring back our friend the `[]` index operator.

Similar to accessing the individual characters in a string, `[]` allows us to access the individual elements of an array.

Indexes start at `0`.

```csharp
var firstName = names[0];
var secondName = names[1];
```

---

# [fit] We can also ask for the length of the array.

```csharp
var nameCount = names.Length;
```

---


# [fit] Unfortunately `array`s come with some limitations:

- Once an array is created, it's size cannot change
- If we access an index that does not exist our program will crash. For example `names[42]` will cause our program to have an exception and stop.
- Arrays can only store data of the same type

---

# Welcome to: List

Luckily there is a more flexible type that provides the features we'd want from a list of data.
Even more fortunate, it is conveniently named: `List`

---

To create a list of strings with some data:

```csharp
//
//              Making a new List
//              |
//              |    ... of strings
//              |    |
//              |    |          Start of initial list of strings
//              |    |          |
//              |    |          |       Values
//              |    |          |       |
//              |    |          |       |                 End of list
//              |    |          |       |                           |
//              |    |          |       |                           |
//              v    |          v       v                           v
var names = new List<string>()  { "Mark", "Paula", "Sandy" , "Bill" };
```

---

# Adding a `using` statement

If you add this code to a program you will notice red-squiggly errors for `List`.

The `List` is not an intrinsic type. This means that we need to tell `C#` to use it in our code.

To do this we need to add a `using` statement. `using` tells `C#` what other code ours depend on.

---

# VS Code Auto fix

Luckily VS Code is very smart.

We can click on `List` and press **Control .** -- or click on the **lightbulb** icon to see a list of quick fixes.

We want to use the one that adds a `using` statement.

In this case `using System.Collection.Generic` -- This is the **namespace** where the `List` code lives.

---

Now that we have our list we can work with it.

The `List` is still accessed with the `[]` bracket syntax and is still zero indexed:

```csharp
var firstName = names[0];
var secondName = names[1];
```

---

We can find out how many elements are in the list but we must use a new syntax:

```csharp
var numberOfNamesInList = names.Count;
```

For `List` we use `Count` instead of `Length` and notice the `()` after `Count`

This is because `Count` is a **method** not a **property** -- We'll be talking about these soon.

---

Since these `List`s are more flexible we can **add** elements to the list.

```csharp
names.Add("George");
```

---

We can create `List`s of other types as well.

```csharp
var listOfScores = new List<int>();
listOfScores.Add(12);
listOfScores.Add(100);
listOfScores.Add(55);
listOfScores.Add(44);
```

---

# [fit] We will be using `List` quite a lot in our time with `C#`.


<!-- prettier-ignore-end -->
