---
title: Abstraction and Reuse
draft: true
---

### Abstraction & Re-use
  Abstraction is an important concept in Object-Oriented Programming. Often times when building an app, we'll end up doing the same sorts of operations, against the same objects, with little-to-no variation. When that is the case, we really don't want to have to put that code all over the application. What if we wanted to make a small change to it? If we're practicing abstraction, we can make that small change in one place instead of copying and pasting it all over the project.
  Take our cat example for instance:

    class Cat {
    constructor (name) {
     this.name = name
    }

      meow () {
        return this.name + ' goes meow'
      }
    }

  If we ever wanted to change how the cat meows, we would only need to do it one place, instead of in all of the places in our application where a cat is meowing.

### Objects
  Objects are useful because they allow us to organize information in a way that puts all relevant pieces in one place. Each object is usually representative of a single instance of whatever it is trying to represent, and will store all of the information that we care to know about it, as well as many of the operations we will want to do with it.

    class Cat {
      constructor (name) {
        this.name = name
        this.happiness = 0
      }

      speak () {
        return this.name + ' goes meow'
      }

      chase () {
        this.happiness -= 3
      }

      eat () {
        this.happiness++
      }

      pet (location) {
        if (location === 'behind ears') {
          this.happiness += 2
        } else if (location === 'mouth') {
          this.happiness -= 1
        } else if (location === 'butt') {
          this.happiness += 3
        }
      }
    }

  Our cat has two properties: a name, and happiness. It's also feature-complete with 4 methods: speak(), chase(), eat(), and pet(). We know that whenever we are using a cat in our project, we will be able to access those two properties and use all 4 of it's methods.

