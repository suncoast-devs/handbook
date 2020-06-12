---
title: C# Numbers
---

### Integers

```csharp
var score = 42;
```

### Floats

```csharp
var total = 10f;
var price = 10.0;
var pi = 3.14159265;
```

### Decimal

```csharp
var total = 10m;
var price = 10.0;
var pi = 3.14159265;
```

### Double

```csharp
var total = 10.0;
var total = 10d;
var pi = 3.14159265
```

---

### Conversions

## `int.Parse("42")`

Attempts to convert the given string into an `int` value. The method also takes
additional arguments that allow for different formats of the string, e.g.
allowing it to parse numbers with currency symbols like "\$42".

If the string _cannot_ be parsed into an integer then an **exception** is
thrown, FormatException.

[MSDN Documentation](https://docs.microsoft.com/en-us/dotnet/api/system.int32.parse?view=netcore-3.1)

## `bool success = int.TryParse("42", out result)`

Much like the `int.Parse` method except this will return a boolean (true/false)
if the number is parsable. If the number is parsable, and the method returns
true, then the variable in the second argument, and after the keyword `out` will
be updated with the new value.

Example:

```csharp

int parsedNumber;
bool wasThisParsable = int.TryParse("42", out parsedNumber);
if (wasThisParsable)
{
  Console.WriteLine("Yes, it was parsable and the integer is {parsedNumber}");
}
else
{
  Console.WriteLine("Sorry, not parsable");
}
```

[MSDN Documentation](https://docs.microsoft.com/en-us/dotnet/api/system.int32.tryparse?view=netcore-3.1)

## `double.Parse` and `double.TryParse`

These work exactly like their `int` counterparts yet they work with doubles.

Example:

```csharp
var answer = double.Parse("42.34");
```

[MSDN Documentation](https://docs.microsoft.com/en-us/dotnet/api/system.double.parse?view=netcore-3.1)

## `Convert`

The `Convert` class can convert to and from many formats, depending on which
method you call.

Example:

```csharp
using System;

double doubleNumber = 23.15;

// Returns 23
int integerNumber = Convert.ToInt32(doubleNumber);

// Returns True
bool booleanNumber = Convert.ToBoolean(doubleNumber);

// Returns "23.15"
string numberAsString = System.Convert.ToString(doubleNumber);

// Returns '2'
char digitAsCharacter = System.Convert.ToChar(stringNumber[0]);
```

The `Convert` class has many variations and can convert between many types. To
see other examples, check the
[MSDN Documentation](https://docs.microsoft.com/en-us/dotnet/api/system.convert?view=netcore-3.1)

## `ToString`

For both `int` and `double` types we can convert to a string as follows:

Example

```csharp
int value = -16325;

string valueAsString = value.ToString();
```

---

### Basic Math

## `+`, `-`, `*`, `/`

`+` and `-` represent addition and subtraction.

`*` and `/` represent multiplication and division.

The result of adding, subtracting, or dividing two `int` is always an `int`. If
you divide two integers such that there would be a decimal part, the decimal
part is dropped.

Example:

```csharp
int firstNumber = 42;
int secondNumber = 4;

var result = firstNumber / secondNumber;
```

In this case `result` is `10`.

The result of adding, subtracting, or dividing where at least one of the values
is not an integer, but an `double` or `float` will result in a `double` or
`float`.

Thus if we wanted the above to include a decimal part we could make one of the
two numbers a non-`int`

```csharp
double firstNumber = 42;
int secondNumber = 4;

var result = firstNumber / secondNumber;
```

In this case `result` is `10.5`.

## `%`

This is known as the modulo operator. The result of `firstNumber % secondNumber`
is equal to whatever the remainder would be if we divided `secondNumber` into
`firstNumber`.

Taking our above example:

```csharp
int firstNumber = 42;
int secondNumber = 4;

var result    = firstNumber / secondNumber;
var remainder = firstNumber % secondNumber;
```

In this case `result` is `10` and `remainder` is `2`. The remainder is `2`
because as we divide 4 into `42` we can only do so `10` times, leaving `2` over.

### Modulo is useful for things like determining if a number is even or odd.

```csharp
var isThreeEven = (3 % 2) == 0;  // False
var isEightEven = (8 % 2) == 0;  // True
```

It is also good for ensuring that a value is _bounded_ by some value, causing it
to wrap around.

```csharp
// We don't want index to be 5 or more (stops at 4), and if it does it should wrap around to 0
var index = 0;

index = (index + 1) % 5;  // 0 + 1 is 1 -- 1 % 5 = 1
Console.WriteLine($"index is {index}");

index = (index + 1) % 5;  // 1 + 1 is 1 -- 1 % 5 = 1
Console.WriteLine($"index is {index}");

index = (index + 1) % 5;  // 2 + 1 is 1 -- 1 % 5 = 1
Console.WriteLine($"index is {index}");

index = (index + 1) % 5;  // 3 + 1 is 1 -- 1 % 5 = 1
Console.WriteLine($"index is {index}");

// Here is where the % comes into play, adding one to 4 give 5, but we want this to "wrap around" back to 0.

index = (index + 1) % 5;  // 4 + 1 is 5 -- 5 % 5 = 0
Console.WriteLine($"index is {index}");

index = (index + 1) % 5;  // 0 + 1 is 1 -- 1 % 5 = 1
Console.WriteLine($"index is {index}");

index = (index + 1) % 5;  // 1 + 1 is 2 -- 2 % 5 = 1
Console.WriteLine($"index is {index}");
```

Lets see this in a loop:

```csharp
for(var index = 0; index < 20; index++)
{
   var wrappedValue = index % 5;
   Console.WriteLine($"Wrapped value is {wrappedValue} since index is {index}");
}
```

```
Wrapped value is 0 since index is 0
Wrapped value is 1 since index is 1
Wrapped value is 2 since index is 2
Wrapped value is 3 since index is 3
Wrapped value is 4 since index is 4
Wrapped value is 0 since index is 5
Wrapped value is 1 since index is 6
Wrapped value is 2 since index is 7
Wrapped value is 3 since index is 8
Wrapped value is 4 since index is 9
Wrapped value is 0 since index is 10
Wrapped value is 1 since index is 11
Wrapped value is 2 since index is 12
Wrapped value is 3 since index is 13
Wrapped value is 4 since index is 14
Wrapped value is 0 since index is 15
Wrapped value is 1 since index is 16
Wrapped value is 2 since index is 17
Wrapped value is 3 since index is 18
Wrapped value is 4 since index is 19
```
