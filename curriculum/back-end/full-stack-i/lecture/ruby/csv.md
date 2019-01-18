# Ruby CSV

## Plain Text Files

Text files can contain just about anything from poems to books to lists of countries. This section will teach us about creating text files and reading existing ones.

### Creating a Text File

#### `open` and `close` a file

There are a few ways to create new files with Ruby, but we are going to focus on the `open` option for consistency. What we would like to do is create a new file, `countries.txt`, and add a few countries to it, each with their own line. We can use Ruby's `File` class to do this.

```ruby
f = File.open("countries.txt", "w")
f.write("AF|afghanistan\nAL|albania\nDZ|algeria")
f.close
```

The first line calls the `open` class-level method on the `File` class and passes it two arguments: the first is the file's name that we are creating, and the second is the "mode," or permissions for what we can do with the file. You can see all of the options [in the Ruby docs](http://ruby-doc.org/core-2.2.0/IO.html#method-c-new-label-IO+Open+Mode).

The second line calls the `write` method, which allows us to write text to the file. We write the `\n` characters so that the three countries appear on three separate lines.

The third line is how we tell Ruby that we are done performing actions on the file. When `close` is called, Ruby will then free up the space in your computer's memory that it had allocated.

#### `open` with a Block

It is easy to forget to call `close` on a `File` instance, so `File.open` will accept a Ruby block that will automatically call `close` for you, saving you some hassle! Let's rewrite the previous section's code using a block:

```ruby
File.open("countries.txt", "w") do |f|
  f.write("AF|afghanistan\nAL|albania\nDZ|algeria")
end
```

Instead of assigning the result from our `File.open` call to a variable, we can use a block, get access to a temporary local variable (`f`), and perform our operations within this block.

### Reading a Text File

If we already have the `countries.txt` file at hand and need to read its contents, then we can use the `read` method on the `File` class to do so:

```ruby
File.read("countries.txt")
# => "AF|afghanistan\nAL|albania\nDZ|algeria"
```

The two `\n` characters means that there are three lines in this text file. If we use the `readlines` method on this file, we can get each line back as a member of an array:

```ruby
File.readlines("countries.txt")
# => ["AF|afghanistan\n", "AL|albania\n", "DZ|algeria"]
```

And if we save this result into a variable, we now have an array of lines from the file that we can iterate over and perform any sort of analysis we please.

## Comma-Separated Value (CSV) Files

Spreadsheet applications, which typically display information as horizontal rows and vertical columns, often offer an "Export as CSV" option. Comma-separated values might sound intimidating, so let's manually convert a simple table to be values that are comma-separated. Our table has three columns, _Name_, _Pin_, and _Balance_ along with four row entries.

| Name  | Pin  | Balance |
| ----- | ---- | ------- |
| Sean  | 1234 | 400     |
| Jamie | 2345 | 6734    |
| Liz   | 5678 | 50000   |
| Stan  | 0912 | 122     |

In CSV format, this looks like

```
Name,Pin,Balance
Sean,1234,400
Jamie,2345,6734
Liz,5678,50000
Stan,0912,122
```

All we did was collapse each row horizontally and add commas as separators between each value. Voilà! Comma-separated values.

Files that end in `.csv` often consist of nothing more than a structure like the one we wrote above.

### Creating a CSV File

Assume we have been given people's account information as an array of hashes that we must export in CSV format. Here is an example for us to work with:

```ruby
accounts = [
  { name: "Sean" , pin: 1234, balance: 400   },
  { name: "Jamie", pin: 2345, balance: 6734  },
  { name: "Liz"  , pin: 5678, balance: 50000 },
  { name: "Stan" , pin: 9012, balance: 122   }
]
```

We need to find a way to create a file named `accounts.csv`, make the first line have the column headers `Name,Pin,Balance`, and then fill in the values in the correct order for each item on separate lines. Ruby comes with a `CSV` class that can help us, but we need to `require` it in order to use it.

First, let's use the `open` method on `CSV` to create a new file that we can write to, and let's add one line to the file:

```ruby
require 'csv'

CSV.open("accounts.csv", "w") do |csv|
  csv << ["Name", "Pin", "Balance"]
end
```

`CSV.open` accepts two arguments and a block. The first argument is the name of the file we are creating, and the second is the permission we'd like to use, which is in this case "write." Lastly, within the block we get access to the file itself, and we can write lines to the file by using the `<<` ("shovel") operator. We can pass the comma-separated values as an array and let the `CSV` class figure out how to place them together in the file.

If you execute this code, you will see a new file, `accounts.csv`, created, and the only line it will contain is `Name,Pin,Balance`. We're almost there! The final piece of this puzzle is that we need to iterate over the `accounts` array and add each item's `:name`, `:pin`, and `:balance` as a row to the file:

```ruby
require 'csv'

CSV.open("accounts.csv", "w") do |csv|
  csv << ["Name", "Pin", "Balance"]
  accounts.each do |acc|
    csv << [acc[:name], acc[:pin], acc[:balance]]
  end
end
```

### Parsing a CSV File

To parse a CSV and get the values represented in the file back as an array of arrays, we use the `read` method on the `CSV` class:

```ruby
require 'csv'
accounts = CSV.read("accounts.csv")
# => [["Name", "Pin", "Balance"], ["Sean", "1234", "400"], ["Jamie", "2345", "6734"], ["Liz", "5678", "50000"], ["Stan", "9012", "122"]]
```

As you can see in the return value above, each line is returned much in the way we provided it: as an array. From here, you could iterate over this return value and accomplish your goals.

If you would like to have `CSV` go ahead and start the iterating for you, you can use the `foreach` method with only the filename argument:

```ruby
require 'csv'
CSV.foreach("accounts.csv") do |row|
  puts row.inspect
end
# ["Name", "Pin", "Balance"]
# ["Sean", "1234", "400"]
# ["Jamie", "2345", "6734"]
# ["Liz", "5678", "50000"]
# ["Stan", "9012", "122"]
# => nil
```

These two techniques have their uses, but if you have a CSV with "headers," as we do with `"Name"`, `"Pin"`, and `"Balance"`, we can pass additional options to `foreach` that will instead give us back the results as an array of CSV objects that can be treated like hashes:

```ruby
CSV.foreach("accounts.csv", headers: true, header_converters: :symbol) do |row|
  puts "#{row[:name]} has a pin of #{row[:pin]} and a balance of #{row[:balance]}."
end
# Sean has a pin of 1234 and a balance of 400.
# Jamie has a pin of 2345 and a balance of 6734.
# Liz has a pin of 5678 and a balance of 50000.
# Stan has a pin of 9012 and a balance of 122.
# => nil
```

By passing `headers: true`, we tell the `foreach` method that each item of the first line represents a column of data; thus each item on subsequent lines will be recognized by the relevant header on line 1. The `header_converters: :symbol` option allows us to use a Symbol, such as `:name`, to access the value of a given row's name value. Together, these options make parsing CSVs much easier.
