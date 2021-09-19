theme: Next, 1

<!-- prettier-ignore-start -->

# [fit] Computers

## ... are machines that accept input, manipulate data, and produce output.

---

# [fit] Variable

### ... is an identifier for a value our program needs to keep track of

---

```
                                 +------------------------------------------------------------------+
                                 |                           COMPUTER MEMORY                        |
                                 |                                                                  |
                                 |                                                                  |
                                 |                                                                  |
                                 |               +---------------------------------------+          |
                                 |               |                                       |          |
                                 |               |                                       |          |
                                 |               |    "Suncoast Developers Guild"        |          |
myVariable  +------------------------------------+                                       |          |
                                 |               |                                       |          |
                                 |               +---------------------------------------+          |
                                 |                                                                  |
                                 |                                                                  |
                                 |          +-------+                                               |
                                 |          |       |                                               |
 myOtherVariable  +-----------------------> |  42   |                                               |
                                 |          |       |                                               |
                                 |          +-------+                                               |
                                 |                                                                  |
                                 |                                                                  |
                                 |                                                                  |
                                 |                                                                  |
                                 |                                                                  |
                                 +------------------------------------------------------------------+

```

---

# Language Rules

- Naming variables
- The kinds (_types_) of information we can store in variables
- If the value of a variable, once assigned, can be changed
- The syntax for declaring a variable
- If the kind (_type_) of information stored in a variable can change once assigned

---

# `C#` rules

- Must _declare_ our variables before we can use them.
- Must tell `C#` what kind of information the variable will store.
- From our example _*`myVariable`*_ stores a series of letters and spaces and _*`myOtherVariable`*_ stores a number.
- These represent the variables _*`type`*_.

---

# Our first `C#` types

- A sequence of letters, numbers, digits, emoji <sub>🚀</sub>, spaces, etc. is called a _*`string`*_
- A whole number (without any decimal places) is called an **`int`** (short for _*integer*_)

---

# How do you make a variable?

```csharp
string name = "Samantha";
int score = 95;
```

---

# Break it down

[.code-highlight: 1]

```csharp
string name = "Samantha";
int score = 95;
```

---

# Breaking it down

```csharp
// Type   Name   Value    Statement End
//  |       |      |       |
//  |       |      |       |
//  v       v      v       v
  string  name = "Samantha";
```

^ Assignment Statement ^ Left Side vs Right Side ^ Double quotes for strings ^ ;
in `C#` is like the period at the end of a sentence

---

# Break it down

[.code-highlight: 2]

```csharp
string name = "Samantha";
int score = 95;
```

---

```csharp
// Type   Name   Value    Statement End
//  |       |      |       |
//  |       |      |       |
//  v       v      v       v
   int    score = 95;
```

^ No double quotes for int

---

# Let `C#` do the work

- Programmers like to be efficient <sub>Some might say lazy</sub>
- Let the computer do the work when we can <br /> <br />
- _*Type inference*_ <sub>Let `C#` figure out what to write where `type`
  goes.</sub>

---

# Type Inference

```csharp
var name = "Samantha";
var score = 95;
```

- _*`var`*_ keyword allows `C#` to automatically<sub>automagically?</sub>
  determine the `type` of variable based on the value on the right hand side.
  <br />
- This is how we will create variables most of the time.

^ We will use type inference almost always when declaring variables. There will
be cases where we cannot.

---

# So what else ya got?

- Numeric primitive types
- Non-numeric primitive types
- Reference types

^ Reference types store data that can have wide ranges of values

---

# Numeric types

[.autoscale: true]

- **int** : a whole number from `-2,147,483,648` to `2,147,483,647`
- **long** : a whole number from `-9,223,372,036,854,775,808` to
  `9,223,372,036,854,775,807`
- **double** : a 64 bit floating point value that has an approximate precision
  of ~15-17 digits
- **float** : a 32 bit floating point value that has an approximate precision of
  6-9 digits
- **decimal** : a more precise way to store decimal numbers, but has a smaller
  range

^ Don't memorize these, just know they exist.

---

# Non-numeric primitive types

- **char** : represents a unicode character, a single letter, or an emoji. This is what `strings` are made of.
- **bool** : `true` or `false`
- **byte** : represents a raw chunk of data (values from `0` to `255`)

---

# Examples

[.column]

### Integers

```csharp
var score = 42;
```

### Double

```csharp
var total = 10.0;
var alsoTotal = 10d;
var pi = 3.14159265;
```

[.column]


### Floats

```csharp
var total = 10f;
var price = 10.0f;
var pi = 3.14159265f;
```

### Decimal

```csharp
var total = 10m;
var price = 10.0m;
var pi = 3.14159265m;
```

---

# Examples

[.column]

### Characters

```csharp
var piratesFavoriteLetter = 'r';
var firstLetterOfTheEnglishAlphabet = 'a';
var lastLetterOfTheEnglishAlphabet = 'z';
var capitalLetter = 'Q';
var rocketShip = '🚀';
```

### Strings

```csharp
var name = "Zaphod Beeblebrox";
```

[.column]

### Boolean

```csharp
var theCakeIsALie = true;
var worldIsFlat = false;
```

---

# Math

Addition, subtraction, multiplication, division, remainder (modulus)

```C#
var firstNumber = 42;
var secondNumber = 12;

var sum = firstNumber + secondNumber;
var difference = secondNumber - firstNumber;
var product = firstNumber * secondNumber;
var division = firstNumber / secondNumber;
var remainder = firstNumber % secondNumber;
```

---

# PEMDAS

[PEMDAS](https://en.wikipedia.org/wiki/Order_of_operations#Mnemonics)

```C#
var answer = 2 + 3 * 4; // 14
var answer2 = (2 + 3) * 4; // 20
```

> NOTE: There are other order of operations in code. We may see some of those later.

---

# Strings have extra features!

<br />

### More complex types, like _*`string`*_ can be asked questions about itself.

> How long is a string?

[.code-highlight: 2]

```csharp
var sentence = "The quick brown fox jumped over the lazy dog";
var howLong = sentence.Length;
```

^ Variable being used on the _right hand side_ for the first time. ^ Right side
first ^ Result goes into variable on the left side ^ The `.` in the
`sentence.Length` asks the variable `sentence` for its `Length` property.

---

# Break it down

[.column]

```csharp
//     variable  right-hand-side
//        |             |
//        v             v
    var howLong = sentence.Length;
```

[.column]

```csharp
// variable  property
//    |         |
//    v         v
    sentence.Length
```

^ Computer first goes to the contents of the variable (sentence) in memory and
then looks at the property `Length` and it figures out what that property value
is. ^ In this case the `int` 44.

---

# Results

```csharp
var sentence = "The quick brown fox jumped over the lazy dog";
var howLong = sentence.Length;
```

<br />

> The `howLong` variable will know it is an _*`int`*_, and its contents will be _*`44`*_

---

[.autoscale: true]

# DateTime

C# comes with a specialized class to deal with storing a date and time.

A `DateTime` is a `Year`, `Month`, `Day`, `Hour`, `Minute`, `Second`, and `Millisecond`.

To create a DateTime variable equal to the current time you can use this syntax:

```csharp
var rightNow = DateTime.Now
```

If you then wanted to know the current month:

```csharp
var rightNow = DateTime.Now;
var currentMonth = rightNow.Month;
```

---

# About naming variables

- Use clear variable names.
- Longer variable names don't cost anything.
- Remember that code is **written once** but **read many** times.
- You may be the one reading it later.

> Always code as if the developer who ends up maintaining your code knows where you live. Code for readability.
-- A wise developer

---

[.column]

# Not good

```csharp
var w = 52;
var n = "Arthur Dent";
var i = 1;
var resp = axios.get();
```

[.column]

# Better

```csharp
var weeksInOneYear = 52;
var name = "Arthur Dent";
var currentDepartmentIndex = 1;
var response = axios.get();
```

^ Follow the pattern of your team. On the SDG team we are going to use
descriptive variable names and avoid one letter variables and abbreviations.

---

<!-- prettier-ignore-end -->
