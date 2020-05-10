---
title: Strings
---

JavaScript's String type is used to represent textual data. It is a set of
"elements." Each element in the String occupies a position in the String. The
first element is at index 0, the next at index 1, and so on. The length of a
`String` is the number of elements in it. You can create strings using string
literals or string objects.

## String literals

You can create simple strings using either single or double quotes:

```javascript
"foo";
"bar";
```

## Methods of strings

| Method                                   | Description                                                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `charAt`, `charCodeAt`, `codePointAt`    | Return the character or character code at the specified position in string.                                                     |
| `indexOf`, `lastIndexOf`                 | Return the position of specified substring in the string or last position of specified substring, respectively.                 |
| `startsWith`, `endsWith`, `includes`     | Returns whether or not the string starts, ends or contains a specified string.                                                  |
| `concat`                                 | Combines the text of two strings and returns a new string.                                                                      |
| `fromCharCode`, `fromCodePoint`          | Constructs a string from the specified sequence of Unicode values. This is a method of the String class, not a String instance. |
| `split`                                  | Splits a String object into an array of strings by separating the string into substrings.                                       |
| `slice`                                  | Extracts a section of a string and returns a new string.                                                                        |
| `substring`, `substr`                    | Return the specified subset of the string, either by specifying the start and end indexes or the start index and a length.      |
| `match`, `matchAll`, `replace`, `search` | Work with regular expressions.                                                                                                  |
| `toLowerCase`, `toUpperCase`             | Return the string in all lowercase or all uppercase, respectively.                                                              |
| `normalize`                              | Returns the Unicode Normalization Form of the calling string value.                                                             |
| `repeat`                                 | Returns a string consisting of the elements of the object repeated the given times.                                             |
| `trim`                                   | Trims whitespace from the beginning and end of the string.                                                                      |
|                                          |                                                                                                                                 |

---
