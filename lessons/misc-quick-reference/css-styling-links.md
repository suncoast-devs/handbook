---
title: CSS Styling Links
---

# Styling links

If we have the following HTML:

```html
<p>Welcome to our page. Click <a href="menu.html">here</a> to see our menu</p>
```

We can apply a color such as the following:

```css
p {
  color: #85577e;
}
```

You will notice that the links themselves are not in the specified color. We
must style `<a>` elements specifically.

## Various states of a link

A link can be:

|           |                                                                                                             |
| --------- | ----------------------------------------------------------------------------------------------------------- |
| Unvisited | The `href` has never been visited by this browser.                                                          |
| Visited   | The `href` has been visited by this browser.                                                                |
| Focus     | The user has focused on the element, typically by using the `TAB` key to navigate the page to that element. |
| Hover     | The user's pointer is over that link (hovering). Mobile browsers do not necessarily support this.           |
| Active    | The link is clicked but hasn't transitioned the user to the `href`.                                         |

## Pseudo Selectors

| Selector | Description                                                                                                 |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| :link    | The `href` has never been visited by this browser.                                                          |
| :visited | The `href` has been visited by this browser.                                                                |
| :focus   | The user has focused on the element, typically by using the `TAB` key to navigate the page to that element. |
| :hover   | The user's pointer is over that link (hovering). Mobile browsers do not necessarily support this.           |
| :active  | The link is clicked but hasn't transitioned the user to the `href`.                                         |

## Mnemonic to remember

When we style these in CSS we _must_ place them in this order in our CSS. If we
do not use this order we can see some unexpected results.

So how do we remember this order? Here are two phrases to help.

### Lord Vader Former Handle Anakin

```
(L)ord         (L)ink
(V)ader        (V)isited
(F)ormer       (F)ocus
(H)andle       (H)over
(A)nakin       (A)ctive
```

### Lord Voldemort Fears Hogwarts Alumni

```
(L)ord         (L)ink
(V)oldemort    (V)isited
(F)ears        (F)ocus
(H)ogwarts     (H)over
(A)lumni       (A)ctive
```

## Examples

```css
/* Style all links, visited or not, with the same color. */
a:link,
a:visited,
a:focus {
  color: #85577e;
}

/* Change the hover color */
a:hover {
  color: #f99d1b;
}

/* Finally, the active link color */
a:active {
  color: #2f3737;
}
```
