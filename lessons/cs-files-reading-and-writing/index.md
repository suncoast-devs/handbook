---
title: Reading and Writing Files in C#
assignments:
  - cs-first-bank-of-suncoast
---

So far we have seen how to input, manage, and output data in our programs.
However, this data is only stored in the computer's memory and thus when we stop
our programs all of this information is lost.

It would be helpful if our programs could keep track of the information we give
it so that the next time our application runs it can bring all of that back into
it's memory before we interact with it.

There are many ways to store information and we will investigate a few during
our learning. The first way we will look at is reading and writing from files.

## A simple structure for our data - Comma Separated Values

Files on our computers are nothing more than a sequence of characters (really
more accurately `bytes`). This is similar to how a `string` is also just a
sequence of characters.

However, files might be significantly larger than any strings we've dealt with
in the past. Additionally, as opposed to a `string` we would want our files to
store more than one element. We've seen converting information to and from
`string`s with various parsing functions. Lets take that one step further as we
discuss files.

One of the most straight forward structures for storing data in a file is the
CSV (Comma Separated Value) form. Perhaps you have seen this before if you have
worked with spreadsheet applications such as
[Excel](https://products.office.com/en-us/excel) or
[Numbers](https://www.apple.com/numbers/).

The structure of a simple CSV file looks similar to this:

```csv
"Elon Musk",42,120000
"Grace Hopper",100,24000
```

In this format you will see that we have strings of data surrounded by `"`
quotes and our values are separated by commas `,` and there are multiple lines
representing, in this case, employees.

The CSV file also allows us to have a first row (aka header) that describes the data for any
human and computer reader.

```csv
"Name","Department","Salary"
"Elon Musk",42,120000
"Grace Hopper",100,24000
```

Having a header makes the structure of the contents easier to understand.

## Sample Program

Before we start with integrating CSV into our application, lets look at the
application we are going to work with. This code will create a new, empty, list
of numbers and ask the user to enter more numbers until they type in `quit`.
Study this code since next we will add the ability to _save_ the list of numbers
and then load it at the start.

If you want to code-along, use this to create a new project:

```shell
dotnet new sdg-console -o NumberTracker
```

_Program.cs_

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

namespace NumberTracker
{
  class Program
  {
    static void Main(string[] args)
    {
      Console.WriteLine("Welcome to Number Tracker");

      // Creates a list of numbers we will be tracking
      var numbers = new List<int>();

      // Controls if we are still running our loop asking for more numbers
      var isRunning = true;

      // While we are running
      while (isRunning)
      {
        // Show the list of numbers
        Console.WriteLine("------------------");
        foreach (var number in numbers)
        {
          Console.WriteLine(number);
        }
        Console.WriteLine($"Our list has: {numbers.Count()} entries");
        Console.WriteLine("------------------");

        // Ask for a new number or the word quit to end
        Console.Write("Enter a number to store, or 'quit' to end: ");
        var input = Console.ReadLine().ToLower();

        if (input == "quit")
        {
          // If the input is quit, turn off the flag to keep looping
          isRunning = false;
        }
        else
        {
          // Parse the number and add it to the list of numbers
          var number = int.Parse(input);
          numbers.Add(number);
        }
      }
    }
  }
}
```

## Working with CSV

Luckily for us the `C#` community has written code we can reuse to help us read
and write CSV files. To do so we will add a new package to our application.

In the same directory as our project (in the same directory as our _Program.cs_)
we can add this library to our application with this command:

```shell
dotnet add package CsvHelper
```

This command looks up the library `CvsHelper` in a global repository of shared
code. TODO: CREATE AND LINK LESSON ON DOTNET-LIBRARIES HERE.

Once we have added this _external_ library to our application we can add a
`using` line to tell our `Program.cs` we would like to have that code available
to us.

## Adding saving logic to our sample application

Let's add some code to the end of our program that will _save_ this list of
numbers to a file just before it ends. This way our list of numbers will be
available to us for reading when we start the application again. We'll add that
feature after the saving is working.

Before we can write to the file we have to tell the code what file we want to
write to. For this we will use a new object named `StreamWriter`. The purpose of
the `StreamWriter` is to accept information and send it to a destination. Since
eventually we may be writing a large amount of information the `StreamWriter`
can process the information from our code and into the file in a flow, like
water running in a stream. We simply need to tell it where the output goes, in
this case a file named `numbers.csv`

```csharp
// Create a stream for writing information into a file
var fileWriter = new StreamWriter("numbers.csv");
```

Notice that the filename is provided as an argument to the stream. Now we have
this stream setup to receive information and write it to the file. Also note
that we need to add the `using System.IO;` statement to be able to use the
`StreamWriter`. Visual Studio Code can automatically add that to the top of your
code for you.

Now that we have a way to send information to a file, we need some code that
knows how to write in the CSV format. From the `CsvHelper` library we can use
the `CsvWriter` class to do so.

```csharp
// Create an object that can write CSV to the fileWriter
var csvWriter = new CsvWriter(fileWriter, CultureInfo.InvariantCulture);
```

This class takes two arguments, the first the object, in our case the
`fileWriter` where the information is going, and second some information on how
to format various values. This `CultureInfo.InvariantCulture` indicates that we
do not want any specific formatting of strings or numbers in our file. (e.g.
don't format numbers like `12000` as `12,000` or `12.000`)

This object processes our list of numbers.

```csharp
// Ask our csvWriter to write out our list of numbers
csvWriter.WriteRecords(numbers);
```

Finally, we have to tell the `fileWriter` we are complete and to close the file,
ensuring all the information is saved.

```csharp
// Tell the file we are done
fileWriter.Close();
```

Lets look at the code all together:

```csharp
// Create a stream for writing information into a file
var fileWriter = new StreamWriter("numbers.csv");

// Create an object that can write CSV to the fileWriter
var csvWriter = new CsvWriter(fileWriter, CultureInfo.InvariantCulture);

// Ask our csvWriter to write out our list of numbers
csvWriter.WriteRecords(numbers);

// Tell the file we are done
fileWriter.Close();
```

This is how the information flows through this code:

```
numbers
   |
   |
   ---> csvWriter.WriteRecords
                |
                |
                ---> fileWriter
                         |
                         |
                         ---> `numbers.csv`
```

If the user entered a sequence of numbers: `1`, `42`, `99`, `3`, and `17` our
`numbers.csv` would look like this:

```
1
42
99
3
17
```

Our code now looks like this:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Globalization;
using System.IO;
using CsvHelper;

namespace NumberTracker
{
  class Program
  {

    // static void SaveStudents(List<Student> students)
    // {
    //   var writer = new StreamWriter("students.csv");
    //   var csvWriter = new CsvWriter(writer, CultureInfo.InvariantCulture);
    //   csvWriter.WriteRecords(students);
    //   writer.Flush();
    // }

    static void Main(string[] args)
    {
      Console.WriteLine("Welcome to Number Tracker");

      // Creates a list of numbers we will be tracking
      var numbers = new List<int>();

      // Controls if we are still running our loop asking for more numbers
      var isRunning = true;

      // While we are running
      while (isRunning)
      {
        // Show the list of numbers
        Console.WriteLine("------------------");
        foreach (var number in numbers)
        {
          Console.WriteLine(number);
        }
        Console.WriteLine("------------------");

        // Ask for a new number or the word quit to end
        Console.Write("Enter a number to store, or 'quit' to end: ");
        var input = Console.ReadLine().ToLower();

        if (input == "quit")
        {
          // If the input is quit, turn off the flag to keep looping
          isRunning = false;
        }
        else
        {
          // Parse the number and add it to the list of numbers
          var number = int.Parse(input);
          numbers.Add(number);
        }
      }

      // Create a stream for writing information into a file
      var fileWriter = new StreamWriter("numbers.csv");

      // Create an object that can write CSV to the fileWriter
      var csvWriter = new CsvWriter(fileWriter, CultureInfo.InvariantCulture);

      // Ask our csvWriter to write out our list of numbers
      csvWriter.WriteRecords(numbers);

      // Tell the file we are done
      fileWriter.Close();
    }
  }
}
```

## Adding loading logic to our sample application

Now lets read this information from the file at the beginning of the code.

Just as we have a `StreamWriter` we also have a `StreamReader` we can use to
load data.

```csharp
// Creates a stream reader to get information from our file
var fileReader = new StreamReader("numbers.csv");
```

And as we have a `CsvWriter` we also have a `CsvReader` we can use to read the
CSV data.

```csharp
// Create a CSV reader to parse the stream into CSV format
var csvReader = new CsvReader(fileReader, CultureInfo.InvariantCulture);

// Tell the CSV reader not to interpret the first row as a header, otherwise the first number will be skipped.
csvReader.Configuration.HasHeaderRecord = false;
```

Finally, instead of `WriteRecords` we have a way to `ReadRecords`.

```csharp
// Get the records from the CSV reader, as `int` and finally as a `List`
var numbers = csvReader.GetRecords<int>().ToList();
```

> NOTE: To use `ToList()` here we must add `using System.Linq` to our code.

And finally close the reader

```csharp
// Close the reader
fileReader.Close();
```

We replace the line `var numbers = new List<int>()` with the lines above. We
also add `using System.Linq` in order to use `ToList()`.

```csharp
using System;
using System.Globalization;
using System.IO;
using System.Linq;
using CsvHelper;

namespace NumberTracker
{
  class Program
  {
    static void Main(string[] args)
    {
      Console.WriteLine("Welcome to Number Tracker");

      // Creates a stream reader to get information from our file
      var fileReader = new StreamReader("numbers.csv");

      // Create a CSV reader to parse the stream into CSV format
      var csvReader = new CsvReader(fileReader, CultureInfo.InvariantCulture);

      // Tell the CSV reader not to interpret the first row as a header, otherwise the first number will be skipped
      csvReader.Configuration.HasHeaderRecord = false;

      // Get the records from the CSV reader, as `int` and finally as a `List`
      var numbers = csvReader.GetRecords<int>().ToList();

      // Close the reader
      fileReader.Close();

      // Controls if we are still running our loop asking for more numbers
      var isRunning = true;

      // While we are running
      while (isRunning)
      {
        // Show the list of numbers
        Console.WriteLine("------------------");
        foreach (var number in numbers)
        {
          Console.WriteLine(number);
        }
        Console.WriteLine("------------------");

        // Ask for a new number or the word quit to end
        Console.Write("Enter a number to store, or 'quit' to end: ");
        var input = Console.ReadLine().ToLower();

        if (input == "quit")
        {
          // If the input is quit, turn off the flag to keep looping
          isRunning = false;
        }
        else
        {
          // Parse the number and add it to the list of numbers
          var number = int.Parse(input);
          numbers.Add(number);
        }
      }

      // Create a stream for writing information into a file
      var fileWriter = new StreamWriter("numbers.csv");

      // Create an object that can write CSV to the fileWriter
      var csvWriter = new CsvWriter(fileWriter, CultureInfo.InvariantCulture);

      // Ask our csvWriter to write out our list of numbers
      csvWriter.WriteRecords(numbers);

      // Tell the file we are done
      fileWriter.Close();
    }
  }
}
```

Now our code is reading a file at the start, and writing it at the end.

## Handling the case where there is no file

What happens if we run our code and there is no `numbers.csv` file? We will get
an error!

To prevent this we can add a little logic at the top of our code:

```csharp
// Creates a stream reader to get information from our file
TextReader reader;

// If the file exists
if (File.Exists("numbers.csv"))
{
  // Assign a StreamReader to read from the file
  reader = new StreamReader("numbers.csv");
}
else
{
  // Assign a StringReader to read from an empty string
  reader = new StringReader("");
}
```

By using this logic we can send the `CsvReader` an empty stream if there is no
file rather than throwing an exception. When reading from the empty stream, the
`var numbers` list will be empty.

<!-- TODO: Add an example of CSV to and from our EmployeeDatabase -->
