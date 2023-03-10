---
title: Code refactoring patterns
---

## Comparing a variable to `true`

If you have code like:

```csharp
if (variable == true)
{
  // Do action A
}
else
{
  // Do action B
}
```

You can change this to:

```csharp
if (variable)
{
  // Do action A
}
else
{
  // Do action B
}
```

## Comparing a variable to `false` with an else

If you have code like:

```csharp
if (variable == false)
{
  // Do action A
}
else
{
  // Do action B
}
```

You can change this to:

```csharp
if (variable)
{
  // Do action B
}
else
{
  // Do action A
}
```

## Comparing a variable to `false` without an else

If you have code like:

```csharp
if (variable == false)
{
  // Do action A
}
```

You can change this to:

```csharp
if (!variable)
{
  // Do action A
}
```

## Using a `return` statement inside an `if` with an `else`

If you find code like this:

```csharp
if (someVariable > 5)
{
   return otherVariable;
}
else
{
  // Lots
  // of
  // other
  // code
  // here
}
```

You can change this to:

```csharp
if (someVariable > 5)
{
   return otherVariable;
}

// Lots
// of
// other
// code
// here
```

This is because there is no danger that the code below the `if` would be run in
the case that the condition is true.

This style of coding is called implementing a
[`guard clause`](https://en.wikipedia.org/wiki/Guard_%28computer_science%29)
since it protects the code below and provides an `early return`.

## Returning a boolean

If you have code like this:

```csharp
if (variable == true)
{
  return true;
}
else
{
  return false;
}
```

You can just do:

```csharp
return variable;
```

## Use a ternary

We can simplify code like the following, where we are making a condition and
then assigning different values to the same variable.

```csharp
if (otherVariable == 42)
{
  firstVariable = 17;
}
else
{
  firstVariable = 88;
}
```

This can be reduced using a
[`ternary`](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/conditional-operator).

```csharp
firstVariable = otherVariable == 42 ? 17 : 88;
```

## Creating a variable and only using it once.

In many cases, we make a variable to store the result of a computation and then
just use it once. In such cases, we may want to consider just doing the
computation in the place of the variable usage. Other times the presence of the
variable makes it easier to read the code by providing context to the value the
computation returns. In such cases, we should leave the variable.

Example:

```csharp
var studentsPassingTheClass = students.Where(student => student.homeworkCompletionPercentage > 80);

return studentsPassingTheClass;
```

could be changed to:

```csharp
return students.Where(student => student.homeworkCompletionPercentage > 80);
```
