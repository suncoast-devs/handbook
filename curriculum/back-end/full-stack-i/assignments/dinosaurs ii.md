# Jurassic Park: The Lost World

In the last assignment, you created a console app that stores items in a list, which doesn't last very long. For this assignment, you need to update your old app to use a database as well as update it with a few new features.

_NOTE_: The Additional Resources section below is _very_ helpful. Consider reading this after reading _Explorer_ mode. Then make a plan for the assignment for digging in and writing code.

## Objectives

- Use an ORM to query against a database
- Extend your simple console app to use a database to persist data
- keep working through your capstone

## Requirements

- Create a simple console application that manages the dinosaurs in your amusement park
- Update your app with some new functionality
- Persist your dinosaurs in a database

### Explorer Mode

- [ ] Replace your `List<Dinosaur>` with a database. [These notes should be helpful](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet/04-entity-framework/)
- add the following 3 options to your app
  - [ ] "release"
    - this command removes the closure number (setting it to a blank/default value)
  - [ ] "hatch"
    - This command randomly creates a new Dinosaur. The only random values are name, weight and Diettype type
  - [ ] "needs a sheep"
    - this command displays the lightest dinosaur that is also a carnivore

#### Capstone

- [ ] Wireframes should be approved today
- [ ] HTML, CSS, and JS are your main coding challenges.
- [ ] Start thinking and mapping out your ERD for your database

### Adventure Mode

- [ ] Add a column called IsHungry (`bool`). This property requires a migrations
- [ ] Add the following commands
  - 'who's hungry'
    - this command displays all the dinosaurs that have IsHungry set to false
  - 'feed sheep'
  - this command sets a specific dinosaur's IsHungry to true, but only if they are a carnivore
  - 'feed salad'
  - this command sets a specific dinosaur's IsHungry to true, but only if they are a herbivore
- [ ] Add a second table called 'ParkSections'. Update your app to allow 1 ParkSection to have many dinosaurs.

### Epic Mode

- [ ] Next, we will create our first API. [Try it yourself](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1&tabs=visual-studio)

## Additional Resources

- [EF Core](https://docs.microsoft.com/en-us/ef/core/)
- Documentation: [Dotnet EF CLI Docs](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet)
- [LINQ notes](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet/03-Linq/)
- [EF Core Notes](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet/04-entity-framework/)
