---
title: Using C# Classes to Create a Database
---

In this lesson we will be using `class`es and `List<>` to create an example
database to manage employees. We will create a menu system that will allow us to
`C`reate, `R`ead, `U`update, and `D`elete employees from this `List`

# Reviewing the code we will start with.

We will make a new project: `dotnet new sdg-console -o SuncoastHumanResources`

This is the code we will start with. It defines an `Employee` class and contains
code to input the details of a single employee.

```csharp
using System;

namespace SuncoastHumanResources
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

While this is good, it isn't quite great. First of all we can only store one
employee so our Employee Database is not very useful. To improve it, let's add a
menu system to prompt the user to add, search, and delete employees. We will
keep all these employees in a `List` and use `class`es to organize our code.

## Adding a `List` to store our employees

The `List` we will create will look like this:

```csharp
var employees = new List<Employee>();
```

We name the variable `employees`, the plural of `employee` to give us the hint
that this variable stores a collection of things. While this isn't a mandate by
the language, choosing good names for our variables is a quality of a good
developer and a habit we should start early. We define this variable as a `List`
of things that will all be instances of our `Employee` class.

To put an employee in our list we use the code: `employees.Add(employee)` where
`employee` is an instance of `Employee`

Now our code looks like:

```csharp
using System;
using System.Collections.Generic;

namespace SuncoastHumanResources
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

    static void Main(string[] args)
    {
      var employees = new List<Employee>();

      var employee = new Employee();

      DisplayGreeting();

      employee.Name = PromptForString("What is your name? ");
      employee.Department = PromptForInteger("What is your department number? ");
      employee.Salary = PromptForInteger("What is your yearly salary (in dollars)? ");

      employees.Add(employee);
    }
  }
}
```

## Let's make a simple menu

To make a menu, we'll introduce a `keepGoing` variable which will track if the
user wishes to continue in our program. We will use this variable in a `while`
loop to determine when to stop the loop. Inside the loop we will show a prompt
and use the existing code to ask the user for details on a new employee.

This allows us to continuously add more employees to our list until the user
quits

```csharp
using System;
using System.Collections.Generic;

namespace SuncoastHumanResources
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

    static void Main(string[] args)
    {
      // Our list of employees
      var employees = new List<Employee>();

      DisplayGreeting();

      // Should we keep showing the menu?
      var keepGoing = true;

      // While the user hasn't said QUIT yet
      while (keepGoing) {
        // Inert a blank line then prompt them and get their answer (force uppercase)
        Console.WriteLine();
        Console.Write("What do you want to do? (A)dd an employee or (Q)uit: ");
        var choice = Console.ReadLine().ToUpper();

        if (choice == "Q") {
          // They said quit, so set our keepGoing to false
          keepGoing = false;
        } else {
          // Make a new employee object
          var employee = new Employee();

          // Prompt for values and save them in the employee's properties
          employee.Name = PromptForString("What is your name? ");
          employee.Department = PromptForInteger("What is your department number? ");
          employee.Salary = PromptForInteger("What is your yearly salary (in dollars)? ");

          // Add it to the list
          employees.Add(employee);
        }

        // end of the `while` statement
      }
    }
  }
}
```

## Add an option to show all the employees

Let's add a menu item to show all the employees in the database.

```csharp
using System;
using System.Collections.Generic;

namespace SuncoastHumanResources
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

    static void Main(string[] args)
    {
      // Our list of employees
      var employees = new List<Employee>();

      // Should we keep showing the menu?
      var keepGoing = true;

      DisplayGreeting();

      // While the user hasn't said QUIT yet
      while (keepGoing) {
        // Inert a blank line then prompt them and get their answer (force uppercase)
        Console.WriteLine();
        Console.Write("What do you want to do? (A)dd an employee or (S)how all the employees or (Q)uit: ");
        var choice = Console.ReadLine().ToUpper();

        if (choice == "Q") {
          // They said quit, so set our keepGoing to false
          keepGoing = false;
        } else if (choice == "S") {
          // Loop through each employee
          foreach(var employee in employees) {
            // And print details
            Console.WriteLine($"{employee.Name} is in department {employee.Department} and makes ${employee.Salary}");
          }
        } else {
          // Make a new employee object
          var employee = new Employee();

          // Prompt for values and save them in the employee's properties
          employee.Name = PromptForString("What is your name? ");
          employee.Department = PromptForInteger("What is your department number? ");
          employee.Salary = PromptForInteger("What is your yearly salary (in dollars)? ");

          // Add it to the list
          employees.Add(employee);
        }

        // end of the `while` statement
      }
    }
  }
}
```

## Find an employee by name

Adding another menu option to find an employee by name. First we prompt for the
name to look for. We use a `foreach` loop to look for an employee with a
matching name. If we find one we update a variable named `foundEmployee` which
otherwise will have the value `null`. Then if `foundEmployee` is `null` we tell
the user no match was found, otherwise we show the details of `foundEmployee`.

```csharp
using System;
using System.Collections.Generic;

namespace SuncoastHumanResources
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

    static void Main(string[] args)
    {
      // Our list of employees
      var employees = new List<Employee>();

      // Should we keep showing the menu?
      var keepGoing = true;

      DisplayGreeting();

      // While the user hasn't said QUIT yet
      while (keepGoing) {
        // Inert a blank line then prompt them and get their answer (force uppercase)
        Console.WriteLine();
        Console.Write("What do you want to do? (A)dd an employee or (S)how all the employees or (F)ind an employee or (Q)uit: ");
        var choice = Console.ReadLine().ToUpper();

        if (choice == "Q") {
          // They said quit, so set our keepGoing to false
          keepGoing = false;
        } else if (choice == "F") {
          // Ask for the name of an employee
          var name = PromptForString("What name are you looking for: ");

          // Make a new variable to store the found employee, initializing
          // to null which will indicate no match found
          Employee foundEmployee = null;

          // Go through all the employees
          foreach(var employee in employees) {
            // If the name matches
            if (employee.Name == name) {
              // ... then store this employee in the foundEmployee variable
              foundEmployee = employee;
            }
          }

          // If the foundEmployee is still null, nothing was found
          if (foundEmployee == null) {
            Console.WriteLine("No match found");
          } else {
            // Otherwise print details of the found employee
            Console.WriteLine($"{foundEmployee.Name} is in department {foundEmployee.Department} and makes ${foundEmployee.Salary}");
          }
        } else if (choice == "S") {
          // Loop through each employee
          foreach(var employee in employees) {
            // And print details
            Console.WriteLine($"{employee.Name} is in department {employee.Department} and makes ${employee.Salary}");
          }
        } else {
          // Make a new employee object
          var employee = new Employee();

          // Prompt for values and save them in the employee's properties
          employee.Name = PromptForString("What is your name? ");
          employee.Department = PromptForInteger("What is your department number? ");
          employee.Salary = PromptForInteger("What is your yearly salary (in dollars)? ");

          // Add it to the list
          employees.Add(employee);
        }

        // end of the `while` statement
      }
    }
  }
}
```

## Improving this code by adding `LINQ`

We can add `using System.Linq` to the top of our code we utilize
`FirstOrDefault` for our searching code.

```C#
// Ask for the name of an employee
var name = PromptForString("What name are you looking for: ");

// Make a new variable to store the found employee, initializing
// to null which will indicate no match found
Employee foundEmployee = employees.FirstOrDefault(employee => employee.Name == name);

// If the foundEmployee is still null, nothing was found
if (foundEmployee == null) {
  Console.WriteLine("No match found");
} else {
  // Otherwise print details of the found employee
  Console.WriteLine($"{foundEmployee.Name} is in department {foundEmployee.Department} and makes ${foundEmployee.Salary}");
}
```

## Delete an employee and update an employee

These are two other features that our employee database might need. We'll leave
these to you to add to the application if you'd like to try.

# Refactoring the database features into their own class

The functions for adding, searching, and getting all the employees from the list
are scattered through the main code. Let's pull that code into a specific class
to manage the list.

We start by creating a class `EmployeeDatabase` and move our `List<Employee>`
inside. We make this class property `private` since we do not want code outside
of the class to be able to access it. All the use must come from the methods we
create and allow as `public`. We then create methods to perform the common
actions we need, `GetAllEmployees`, `FindOneEmployee`, `AddEmployee`. Each of
these methods _receives_ data it needs, and return the data it _provides_. This
essentially creates an API (Application Programming Interface) for how to use
this code.

By creating a class `EmployeeDatabase` we have isolated the code that has to do
with the list of employees. This allows the database implementation to change
without modifying the code that uses it. For instance, we could load and save
the data from a data file. Any time we can change one part of the system, the
employee database, without having to change other parts of the code (the menu
system) we have created a good _decoupling_ of our system's parts.

```csharp
using System;
using System.Collections.Generic;

namespace SuncoastHumanResources
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

  class EmployeeDatabase
  {
    // Keep a *private* copy of the employee list.
    //
    // We make this private since we don't want code from
    // outside this class to have access to it. All access
    // to this information comes through the methods of the
    // class.
    private List<Employee> employees = new List<Employee>();

    // Get a list of all the employees
    public List<Employee> GetAllEmployees()
    {
      return employees;
    }

    // Given an argument of an employee, add that employee
    // to the list of employees we are managing.
    public void AddEmployee(Employee newEmployee)
    {
      employees.Add(newEmployee);
    }

    // Given a name as a string, look through the list of
    // employees. If we find one with a matching name, return
    // the employee. If nothing is found, return a null.
    public Employee FindOneEmployee(string name)
    {
      // to null which will indicate no match found
      Employee foundEmployee = employees.FirstOrDefault(employee => employee.Name == name)

      // Return what we found (the employee or null)
      return foundEmployee;
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

    static void Main(string[] args)
    {
      // Our database
      var database = new EmployeeDatabase();

      // Should we keep showing the menu?
      var keepGoing = true;

      DisplayGreeting();

      // While the user hasn't said QUIT yet
      while (keepGoing) {
        // Inert a blank line then prompt them and get their answer (force uppercase)
        Console.WriteLine();
        Console.Write("What do you want to do? (A)dd an employee or (S)how all the employees or (F)ind an employee or (Q)uit: ");
        var choice = Console.ReadLine().ToUpper();

        if (choice == "Q") {
          // They said quit, so set our keepGoing to false
          keepGoing = false;
        } else if (choice == "F") {
          // Ask for the name of an employee
          var name = PromptForString("What name are you looking for: ");

          // Make a new variable to store the found employee, or null if not found
          Employee foundEmployee = database.FindOneEmployee(name);

          // If the foundEmployee is still null, nothing was found
          if (foundEmployee == null) {
            Console.WriteLine("No match found");
          } else {
            // Otherwise print details of the found employee
            Console.WriteLine($"{foundEmployee.Name} is in department {foundEmployee.Department} and makes ${foundEmployee.Salary}");
          }
        } else if (choice == "S") {
          var employees = database.GetAllEmployees();

          // Loop through each employee
          foreach(var employee in employees) {
            // And print details
            Console.WriteLine($"{employee.Name} is in department {employee.Department} and makes ${employee.Salary}");
          }
        } else {
          // Make a new employee object
          var employee = new Employee();

          // Prompt for values and save them in the employee's properties
          employee.Name = PromptForString("What is your name? ");
          employee.Department = PromptForInteger("What is your department number? ");
          employee.Salary = PromptForInteger("What is your yearly salary (in dollars)? ");

          // Add it to the list
          database.AddEmployee(employee);
        }

        // end of the `while` statement
      }
    }
  }
}
```
