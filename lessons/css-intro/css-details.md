---
title: CSS Details
order: 4
---

Now that we have some basic terminology, let's review the different kinds of
_selectors_ we can use in our CSS _rules_

|                     |                                                                                                                                                                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Simple selectors    | Match one or more elements based on element `type`, `class`, or `id`.                                                                                                                                                                                                         |
| Attribute selectors | Match one or more elements based on their attributes/attribute values.                                                                                                                                                                                                        |
| Pseudo-classes      | Match one or more elements that exist in a certain state, such as an element that is being hovered over by the mouse pointer, or a checkbox that is currently disabled or checked, or an element that is the first child of its parent in the DOM tree.                       |
| Pseudo-elements     | Match one or more parts of content that are in a certain position in relation to an element, for example the first word of each paragraph, or generated content appearing just before an element.                                                                             |
| Combinators         | These are not exactly selectors themselves, but ways of combining two or more selectors in useful ways for very specific selections. So for example, you could select only paragraphs that are direct descendants of `div`s, or paragraphs that come directly after headings. |
| Multiple selectors  | Again, these are not separate selectors; the idea is that you can put multiple selectors on the same CSS rule, separated by commas, to apply a single set of declarations to all the elements selected by those selectors.                                                    |

Let's go through these selectors and learn how we can effectively target content
in our HTML to apply CSS styles.
