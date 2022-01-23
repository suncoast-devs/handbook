---
title: React Assets
---

## Using `import` to load assets

We've seen that we can `import` TypeScript code into the current file/module.
We've also seen that we can `import` JSON data from a file into a variable.

The fact that our development tools give us various `loaders` to deal with
importing various data is very helpful.

## What can we import?

Our development and build tools come with various `loaders` to be able to import
various data types. If there is a type of data we need to support, we can either
find an existing loader and add it to our project **or**, we can write our own
since a loader is nothing more than some TypeScript (or JavaScript) code that
describes how to read the file and provide a JavaScript object in response.

- TypeScript code
- JSON
- Images
- Fonts
- CSS

## Importing images in a React application

Your first inclination to deal with images in JSX will be to write code like the
following:

```jsx
<img src="../images/my-awesome-image.png" alt="Awesomeness Defined" />
```

However, you will find that this doesn't work in development or production.

The correct method is to `import` the image first:

```javascript
import image from '../my-awesome-image.png'
```

This provides you with a `string` containing the **path** to the image to use in
code.

```jsx
  return  <img src={image}/>
}
```

## Why do we import images?

This seems like a big difference from how we dealt with images in plain HTML and
CSS projects. We use this method in our React (and other TypeScript/JavaScript
projects) so that our build tool can add these features:

1. It ensures that the file name for the image is "slugged." Slugging means that
   it takes some unique value and makes that part of the image path. You'll
   notice that the string in the `image` isn't just `my-awesome-image.png` but
   something like `my-awesome-image-dea415f.png` (and maybe even a longer
   string). That bit of text after the file name is the "checksum" of the file.
   The checksum is a value that changes _any_ time the contents of the file
   change. We do this because we'd like to **cache** the images for a long time
   on our client's browsers. By having a checksum, we can set a _long_ caching
   time but ensure that the client fetches a fresh image when we change the
   contents. Since the image will have a new file name when the contents change,
   we achieve both caching and freshness.
2. It also allows the **deploy** process to only upload the images that are
   _used_ in the code. Unused images won't have an `import` and thus won't be
   included in the deployment to our hosting system.
3. Some loaders will do image optimizations to ensure the file is as small as
   possible.
