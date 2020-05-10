---
title: Commenting Our Code
---

When writing code we often need to add details about the code that aren't
represented by the executable lines of code in our program.

## Reasons for writing comments

- Documenting your algorithm.
- Describing the reason the code, or the entire file, is needed.
- Explaining some difficult to understand code.
- Removing code that is no longer relevant but you just can't let it go.

Comments are good for all of these reasons are. However, the last one, leaving
commented out code is usually frowned upon since a developer who inherits your
project may not know why that code needs to still be in the file, but commented
out.

## What do comments look like in C

### Single Line Comments

```csharp
// These are comments in C# code
//
// The double slash beings a comment that lasts for the remainder of the line.

var name = "Mark"; // Comments can start anywhere on a line
```

### Multiple Line Comments

If you are writing a long paragraph of comments you may not want to begin each
line with `//` -- in this case we can use a `multi line comment`

```csharp
/*
   This is a long comment.

   It might last several paragraphs
*/
```

### Code Editor Support

Your code editor will likely display comments in a subdued color so they do not
distract from the main code.

Your code editor likely comes with a key-combination that will start a comment,
or turn highlighted lines into commented lines. These key combinations are very
useful.
