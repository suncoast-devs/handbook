# Getting Started

JavaScript is organized into `.js` files. These files contain the line the JavaScript code that you will write. We add the reference to our JavaScript files via `<script>` tags in the HTML. Even though these are technically meta data about the page and "should" be in the `<head>`, `<script>` tags are located at the bottom of the `<html>`. This helps our page look to be more responsive and have a faster "(perceived loading)[https://blog.teamtreehouse.com/perceived-performance]" time.

Now our HTML pages look like this:

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
    <h1>Hello world!</h1>
    <script src="main.js"></script>
</body>
</html>
```

In `main.js`, we will be putting our JavaScript code. Next we will look at some of the basics of JavaScript.

import Nav from './Nav'

<Nav/>
