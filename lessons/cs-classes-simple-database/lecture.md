theme: Next, 1

# Using C# Classes to Create a Database

---

- Using **class**es and **List** we will create an employee database
- Database will be able to
  - **C**reate
  - **R**ead
  - **U**pdate
  - **D** elete

---

# Reviewing the starting code.

We will make a new project: **`dotnet new sdg-console -o SuncoastHumanResources`**

---

# Starting code

- Defines an `Employee` class and contains code to input the details of a single employee.

<br/>

You can use

```
sdg warp SuncoastHumanResources
```

to download this code (after you `cd` into the project)

---

[.autoscale: true]

[.column]

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
```

[.column]

```csharp
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

---

# Lacks features

- Good start
- Cannot store more than one employee
- Lacks menu
- Cannot search, update, or delete employees

---

## Adding a `List` to store our employees

The `List` we will create will look like this:

```csharp
var employees = new List<Employee>();
```

- Naming variables is important
- The convention we follow is collections use pluralized names. `employees` is a hint that the variable is a collection.

---

# Adding a feature to add an employee

After the input we'll add code to add the employee to a list

```csharp
employees.Add(employee);
```

---

# Make a simple menu

---

```csharp
// Should we keep showing the menu?
var keepGoing = true;

// While the user hasn't said QUIT yet
while (keepGoing) {
  // Insert a blank line then prompt them and get their answer (force uppercase)
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
```

---

# [fit] Add an option to show all the employees

To work on the **`R`**ead part of the application we'll add an option to read all the employees.

This is often the next simplest feature of the code to write since we only need to "loop" and "print".

---

# Update the menu

```csharp
Console.Write("What do you want to do? (A)dd an employee or (S)how all the employees or (Q)uit: ");
```

---

# Add an `else if` to our menu choices

```csharp
if (choice == "Q") {
  // They said quit, so set our keepGoing to false
  keepGoing = false;
} else if (choice == "S") {
```

---

# Add the code to show all the employees

```csharp
// Loop through each employee
foreach(var employee in employees) {
  // And print details (split on two lines for the slide)
  Console.WriteLine($"{employee.Name} is in department " +
  "{employee.Department} and makes ${employee.Salary}");
}
```

---

# Find an employee by name

The other part of **`R`**eading from the database is to search for a specific item.

We will add an option to find a specific employee by matching the name

---

# Algorithm

- Create a variable named **`foundEmployee`**
- Prompt for the name
- Loop through the list to look for a match
  - If we find one, update `foundEmployee`
- After the loop, `foundEmployee` is either `null` (not found) or refers to the matching item
- Show a message if `null`, otherwise show the details.

---

# Update the menu

```csharp
Console.Write("What do you want to do? (A)dd an employee or (S)how all the employees or (F)ind an employee or (Q)uit: ");
```

---

# Update the `else if`

```csharp
if (choice == "Q") {
// They said quit, so set our keepGoing to false
keepGoing = false;
} else if (choice == "F") {
```

---

```csharp
// Ask for the name of an employee
var name = PromptForString("What name are you looking for? ");

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
  Console.WriteLine($"{foundEmployee.Name} is in department " +
  "{foundEmployee.Department} and makes ${foundEmployee.Salary}");
}
```

---

# Improving this code by adding `LINQ`

- While this code works it is "tedious"
- We can leverage `LINQ` here.
- Then we can utilize `FirstOrDefault` for searching

---

```csharp
// Ask for the name of an employee
var name = PromptForString("What name are you looking for: ");

// Make a new variable to store the found employee, initializing
// to null, which will indicate no match found
Employee foundEmployee = employees.FirstOrDefault(employee => employee.Name == name);

// If the foundEmployee is still null, nothing was found
if (foundEmployee == null) {
  Console.WriteLine("No match found");
} else {
  // Otherwise print details of the found employee
  Console.WriteLine($"{foundEmployee.Name} is in department " +
  "{foundEmployee.Department} and makes ${foundEmployee.Salary}");
}
```

---

# Delete and Update

Exercise for the reader...

---

# Refactoring the code

- Functions for adding, searching, and displaying all exist in the main code.
- Extracting code into a specific class will increase the code's clarity and give specific places to implement new features.

---

# Classes and methods should do **ONE** thing, and **ONE** thing well

---

# [fit] Our `Main` does too much

---

# [fit] Allow `Main` to be our **User Interface**

---

# [fit] Make a class **EmployeeDatabase** to deal with the **List**

---

[.autoscale: true]

# API

- Create a class `EmployeeDatabase`
- Move our `List<Employee>` inside.
- Make this class property **private**
- Develop **public** methods to perform the common actions we need: `GetAllEmployees`, `FindOneEmployee`, `AddEmployee`.
- Methods _receives_ data it needs and returns the data it _provides_.
- These methods essentially create an **API** (Application Programming Interface) for how to use this code.

---

# What does isolated code provide?

- Organization of the class allows the database implementation to change without modifying the code that uses it.
- For instance, we could load and save the data from a data file.
- As long as the inputs/outputs stay the same (or change only slightly) we are more free to change the **implementation**
- This is called **decoupling**

---

```csharp
class EmployeeDatabase
{
  // Keep a *private* copy of the employee list.
  private List<Employee> employees = new List<Employee>();

  // Get a list of all the employees
  public List<Employee> GetAllEmployees()
  {
    return employees;
  }

  // Add an employee to the list of employees we are managing.
  public void AddEmployee(Employee newEmployee)
  {
    employees.Add(newEmployee);
  }

  // Look through the list of employees. If we find one with
  // a matching name, return the employee. If nothing is found, return a null.
  public Employee FindOneEmployee(string name)
  {
    // to null which will indicate no match found
    Employee foundEmployee = employees.FirstOrDefault(employee => employee.Name == name)

    // Return what we found (the employee or null)
    return foundEmployee;
  }
}
```

---

# See the lesson reading for the full code listing
