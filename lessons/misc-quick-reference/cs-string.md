---
title: C# Strings
---

A string is a sequential collection of characters that is used to represent
text.

---

### Declaring a variable to contain a string

> Strings are surrounded by double quotes: `"`

```C#
var name = "Suncoast Developers Guild";

var description = "Code School in St Petersburg, FL";
```

---

### Appending strings

We can append two strings using the `+` operator.

```C#
var name = "Suncoast Developers Guild";

var description = "Code School in St Petersburg, FL";

var message = name + " is a " + description;

```

### Interpolating strings

We can incorporate variables and expressions into a string by making an
interpolated string.

> Note: Interpolated strings start with a `$`

```C#
var name = "Suncoast Developers Guild";

var description = "Code School in St Petersburg, FL";

var message = $"{name} is a {description}";

var mathProblem = $"What do you get when you multiply six by 9: {6 * 9}"
```

---

### String length

---

### Iterating the characters in a string

---

### Splitting a string

---

### Replacing text in a string

---

### Reversing a string

---

### Changing the case of a string

---

### Getting a sub-string

---

### Does a string contain another string

---

### EndsWith

---

### StartsWith

---

### Join

---

### Pad + Trim
