---
title: Interfaces
---

We have seen several types of collections of data, including `List`,
`Dictionary`, and `Queue`. C# has many others as well. These include
`SortedList`, `Stack`, `HashSet`, and `LinkedList`.

So how can `C#` know how to use `foreach` and other methods that work for all of
these different types? C# uses interfaces.

# Interfaces

An interface is a description of a set of behaviors that a type can have. The
interface defines the behaviors that a type must have, and the type must
implement these. Later on, we'll learn that methods implement these behaviors.
An interface describes a set of methods.

# Interface Example

Let's use a real-world example to get an idea of what interfaces are. We'll use
the example of an `Animal`.

We know all `Animals` have certain behaviors, such as `eat`, `sleep`, and
`breathe`. However, all animals have different ways of doing these.

We could define an "interface" that describes these generic behaviors and call
this an `IAnimal`. Notice the `I` in the name. The `I` indicates that this is an
`Interface`. We can't make an instance of an `IAnimal`; it wouldn't be able to
do anything.

However, we could create a `Bear` and a `Cat` and `Human` and say that they all
have the behaviors of an`IAnimal`. The `IAnimal` is a _generic_ type and the
`Bear` and `Cat` and `Human` are _concrete_ types.

We could code our software to use an `IAnimal`, and we wouldn't care if our code
received a `Bear` or a `Cat` or a `Human`. We would be able to say that they
have the behaviors of an `IAnimal`.

In fact, in other languages, this is known as `duck typing`! This name comes
from the phrase:
`If it walks like a duck, quacks like a duck, and looks like a duck, it must be a duck`.
In our case if it `eats` and `sleeps` and `breathes` like an `IAnimal`, it must
be an `IAnimal`.

In our work, we'll be **using** interfaces more than we will be creating them.
They are a compelling language feature and is the type of tool you'll use more
as you grow in your programming skills.

# Generics

You may have noticed when adding a `using` statement to the top of your code,
`List`, and `Dictionary`, and `Queue` come from
`using System.Collections.Generic`. There is that `Generic` word again.

In a later lesson, we'll learn about a `C#` feature named `LINQ`, and we will
see that `List`, `Dictionary`, and `Queue` all adhere to the `IEnumerable`
interface. And since all these types are `IEnumerable`, LINQ can work with each.
