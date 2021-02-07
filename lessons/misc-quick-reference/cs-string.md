---
title: C# Strings
---

A string is a sequential collection of characters that is used to represent
text.

---

### Declaring a variable to contain a string

> Strings are surrounded by double quotes: `"`

```csharp
var name = "Suncoast Developers Guild";

var description = "Code School in St Petersburg, FL";
```

---

### Appending strings

We can append two strings using the `+` operator.

```csharp
var name = "Suncoast Developers Guild";

var description = "Code School in St Petersburg, FL";

var message = name + " is a " + description;

```

### Interpolating strings

We can incorporate variables and expressions into a string by making an
interpolated string.

> Note: Interpolated strings start with a `$`

```csharp
var name = "Suncoast Developers Guild";

var description = "Code School in St Petersburg, FL";

var message = $"{name} is a {description}";

var mathProblem = $"What do you get when you multiply six by 9: {6 * 9}"
```

### String length

We can get the length of a string by using the length property.

```csharp
var name = "Suncoast Developers Guild";

var nameLength = name.Length;

Console.WriteLine(nameLength);
// Output: 25
```

### Iterating the characters in a string

We can iterate over a string and assess each character with a foreach loop.

```csharp
var name = "Mary";

foreach (var character in name)
{
  Console.WriteLine(character);
}

// Output:
// M
// a
// r
// y
```

#### Using a `for` loop

Alternatively, we can use the string length to use a for loop and access each
character by its index.

```csharp
var name = "Mary";

for (var index = 0; index < name.Length; index++)
{
  Console.WriteLine(name[index]);
}

// Output:
// M
// a
// r
// y
```

#### Using `LINQ`

If you add `using System.Linq` to your code you may use LINQ to iterate through
a string. All of the methods for LINQ are available to you and it treats the
string as a sequence of characters. In this example we use the ability for LINQ
to `Select` (transform) a sequence (in this case characters) into a new list. We
also use the ability to have the index provided as well.

```csharp
var name = "Mary";

var newList = name.Select((character, index) => $"The character at index {index} is {character}");

// The value of newList is:
// [
//   "The character at index 0 is M",
//   "The character at index 1 is a",
//   "The character at index 2 is r",
//   "The character at index 3 is y"
// ]
```

### Splitting a string

We can split a string into an array of strings using the Split method. The first
parameter will be the character you want to split the string on.

```csharp
var sentence = "Today is a beautiful day";

var words = sentence.Split(' ');

// The effect would be:
// words = ['Today', 'is', 'a', 'beautiful', 'day'];
```

### Replacing text in a string

We can replace parts of strings with new values by using the replace method.

```csharp
var sentence = "Today is a beautiful day";

sentence.Replace("beautiful", "sunny");

// The effect would be:
// sentence = "Today is a sunny day";
```

### Reversing a string

We can reverse the order of characters in a string by using the reverse method.

```csharp
var name = "Suncoast Developers Guild".

var reverseName = name.Reverse();

// The effect would be:
// reverseName = "dliuG srepoleveD tsaocnuS";
```

### Changing the case of a string

We can make all characters in a string upper case or lowercase with the ToUpper
and ToLower methods.

```csharp
var name = "Suncoast Developers Guild";

var upperName = name.ToUpper();

var lowerName = name.ToLower();

// The effects would be:
// upperName = "SUNCOAST DEVELOPERS GUILD";
// lowerName = "suncoast developers guild";
```

### Getting a sub-string

We can get part of a string by using the substring method.

NOTE: The first number in the method is the starting index, the second number is
how many characters to return.

```csharp
var movie = "The Avengers: Endgame";

var subtitle = movie.Substring(14, 7);

// The effect would be:
// subtitle = "Endgame";
```

### Does a string contain another string

We can check to see if one string is contained in another string by using the
contains method.

```csharp
var movieDescription = "Thanos attempts to gather all infinity stones to end the Avengers for good.";

var containsInfinity = movieDescription.Contains("infinity");

var containsHulk = movieDescription.Contains("Hulk");

// The effects would be:
// containsInfinity = true;
// containsHulk = false;
```

### EndsWith

We can check if a string ends with a certain substring by using the EndsWith
method.

```csharp
var headline = "Fundraising night was a huge success!";

var endsWithExclamation = headline.EndsWith("!");

// The effect would be:
// endsWithExclamation = true;
```

### StartsWith

We can also check if a string starts with a certain substring by using
StartsWith method.

```csharp
var greeting = "Welcome to our home!"

var beginsWithHello = greeting.BeginsWith("Hello");

// The effect would be:
// beginsWithHello = false;
```

### Join

We can join an array of strings back into a single string using the `String.Join` method.

```csharp
var studentNames = new string[5] {"Marcus", "Emily", "Jason", "Steve", "Julia"};
var studentString = String.Join(", ", studentNames);

// The effect would be:
// studentString = "Marcus, Emily, Jason, Steve, Julia";
```

### Pad + Trim

You can add and remove characters to the beginning and end of strings with
PadLeft, PadRight and Trim methods.

NOTE: Trim will automatically trim the left and right sides of a string.

```csharp
var museumName = "Salvador Dali Museum";

var paddedName = museumName.PadLeft(3, '*');

// The effect would be:
// paddedName = "***Salvador Dali Museum";

paddedName = paddedName.PadRight(3, '*');

// The effect would be:
// paddedName = "***Salvador Dali Museum***";

var trimmedName = paddedName.Trim('*');

// The effect would be:
// trimmedName = "Salvador Dali Museum";
```
