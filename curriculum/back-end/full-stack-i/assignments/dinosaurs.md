# Welcome to Jurassic Park

Today you learned a new language and will be starting to explore it more in depth in the coming weeks. Like any good craftsman, the first thing you need is to learn your tools. Tonight, you will be setting up your developer environment, creating a simple console application, and continuing your final project.

## Objectives

- Set up your dev machines
- Create a simple console application to ensure your machine is set up correctly
- keep working through your wireframes for your capstone

## Requirements

- Create a simple console application that manages the dinosaurs in your amusement park

### Explorer Mode

#### .NET

- [ ] Create a new console application that will store the list of dinosaurs they have in the park
- [ ] You will be creating a class for your dinosaurs
- [ ] a Dinosaur has the following properties

  - [ ] Name
  - [ ] DietType - This will be carnivore or herbivore
  - [ ] DateAcquired - This will be defaulted when the dinosaur is created
  - [ ] Weight - In pounds, how heavy the dinosaur is
  - [ ] EnclosureNumber - the Pen that the dinosaur is currently on

- [ ] Your dinosaurs will be stored in a `List<Dinosaur>`.
- [ ] When the console application runs, it should let the user choose one of the following actions:
  - [ ] View All the current dinosaurs
    - this command will show the all the dinosaurs in a the list, ordered by DateAcquired
  - [ ] Add a new dinosaur
    - [ ] This command will let the user type in the information for a dinosaur and add it to the list
  - [ ] Remove a dinosaur
    - [ ] This will delete a dinosaur by name
  - [ ] Transfer
    - [ ] Add the ability to update a dinosaur to a new enclosure
  - [ ] View The 3 heaviest dinosaurs
  - [ ] Diet summary
    - [ ] This will the total number of each type of diet
  - [ ] quit the program
    - [ ] this will stop the program

#### Capstone

- [ ] Work on your wire frames and ironing out your idea. Work with your instructors and peers to work out the kinks. Ideas should be approved by tomorrow.
- [ ] If you idea is approved start coding.
- [ ] Start thinking and mapping out your ERD for your database

### Adventure Mode

- [ ] Your data is currently stored in a list. This list is lost everytime the program restarts. [Add a database](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet/04-entity-framework/)
- [ ] Eventually we will be using a MVC application structure. To prepare for this, refactor your code to have all your business logic in separate class and all your console interaction in the main class.

### Epic Mode

- [ ] On Monday, we will creating our first API. [Try it yourself](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1&tabs=visual-studio)

## Additional Resources

- .NET

  - [.NET Documentation](https://docs.microsoft.com/en-us/dotnet/)
  - [Lecture Notes](https://suncoast.io/handbook/curriculum/back-end/full-stack-i/lecture/dotnet)
