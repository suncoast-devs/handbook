---
title: Typescript and React
---

This will be a quick walkthrough into using Typescript in a React App. This also
serves as a bridge to working with a compiled language.

## Learning Objectives

- What is TypeScript
- Benefits of TypeScript
  - type system (on variables and functions)
  - interfaces
- Using Typescript in React

## Recommended Previous Knowledge

- Should know React and Vanilla Js

## Notes

- Part 1: Intro to Typescript

  - SuperSet of JavaScript
  - Microsoft backed, JS + C# = TS
  - takes your ts(x) files and truly compiles and does static analysis and
    verification

* Types

  - why?
    - better developer experience, better IDE tools
    - better performance
    - code organization
    - eliminate an entire set of bugs
  - What?
    - we know that values have types, and but they are not strictly enforced
      - duck typing
    - but in a type system, we care about the types and we can about what types
      are things are
    - this will help us know not only the data we are using but also the type of
      data we are using
    - knowing this, we can get IDE help and as well as double checking ourselves
  - How

    - typing of variables

    ```typescript
    let count: number = 10
    const name: string = 'Billy'
    const students: Array<string> = ['Billy', 'Mandy', 'Grim']
    const data: object = ['Billy', 'Mandy', 'Grim']
    ```

    - functions
      - return values
      - parameters

    ```typescript
    const rollDice = (): number => {
      return Math.ceil(Math.random() * 6)
    }

    const sum = (x: number, y: number): number => {
      return x + y
    }
    ```

* Interfaces

  - define the shape of data that something must have to be considered the thing
  - back to duck-typing, this is defining what is a duck
  - a contract

  ```typescript
  interface IDuck {
    walksLikeADuck: boolean
    talksLikeADuck: boolean
    quacksLikeADuck: boolean
  }
  ```

  ```typescript
  interface IStudent {
    name: string
    id: number
    profileImage: string
    gpa: number
    testScores: Array<number>
  }

  const findStudent = (searchTeam: string): IStudent => {
    // do some logic to find students

    return foundStudent
  }

  const createStudent = (data: IStudent) => {
    // Do the thing to create the student
  }
  ```

* React and Typescript

  - to add typescript to an existing react project

  ```shell
  npm install --save typescript @types/node @types/react @types/react-dom @types/jest
  ```

  - Allows to add types to state/useState

    ```typescript
    const [numberOfCandyBars, setNumberOfCandyBars] = useState<number>(0)

    // else where I can do this:
    setNumberOfCandyBars(10)

    // else where I CAN NOT do this:
    setNumberOfCandyBars('10')
    ```

  - practical example

    ```typescript
    const [tvShows, setTVShows] = useState<Array<Shows>>([])

    // else where I can do this only if i force the shape of the JSON calls into my tv show shape
    setTVShows(resp.data.results)
    ```

  - Typed components

    ```typescript
    interface IShowProps {
      title: string
      image: string
      rating: number
    }

    export const Show = (props: IShowProps) => {
      return <div>show the show stuff</div>
    }
    ```

Example apps:
[https://github.com/mdewey/typescript-react-examples](https://github.com/mdewey/typescript-react-examples)
