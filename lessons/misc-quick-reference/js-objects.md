---
title: Enumerating objects
---

Unfortunately, objects cannot be used with `map`, `filter`, etc.

Fortunately, JavaScript gives us a way. We can, for an object, get an array of
the **keys** of the object. We can use this array to `map`, and `filter`.

For instance, suppose we were given the following object:

```javascript
const myHobbies = {
  pandas: {
    title: 'Panda Bears',
    description:
      'Pandas are bears native to south-central China, and are objectively the cutest animals on earth.',
  },
  miniatures: {
    title: 'Miniature Painting',
    description:
      "I enjoy painting miniatures from board games. I've been painting since early 2018, here's some of my work.",
  },
}
```

And we needed to turn this into an array containing the name of the key followed
by the title. That is given the object above we would want something like
`['pandas - Panda Bears', 'miniatures - Miniature Painting']`

We can't do `myHobbies.map` but we can do this:

```javascript
const keys = Object.keys(myHobbies) // ['pandas', 'miniatures']
```

And now we can use that to map

```javascript
const keys = Object.keys(myHobbies) // ['pandas', 'miniatures']

const answer = keys.map(key => {
  const hobby = myHobbies[key]

  return `${key} - ${hobby.title}`
})
```

There is another way to work with objects and that is `Object.entries` --
`entries` gives us back an array-of-arrays. The first element of each array is
the key, and the second is the value. This allows us to avoid the value lookup.

```javascript
const entries = Object.entries(myHobbies) // [['pandas', { title: ...., description: ...}], ['miniatures', { title: ..., description: ...}]

const answer = entries.map(entry => {
  return `${entry[0]} - ${entry[1].title}`
})
```

Using destructuring we can avoid the `entry[0]` and `entry[1]` code and give our
variables better names:

```javascript
const entries = Object.entries(myHobbies) // [['pandas', { title: ...., description: ...}], ['miniatures', { title: ..., description: ...}]

const answer = entries.map(([key, value]) => {
  return `${key} - ${value.title}`
})
```

And we can reduce the code a bit further:

```javascript
const answer = Object.entries(myHobbies).map(
  ([key, value]) => `${key} - ${value.title}`
)
```
