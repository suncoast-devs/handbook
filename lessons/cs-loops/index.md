---
title: Looping
assignments:
  - cs-all-cards-on-deck
---

Often in programming, we need to perform a task repeatedly or we need to process
all of the items in some collection. For these situations we can use the idea of
`loops`.

Let's say we want to perform some statement, or statements, `10` times. We could
do this with the `while` control flow statement as follows:

```csharp
var counter = 0;

while (counter < 10) {
  Console.WriteLine("Doing something");

  counter++;
}
```

> NOTE that `counter++` is a shortcut for `counter = counter + 1`

This kind of loop is so common that we have a special syntax for it, the
`for loop`. The basic structure of a for loop is:

```csharp
for(INITIALIZATION; CONDITION; AFTERTHOUGHT) {
  // Loop statements
}
```

The code that goes in the `INITIALIZATION` often initializes a variable that
will be used in the `CONDITION` and the `AFTERTHOUGHT`.

```csharp
for (var counter = 0; counter < 10; counter++) {
  Console.WriteLine("Doing something");
}
```

As you can see, all the elements of the `while` loop have their own place in the
`for` loop example.

Another way to read the for loop is **Start the counter at 0 and as long as the
value of counter is less than 10, do the contents of the loop and then increment
counter**.

## Looping through an array

The `for` loop is also helpful for processing all the elements of an `array` or
`List`.

```csharp
string[] names = { "Mark", "Paula", "Sandy" , "Bill" };
```

If we wanted to print all the individual names in the array we could write a
loop like:

```csharp
for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}
```

In this case we start the `index` at 0 since our array index starts at `0`. And
we want to keep the loop going as long as the index stays _less_ than the length
of the array (again, since array indexes start at `0` and end one index _before_
the value of their length).

This code works well but there is an even more succinct syntax called `foreach`.

```csharp
foreach (var name in names) {
  Console.WriteLine(name);
}
```

The `foreach` method assumes we are going to work through the entire array.

## Looping through List

Fortunately the `for` loop and `foreach` loop work similarly for a `List`

```csharp
var names = new List<string>() { "Mark", "Paula", "Sandy" , "Bill" };
foreach (var name in names) {
  Console.WriteLine(name);
}
```

```csharp
var names = new List<string>() { "Mark", "Paula", "Sandy" , "Bill" };
for (var index = 0; index < names.Count; index++) {
  var name = names[index];
  Console.WriteLine(name);
}
```
