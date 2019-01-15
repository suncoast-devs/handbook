# Intro to C#

## To get started

- Download the CLI and verify its running by running `dotnet --version`

## Your first program
- Create a new console application. A console application runs in the terminal. Create a new app using the CLI `dotnet new console`
- Our code will go in the `Main()` method in  `Program.cs`
- to run the app, use the command `dotnet run`. This will bulid and run and our project. 
- C# is a compiled language. That means that the code we write is translated in machine code before anything is run. Compiling our codes allows for our to be (probably) faster and eliminate an entire class of bugs.  

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


- Strings
- `name = "Gavin"`
- `name.length`
- String interpolation
- `new_string = "My score is #{41 + 1}"`
- Numbers
- `score = 42`
- Arrays
- `scores = [100, 98, 42, 65]`
- Indexing
  - `scores[0]` is the _first_ thing in the array (100)
  - `scores[1]` is the _second_ thing in the array (98)
- Negative indexing
  - `scores[-1]` is the _last_ thing in the array (65)
  - `scores[-2]` is the _second to last_ thing in the array (42)
- Returns `nil` if the index isn't there
  - `scores[500]` is `nil`
- Methods
  - `length` gives you the length of the array
- Can store mixed types
  - `my_array = ["Gavin", 42, "Toni", 100]
  - `array_with_arrays_inside = ["Gavin", 42, ["Toni", "Jason"], 100]`
- Hash (like a dictionary)
- `person = { "name" => "Gavin Stark", "score" => 42, "favorite_color" => "blue" }`
- `person["score"]` (returns _42_)
- `person["favorite_color"]` (returns _blue_)
- Returns `nil` if the key isn't there `person["address"]` returns `nil`
- Values (and keys, though they are usually strings) can be comples
  - `person = { "name" => "Gavin Stark", "scores" => [100, 98, 42, 64] }
  - `person["scores"]` is `[100, 98, 42, 64]`
  - `person["scores"][2]` is `42` since `person["scores"]` is an array, and then we index the array at `2` to get the _third_ element

## Interacting with users

- `puts` outputs information without any formatting. Good for user output
- `p` outputs information formatted for programmer friendliness. Good for debugging.

```ruby
name = "Gavin"
puts name       # Would output:      Gavin
p name          # Would output:      "Gavin"

empty_string = ""
puts empty_string    # Would output:
p empty_string       # Would output:   ""
```

- `gets` retrieves information from input (usually the terminal from the user typing)
- However, it includes a `newline` character (the _return key_ that ends a line)
- We use `chomp` to remove it.

```ruby
puts "What is your name?"
name_with_newline = gets
name = name_with_newline.chomp

# or
puts "What is your name?"
name = gets.chomp

# or
puts "What is your name?"
name = gets(chomp: true)
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
