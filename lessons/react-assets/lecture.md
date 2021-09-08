theme: Next, 1

# Working with Assets

---

We've seen that we can `import` TypeScript code into the current file/module.

We've also seen that we can `import` JSON data from a file into a variable.

---

# loaders

- We can load many types of data using the idea of a `loader`
- A loader is JavaScript code that our development tools can use to process a file and make data available to a module

---

# loaders

Here are just a few things we can use with `import` and loaders:

- TypeScript code
- JSON
- Images
- Fonts
- CSS

---

# Importing images in a React application

Your first inclination to deal with images in JSX will be to write code like the following:

```jsx
<img src="./images/my-awesome-image.png" alt="Awesomeness Defined" />
```

---

# Doesn't work!

The correct method is to `import` the image first:

```javascript
import image from './images/my-awesome-image.png'
```

This provides you a `string` containing the **path** to the image to use in code.

```jsx
function AwesomeImage() {
  return <img src={image} alt="Awesomeness Defined' />
}
```

