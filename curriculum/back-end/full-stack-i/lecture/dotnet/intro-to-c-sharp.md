# Intro to C#

## To get started

- Download the CLI and verify its running by running `dotnet --version`

## Your first program
- Create a new console application. A console application runs in the terminal. Create a new app using the CLI `dotnet new console`
- Our code will go in the `Main()` method in  `Program.cs`
- to run the app, use the command `dotnet run`. This will bulid and run and our project. 
- C# is a compiled language. That means that the code we write is translated in machine code before anything is run. Compiling our codes allows for our to be (probably) faster and eliminate an entire class of bugs.  
- Every line of code needs a `;` or a `{` at the end

## Declaring Variables

- Variables are strongly typed. 
- Can be declared like: 

``` C# 
string name = "Mark";
int score = 95;
```

- Better to use `var`
- `var` is used to implicitly type a varible

```C# 
    var name = "Mark"; // typed to string
    var score = 95; // typed to int
```

### Primitive types

- [Primitives](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/built-in-types-table) are the basic built in types in C#
- The common primitives are: 
    - **int** : a whole number from -2,147,483,648 to 2,147,483,64
    - **long** :  a whole number from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
    - **double** : a 64 bit floating point value that has an approximate precision of ~15-17 digits
    - **float** :  a 32 bit floating poit value that has an approximate precision of 6-9 digits
    - **decimal** :  a more precise way to store decimal numbers, but has a smaller range
    - **char** : represents a unicode character
    - **bool** : true or false
    - **byte** : represents a raw chunk of data
- Primitives can not be `null`

- NOTE: do not feel the need to memorize the difference in types, just know that they exist. Most of the time developers will just `var` and not think about the types until it matters, for example, in the finance apps, where rounding matters, a developer should be aware of the precision of the numbers. 


### References Types

- [Reference Types](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/reference-types) are everything else in C#. This includes `String`, `Object` and any custom objects that you will create
- Reference Types can be `null`


### Variable Examples

- integers
 `var score = 42;`

- floats
 `var total = 10f;`

- decimal
- `var total = 10m;`

- double
- `var total = 10.0;`
- `var total = 10d;`

- char are respresented by single quotes `'`
`var piratesFavoriteLetter = 'c';`

- Strings are treated as arrays of characters
 `var name = "Mark";`
 `var x = name.Length;`

- Strings are indexed based
` var firstLetter = name[0];`

- Crashes when trying to access a index that does not exist
`var oops = name[-1];`

- String interpolation
 `var new_string = $"My score is {41 + 1}";`

- Arrays are more restrictive on functionality are rarely used
- Arrays still have 0 based indexes
- Once an array is created, it's size cannot change
- Crashes when trying to access a index that does not exist
` var scores = new int[] { 100, 98, 42, 65 };`
` var second = scores[1];`
` var numberOfScores = scores.Length;`

- Arrays can only store data of the same type
` var arrayOfSize10 = new int[10];`
` arrayOfSize10[4] = "hello"; // Can't do this since arrayOfSize10 is a an array of int, not strings` 

- Lists are a more flexible, commonly used arrays
- Lists are most like JavaScript arrays

- to create a list of doubles
` var scores = new List<double>();`
- to add to a list 
` scores.Add(100);`
- Lists are still accessed as a 0 based list 
` scores[0] = 100;`


- a Dictionary is strongly typed key:value look up table
- this can be thought of an actual dictionary, a thing that words and those words each have a definition. In this case the word is the key and the definition is value. 
- When creating a dictionary, the first type is the type of the Key and the second type is the type of the Value
- this will create a dictionary in the real world, with a stirng as the key (the word) and a string as value (the definition)
` var oxford  = new Dictionary<string, string>();`
- this will a dictionary with a string as the key (the player name) and a int as the value (the player's score)
` var playerScores = new Dictionary<string, int>();`
` playerScores.Add("Robbie Lakeman", 1247700 )
- crashes if you try to access a key that doesn't exist



## Interacting with users

- `Console.WriteLine()` outputs to the console.
- `Console.WriteLine()` will convert what is passed into it to a string

```C# 
var hello = "Hello, World!";
Console.WriteLine(hello);
```

- `Console.ReadLine()` will wait for user input. This will continue to accept input until the user hits `enter`

``` C# 

Console.WriteLine("What is your name?");
var input = Console.ReadLine();
Console.WriteLine($"Sorry {name}, I'm afraid I can do that");

```

## Control Flow

- if statements

```ruby
if name == "Gavin"
  puts "The name was Gavin!"
else
  puts "The name isn't Gavin"
end
```

## Looping

- loop / break

```ruby
loop do
  puts "Give me some input"
  input = gets.chomp
  if input == "done"
    break
  ene
  puts "You said #{input}"
end
```

## Ruby Comments

- Comments start with a `#` mark. With a bare `#`, anything that follows will be ignored by Ruby.

## Methods

- Organizing code
- Placing a name on a set of steps or a way of doing something
- Methods have a name, and optionally a set of inputs (arguments) and a return
- Example:

```ruby

# This method has no inputs or return
def say_hello
  puts "Hello there!"
end

# This method has an input but no returns
def say_hello(name)
  puts "Hello there #{name}!"
end

# This method has inputs and a return
def make_sentence(name, score)
  return "The score for #{name} is #{score}"
end
```

- Without a `return` keyword, a method _returns_ the value of the last statement of the function.

```ruby
# This method has inputs and a return
def make_sentence(name, score)
  "The score for #{name} is #{score}"
end
```

## More control flow

- Conditionals
  - Are two things true:
    - `if score > 10 && score < 80`
  - Are either of two things true
    - `if score > 90 || name == "Gavin"`
- What if we are looking for a few options we have the `case` statement

  ```ruby

  case name
  when "Gavin"
    puts "Instructor"
  when "Mark"
    puts "Instructor"
  when "Jason"
    puts "Instructor"
  when "Dania"
    puts "Ops"
  when "Holly"
    puts "Ops"
  when "Toni"
    puts "Campus Director"
  end
  ```
