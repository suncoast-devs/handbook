---
title: .NET Packages
---

As developers we write a lot of code. However, we don't want to _reinvent the
wheel_, that is write code to do a basic task that is needed in many
applications. For instance, it wouldn't make sense for each developer, on every
project, to write code to output a variable to the console. This is a common
task that we'd prefer another developer create and just share that code with us.

This is what packages are for. Just about every modern programming language has
a way of taking a set of related code, grouping it together and making it
available in a `package.` Not every language calls this packages, for instance
the Ruby language calls them `gems`.

## Built in packages

Many language and environments, `C#` and .NET included, bundle a set of code
packages into their default installation. We often refer to these as _core
libraries_ or _core packages_. These are bits of code we can use without telling
our projects to download _external_ libraries or packages.

For instance, in .NET, we use `Console.WriteLine` to output to the console. This
code is available to us in the `System` library. Once we tell a csharp file to
`using System` we can now use all the code provided by `System`.

To add more features we need to reach for _external libraries_

## Adding external library

`Console.WriteLine` is available to us from built in libraries/packages, but it
outputs very plain text. What if we wanted to add some pizzazz to our output by
coloring the text?

If we wanted `ENTER` to be in a different color below.

```csharp
Console.WriteLine("Press ENTER to continue");
```

We can add an external library of code to our project. The following command,
when run _inside_ our .NET project we are telling .NET to find, download, and
add to our project all the code for a library called `Pastel`

```shell
dotnet add package Pastel
```

How did we know there was such a library? For `dotnet` there is a central
repository of packages called `nuget`. From this site we can search for existing
code that solves a problem. `nuget` also gives us links to the project pages
where we can find documentation. Following the project page for `Pastel` we see
the code works like this:

```csharp
Console.WriteLine($"Press {"ENTER".Pastel(Color.FromArgb(165, 229, 250))} to continue");
```

And this will output the word `ENTER` in color.

## What are the downsides of external libraries?

The more external code we add to our project the more we are tying our code to
something another has written. As our project moves forward, and as time
progresses, perhaps that library will not grow to continue to meet our needs. We
need to continually review our project's dependencies as we upgrade our code,
tools, and even the language itself.

## How to know when to bring in a package?

If a code need is small, maybe you need to process a string a certain way,
reaching for a large library that has the feature you need, but also dozens (or
hundreds) more might not be reasonable. Maybe you can write that code yourself
and avoid a dependency on an external library. As a developer, or a team, we
have to consider the tradeoffs of `build` versus `buy` (in this case for free,
but with the _costs_ we mentioned above)

## Standing on the shoulders

The fact that whole communities of developers are writing code that allow us to,
with simple commands, extend our applications and easily add features allows us
to _stand on the shoulder of giants_. Even better that most of this code is
available to us _for free_ and often licensed that we can freely use it in our
_commercial_ applications. As we grow our developer skills we should be
supporting these communities and eventually, hopefully, giving back by authoring
our own code packages to share with others.
