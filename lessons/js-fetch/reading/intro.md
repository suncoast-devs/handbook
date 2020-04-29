import CodePen from '@handbook/CodePen'

# Fetching Data From Remote Servers

- Promises, APIs, Fetch, JSON
  - [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
  - [What is an API?](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)
    - `A`pplication `P`rogramming `I`nterface
    - We've been using these all along!
    - Think about our friend `forEach`
      - It expects certain input (array, method to call)
      - It expects the method to call to take argments, of which we can choose how many to accept
        - element
        - index
        - array
      - It _behaves_ in a specific way
      - Same with `filter`, `map`, and `reduce`
    - When we talk about `APIs` we usually mean:
      - Third Party APIs
        - Provided by another developer/company/site
        - Accessed over the network
        - Uses the `HTTP` protocol
        - Uses a specific form of data input and data response
          - Typically [`JSON`](http://json.org/) or [`XML`](https://developer.mozilla.org/en-US/docs/XML_introduction)
      - Third party APIs are not built into the browser by default, and you generally have to retrieve their code and information from somewhere on the Web. For example, the Twitter API allows you to do things like displaying your latest tweets on your website. It provides a special set of constructs you can use to query the Twitter service and return specific information.
- Data for our application
  - Currently we have to create all our data
    - e.g. a deck of cards
    - pictures of cards
  - Let's get data from the outside world
- `fetch` function

  - [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  - Fetch takes as input
    - `URL` to access
    - options to describe what we are fetching, how it is to be fetched, etc.
    - returns a `promise`
  - Example:

    ```javascript
    fetch("https://swapi.co/api/people");
    ```

  - This will access the _Star Wars API_ and fetch a list of people in the _Star Wars_ universe

  - But if we just log this response we will see something that we cannot directly use

    ```javascript
    let response = fetch('https://swapi.co/api/people')
    console.log(response)
    >
    > Promise {<pending>}
    >  __proto__: Promise
    >  [[PromiseStatus]]: "pending"
    >  [[PromiseValue]]: undefined
    ```

  - We cannot use this `promise` directly, we must "resolve" the promise
  - Think of a `promise` as an _IOU_
  - A `promise` is an _asynchronous_ _IOU_ that will a supplied function when the _IOU_ is ready to redeem.
  - To cash-in on our _IOU_ we call the `then` method of the `promise` as such:

    ```javascript
    fetch("https://swapi.co/api/people").then((response) => {
      console.log(response);
    });
    ```

  - The response here is _still_ not quite usable:

    ```javascript
      Response {type: "cors", url: "https://swapi.co/api/people/", redirected: true, status: 200, ok: true, …}
      body: (...)
      bodyUsed: false
      headers: Headers {}
      ok: true
      redirected: true
      status: 200
      statusText: ""
      type: "cors"
      url: "https://swapi.co/api/people/"
    ```

  - This is because the response _body_ itself must be _converted_ into a form we can use. The response from `SWAPI` is a `JSON` response
  - Fortunately, the `response` object gives us a method to gain access to the JSON:

    ```javascript
    fetch("https://swapi.co/api/people")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
      });
    ```

  - This returns usable information!

    ```javascript
    {
      count: 87,
      next: "https://swapi.co/api/people/?page=2",
      previous: null,
      results: Array(10)
        0: {name: "Luke Skywalker", height: "172", mass: "77", hair_color: "blond", skin_color: "fair", …}
        1: {name: "C-3PO", height: "167", mass: "75", hair_color: "n/a", skin_color: "gold", …}
        2: {name: "R2-D2", height: "96", mass: "32", hair_color: "n/a", skin_color: "white, blue", …}
        3: {name: "Darth Vader", height: "202", mass: "136", hair_color: "none", skin_color: "white", …}
        4: {name: "Leia Organa", height: "150", mass: "49", hair_color: "brown", skin_color: "light", …}
        5: {name: "Owen Lars", height: "178", mass: "120", hair_color: "brown, grey", skin_color: "light", …}
        6: {name: "Beru Whitesun lars", height: "165", mass: "75", hair_color: "brown", skin_color: "light", …}
        7: {name: "R5-D4", height: "97", mass: "32", hair_color: "n/a", skin_color: "white, red", …}
        8: {name: "Biggs Darklighter", height: "183", mass: "84", hair_color: "black", skin_color: "light", …}
        9: {name: "Obi-Wan Kenobi", height: "182", mass: "77", hair_color: "auburn, white", skin_color: "fair", …}
        length: 10
    }
    ```

  - So our `json` object represents the response we could see in the [`SWAPI` documentation](https://swapi.co/documentation#people).
