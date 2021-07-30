theme: Next, 1

# React Router

---

# Continue with our One List app

---

- Let us add the ability to show a details page for each todo in our list
- The detail page should show the ID, text, complete status, and perhaps the created/updated timestamps
- The detail page should allow us to _DELETE_ the todo item

---

# We now have an app that supports different views of data

- We will distinguish what we are looking at by varying the URL
- The home page of "`/`" will always show the todo items list
- A url like "`/items/42`" will show the details of item `42`

---

# So our app has to change behavior based on what URL the user is displaying

- We need a way to differentiate our user interface based on URL
- We need a way to let the user navigate around

---

# Enter React Router

![](https://media.giphy.com/media/MaP7y4CDIv3C0LjQ95/giphy-downsized.gif)

---

# React Router

- Transforms our application into a _Single Page App_ (SPA)
- Even though our page will _respond_ to many URLs, it is still one page (index.html)
- React Router makes it _seem_ like we support many URLs

---

# Two ways to get started

- Create a brand new app using `app-app --delta-hooks` (has React Router built-in)
- Add it to an existing app via `npm install`
  - `npm install react-router react-router-dom`

---

# Let's add it to our One List App!

---

# Adding the packages is not enough

- We need to update our `index.js` to add _React Router_ support.

---

# Step 1 - Import the `BrowserRouter`

- The purpose of the `Router` is to allow our application to handle different URLs.
- There are several different kinds of "Routers" but the most common, and the one we will use is `BrowserRouter`

```js
import { BrowserRouter as Router } from 'react-router-dom'
```

- What is `{ BrowserRouter as Router }`?
- Imports the `BrowserRouter` component but calls it `Router` in **OUR** code.

---

# Step 2 - Wrap our App

![right](https://media.giphy.com/media/4PvmF62Tl3KLe/giphy.gif)

```js
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
```

Notice we have **surrounded** our `App` in a `Router`. This allows us to use react router throughout our app!

---

# We are now ready to use React Router!

- P.S. This is the only difference between `delta` and `gamma` -- we do this setup for you...

---

# Time to get a bit more organized!

---

# Our main `App` has too much in it.

- Let us refactor the `ul` out into its own component, moving all the state stuff with it

---

```jsx
export function TodoList() {
  const [todoItems, setTodoItems] = useState([])
  const [newTodoText, setNewTodoText] = useState('')

  async function loadAllTodoItems() {
    const response = await axios.get(
      'https://one-list-api.herokuapp.com/items?access_token=cohort42'
    )

    if (response.status === 200) {
      setTodoItems(response.data)
    }
  }

  useEffect(loadAllTodoItems, [])

  async function handleCreateNewTodoItem(event) {
    //Do not do the normal form submit (which would cause the page to refresh)
    // since we are going to do our own thing
    event.preventDefault()

    await axios.post(
      'https://one-list-api.herokuapp.com/items?access_token=cohort42',
      {
        item: {
          text: newTodoText,
        },
      }
    )

    loadAllTodoItems()

    setNewTodoText('')
  }

  return (
    <div>
      <ul>
        {todoItems.map(function (todoItem) {
          return (
            <TodoItem
              key={todoItem.id}
              id={todoItem.id}
              complete={todoItem.complete}
              text={todoItem.text}
              reloadItems={loadAllTodoItems}
            />
          )
        })}
      </ul>
      <form onSubmit={handleCreateNewTodoItem}>
        <input
          type="text"
          placeholder="Whats up?"
          value={newTodoText}
          onChange={function (event) {
            setNewTodoText(event.target.value)
          }}
        />
      </form>
    </div>
  )
}
```

---

```jsx
export function App() {
  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <TodoList />
      </main>
      <footer>
        <p>
          <img src={logo} height="42" alt="logo" />
        </p>
        <p>&copy; 2020 Suncoast Developers Guild</p>
      </footer>
    </div>
  )
}
```

---

# Whew, now we have a distinct component for the `TodoList`

- But how does this help us?
- Well, we can now tell our app to only render this if the URL is `/`

```html
<main>
  <Switch>
    <Route path="/">
      <TodoList />
    </Route>
  </Switch>
</main>
```

---

# Try it out

- Visit the site at `/`

- Visit the site at `/should-not-work`
  - Wait, this still works! Why?

---

# Route matching rules

- The `path="/"` means "If the path **starts with** `/`"
- If we want it to be **exact** we have to tell it

```html
<main>
  <Switch>
    <Route exact path="/">
      <TodoList />
    </Route>
  </Switch>
</main>
```

- Now try it!

---

# When we visit a URL that is not a match we still get our header and footer!

[.column]

- This is because the only part of the page that swaps out is what is inside of our `Switch`

- Let us add a "not found!" with `path="*"`

[.column]

```html
<main>
  <Switch>
    <Route exact path="/">
      <TodoList />
    </Route>
    <Route path="*">
      <p>Ooops, I don't know about that URL</p>
    </Route>
  </Switch>
</main>
```

---

# Order is important

![right](https://media.giphy.com/media/PlnQNcQ4RYOhG/giphy-downsized.gif)

---

# [fit] `Switch` will find the _first_ match and stop

---

# [fit] Add a page to show the details of a page

- Put a "Route" to `/items/42`

```jsx
<Switch>
  <Route exact path="/">
    <TodoList />
  </Route>
  <Route path="/items/42">This would be the details of item 42!</Route>
  <Route path="*">
    <p>Ooops, I don't know about that URL</p>
  </Route>
</Switch>
```

---

# But how do we handle multiple pages??

- Certainly, we do not want to write out many `Route` entries!?

- We can put a "parameter" in the `path=`

```jsx
<Switch>
  <Route exact path="/">
    <TodoList />
  </Route>
  <Route path="/items/:id">
    <p>This would be the details of item 42!</p>
  </Route>
  <Route path="*">
    <p>Ooops, I don't know about that URL</p>
  </Route>
</Switch>
```

---

# Now, rather than putting the JSX right in here, make a component

```javascript
function TodoItemPage() {
  return <p>This would be the details of item 42!</p>
}
```

```html
<Route path="/items/:id">
  <TodoItemPage />
</Route>
```

---

# Yeah, but how do we know which ID we want to show?

- React Router hooks!
- `useParams()`

```jsx
function TodoItemPage() {
  const params = useParams()

  return <p>This would be the details of item {params.id}!</p>
}
```

---

# The `params` is similar to `props.` However, the values come from our `Route`

```
<Route path="/items/:id">
                     V
                     |
                     |
                     +----->-------->-------->---------+
                                                       |
function TodoItemPage() {                              v
  const params = useParams()                           |
                                                       v
  return <p>This would be the details of item {params.id}!</p>
}
```

---

# See that we can put in any item ID and see it on the page!

---

# Ok, so now let us load some data for that specific item!

---

# Make a state

```js
const [todoItem, setTodoItem] = useState({
  id: undefined,
  text: '',
  complete: false,
})
```

---

# In comes useEffect again

![](https://media.giphy.com/media/l0MYyv6UK0Bd4DE76/giphy.gif)

---

```jsx
useEffect(
  function () {
    async function loadItems() {
      const response = await axios.get(
        `https://one-list-api.herokuapp.com/items/${params.id}?access_token=cohort42`
      )

      if (response.status === 200) {
        setTodoItem(response.data)
      }
    }

    loadItems()
  },
  [params.id]
)
```

---

# Render something

```js
return (
  <div>
    <p className={todoItem.complete ? 'completed' : ''}>{todoItem.text}</p>
    <p>Created: {todoItem.created_at}</p>
    <p>Updated: {todoItem.updated_at}</p>
    <button>Delete</button>
  </div>
)
```

---

```jsx
function TodoItemPage() {
  const [todoItem, setTodoItem] = useState({
    id: undefined,
    text: '',
    complete: false,
  })
  const params = useParams()

  useEffect(
    async function () {
      const response = await axios.get(
        `https://one-list-api.herokuapp.com/items/${params.id}?access_token=cohort42`
      )

      if (response.status === 200) {
        setTodoItem(response.data)
      }
    },
    [params.id]
  )

  return (
    <div>
      <p className={todoItem.complete ? 'completed' : ''}>{todoItem.text}</p>
      <p>Created: {todoItem.created_at}</p>
      <p>Updated: {todoItem.updated_at}</p>
      <button>Delete</button>
    </div>
  )
}
```

---

# Make the button work!

```jsx
async function deleteTodoItem() {
  await axios.delete(
    `https://one-list-api.herokuapp.com/items/${params.id}?access_token=cohort42`
  )

  // Need to redirect back to the main page!
}
```

---

# Add a handler

```html
<button onClick="{deleteTodoItem}">Delete</button>
```

---

# Handle the redirect

- Another hook: `useHistory`
- This allows us to manipulate the history/browser location

```js
const history = useHistory()
```

```js
async function deleteTodoItem() {
  const response = await axios.delete(
    `https://one-list-api.herokuapp.com/items/${params.id}?access_token=cohort42`
  )

  if (response.status === 204) {
    // Send the user back to the homepage
    history.push('/')
  }
}
```

---

# Ok, but how do we make these pages linkable?

Instead of

```html
<a href=""></a>
```

we can use

```jsx
<Link to="" />
```

We can generate those links dynamically:

```html
<Link to={`/items/${id}`}
```

---

```js
return (
  <li className={complete ? 'completed' : ''} onClick={toggleCompleteStatus}>
    {text}
    <Link to={`/items/${id}`}>Show</Link>
  </li>
)
```

---

# Update the TodoPage to have a link "home."

```jsx
return (
  <div>
    <p>
      <Link to="/">Home</Link>
    </p>
    <p className={todoItem.complete ? 'completed' : ''}>{todoItem.text}</p>
    <p>Created: {todoItem.created_at}</p>
    <p>Updated: {todoItem.updated_at}</p>
    <button onClick={deleteTodoItem}>Delete</button>
  </div>
)
```

---

# Navigate around the app

- Some UI/UX aspects we could improve
- However, we have a working app!

---
