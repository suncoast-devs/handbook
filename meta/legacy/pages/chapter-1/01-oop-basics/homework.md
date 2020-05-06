---
title: Welcome to Jurassic Park
---

So far you have traveled far in your learning and will continue to explore it more in-depth in the coming weeks. Like any good craftsman, practice turns into mastery. Tonight, you will be creating a simple console application that manages a zoo full of dinosaurs.

## Objectives

- Practice control structures.
- Practice data structures.
- Practice working with user data.
- Practice with LINQ.
- Practice with OOP concepts.

## Requirements

- Create a simple console application that manages the dinosaurs in your zoo.

### Explorer Mode

- [ ] Create a new console application that will store the list of dinosaurs they have in the park
- [ ] You will be creating a class for your dinosaurs, which has the following properties

  - [ ] Name
  - [ ] DietType - This will be "carnivore" or "herbivore."
  - [ ] WhenAcquired - This should be set to the current time when the dinosaur is created.
  - [ ] Weight - How heavy the dinosaur is in pounds.
  - [ ] EnclosureNumber - The number of the pen the dinosaur is currently in.

- [ ] Your dinosaurs will be stored in a `List<Dinosaur>`.
- [ ] When the console application runs, it should let the user choose one of the following actions:
  - [ ] View All the current dinosaurs
    - This command will show all the dinosaurs, ordered by `WhenAcquired`
  - [ ] Add a new dinosaur to the zoo.
    - This command will let the user type in the information for a dinosaur and add it to the list
  - [ ] Remove a dinosaur
    - This will delete a dinosaur by name
  - [ ] Transfer
    - This will ask the user for a dinosaur and a new EnclosureNumber and update that dino's information
  - [ ] View The 3 heaviest dinosaurs
  - [ ] Diet summary
    - [ ] This will the total number of each type of diet
  - [ ] quit the program
    - [ ] this will stop the program

### Adventure Mode

- [ ] Go back and work on the either .net-iterations, koans, or function-junction

### Epic Mode

- [ ] Eventually, we will be using a [MVC application structure](https://dotnet.microsoft.com/apps/aspnet/mvc). To prepare for this, refactor your code to have all your business logic in a separate class, called `ParkService` and all your console interactions in the main class.

- [ ] Your data is currently stored in a list. This list is lost every time the program restarts. On Monday, we starting to explore something called SQL. [Add a database](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet/04-entity-framework/). Convert your code to use Ef Core to store your data in a database.

## Additional Resources

- .NET

  - [.NET Documentation](https://docs.microsoft.com/en-us/dotnet/)
  - [Lecture Notes](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet)
