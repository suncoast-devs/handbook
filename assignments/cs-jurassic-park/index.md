---
title: Welcome to Jurassic Park
---

In this assignment you will be creating a console application that manages a zoo
full of dinosaurs.

## Objectives

- Practice control structures.
- Practice data structures.
- Practice working with user data.
- Practice with LINQ.
- Practice with OOP concepts.

## Requirements

- Create a simple console application that manages the dinosaurs in your zoo.

### Explorer Mode

- [ ] Create a class to represent your dinosaurs, which has the following
      properties

  - [ ] `Name`
  - [ ] `DietType` - This will be carnivore or herbivore
  - [ ] `WhenAcquired` - This will be defaulted to the current time when the
        dinosaur is created
  - [ ] `Weight` - How heavy the dinosaur is in pounds.
  - [ ] `EnclosureNumber` - the number of the pen the dinosaur is currently in

- [ ] Your dinosaurs will be stored in a `List<Dinosaur>`.
- [ ] When the console application runs, it should let the user choose one of
      the following actions:
  - [ ] `View`
    - This command will show the all the dinosaurs in the list, ordered by
      `WhenAcquired`
  - [ ] `Add`
    - This command will let the user type in the information for a dinosaur and
      add it to the list
  - [ ] `Remove`
    - This command will prompt the user for a dinosaur name then find and delete
      the dinosaur with that name.
  - [ ] `Transfer`
    - This command will prompt the user for a dinosaur name and a new
      `EnclosureNumber` and update that dino's information.
  - [ ] `Summary`
    - [ ] This command will display the number of carnivores and the number of
          herbivores.
  - [ ] `Quit`
    - [ ] This will stop the program

### Adventure Mode

### Epic Mode

## Additional Resources
