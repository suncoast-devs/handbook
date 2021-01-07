theme: Next, 1

<!-- prettier-ignore-start -->

# Object Oriented Programing in `C#`

---

# So far

Methods: Behavior
Variables: Data (state)

---

# Classes

Combine Behavior and State

---

```csharp
using System;

namespace EmployeeDatabase
{
  class Program
  {

    static void DisplayGreeting()
    {
      Console.WriteLine("----------------------------------------");
      Console.WriteLine("    Welcome to Our Employee Database    ");
      Console.WriteLine("----------------------------------------");
      Console.WriteLine();
      Console.WriteLine();
    }

    static string PromptForString(string prompt)
    {
      Console.Write(prompt);
      var userInput = Console.ReadLine();

      return userInput;
    }

    static int PromptForInteger(string prompt)
    {
      Console.Write(prompt);
      int userInput;
      var isThisGoodInput = Int32.TryParse(Console.ReadLine(), out userInput);

      if (isThisGoodInput)
      {
        return userInput;
      }
      else
      {
        Console.WriteLine("Sorry, that isn't a valid input, I'm using 0 as your answer.");
        return 0;
      }
    }

    static int computeMonthlySalaryFromYearly(int yearlySalary)
    {
      return yearlySalary / 12;
    }

    static void Main(string[] args)
    {
      DisplayGreeting();

      var name = PromptForString("What is your name? ");

      int department = PromptForInteger("What is your department number? ");

      int salary = PromptForInteger("What is your yearly salary (in dollars)? ");

      int monthlySalary = computeMonthlySalaryFromYearly(salary);

      Console.WriteLine($"Hello, {name} you make {monthlySalary} dollars per month.");
    }
  }
}
```

---

What if we wanted to add information about a second employee? Certainly one
approach would be to add a second set of variables such as:

```csharp
var name1 = PromptForString("What is your name? ");
int department1 = PromptForInteger("What is your department number? ");
int salary1 = PromptForInteger("What is your yearly salary (in dollars)? ");
int monthlySalary1 = computeMonthlySalaryFromYearly(salary1);

var name2 = PromptForString("What is your name? ");
int department2 = PromptForInteger("What is your department number? ");
int salary2 = PromptForInteger("What is your yearly salary (in dollars)? ");
int monthlySalary2 = computeMonthlySalaryFromYearly(salary2);
```

---

Or perhaps we would have some arrays
- `names[]`
- `departments[]`

This has some drawbacks. We'd have to know that `names[0]` is related to `departments[0]`, etc.

If we removed something from `names` we'd have to be sure to remove the corresponding `departments` entry.

---

# Put related data in the same state

To group related data together we consider them all part of the same `state`.

In this case the `state` is about a `Employee` who has individual attributes:
- `name`
- `department`
- `salary`
-  and something we compute named `monthlySalary`

---

# A diagram of this might look like:

```
+------------------+
|     Employee     |
+------------------+
|   name           |
|   department     |
|   salary         |
|   monthlySalary  |
+------------------+
```

---

If we had a few of these `Employee` things around we might also see they could
have their own, specific, values for each of these attributes.

```
+---------------------------+       +------------------------------+
|         Employee          |       |           Employee           |
+---------------+-----------+       +------------------------------+
| ATTRIBUTE     |   VALUE   |       | ATTRIBUTE     |   VALUE      |
+---------------+-----------+       +---------------+--------------+
| name          | Elon Musk |       | name          | Grace Hopper |
| department    | 42        |       | department    | 100          |
| salary        | 120000    |       | salary        | 240000       |
| monthlySalary | 10000     |       | monthlySalary | 20000        |
+---------------+-----------+       +---------------+--------------+
```

---

# Grouping these attributes together: Encapsulation

Keep track of this data together!

---

## Class Syntax

Lets take our idea of a _employee_ in this system and write some syntax to help us.

# `class`

---

```csharp
//
// class keyword
// |
// |    Name of class (PascalCase)
// |    |
// v    v
  class Employee
  {
    // public means "this can be seen outside of the class
    // |
    // |   Type
    // |   |
    // |   |      Name of property
    // |   |      |
    // |   |      |      We can get the data and set the data
    // |   |      |      |
    // v   v      v      v
    public string Name { get; set; }
    public int Department { get; set; }
    public int Salary { get; set; }
    public int MonthlySalary { get; set; }
  }
```

---

We can *instantiate* employees.

```
+---------------------------+       +------------------------------+
|      Employee Object      |       |        Employee Object       |
+---------------+-----------+       +---------------+--------------+
| name          | Elon Musk |       | name          | Grace Hopper |
| department    | 42        |       | department    | 100          |
| salary        | 120000    |       | salary        | 240000       |
| monthlySalary | 10000     |       | monthlySalary | 20000        |
+---------------+-----------+       +---------------+--------------+
```

---

```csharp
var firstEmployee = new Employee();
var secondEmployee = new Employee();
```

---

# Accessing properties

```csharp
var firstEmployee = new Employee();
var secondEmployee = new Employee();

firstEmployee.Name = "Elon Musk";
secondEmployee.Name = "Grace Hopper";
```

---

# What to our instances look like?

```
+-----------------------------+       +--------------------------------+
|      firstEmployee          |       |        secondEmployee          |
+---------------+-------------+       +---------------+----------------+
| Name          | "Elon Musk" |       | Name          | "Grace Hopper" |
| Department    | 0           |       | Department    | 0              |
| Salary        | 0           |       | Salary        | 0              |
| MonthlySalary | 0           |       | MonthlySalary | 0              |
+---------------+-------------+       +---------------+----------------=
```

---

# [fit] Lets fill in the rest of the properties.

```csharp
var firstEmployee = new Employee();
var secondEmployee = new Employee();

firstEmployee.Name = "Elon Musk";
firstEmployee.Department = 42;
firstEmployee.Salary = 120000;
firstEmployee.MonthlySalary = 10000;

secondEmployee.Name = "Grace Hopper";
secondEmployee.Department = 100;
secondEmployee.Salary = 240000;
secondEmployee.MonthlySalary = 20000;
```

---

# [fit] Now our instances look like this:

```
+-----------------------------+       +--------------------------------+
|      firstEmployee          |       |        secondEmployee          |
+---------------+-------------+       +---------------+----------------+
| Name          | "Elon Musk" |       | Name          | "Grace Hopper" |
| Department    | 42          |       | Department    | 100            |
| Salary        | 120000      |       | Salary        | 240000         |
| MonthlySalary | 10000       |       | MonthlySalary | 20000          |
+---------------+-------------+       +---------------+----------------+
```

---

# Simpler syntax

When creating a new object, `C#` gives us a convenient syntax:

```csharp
var firstEmployee = new Employee {
  Name = "Elon Musk",
  Department = 42,
  Salary = 120000,
  MonthlySalary = 10000
};

var secondEmployee = new Employee {
  Name = "Grace Hopper",
  Department = 100,
  Salary = 240000,
  MonthlySalary = 20000
}
```

---

# Update our code

---

# So far we have seen how `class`-es:

- Store data, which we call `state`, in attributes we call `properties`.
- Are the template that describes what data
- Create _instances_, called `objects`
- Are like cookie cutters, where `object`s are like the cookies

---

## Behavior with methods

---

The code has a method `computeMonthlySalaryFromYearly` that accesses a property of our object and does some math.

We also have a _property_ named `MonthlySalary`.

Any time we change the `Salary` we should be able to ask for the `MonthlySalary`.

---

# Make `MonthlySalary` a method

```csharp
class Employee
{
  public string Name { get; set; }
  public int Department { get; set; }
  public int Salary { get; set; }
  public int MonthlySalary()
  {
    return Salary / 12;
  }
}
```

---

# Create the following objects

```csharp
var firstEmployee = new Employee {
  Name = "Elon Musk",
  Department = 42,
  Salary = 120000,
};

var secondEmployee = new Employee {
  Name = "Grace Hopper",
  Department = 100,
  Salary = 240000,
}
```

---

```
+-----------------------------+       +--------------------------------+
|      firstEmployee          |       |        secondEmployee          |
+---------------+-------------+       +---------------+----------------+
| Name          | "Elon Musk" |       | Name          | "Grace Hopper" |
| Department    | 42          |       | Department    | 100            |
| Salary        | 120000      |       | Salary        | 240000         |
| MonthlySalary | METHOD      |       | MonthlySalary | METHOD         |
+---------------+-------------+       +---------------+----------------+
```

---

# Objects have their own data (state) but shared behavior (methods)

For `firstEmployee.MonthlySalary()`
- Runs `return Salary / 12`
- But `C#` knows we are the instance `firstEmployee`
- Thus `Salary` is `120000` and we get back `10000`.

---

# Objects have their own data (state) but shared behavior (methods)

For `secondEmployee.MonthlySalary()`
- Runs `return Salary / 12`
- But `C#` knows we are the instance `secondEmployee`
- Thus `Salary` is `240000` and we get back `20000`.

---

# Reusability

---

# Inheritance

Often in modeling the real world we encounter different types of data that are related. Sometimes these are in an _is a_ or _is a kind of_ relationship.

---

For instance in our system perhaps we have active employees and retired employees. In this case perhaps we want to return a `0` for the `MonthlySalary` of any retired employees.

```csharp
//
//    This class
//     |
//     |                Is a kind of this class
//     |                |
//     |                |
//     v                v
class RetiredEmployee : Employee
{
    public int MonthlySalary()
    {
      return 0;
    }
}
```

---

Now if we defined a new employee as such:

```csharp
var thirdEmployee = new RetiredEmployee {
    Name = "Bill Gates",
    Department = 100,
    Salary = 120,
};

Console.WriteLine(thirdEmployee.MonthlySalary());
```

This would output `0`. Notice we did not have to redeclare `Name`, or `Department`, or `Salary` as those are **inherited** from the `base class` of `Employee`.

---

Inheriting allows is to both _add_ new state and behavior and _override_ behavior from the base class.

_Inheritance_ is a powerful but it is used less often in favor of other techniques such as
- _extensions_
- _mixins_
- _dependency injection_

We will discuss some of these in other lessons.


<!-- prettier-ignore-end -->
