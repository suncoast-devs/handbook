# Object Oriented Programing in C&#35;

## Classes

- Classes combine data (values) and behavior (methods) into one concept
- `Class`es are the template that describes what data, and what behavior we have
- `Object`s are _instances_ of a class.
- `Class`es are like cookie cutters, where `object`s are like the cookies
- In C# everything is an object and everything inherits from the base `Object`
- This base `Object` is the root of all objects in C#. This gives us basic methods and  common interface with ever object created and defined. 
- We can make our own classes. Lets make one to keep track of information about my dog.

  ```C#
  public class Dog
  {

  }

  // later in your code
  var courage = new Dog();

  ```

- and we can define methods.
- These methods follow the same rules that our other methods follow

  ```C#

  public class Dog
  {
      public void Bark()
      {
          Console.WriteLine("Woof");
      }
  }

  // later
  var scooby = new Dog();
  scooby.Bark();
  ```

- But not all dogs sound the same!
- We can use `properties` to help describe a dog
- Properties have types and can be set set and accessed at any time.
- Properties allow us to have different values per instance of the class

```C#
public class Dog
{
    public string BarkSound { get; set; }
    public void Bark()
    {
        Console.WriteLine(this.BarkSound);
    }
}

// later
var tacoBellDog = new Dog();
tacoBellDog.BarkSound = "yo quiero taco bell";
tacoBellDog.Bark();

var underDog = new Dog();
underDog.BackSound = "There's no need to fear!";
underDog.Bark();

// we can use Initializer syntax
var huckleberry = new Dog {
    BarkSound = "Howdy Y'all!"
};
huckleBerry.Bark();
```

## Inheritance

- Classes can have a `parent` class from which they gain all the data and behavior from but can extend with new data and behavior.
- Inheritance can be thought of as "is a" or "is a kind of"

```C#
public class GoodDog: Dog
{
    public List<strings> Toys {get;set;} = new List<string> {"tennis ball", "bone", "chewie"};
}

// later
var seymour = new GoodDog{
    BarkSound = "Woof!"
};
```
