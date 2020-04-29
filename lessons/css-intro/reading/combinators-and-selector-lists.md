# Combinators and selector lists

Using one selector at a time is useful, but can be inefficient in some situations. CSS selectors become even more useful when you start combining them to perform fine-grained selections. CSS has several ways to select elements based on how they are related to one another.

By specifying selectors in relationship to each other we can often avoid having to add a `class` to a DOM element just to apply CSS.

The selector relationships are expressed with combinators as follows (A and B represent any selector seen above):

## Combinators

| Name                        | Syntax | Selects                                                                                                                                                                                |
| --------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Selector list               | A, B   | Any element matching A and/or B (see Groups of selectors on one rule, below - Group of Selectors is not considered to be a combinator).                                                |
| Descendant combinator       | A B    | Any element matching B that is a descendant of an element matching A (that is, a child, or a child of a child, etc.). the combinator is one or more spaces or dual greater than signs. |
| Child combinator            | A > B  | Any element matching B that is a direct child of an element matching A.                                                                                                                |
| Adjacent sibling combinator | A + B  | Any element matching B that is the next sibling of an element matching A (that is, the next child of the same parent).                                                                 |
| General sibling combinator  | A ~ B  | Any element matching B that is one of the next siblings of an element matching A (that is, one of the next children of the same parent).                                               |

## Groups

You have seen multiple examples of this in action already, but let's spell it out for clarification. You can write groups of selectors separated by commas to apply the same rule to multiple sets of selected elements at once. For example:

```css
p,
li {
  font-size: 1.6em;
}
```

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: helvetica, "sans serif";
}
```
