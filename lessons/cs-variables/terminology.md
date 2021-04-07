---
title: Terminology
order: 1000
---

| Term                | Definition                                                                                                                                                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Variable            | An identifier for a value our program needs to keep track of. Can be any data type.                                                                                                                                           |
| Declaring Variables | The act of typing out the variable data type and name.                                                                                                                                                                        |
| Variable Type       | There are many different data types of variables in C# including: strings, characters, integers, decimals, booleans, etc.                                                                                                     |
| string              | General written text ie. a Name, or Sentence. Strings are enclosed by `"` For example: `string myName = "Bob";`                                                                                                               |
| character           | General written text character (Unicode Character) ie. a letter: `a`. Characters are enclosed by `'` For example: `char myInitial = 'B';`                                                                                     |
| integer             | Most commonly written whole numbers ie. `1, 2, 3, 27` with a range from -2,147,483,648 to 2,147,483,647. For example: `int myNumber = 365;`                                                                                   |
| long                | A whole number from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807. For example: `long myLongNumber = 9223372036854775806;`                                                              |
| decimal             | A number that is not a whole number ie. `1.9`. For example: `dec myNumber = 1.9;`                                                                                                                                             |
| float               | A 32 bit floating point value that has an approximate precision of 6-9 digits or a number that is also not a whole number ie. `3.141592`. For example: `float myNumber = 3.141592;`                                           |
| double              | A 64 bit floating point value that has an approximate precision of ~15-17 digits or a number that is also not a whole number ie. `3.14159265359`. For example: `double myNumber = 3.14159265359;`                             |
| boolean             | Used in logical operations and is a `True` or `False` value For example: `bool isMyComputerOn = True;`                                                                                                                        |
| byte                | Used when representing a raw chunk of data (values from 0 to 255). For example: `byte myByte = 255;`                                                                                                                          |
| var                 | General variable declaration and C# assumes the variable type dependent on what you set the variable to. For example: a string `var myName = "Bob";` or an integer `var myNumber = 1;` or a decimal `var myNumber = 1.1;` |
| index               | Starts at 0 and denotes the exact position of the item, and can be accessed using `[]` on a string. For example: `sentence[0]` will retrieve the first character.                                                             |
| .Length             | This is a way to retrieve the length property of a variable. Most generally used with strings. For example: `sentence.Length;`                                                                                                |
| DateTime            | DateTime is a specialized class to store the date and time. A DateTime is a Year, Month, Day, Hour, Minute, Second, and Millisecond. For example: `var rightNow = DateTime.Now;`                                               |
