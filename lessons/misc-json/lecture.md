theme: Next, 1

# [fit] JSON

---

# [fit] How to represent data to exchange on the Internet?

---

# Formats

[.column]

We need consistent formats to use to exchange information.

We've created a lot of them.

We'll create even more.

[.column]

![inline](https://imgs.xkcd.com/comics/standards.png)

---

# Most common

# [fit] XML

# [fit] JSON

^ XML was king in the early days of the internet. XML and HTML are closely related

---

# JSON is lingua franca of the (modern) web

JSON stands for the JavaScript Object Notation and is pronounced like the name Jason, as in "Jason and The Argonauts." -- but this is [even debated](https://www.youtube.com/watch?v=zhVdWQWKRqM)

JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of languages such as C, C#, Java, JavaScript and others.

---

# Simplicity

JSON attempts to be a very simple format with only a few rules. It is built on just two structures:

- An ordered list of values. In most languages, this is realized as an array, vector, list, or sequence.

- A collection of name/value pairs. In various languages, this is realized as an object, record, struct, dictionary, hash table, keyed list, or associative array.

---

# Values

What kind of values can JSON store?

- string
- number
- booleans
- null
- array
- object

---

## Strings

A simple string in JSON is represented as a sequence of characters surrounded by double quotes:

"This is a JSON string"

---

# Numbers

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

---

# Booleans

A true or false value. These are just the literals `true` and `false`

---

# Null

Similar to a `null` in C# or JavaScript, a literal indicating no value. Represented by `null`

---

# Array

[.column]

A JSON array simply stores values of various types in a sequence. This could include another array, or an object.

[.column]

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

---

# Object

[.column]

A JSON object represents a value that has keys and values.

Begins with a `{`. Key names are in double-quotes. Followed by a colon and then any other JSON value type. The object closes with a `}`.

[.column]

```json
{
  "class-size": 5,
  "students": [
                "Mary",
                "Elizabeth",
                "Mark",
                "Sam",
                "Tom"
              ],
  "full": true,
  "completed": false
}
```

---

# Flexibility

The flexibility of the JSON format comes from its simplicity and lack of assumptions about the contents of our data.

You will notice that there is no data type for Dates, Times, images, or other more complex structures.

These representations of these types of data is up to the developer to specify how they will be represented using the primitive types JSON provides.

**NOTE** this is also a weakness and downside to JSON.

^ It makes the documentation more important and requires attention to detail on the part of the developer.

---

# Prevalence

JSON has become the lingua-franca, or default, data format on the web.

Most systems we receive data from, and send data to, will be using JSON as the data format. 

As we work with APIs and build backend servers we will be using JSON as our data format.

