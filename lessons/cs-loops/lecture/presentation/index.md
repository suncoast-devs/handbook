theme: Next,1

<!-- prettier-ignore-start -->

# [fit] `Looping`

![inline fit](https://media.giphy.com/media/OtP2Jj6IuVbhu/giphy.gif)

---

- Perform a task repeatedly or a certain number of times

- Perform a task repeatedly until a condition is met

- Process all the items in a collection

---

We've seen this with the `while` control flow:

## Do something 10 times.

```csharp
var counter = 0;

while (counter < 10) {
  Console.WriteLine("Doing something");

  counter++;
}
```

^ `counter++` is a shortcut for `counter = counter + 1`

---

# Introducing `for` loop

```csharp

// Do this at the start
//      |
//      |        Keep going as long as this is true
//      |               |
//      |               |     Do this after each loop is done
//      |               |         |
//      |               |         |
//      V               V         V
for(INITIALIZATION; CONDITION; AFTERTHOUGHT) {
  // Loop statements
}
```

---

# [fit] Revisiting printing something 10 times

```csharp
// Start the counter at 0
//      |
//      |        Keep going as long as counter is less than 10
//      |               |
//      |               |        Increment counter after each loop is done
//      |               |             |
//      |               |             |
//      V               V             V
for (var counter = 0; counter < 10; counter++) {
  Console.WriteLine("Doing something");
}
```

^ Another way to read the for loop is Start the counter at 0 and as long as the
value of counter is less than 10, do the contents of the loop and then increment
counter

---

# Looping through an array

```csharp
string[] names = { "Mark", "Paula", "Sandy" };
```

Let's loop through this array and print out each name.

```csharp
// Start the index at 0
//      |
//      |        Keep going as long as index is less than the length of the array
//      |                 |
//      |                 |        Increment index after each loop is done
//      |                 |                   |
//      |                 |                   |
//      v                 v                   v
for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

---

# Pretending we are .NET

It is often helpful to imagine we are .NET and walk through the code and see it
how the computer does

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

---

[.column]

[.code-highlight:1]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

Make an array of three strings.

```
name    =>  "Mark", "Paula", "Sandy"
```

---

[.column]

[.code-highlight:3]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

First time at this loop. Do the initialization. Make `index` equal to `0`

[.code-highlight:2]

```
name    =>  "Mark", "Paula", "Sandy"
index   =>  0
```

---

[.column]

[.code-highlight:4]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

Make `currentName` equal to whatever is at the index given by `index`. Well `index` is `0` so that makes `currentName` equal to `"Mark"`

[.code-highlight:3]

```
name        =>  "Mark", "Paula", "Sandy"
index       =>  0
currentName =>  "Mark"
```

---

[.column]

[.code-highlight:6]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

Call the method `Console.WriteLine` and provide it the value in `currentName` which is currently `"Mark"`

[.code-highlight:3]

```
name        =>  "Mark", "Paula", "Sandy"
index       =>  0
currentName =>  "Mark"
```

---

[.column]

[.code-highlight:7]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

End of the loop, so do the afterthought step of `index++`, turning the value of `0` to `1`

[.code-highlight:2]

```
name        =>  "Mark", "Paula", "Sandy"
index       =>  1
currentName =>  "Mark"
```

---

[.column]

[.code-highlight:3]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

Back to the loop. Since `currentName` is defined inside the loop we forget that variable. Time to do the comparison. Is `index` (`1`) less than `names.Length` (`3`). Yes, so do the loop again.

[.code-highlight:2]

```
name        =>  "Mark", "Paula", "Sandy"
index       =>  1
```

---

[.column]

[.code-highlight:4]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

Make `currentName` equal to whatever is at the index given by `index`. Well `index` is `1` so that makes `currentName` equal to `"Paula"`

[.code-highlight:3]

```
name          =>  "Mark", "Paula", "Sandy"
index         =>  1
currentName   =>  "Paula"
```

---

[.column]

[.code-highlight:6]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

Call the method `Console.WriteLine` and provide it the value in `currentName`
which is currently `"Paula"`

[.code-highlight:3]

```
name        =>  "Mark", "Paula", "Sandy"
index       =>  1
currentName =>  "Paula"
```

---

[.column]

[.code-highlight:7]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

End of the loop, so do the afterthought step of `index++`, turning the value of `1`
to `2`

[.code-highlight:2]

```
name        =>  "Mark", "Paula", "Sandy"
index       =>  2
currentName =>  "Paula"
```

---

[.column]

[.code-highlight:3]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

Back to the loop. Since `currentName` is defined inside the loop we forget that variable. Time to do the comparison. Is `index` (`2`) less than `names.Length` (`3`). Yes, so do the loop again.

[.code-highlight:2]

```
name        =>  "Mark", "Paula", "Sandy"
index       =>  2
```

---

[.column]

[.code-highlight:4]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

Make `currentName` equal to whatever is at the index given by `index`. Well `index` is `2` so that makes `currentName` equal to `"Sandy"`

[.code-highlight:3]

```
name          =>  "Mark", "Paula", "Sandy"
index         =>  2
currentName   =>  "Sandy"
```

---

[.column]

[.code-highlight:6]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

Call the method `Console.WriteLine` and provide it the value in `currentName` which is currently `"Sandy"`

[.code-highlight:3]

```
name        =>  "Mark", "Paula", "Sandy"
index       =>  2
currentName =>  "Sandy"
```

---

[.column]

[.code-highlight:7]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

End of the loop, so do the afterthought step of `index++`, turning the value of `2` to `3`

[.code-highlight:2]

```
name        =>  "Mark", "Paula", "Sandy"
index       =>  3
currentName =>  "Paula"
```

---

[.column]

[.code-highlight:3]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

Back to the loop. Since `currentName` is defined inside the loop we forget that variable. Time to do the comparison. Is `index` (`3`) less than `names.Length` (`3`). No! So we leave the loop, moving to the code **AFTER** the loop

[.code-highlight:2]

```
name        =>  "Mark", "Paula", "Sandy"
index       =>  3
```

---

[.column]

[.code-highlight:9]

```csharp
string[] names = { "Mark", "Paula", "Sandy" };

for (var index = 0; index < names.Length; index++) {
  var currentName = names[index];

  Console.WriteLine(currentName);
}

Console.WriteLine("Hi, this is code after the loop");
```

[.column]

We are now out of the loop, and since `index` was defined inside the loop we forget about that variable as well.

```
name        =>  "Mark", "Paula", "Sandy"
```

---

# [fit] Whew!

![](https://media.giphy.com/media/3krrjoL0vHRaWqwU3k/giphy.gif)

---

# shorter syntax

## `foreach`

```csharp
foreach (var name in names) {
  Console.WriteLine(name);
}
```

^ Assumes you are going to loop through the entire array.

<!-- prettier-ignore-end -->
