---
title: JavaScript Object Notation (or JSON)
---

## How to represent data to exchange on the Internet

When exchanging information between different computer systems we need to format
the data so that the receiving system can process and understand it. In the
history of computer systems many such formats have been created, much to both
the delight and despair of programmers. As long as we continue to create
information systems we will continue to create data formats.

As we built the web with technologies such as HTML, CSS, and JavaScript we
needed a standard to exchange information. In the early days of the internet a
format known as XML (Extensible Markup Language) was used to exchange data. In
fact, HTML and XML are closely related and as such XML was a good choice.
However, over time, XML was found to be a complex format to generate, consume,
and for humans to read. Looking for a simpler format that would be easy to
generate, consume, and to read. This became JSON.

## JSON

JSON stands for the JavaScript Object Notation and is pronounced like the name
Jason, as in "Jason and The Argonauts." JSON is a text format that is completely
language independent but uses conventions that are familiar to programmers of
languages such as C, C#, Java, JavaScript and others.

JSON attempts to be a very simple format with only a few rules. It is built on
just two structures:

- An ordered list of values. In most languages, this is realized as an array,
  vector, list, or sequence.
- A collection of name/value pairs. In various languages, this is realized as an
  object, record, struct, dictionary, hash table, keyed list, or associative
  array.

## Values

What kind of values can JSON store?

- string
- number
- booleans
- null
- array
- object

## Strings

A simple string in JSON is represented as a sequence of characters surrounded by
double quotes:

"This is a JSON string"

## Numbers

A number in JSON is represented as an optional `-` followed by some digits, a
decimal place, and digits for the fractional component. Optionally there can be
an exponent.

```
42
-100
42.78
-100.78
6.02214179e+23
```

## Booleans

A true or false value. These are just the literals `true` and `false`

## Null

Similar to a `null` in C# or JavaScript, a literal indicating no value.
Represented by `null`

## Array

A JSON array simply stores values of various types in a sequence. This could
include another array, or an object.

```json
[
  100,
  42,
  99,
  4,
  "JavaScript",
  99,
  null,
  [9, 8, 7, 6, 5, 4, 3, 2, 1],
  false,
  { "score": 100 }
]
```

## Object

A JSON object represents a value that has keys and values. Similar to a C#
dictionary, or an `object` in JavaScript. The format of an object begins with a
`{` and contains key names surrounded by double-quotes, followed by a colon and
then followed by any other JSON value type (strings, numbers, booleans, null, an
array, or another object). The object closes with a `}`.

```json
{
  "class-size": 5,
  "students": ["Mary", "Elizabeth", "Mark", "Sam", "Tom"],
  "full": true,
  "completed": false
}
```

## Flexibility

The flexibility of the JSON format comes from it's simplicity and lack of
assumptions about the contents of our data. You will notice that there is no
data type for Dates, Times, images, or other more complex structures. These
representations of these types of data is up to the developer to specify how
they will be represented using the primitive types JSON provides.

## Prevalence

JSON has become the lingua-franca, or default, data format on the web. Most
systems we receive data from, and send data to, will be using JSON as the data
format. As we build backend servers we will be using JSON as our data format.
