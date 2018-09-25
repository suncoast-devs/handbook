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

## Loops

## DEMO: Action Plates
