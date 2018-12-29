# Crypto Ticker

In this project you'll use React and a 3rd-party API as a data to create a real-time price tracker for some popular cryptocurrencies.

## Objectives

- Use state in React
- Render data from an API request in React
- Use `setInterval` to repeat
- Use React the following lifecycle methods: `componentDidMount`, `componentWillUnmount`
- Use React Component subclasses
- Use stateless-functional components in React

## Requirements

Use the following API endpoint to fetch data and display it in your application:

```
https://api.coinmarketcap.com/v2/ticker/?limit=20
```

The data should refresh periodically. Using the `id` field in the API results for each currency, you can get the URL for the logo of a coin like this:

```
https://s2.coinmarketcap.com/static/img/coins/16x16/${coin.id}.png
```

### Explorer Mode

- [ ] Use `create-react-app` to setup your new application.
- [ ] Fetch new currency data from the API endpoint every 10 seconds.
- [ ] Update the applications state with currency data from the API.
- [ ] Create an HTML table to display the currency data in the application state.
- [ ] Use props to render table rows as child components for each currency in the application state.
- [ ] Use stateless-functional components where appropriate.

### Adventure Mode

- [ ] If the updated price of a currency is higher than the last update, show the price in green. If it's lower, show the price in red. **HINT**: You'll probably want to look into additional lifecycle methods for your React components to accomplish this.

### Epic Mode

- [ ] How else could we present the changing price to the user? Look into Edward Tufte's [sparklines](https://en.wikipedia.org/wiki/Sparkline), how do you think this could be implemented as a React component? Try using a third party library to render a sparkline for each currency.

## Additional Resources

- [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html) in the React Documentation
- [AJAX and APIs](https://reactjs.org/docs/faq-ajax.html) in the React Documentation
- [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) documentation on MDN.
