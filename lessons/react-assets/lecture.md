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

---

# [fit] What is that funny file name in the imported string?

Ensures that the file name for the image is "slugged".

Slugging means that it takes some unique value and makes that part of the image path.

hat bit of text after the file name is the "checksum" of the file.

The checksum is a value that changes _any_ time the contents of the file change.

---

# Why use slugs/checksums?

We do this because we'd like to **cache** the images for a long time on our client's browsers.

By having a checksum we can set a _long_ caching time but ensure that the client fetches a fresh image when we change the contents.

Since the image will have a new file name when the contents change, we achieve both caching and freshness!
