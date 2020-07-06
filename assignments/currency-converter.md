---
title: Currency Converter
tags: ['javascript', 'react']
---

In this assignment, you will create a React application that will convert various currencies.

For the data, you will use the API [available here](https://ratesapi.io/)

## Objectives

- Work with an API to display data
- Work with React
- Work with the React lifecycle (`componentDidMount` with classes or `useEffect` with hooks)

## Requirements

- Use [this API documentation](https://ratesapi.io/documentation/) to build a page that allows for conversion between multiple currencies

### Explorer Mode

- [ ] Create a page that loads and shows the current currency conversion rates.
- [ ] Design the page yourself or use utility CSS libraries like: [Bootstrap](https://getbootstrap.com) or [Bulma](https://bulma.io/) or [Tailwind](https://tailwindcss.com/)
- [ ] Use `USD` as the _base_ currency.
- [ ] Allow the user to enter a currency amount (allow for decimal amounts like `42.12`) in USD.
- [ ] Show the converted amount in each of the available currencies.
  - [ ] Either update _as the user types_ or include a button that performs the conversion when clicked.
- [ ] Show the currency only two decimal places. For example, do not show `42.123456789` only show `42.12` -- You may need [this method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) to help. How is your code dealing with the truncation? Is it rounding? Is it rounding fairly? How might you change this behavior?

### Adventure Mode

- [ ] Ensure that invalid data is not converted. If the input cannot be interpreted as a number, do not convert that input. Do you want to allow negative numbers?
- [ ] Change the style of the input field to indicate when the number is invalid, perhaps change the input's color to red, or put a border around it?
- [ ] Allow the user to choose a new base currency other than USD.
- [ ] Allow the user to use a specific day in the past.
  - [HINT](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
  - Fetch the conversion rates for that day.
  - Show the updated conversion rates and converted amount.

### Epic Mode

- [ ] Use react router to allow the user to specify the base currency in the URL
