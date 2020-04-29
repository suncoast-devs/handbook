import CodePen from '@handbook/CodePen'

# Interacting with the DOM

Not only do we use JavaScript to code our logic, but we also use JavaScript to interact with the [`DOM`](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). This is how we can update and interact with the HTML that is on our page.

## Query the DOM

In order to interact with the DOM, we need to query the DOM to find the element we want to use. Take a look at the following code.

```js
const pageHeader = document.querySelector(".page-header");
```

This code goes to the `document` and finds the first element that has the class `.page-header` and stores a reference to that element in the variable called `pageHeader`. Now that we have the `pageHeader` as a variable we use it in our code just like any other variable. Notice the parameter to the quearySelector function; that is the same style of selector we have in CSS. These selectors can be as complex and as specific as the CSS selectors we have previously learned.

> _NOTE_ : `querySelector` returns only the first element that matches the query. If you want all the elements that match that selector, you will to use `querySelectorAll`

This interaction can lead to powerful and dynamic web apps and enables full control of the HTML programmatically. We will explore this power in lessons to come, but first let us look at using this to listen for `events`

--

```

```
