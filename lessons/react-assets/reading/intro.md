---
title: React Assets
---

---

## Using `import` to load assets

---

## React apps use Webpack

---

## Webpack is a tool for packaging assets

- JavaScript
- JSON (JavaScript Object Notation)
  - a lightweight data-interchange format, representing javascript object in
    text
  - It is easy for humans to read and write. It is easy for machines to parse
    and generate
- Images
- Fonts
- CSS

---

## Webpack comes with various `loaders` to able to import various data types

---

## Webpack pulls from our source and helps generate JavaScript for the browser

---

## When we import an image

```js
import photo from "./skywalker.png";
```

##### We get a string representing the path to the image to use in code

```js
render() {
  return (
   <ul>
     <li>
       <img src={photo}/>
     </li>
   </ul>
  )
}
```

---

## When we import a JSON file

```js
import octocats from `./cats.json`
```

##### We get a JSON object we can access and use

```js
render() {
  const cats = octocats.map(cat => {
    return <Octocat name={cat.name} image={cat.image}/>
  })

  return (
    <div>
      {cats}
    </div>
  )
}
```

---
