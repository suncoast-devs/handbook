---
title: C# Classes
---

A class represents a custom data type that allows us to store both state
(`properties`) and behavior (`methods`) together.

### Declaring a class with properties

This declares a class with three properties, `Name`, `Age`, and `HungerLevel`.

```csharp
class Cat
{
    public string Name { get; set; }
    public int Age { get; set; }
    public int HungerLevel { get; set; }
}
```

### Instantiating an object from a class

```csharp
var kitty = new Cat();
```

In this case `kitty.Name` will be `null`, `kitty.Age` will be `0`, and
`kitty.HungerLevel` will be 0. Since we did not provide any values for these
properties when we made a `new Cat`.

### Instantiating an object and providing values for properties

```csharp
var kitty = new Cat() {
  Name = "Fluffy",
  Age = 3,
  HungerLevel = 5
};
```

In this case `kitty.Name` will be `"Fluffy"`, `kitty.Age` will be `3`, and
`kitty.HungerLevel` will be 5.

### Providing a default value for a property

If a property should default to a value we can specify it in the class.

```csharp
class Cat
{
    public string Name { get; set; } = "Unknown Cat";
    public int Age { get; set; }
    public int HungerLevel { get; set; } = 3;
}
```

```csharp
var kitty = new Cat();
```

In this case `kitty.Name` will be `"Unknown Cat"`, `kitty.Age` will be `0`, and
`kitty.HungerLevel` will be 3.

### Declaring a class with properties and methods

If all cats have the behavior that every time they play, their hunger increases
by 3 we can implement that as a method on the class.

```csharp
class Cat
{
    public string Name { get; set; } = "Unknown Cat";
    public int Age { get; set; }
    public int HungerLevel { get; set; } = 3;

    public void Play()
    {
      HungerLevel += 3;
    }
}
```

```csharp
var kitty = new Cat() {
  Name = "Fluffy",
  Age = 3,
  HungerLevel = 5
};

kitty.Play();
kitty.Play();
```

At this point `kitty.HungerLevel` would be `11` (`5 + 3 + 3`).

### Declaring a property that can be null

As we saw above the default value for a `string` is `null` but for an `int` it
is `0`. We can indicate that we allow `null` values for the `int` by appending
it with a `?`.

> NOTE: This is often useful when declaring classes that will be populated from
> a database or JSON where a column or field is `null` in the input.

```csharp
class Cat
{
    public string Name { get; set; } = "Unknown Cat";
    public int? Age { get; set; }
    public int HungerLevel { get; set; } = 3;
}
```

```csharp
var kitty = new Cat()
```

In this case `kitty.Age` would be `null`, not `0`.

### Constructors

The other way to create new instances of an object is by specifying and
requiring a `constructor`. A constructor is a method with the same name as the
class which is called when we use `new Cat` (or the class name). We get a
`default constructor` for free just by declaring the class. We can change the
implementation of that default constructor, or add more constructors that take
specific names.

```csharp
class Cat
{
    public Cat() {
      Name = "Fluffy";
      Age = 3;
      HungerLevel = 5;
    }

    public Cat(string newName)
    {
      Name = newName;
      Age = 3;

      if (newName == "Hungry Cat")
      {
        HungerLevel = 100;
      }
      else
      {
        HungerLevel = 5;
      }
    }

    public string Name { get; set; }
    public int? Age { get; set; }
    public int HungerLevel { get; set; }
}
```

In this case:

```csharp
var theHungryKitty = new Cat("Hungry Cat");
var regularCat = new Cat();
```

The value of `theHungryKitty.HungerLevel` will be `100` while
`regularCat.HungerLevel` will be `5`.
