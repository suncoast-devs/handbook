---
title: Object-Oriented Programing in C#
assignments:
  - cs-blackjack
---

## State + Behavior

So far, we have learned about `variables` that allow us to store information and
`methods` that will enable us to organize our code. In this lesson, we will
introduce the idea of a `class` that combines these two ideas into a single
concept.

When discussing this idea, we are going to shift our terminology just a little
bit. We are going to refer to the information we keep track of as `state` and
the code that interacts with that information as `behavior.`

## An example

From our work on methods, we had this Employee Database application. As you can
see it can prompt a user for information, save that information, and do some
basic calculations.

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

Or perhaps we would have some arrays, e.g. `names[]` and `departments[]`.

Each of these has some drawbacks. The first is that the information about a
single employee is not correlated. There is nothing about `name1` that
associates it with `department1` instead of `department2`. The only thing that
associates them is that they have similar variable names.

To group related data together we consider them all part of the same `state`. In
this case the `state` is about an `Employee` who has individual attributes such
as their `name`, their `department`, their `salary` and something we compute
named `monthlySalary`.


A diagram of this might look like:

```
---------------------
|       Employee    |
---------------------
|   name            |
|   department      |
|   salary          |
|   monthlySalary   |
---------------------
```

If we had a few of these `Employee` things around, we might also see they could
have their own specific values for each of these attributes.

```
-----------------------------       --------------------------------
|             Employee      |       |             Employee         |
----------------------------|       -------------------------------|
| ATTRIBUTE     |   VALUE   |       | ATTRIBUTE     |   VALUE      |
-----------------------------       --------------------------------
| name          | Elon Musk |       | name          | Grace Hopper |
| department    | 42        |       | department    | 100          |
| salary        | 120000    |       | salary        | 240000       |
| monthlySalary | 10000     |       | monthlySalary | 20000        |
-----------------------------       --------------------------------
```

So, if we were able to group these attributes (a process we call
`encapsulation`) then we would be able to keep track of them together!

This is one of the benefits of the idea of a `class`. The ability to group,
encapsulate, related data together. Often these attributes represent real-world
attributes of the types of things we are modeling in the computer. Here we are
encapsulating the various attributes of an _employee_ we might want to track in
an employee database.

## Class Syntax

Lets take our idea of an _employee_ in this system and write some syntax to help
us.

```
---------------------
|       Employee    |
---------------------
|   name            |
|   department      |
|   salary          |
|   monthlySalary   |
---------------------
```

C# gives us syntax for defining this structure. We call it a `class`. You have
already seen this syntax in our sample applications so far since `dotnet`
generated a `Program` class for us by default. We've been using _classes_ but we
didn't quite know it yet!

Let us make a `class` for this `Employee` structure.

```csharp
class Employee
{
  // public means "this can be seen outside of the class
  // |
  // |   Type
  // |   |
  // |   |      Name of property
  // |   |      |
  // |   |      |
  // |   |      |
  // v   v      v
  public string Name;
  public int Department;
  public int Salary;
  public int MonthlySalary;

  // This is a *special* method known as a "constructor"
  // The constructor is called when we write a line like: `var bob = new Employee(`
  // The arguments to the method should line up to those below
  //
  //              This will become the employee's name
  //              |               This will become the employee's department
  //              |               |                  This will become the employee's salary
  //              |               |                  |              This will become the employee's monthly salary
  //              |               |                  |              |
  //              v               v                  v              v
  public Employee(string newName, int newDepartment, int newSalary, int newMonthlySalary)
  {
      // In the constructor we should setup the values for any of the properties.
      // Here we will *copy* the values given by the arguments to the corresponding property.
      Name = newName;
      Department = newDepartment;
      Salary = newSalary;
      MonthlySalary = newSalary;
  }
}
```

You'll notice a few things right away with this syntax. First is the `class`
keyword followed by the name of the class. We will use _CamelCase_ for our
classes' names, so we name this `Employee`. The rest of the definition of this
class is implemented within braces `{ }`.

Inside the definition, we have four similar lines of code. For each line, we are
defining an attribute of this class, in `C#`, we call these properties. The
first part of the definition is if this property is `public`, `protected`, or
`private`. `public` properties can be accessed by code outside the class (we'll
see what this means in a minute), whereas `private` can only be seen from other
code within the class itself. We'll talk about `protected` later.

Next, we define the type of this property. Unfortunately, we cannot use the
`var` style definition here since we must tell the code what type of information
this property stores.

Finally, we name the property. You'll notice here that we switched to
`CamelCase` as well. Class properties by convention are named with CamelCase.
You could certainly use other case approaches, but most `C#` developers will
follow this convention.

Next, in the class, you'll notice what appears to be a _method_ but it is a
special type of method. This method has the same name as the class itself and is
known as the _constructor_ of the method.

The _constructor_ is used when we eventually write `new Employee`. Since we
indicate that this method requires four arguments we must provide those each
time we make a `new Employee`

In this case, we are requiring the new name, department, salary, and monthly
salary of our employee.

Inside the constructor's implementation, we _copy_ these values into the
properties for this instance of the object we are creating. Copying the data
ensures that we correctly set all the properties of the new object.

We could use this new class to create two new employees:

```csharp
var graceHopper = new Employee("Grace Hopper", 100, 240000, 20000);
Console.WriteLine(adaLovelace.Department); // Will show 100

var elonMusk = new Employee("Elon Musk", 42, 120000, 10000);
Console.WriteLine(elonMusk.Department); // Will show 42
```

You may notice that this syntax is similar to our usage of `new List` when
working with `C#`s `List`. We've been using objects for a while!

Since we often create new objects and want to specify their default properties
(in this case, Name, Department, Salary, MonthlySalary), `C#` provides a shorter
syntax.

```csharp
class Employee
{
  public string Name { get; set; }
  public int Department { get; set; }
  public int Salary { get; set; }
  public int MonthlySalary { get; set; }
}
```

In this syntax, we do not need a constructor because we have the `{ get; set; }`
syntax. For now, we won't explore the specifics of **how** the `{ get; set; }`
works other than to mention it allows us to `set` (or change) the information in
that property as well as `get` (or retrieve) the information stored within.

We will add this `class` to our program within the
`namespace EmployeeDatabase { }` but as a sibling of the existing
`class Program` as such:

```csharp
using System;

namespace EmployeeDatabase
{
  class Employee
  {
    public string Name { get; set; }
    public int Department { get; set; }
    public int Salary { get; set; }
    public int MonthlySalary { get; set; }
  }

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

## Allowing properties to be `null`

As is, the properties of our object cannot be `null`. That is, they must have
_some_ value, even if for a string this is an empty string `""` and for a number
it might be `0`.

However, by adding a `?` to the end of the data type, we can indicate that the
property is allowed to be `null`.

This is also true of variables we declare outside of a class as well.

For more information and examples, see
[this article](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types)
for details.

## Creating and using classes: Objects

Now that we have this `class` definition let us use it inside our application.

We can think of the `class` we created as a template used to create new
_instances_ of itself. That is, it can create new variables who's type is an
`Employee` and it has the properties we defined. We call these _instances_
`objects`.

Each `object` knows what its type is and what `state` it can store. In our case,
each `Employee` _object_ will have a `Name`, a `Department`, a `Salary` and a
`MonthlySalary`. And each `Employee` _object_ will keep its own copy of that
information. Much like in this diagram from before

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

If we were going to create these objects, we would use the `new` keyword.

```csharp
var firstEmployee = new Employee();
var secondEmployee = new Employee();
```

When we create these new variables, the various attributes of the object will
all be empty. For strings, this means the values will be an empty string `""`
and for integers, the values will be `0`.

```csharp
Console.WriteLine(firstEmployee.Department); // This would output 0
```

We can now _access_ the properties of these new _objects_ using the `.`
notation. For instance, you will see above that we write
`firstEmployee.Department`. The text to the _left_ of the `.` says which
variable we are working with and the text to the _right_ of the `.` says which
property we want from **that** object.

Now that we know how to say which object and which property we want, we can use
that syntax on the _left_ side of an assignment to change that object's
property.

```csharp
var firstEmployee = new Employee();
var secondEmployee = new Employee();

firstEmployee.Name = "Elon Musk";
secondEmployee.Name = "Grace Hopper";
```

If we were to look at our objects in the computer's memory now they would look
like this:

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

Let us fill in the rest of the properties.

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

These objects would look like

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

When specifying the initial values of a new object, `C#` gives us a convenient
syntax to make our jobs easier:

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

You will see that we replaced the `()` with a pair of `{ }` and inside we have a
syntax of `NameOfPropertyHere = ValueHere,` and each property is separated by a
comma.

This works well if we know the values ahead of time. Let's change our
`Employee Database` code to use our new class.

```csharp
using System;

namespace EmployeeDatabase
{
  class Employee
  {
    public string Name { get; set; }
    public int Department { get; set; }
    public int Salary { get; set; }
    public int MonthlySalary { get; set; }
  }

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
      var employee = new Employee();

      DisplayGreeting();

      employee.Name = PromptForString("What is your name? ");
      employee.Department = PromptForInteger("What is your department number? ");
      employee.Salary = PromptForInteger("What is your yearly salary (in dollars)? ");
      employee.MonthlySalary = computeMonthlySalaryFromYearly(employee.Salary);

      Console.WriteLine($"Hello, {employee.Name} you make {employee.MonthlySalary} dollars per month.");
    }
  }
}
```

We have replaced our many local variables with creating one new `object` of
_type_ `Employee` and then used our object property accessing `.` syntax to both
_set_ and _get_ those properties when needed.

So far, we have seen how `class`es:

- Store data, which we call `state`, in attributes we call `properties`.
- `Class`es are the template that describes what data
- `Object`s are _instances_ of a class.
- `Class`es are like cookie cutters, where `object`s are like the cookies

Next, we will introduce some _behavior_ to our classes. If you'll note in the
code above, we have to compute the monthly salary ourselves and store it. What
if the `Employee` object could just do that work for us!

## Behavior with methods

In our Employee Database we have a method `computeMonthlySalaryFromYearly` that
accesses a property of our object and does some math to compute a monthly
salary. We also have a _property_ named `MonthlySalary`. However, any time we
change the `Salary` we would like to be able to ask for the `MonthlySalary` to
get this computed value.

Adding methods that are _specific_ to a class comes in handy. Rather than create
a _property_ named `MonthlySalary` let us make a method instead.

```csharp
class Employee
{
  public string Name { get; set; }
  public int Department { get; set; }
  public int Salary { get; set; }
  public int MonthlySalary()
  {
    // Code will go here
  }
}
```

The definition of this method should seem familiar to our previous encounter
with methods. However, you will notice we no longer have the parameters to the
method as we do for `computeMonthySalaryFromYearly`. When defining a class's
methods, we have access to all the other attributes of the specific object!

That is, any method on a class, when called for a specific object, can ask "Who
am I, and what properties (state) do I have?"

We can add the code for `MonthlySalary` by accessing the existing `Salary`
property!

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

If we created the following objects they would look like this:

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

So now each instance of this class, our objects, have individual values for
their properties, but have access to a `MonthlySalary` method. If we were to
call `firstEmployee.MonthlySalary()` we would run the code `return Salary / 12`
but `C#` knows we are the variable `firstEmployee` so when it looks up `Salary`
it sees the value `120000` and we get back `10000`. However, when we call
`secondEmployee.MonthlySalary()`, `C#` knows we are the variable
`secondEmployee` so when it looks up `Salary` it sees the value `240000` and we
get back `20000`.

By allowing the `objects` to share the same behavior and names of properties,
but have different **VALUES** for those properties we get a lot of code
reusability.

We now have our classes, and objects, enabled with the ability to have both
`state` (the list of which properties are defined, and what the values are for
each object we create) and `behavior` the methods defined for the class. With
both state and behavior we have the ability to represent real world ideas. In
this case our modeling of an `Employee` in our Employee Database:

```csharp
using System;

namespace EmployeeDatabase
{
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
      var employee = new Employee();

      DisplayGreeting();

      employee.Name = PromptForString("What is your name? ");
      employee.Department = PromptForInteger("What is your department number? ");
      employee.Salary = PromptForInteger("What is your yearly salary (in dollars)? ");

      Console.WriteLine($"Hello, {employee.Name} you make {employee.MonthlySalary()} dollars per month.");
    }
  }
}
```

## Default values

We can also define a property to have a default value. If we wanted our
`Employee` to track the date their information was created, we could add a
`CreatedAt` property. However, the developer would have to remember to give it a
valid value each time we used `new Employee`

We can address this by defining a default value, in this case the value of
`DateTime.Now` which will be the current time when the object is created.

We could default other properties such as `Salary`, or `Department` as long as
the default value we give is compatible with the data type.

```csharp
class Employee
{
  public string Name { get; set; }
  public int Department { get; set; }
  public DateTime CreatedAt { get; set; } = DateTime.Now;
  public int Salary { get; set; }
  public int MonthlySalary()
  {
    return Salary / 12;
  }
}
```

## Constructors

Another way to initialize an instance of an object is using a _special_ method
called a `constructor`. This method has the same name as the class itself and is
used any time we call for a new instance of the object.

For instance, to default the `CreatedAt` property we could have also used this
code:

```csharp
class Employee
{
  public Employee()
  {
    this.CreatedAt = DateTime.Now;
  }

  public string Name { get; set; }
  public int Department { get; set; }
  public DateTime CreatedAt { get; set; }
  public int Salary { get; set; }
  public int MonthlySalary()
  {
    return Salary / 12;
  }
}
```

Constructors are more flexible than just assigning a default value, we can have
any necessary _initialization_ code required.

## Inheritance

Often in modeling the real-world we encounter different types of data that are
related. Sometimes these are in an _is a_ or _is a kind of_ relationship.

For instance, in our system, perhaps we have active employees and retired
employees. In this case, perhaps we want to return a `0` for the `MonthlySalary`
of any retired employees.

We could declare a new `class` named `RetiredEmployee` as such:

```csharp
class RetiredEmployee : Employee
{
    public int MonthlySalary()
    {
      return 0;
    }
}
```

Now if we defined a new employee as such:

```csharp
var thirdEmployee = new RetiredEmployee {
    Name = "Bill Gates",
    Department = 100,
    Salary = 120,
};

Console.WriteLine(thirdEmployee.MonthlySalary());
```

This would output `0`. Notice we did not have to redeclare `Name`, or
`Department`, or `Salary` as those are **inherited** from the `base class` of
`Employee`.

Inheriting allows us to both _add_ new state and behavior and _override_
behavior from the base class.

Every `class` in the system will have a _parent_. If we keep moving up the class
parent lineage, we eventually reach `Object`, which is the top-most parent of
all classes.

We should also note that while _inheritance_ is a powerful technique, it is used
less often in favor of other techniques such as _extensions_ and _mixins_ and
_dependency injection_. We will discuss some of these in other lessons.
