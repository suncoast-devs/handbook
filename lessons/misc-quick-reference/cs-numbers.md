---
title: C# Numbers
---

### Integers

```csharp
var score = 42;
int score = 42;
```

### Floats

```csharp
var total = 10f;
float total = 10;

var price = 10.0f;
float price = 10.0;

var pi = 3.14159265f;
float pi = 3.14159265;
```

### Decimal

```csharp
var total = 10m;
decimal total = 10m;

var price = 10.0m;
decimal price = 10.0m;

var pi = 3.14159265m;
decimal pi = 3.14159265m;
```

### Double

```csharp
var total = 10d;
double total = 10;

var price = 10.0;
double price = 10.0;

var pi = 3.14159265;
double pi = 3.14159265;
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

---

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

## `Casting`

Much like the `Convert` we can use the idea of _casting_ to attempt a conversion
of one data type to another.

To use casting you place the name of the type you are converting to in
parentheis and place this before the variable you are casting.

For instance:

```C#
double doubleNumber = 23.15;

// Returns 23
int integerNumber = (int)doubleNumber;
```

---

## `ToString`

For both `int` and `double` types we can convert to a string as follows:

Example

```csharp
int value = -16325;

string valueAsString = value.ToString();
```

---

## Rounding

`C#` offers a number of ways to round numbers. The primary rounding methods are
`Round`, `Ceiling`, and `Floor`.

### `Floor`

The `Floor` method, `Math.Floor`, accepts a `double` and returns the number
without any of the digits after the decimal part. The technical description is
_Returns the largest integral value less than or equal to the specified number._

```C#
double price = 12.34;

double priceFloored = Math.Floor(price);
// priceFloored will be 12
```

### `Ceiling`

The `Ceiling` method, `Math.Ceiling`, accepts a `double` and returns the
_smallest_ whole number that is greater than or equal to the number. For
instance if we asked for the `Ceiling` of `42` we would get `42` back since it
`42` a whole number that is equal to the number we gave it. However, if we
supplied `42.01`, the next smallest whole number would be `43`.

> NOTE: The resulting type is still `double` -- if you want an integer, you'll
> need to `Convert` or cast the value to an integer.

```C#
double wholePrice = 42;
double wholePriceCeiling = Math.Ceiling(wholePrice);
// wholePriceCeiling will be 42

double priceWithMore = 42.01;
double priceWithMoreCeiling = Math.Ceiling(priceWithMore);
// priceWithMoreCeiling will be 43
```

### `Round`

Rounds a value to the nearest whole number. Optionally we can specify the number
of fractional digits.

```C#
double pi = 3.14159265;
double roundedPi = Math.Round(pi);
// roundedPi will be 3 since we are rounding down

double roundedPiWithThreeDigits = Math.Round(pi,3);
// roundedPiWithThreeDigits will be 3.142 since we are rounding UP because the *fourth* digit is a 5
```

> NOTE: there are also different ways to round numbers. If interested, check the
> [C# documentation on rounding](https://docs.microsoft.com/en-us/dotnet/api/system.midpointrounding?view=net-5.0#System_MidpointRounding_ToEven)
