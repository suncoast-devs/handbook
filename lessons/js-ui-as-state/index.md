---
title: State maps to User Interface
assignment:
  - roshambo-js
---

In [the lesson on using TypeScript to modify the DOM](/lessons/js-dom) we
discussed how to use TypeScript to find and manipulate user interface elements.
Two examples of this are _toggle the state of an element each time we click it_
and _update a counter when a separate button is clicked_. In each of these cases
we are modifying some `state` of the user interface when responding to some
change.

We could implement the case of _toggle the state of an element each time we
click it_ as:

```typescript
import './style.css'

const buttonElement = document.querySelector('button')

if (buttonElement) {
  buttonElement.addEventListener('click', function (event) {
    const clickedElement = event.target as HTMLElement

    if (clickedElement) {
      clickedElement.classList.toggle('enabled')
    }
  })
}
```

We can use
[optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
to shorten the code:

```typescript
document.querySelector('button')?.addEventListener('click', function (event) {
  const target = event.target as HTMLElement | null

  target?.classList.toggle('enabled')
})
```

This would a specific class on the element on and off. In this case we are using
the presence of the class to indicate the state.

We could implement the case of _update a counter when a separate button is
clicked_ as:

```typescript
let counter = 0

document.querySelector('button')?.addEventListener('click', function () {
  counter++

  const counterElement = document.querySelector<HTMLElement>('.counterElement')
  if (counterElement) {
    counterElement.innerText = `${counter}`
  }
})
```

Here we are using a local variable to track the state of the count and then
manually updating the user interface.

## What if the user interface was simply a representation of state?

Lets take our simple example of the counter. What if we did not have to manually
adjust the user interface each time we changed the counter? That is what if the
logic flow was as follows:

```
initialize counter to 0
  => User Interface Displays Automatically 0
    => Wait for Click
      => Update Counter
        => User Interface Automatically Displays 1
```

That is changing the `counter` automatically _maps_ to the user interface
updating.

The idea is this:

```

       State      <== Transforms Into ===>    User Interface

```

Our user interface is really nothing more than a user friendly way to show and
update the state of our data.

Lets look at a more complex example.

```

    State               <=== Transform ===>      User Interface

    Transaction1                                 Transaction1
    Transaction2                                 Transaction2
    Transaction3                                 Transaction3
    Transaction4                                 Transaction4
    Transaction5                                 Transaction5
    Transaction6                                 Transaction6

                                                 Checking Balance
                                                 Savings balance

                                                 Make Deposit Button

```

Assume the user clicks the `Make Deposit Button` -- This is the logic we _might_
apply

- Wait for transaction button click
- Add a transaction to the list
- Recompute a new total balance
- Find the correct balance element (checking or savings)
- Update that with the new total
- Add the transaction to the UI

And then see the following

```


    State               <=== Transform ===>      User Interface

    Transaction1                                 Transaction1
    Transaction2                                 Transaction2
    Transaction3                                 Transaction3
    Transaction4                                 Transaction4
    Transaction5                                 Transaction5
    Transaction6                                 Transaction6
    Transaction7                                 Transaction7

                                                 Checking Balance (updated)
                                                 Savings balance

                                                 Make Deposit Button

```

What if the logic was:

- Wait for transaction button click
- Add a transaction to the list
- Redisplay the UI

## What do we need in order to support this?

Lets look at what the data behind this looks like:

```
    State               <=== Transform ===>      User Interface

    transactions = [                              <ul>
      transaction1,                                <li>Transaction1</li>
      transaction2,                                <li>Transaction2</li>
      transaction3,                                <li>Transaction3</li>
      transaction4,                                <li>Transaction4</li>
      transaction5,                                <li>Transaction5</li>
      transaction6,                                <li>Transaction6</li>
      transaction7,                                <li>Transaction7</li>
    ]                                            </ul>

    checking = transactions.                    Checking Balance (updated)
                 Where(checking).                Savings balance
                 Sum()
                                                 Make Deposit Button
```

If we step back and look at our list of transactions as an `array` (or `List`)
of `<li>` we would see that they match the elements of our transactions array.

If we could use `map` to transform the array of `transaction` objects in our
`array` into a series of `li`s contained within the `ul` then this would be a
repeatable process that could happen any time our list of transactions was
updated.

The same is true of the `checking` variable. If the user interface was simply
drawn based on the variables, either directly in the case of `checking` or using
a tool like `map` in the case of `transactions` then to update the interface we
would only need to update the variables (_state_) in our application.

## What might this code look like?

```typescript
interface Transaction {
  account: string
  amount: number
  details: string
}

// Or maybe load these from a file or an API
const transactions: Transaction[] = []

function render() {
  const checking = transactions
    .filter(transaction => transaction.account === 'Checking')
    .reduce((total, transaction) => total + transaction.amount, 0)
  const savings = transactions
    .filter(transaction => transaction.account === 'Savings')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const html = `
    <ul>
    ${transactions
      .map(transaction => `<li>${transaction.details}<li>`)
      .join('')}
    </ul>
    <p>Checking Balance: ${checking}</p>
    <p>Savings Balance: ${savings}</p>
    <button>Make Deposit</button>
  `

  const body = document.querySelector('body')
  if (body) {
    body.innerHTML = html
  }

  const button = document.querySelector('button')

  if (button) {
    button.addEventListener('click', function () {
      // Make a new transaction and add it
      const newTransaction: Transaction = {
        amount: 50,
        account: 'Checking',
        details: 'Payment for Work',
      }
      transactions.push(newTransaction)

      render()
    })
  }
}
```

So now each time we change our `transactions` we can _redraw_ the user
interface. When an event happens we update our _state_ and then ask our
interface to render itself.

We have a setup that looks like this:

```
     State   ====>  User interface
      ^                  |
      |                  |
      |                  v
    Update   <====     Event
```

## State feeds UI, UI feeds state

In this approach we have almost a circular nature. That is, our `state`
(variables) will force a redrawing of our user interface. Our user interface
will react to events that happen and call our `callback` _update_ methods. Those
callbacks will then update state which will cause our user interface to update.

## Start to look at applications differently

Start to look at your favorite web applications and see if you can picture what
the internal state objects look like for it? How do those get **transformed**
into user interface elements. How do the events on the page update that state?
For example `gmail` (or whatever web email you might use) is simply a
visualization of a collection of emails. They may be categorized (`filter`) and
counted (`reduce`) and displayed in a `<table>` (`map`) but it is still a
transformation of some internal state to a user interface.

## Coding style

This approach leads to a specific coding style that we will use to build many
web applications. We won't be writing HTML embedded in interpolated stings since
that becomes unmanageable very quickly. We'll be using a front end library named
[`React`](https://reactjs.org)
