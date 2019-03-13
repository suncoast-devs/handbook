# Intro to Ruby

## Ruby files

- Store our code in files that end in `.rb`
- Run our code from the terminal via `ruby filenamehere.rb`
- We can access an interactive console with the program `irb`

## Variables and basic types

### Strings
- `name = "Gavin"`
- `name.length`
- String interpolation
  - `new_string = "My score is #{41 + 1}"`

### Numbers
- `score = 42`

### Arrays

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

### Hash (like a dictionary)
- Declaring
  - `person = { "name" => "Gavin Stark", "score" => 42, "favorite_color" => "blue" }`
- Accessing
  - `person["score"]` (returns _42_)
  - `person["favorite_color"]` (returns _blue_)
- Missing keys
  - Returns `nil` if the key isn't there `person["address"]` returns `nil`
- Values (and keys, though they are usually strings) can be complex
  - `person = { "name" => "Gavin Stark", "scores" => [100, 98, 42, 64] }
  - `person["scores"]` is `[100, 98, 42, 64]`
  - `person["scores"][2]` is `42` since `person["scores"]` is an array, and then we index the array at `2` to get the _third_ element

## Interacting with users

### Printing values

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

### Reading values

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
  - Are two things true (_AND_):
    - `if score > 10 && score < 80`
  - Are either of two things true (_OR_):
    - `if score > 90 || name == "Gavin"`

- What if we are looking for a few options? For this, we have the `case` statement

  ```ruby

  case color_name
  when "red"
    puts "#F00"
  when "green"
    puts "#0F0"
  when "blue"
    puts "#00F"
  when "black"
    puts "#000"
  when "white"
    puts "#FFF"
  end
  ```
