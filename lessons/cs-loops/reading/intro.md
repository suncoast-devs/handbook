## Looping

Often in programming we need to do a task a certain number of times, or we need to process all the items in some collection. This is where the idea of `loops` can help.

Let's say we want to do some statement `10` times. We could do this with the `while` control flow statement as follows:

```C#
var counter = 0;

while (counter < 10) {
  Console.WriteLine("Doing something");

  counter++;
}
```

> NOTE the `counter++`, this is a shortcut for `counter = counter + 1`

This kind of loop is so common that we have a special syntax for it, the `for loop`. The basic structure of a for loop is:

```C#
for(INITIALIZATION; CONDITION; POST-LOOP) {
  // Loop statements
}
```

The code that goes in the `INITIALIZATION` often initializes a variable that will be used in the `CONDITION` and the `POST-LOOP`.

```C#
for (var counter = 0; counter < 10; counter++) {
  Console.WriteLine("Doing something");
}
```

As you can see, all the elements of the `while` loop have their own place in the `for` loop example.

Another way to read the for loop is **Start the counter at 0 and as long as the value of counter is less than 10, do the contents of the loop and then increment counter**

## Looping through an array

The `for` loop is also helpful for processing all the elements of an `array` or `List`

```C#
string[] names = { "Mark", "Paula", "Sandy" , "Bill" };
```

If we wanted to print all the individual names in the array we could write a loop like:

```C#
for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}
```

In this case we start the `index` at 0 since our array index start at `0`. And we want to keep the loop going as long as the index stays _less_ than the length of the array (again, since array indexes start at `0` and end one index _before_ the value of their length)

This code works well but there is an even more succinct syntax called `foreach`

```C#
foreach (var name in names) {
  Console.WriteLine(name);
}
```

The `foreach` method assumes we are going to work through the entire array.

## Looping through List

Fortunately the `for` loop and `foreach` loop work similarly for a `List`

```C#
var names = new List<string>() { "Mark", "Paula", "Sandy" , "Bill" };
foreach (var name in names) {
  Console.WriteLine(name);
}
```

```C#
var names = new List<string>() { "Mark", "Paula", "Sandy" , "Bill" };
for (var index = 0; index < names.Count; index++) {
  var name = names[index];
  Console.WriteLine(name);
}
```
