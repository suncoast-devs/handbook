Theme: Next, 1

# React Query

---

# useEffect + fetch/axios

We've seen the use of `useEffect` and data fetching APIs.

This approach requires us to recognize that we cannot use `async` methods as the `useEffect` callback.

We also need to be aware of the need to correctly specify the `dependency array`

Given that we, and any other developer, can create a custom hook. Several libraries have been developed to make data fetching easy. We'll be looking at `React Query`

---

# React Query

> Fetch, cache and update data in your React applications all without touching any "global state"

Excellent! We won't have to rely on `useState + useEffect + fetch`. React Query will combine all of this for us!

---

# React Query

[Motivation](https://react-query.tanstack.com/overview#motivation)

---

# Installation

```shell
npm install react-query
```

---

# Setup

Much like `React Router` we will need to wrap our `<App>` in code to configure `React Query`

```jsx
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
```

---

# Now we can modify our code to start using React Query

## Start with fetching the list of todo items in `<TodoList>`

---

# [fit] Remove state management with `useState`

Delete this line:

```jsx
const [todoItems, setTodoItems] = useState<TodoItemType[]>([])
```

---

# Add code to load the todo items

```typescript
// Function to return the axios data.

async function getTodos() {
  //                               This describes the format of `data`
  //                               vvvvvvvvvvvvvv
  const response = await axios.get<TodoItemType[]>(
    'https://one-list-api.herokuapp.com/items?access_token=cohort22'
  )

  return response.data
}
```

---

# Use the function with `useQuery`

```typescript
//
//    The data returned from axios
//       |
//       |              Function to let us reload the data (renamed)
//       |                 |
//       |                 |                  Unique identifier for this query
//       |                 |                     |
//       |                 |                     |     Function that returns a Promise
//       |                 |                     |       |
//       v                 v                     v       v
const { data: todoItems, refetch } = useQuery('todos', getTodos)
```

---

# This replaces:

- `useState` for `todoItems`
- `useEffect` to load items
- `loadAllItems`

---

# [fit] Notice we get an "object is possibly undefined"

Add a default value for the todoItems

```typescript
const { data: todoItems = [], refetch } = useQuery('todos', getTodos)
```

---

# [fit] We can also detect when the query is actively loading

```typescript
const { data: todoItems = [], refetch, isLoading } = useQuery('todos', getTodos)

// ...
// ...
// ...

if (isLoading) {
  return <div>Loading</div>
}
```

---

# [fit] Replace use of `loadAllItems` with `refetch`

---

# Lots of refactoring ... reduced complexity

- No `useEffect + useState` combo
- Loading state
- Refetch function
- More... See documentation (caching, etc.)

---

# [fit] TodoItemPage

---

```typescript
async function getOneTodo(id: string) {
  const response = await axios.get<TodoItemType>(
    `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort22`
  )

  return response.data
}
```

---

```typescript
//
//                                        Dynamic unique identifier based
//                                        on the id parameter from router
//                                             |                 |
//                                             vvvvvvvvvvvvvvvvvvv
const { data: todoItem, isLoading } = useQuery(['todo', params.id], () =>
  getOneTodo(params.id)
)
```

---

# [fit] TodoList create a todo

---

# [fit] Mutations

---

# [fit] Define function to create todo item

```typescript
async function createNewTodoItem(newTodoText: string) {
  return await axios.post(
    'https://one-list-api.herokuapp.com/items?access_token=cohort42',
    { item: { text: newTodoText } }
  )
}
```

---

# Define a mutation

Place right below our existing `useQuery`

```typescript
const todoItemMutation = useMutation((newTodoText: string) =>
  createNewTodoItem(newTodoText)
)
```

or

```typescript
const todoItemMutation = useMutation(function (newTodoText: string) {
  return createNewTodoItem(newTodoText)
})
```

---

# Use the mutation where we'd want the todo item created

The arguments to `mutate` become the arguments to our mutation function.

```typescript
todoItemMutation.mutate(newTodoText)
```

---

# [fit] How to handle calling code when the mutation is done?

- `onSuccess`
- `onError`
- `onSettled`

---

```typescript
const todoItemMutation = useMutation(
  (newTodoText: string) => createNewTodoItem(newTodoText),
  {
    onSuccess: function () {
      refetch()

      setNewTodoText('')
    },
  }
)
```

---

```typescript
function handleCreateNewTodoItem() {
  todoItemMutation.mutate(newTodoText)
}
```

---

# Mark item complete

Define a method

```typescript
async function toggleItemComplete(id: number | undefined, complete: boolean) {
  const response = axios.put(
    `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort22`,
    { item: { complete: !complete } }
  )

  return response
}
```

---

```typescript
const toggleMutation = useMutation(() => toggleItemComplete(id, complete), {
  onSuccess: function () {
    reloadItems()
  },
})
```

---

```typescript
async function toggleCompleteStatus() {
  toggleMutation.mutate()
}
```

---

# [fit] TodoItemPage delete

Define function:

```typescript
async function deleteOneTodo(id: string) {
  const response = await axios.delete(
    `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort22`
  )

  return response
}
```

---

# [fit] Define mutation

```typescript
const deleteMutation = useMutation((id: string) => deleteOneTodo(id), {
  onSuccess: function () {
    // Send the user back to the homepage
    history.push('/')
  },
})
```

---

# [fit] Use mutation

```typescript
async function deleteTodoItem() {
  deleteMutation.mutate(params.id)
}
```

---

# Benefit: organize all the API code in one place: `api.ts`

- Create a module: `api.ts`
- Move all the get/load functions into that file
- Now we have one single place where all API logic is located

---

# Other benefits of React Query

- [Pagination](https://react-query.tanstack.com/guides/paginated-queries)
- [Infinite Queries](https://react-query.tanstack.com/guides/infinite-queries)
- [Window Focus Refetching](https://react-query.tanstack.com/guides/window-focus-refetching#_top)
- [Caching](https://react-query.tanstack.com/guides/caching)
- [Query Cancellation](https://react-query.tanstack.com/guides/query-cancellation)
- [Update From Mutation](https://react-query.tanstack.com/guides/updates-from-mutation-responses)
- [Invalidating Queries](https://react-query.tanstack.com/guides/invalidations-from-mutations)

---

# Advanced Topics

---

# [fit] Define custom hooks!

We can refactor our example of deleting an item into a custom hook.

---

# useDeleteItemMutation hook

- Define a method that starts with `use` (requirement of hooks)
- Move implementation into this method and have it return the `useMutation`

```typescript
function useDeleteItemMutation(id: string) {
  const history = useHistory()

  return useMutation(() => deleteOneTodo(id), {
    onSuccess: function () {
      // Send the user back to the homepage
      history.push('/')
    },
  })
}
```

---

# Use our new hook

```typescript
const deleteMutation = useDeleteItemMutation(params.id)

async function deleteTodoItem() {
  deleteMutation.mutate()
}
```

---

# [fit] Define a mutation for loading a single todo item

```typescript
function useLoadOneItem(id: string) {
  const { data: todoItem, isLoading } = useQuery(['todo', id], () =>
    getOneTodo(id)
  )

  return { todoItem, isLoading }
}
```

---

# [fit] Use the new custom hook

```typescript
const { todoItem, isLoading } = useLoadOneItem(params.id)
```

---

# [fit] Refactor all this code into a common file: `api.ts`

---

```typescript
import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useDeleteItemMutation, useLoadOneItem } from './api'

export function TodoItemPage() {
  const params = useParams<{ id: string }>()
  const { todoItem, isLoading } = useLoadOneItem(params.id)
  const deleteMutation = useDeleteItemMutation(params.id)

  async function deleteTodoItem() {
    deleteMutation.mutate()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

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
}
```

---

# Separation of Concerns

- `TodoItemPage.tsx` only concerns itself with showing a todo item
- `api.ts` contains all the code for loading a todo item
- However, `api.ts` has UI code in it.

```typescript
export function useDeleteItemMutation(id: string) {
  const history = useHistory()

  return useMutation(() => deleteOneTodo(id), {
    onSuccess: function () {
      // Send the user back to the homepage
      history.push('/')
    },
  })
}
```

---

# Leave UI code in the UI

```typescript
export function useDeleteItemMutation(id: string, onSuccess: () => void) {
  return useMutation(() => deleteOneTodo(id), { onSuccess })
}
```

---

# Update the UI

```typescript
const deleteMutation = useDeleteItemMutation(params.id, function () {
  history.push('/')
})
```

---

[.autoscale: true]

# Architecture Choice

[.column]

- Combined
  - API
  - CSS (see [styled components](https://styled-components.com/))
  - State
  - Behavior

[.column]

- Separate concerns
  - CSS all in one file
  - (see [CSS Modules](https://css-tricks.com/css-modules-part-1-need/)
  - `api.ts`
