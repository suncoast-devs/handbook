---
title: Adding/modifying the DOM
draft: true
---

### Adding elements to the DOM

### Questions
- console.log
  - They are useful for checking things. The quicker you check your assumptions, the easier it is to fix your mistakes.
  - They can be taken out before you deploy/submit code

### Control Structures
(approx 00:11:00)

- if/else

```
let isMyFavorite = (number) => {
  if (number === 42) {
    console.log('It is my favorite number')
  } else {
    console.log('This is not my favorite number')
  }
}

isMyFavorite(1)
 -> This is not my favorite number

isMyFavorite(42)
-> It is my favorite number

```

- use of double pipe operator `||` (or)

```
let isAnInstructorLong = (nameOfPerson) => {
  if (nameOfPerson === 'Gavin') {
    console.log('Yup!')
  }
  if (nameOfPerson === 'Jason') {
    console.log('Yup!')
  }
  if (nameOfPerson === 'Mark') {
    console.log('Yup!')
  }
}

// Shorter way to write using `||`
// if nameOfPerson is Gavin or Jason or Mark return 'Yup!'

let isAnInstructorLong = (nameOfPerson) => {
    if (nameOfPerson === 'Gavin' || nameOfPerson === 'Jason' || nameOfPerson === 'Mark') {
      console.log('Yup!')
    }
}    

isAnInstructor('Mark')
-> Yup

isAnInstructor('Joe')
-> undefined

isAnInstructor('Gavin', 'Jason')
-> Yup

isAnInstructor('Bob', 'Jason')
-> undefined

```

- boolean Logic
- switch

### Modifying CSS

- add class/style

```
var element = document.getElementById("div1");
element.classList.add("otherclass");
```

remove

```
element.classList.remove("otherclass");
```


### Arrays
(approx 00:45:40)

### functions
- anonymous function (approx 00:52:00)
  -  functions that are dynamically declared at runtime. They're called anonymous functions because they aren't given a name in the same way as normal functions

```
let scores = [42, 100, 90]
// named function
const printScore = (scoreNumber) => {
  console.log(`The score is ${scoreNumber}`
}

  scores.forEach(printScore)
->  The score is 42
->  The score is 100
->  The score is 98

// no name function - anonymous function
// when function does not need to be stored and reused
scores.forEach( (scoreNumber) => {
  console.log(`The score is here: ${scoreNumber}`)
  })

  The score is here: 42
  The score is here: 100
  The score is here: 98

```

## [Loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
(approx 1:00:00 && continued from above)

- for statement

```
//  for (initializer; when should loop stop; what should be done in each step of 'for' loop)
    for (let number = 1; number <= 52; number += 1) {
      console.log(`The number is ${number}`)
    }

-> The number is 1
-> The number is 2
-> The number is 3
.
.
.
-> The number is 52
// once number reaches number <= 52, loop ends and exits

```

- [cohort-xi/week-02/day-3/for-loops/public/main.js](https://github.com/suncoast-devs/cohort-xi/tree/master/week-02/day-3/for-loops/public)
  (apptox 1:07:26)
    ```
    const outputAnInstructor = instructorListItem => {
    console.log('It works using forEach and a named function', instructorListItem)
    instructorListItem.textContent += '!'
    }

    const main = () => {
      const instructors = document.querySelectorAll('li')

    // looping through all the elements we got back from querySelectorAll    
       for (let index = 0; index < instructors.length; index += 1) {
          console.log('It works using a for loop', instructors[index])
          instructors[index].textContent += '?'
       }

        instructors.forEach(
        /*
        The next thing here is an anonymous function.
        It works the same way as outputAnInstructor except
        we don't have to make a variable to store the function
        */
        instructorListItem => {
          console.log(
            'It works using forEach and an anonymous function',
            instructorListItem
          )
          instructorListItem.textContent += '~'
        }
        /*
          The function is above
        */
      )

      instructors.forEach(outputAnInstructor)

      // What Javascript is doing for us (longhand)
      // let index = 0
      //
      // if (index < instructors.length) {
      //   console.log('It works!', instructors[index])
      // }
      //
      // index += 1
      //
      // if (index < instructors.length) {
      //   console.log('It works!', instructors[index])
      // }
      //
      // index += 1
      //
      // if (index < instructors.length) {
      //   console.log('It works!', instructors[index])
      // }
      //
      // index += 1
      //
      // if (index < instructors.length) {
      //   console.log('It works!', instructors[index])
      // }
    }

    document.addEventListener('DOMContentLoaded', main)
    ```
### modifying the DOM
  - [code reference](https://github.com/suncoast-devs/cohort-xi/tree/master/week-02/day-3/modify-the-dom)
    (approx 1:32:20)
    - [classList](http://devdocs.io/dom/element/classlist)
    - Make a button to hide/show the list
      - Chrome Dev tool saves the most recent selection in $0 and Your second-most-recent is $1, and so on, up through $4.

    - index.html

    ```
    <!DOCTYPE html>
    <html>
      <head lang="en">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Modify The Dom</title>
        <link rel="stylesheet" href="/screen.css">
      </head>
      <body>
        <h1>Hello, World!</h1>
        <button>Toggle</button>
        <ul>
          <li>Gavin</li>
          <li>Jason</li>
          <li>Toni</li>
        </ul>
        <script src="/main.js" charset="utf-8"></script>
      </body>
    </html>

    ```

  - main.js

    ```
    const main = () => {
    // find the first button and save as button
      let button = document.querySelector('button')

    // Once the button is clicked
      button.addEventListener('click', event => {

    // find the 'ul' and store the variable in unorderdList
        let unorderdList = document.querySelector('ul')
        
    // toggle(classList method) the classList'hidden', to unorderdList
        unorderdList.classList.toggle('hidden')

        })
    }

    // Same thing as a one-liner
    const mainAsOneLiner = () => {
      document.querySelector('button').addEventListener('click', event => {
        document.querySelector('ul').classList.toggle('hidden')
      })
    }

    document.addEventListener('DOMContentLoaded', main)

    ```

## DEMO: Action Plates
