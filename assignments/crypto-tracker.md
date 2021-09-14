---
title: Crypto Ticker
tags: ['javascript', 'react']
---

In this project you'll use React and a 3rd-party API as a data to create a
real-time price tracker for some popular cryptocurrencies.

## Objectives

- Use state in React
- Render data from an API request in React
- Use `setInterval` to repeat
- Use React's `useEffect` to load the coin data at startup

## Requirements

Use the following API endpoint to fetch data and display it in your application:

```
https://api.coincap.io/v2/assets
```

### Setup

```shell
degit $GITHUB_USER/react-project-template CryptoTracker
```

### Explorer Mode

- Create a new react app
- Fetch new currency data from the API endpoint every 10 seconds.
- Update the applications state with currency data from the API.
- Create a UI to display the currency data in the application state.

### Adventure Mode

#### Images

If you want images to use for the display, try and use this [repository](https://condacore.github.io/cryptocurrency-icons/) to fetch images as well.

For example, this URL [https://raw.githubusercontent.com/condacore/cryptocurrency-icons/master/64x64/bitcoin.png](https://raw.githubusercontent.com/condacore/cryptocurrency-icons/master/64x64/bitcoin.png) will give you the image for the coin `bitcoin`. Try replacing the names in the URL to fetch different coin logos. There are also additional sizes in different directories.

NOTE: This will require you to make a generic `CryptoCurrency` component and use `useEffect` within THAT component to fetch the icon!

#### Price Display

If the updated price of a currency is higher than the last update, show the price in green. If it's lower, show the price in red. **HINT**: You'll probably want to look into additional lifecycle methods for your React components to accomplish this.

### Epic Mode

- How else could we present the changing price to the user? Look into Edward Tufte's [sparklines](https://en.wikipedia.org/wiki/Sparkline), how do you think this could be implemented as a React component? Try using a third party library to render a sparkline for each currency.

## Additional Resources

- [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) documentation on MDN.
