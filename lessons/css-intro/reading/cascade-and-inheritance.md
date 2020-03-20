# Cascade and Inheritance

At some point in your work, you'll find yourself in the situation where multiple CSS rules will have selectors matching the same element. In such cases, which CSS rule "wins", and ends up being the one that is finally applied to the element? This is controlled by a mechanism called the Cascade; this is also related to inheritance (elements will take some property values from their parents, but not others). Lets define what the CSS cascade is, what specificity is, what importance is, and how properties inherit from different rules.

The final style for an element can be specified in many different places, which can interact in complex ways. This complex interaction makes CSS powerful, but it can also make it confusing and difficult to debug. If you don't understand it immediately, don't worry — this is one of the hardest parts of CSS theory to comprehend. You are advised to give it a try now, but then keep it nearby as a handy guide to return to when questions about the cascade and inheritance come up.

## Cascade

CSS is an abbreviation for Cascading Style Sheets, which indicates that the notion of the cascade is important. At its most basic level, it indicates that the order of CSS rules matter, but it's more complex than that. What selectors win out in the cascade depends on three factors (these are listed in order of weight — earlier ones will overrule later ones):

1. Importance
1. Specificity
1. Source order

### Importance

In CSS, there is a special piece of syntax you can use to make sure that a certain declaration will always win over all others: `!important`.

It is useful to know that !important exists so that you know what it is when you come across it in other people's code. However, we strongly recommend that you never use it unless you absolutely have to. One situation in which you may have to use it is when you are working on a syste where you can't edit the core CSS modules, and you really want to override a style that can't be overridden in any other way. But really, don't use it if you can avoid it, because !important changes the way the cascade normally works, so it can make debugging CSS problems really hard to work out, especially in a large stylesheet.

### Specificity

Specificity is basically a measure of how specific a selector is — how many elements it could match. Element selectors have low specificity. Class selectors have a higher specificity, so will win against element selectors. ID selectors have an even higher specificity, so will win against class selectors.

The amount of specificity a selector has is measured using four different values (or components), which can be thought of as thousands, hundreds, tens and ones — four single digits in four columns:

| Column    | Score                                                                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Thousands | Score one in this column if the declaration is inside a style attribute, aka inline styles. Such declarations don't have selectors, so their specificity is always simply 1000. |
| Hundreds  | Score one in this column for each ID selector contained inside the overall selector.                                                                                            |
| Tens      | Score one in this column for each class selector, attribute selector, or pseudo-class contained inside the overall selector.                                                    |
| Ones      | Score one in this column for each element selector or pseudo-element contained inside the overall selector.                                                                     |

The following table shows a few isolated examples to get you in the mood. Try going through these, and making sure you understand why they have the specificity that we have given them.

| Selector                                                     | Thousands | Hundreds | Tens | Ones | Total specificity |
| ------------------------------------------------------------ | --------- | -------- | ---- | ---- | ----------------- |
| `h1`                                                         | `0`       | `0`      | `0`  | `1`  | `0001`            |
| `h1 + p::first-letter`                                       | `0`       | `0`      | `0`  | `3`  | `0003`            |
| `li > a[href*="en-US"] > .inline-warning`                    | `0`       | `0`      | `2`  | `2`  | `0022`            |
| `#identifier`                                                | `0`       | `1`      | `0`  | `0`  | `0100`            |
| No selector, with a rule inside an element's style attribute | `1`       | `0`      | `0`  | `0`  | `1000`            |

This is a good [Specificity Calculator](https://specificity.keegan.st) you can use to evaluate your own CSS selector

### Source Order

If multiple competing selectors have the same importance and specificity, the third factor that comes into play to help decide which rule wins is source order — later rules will win over earlier rules. For example:

```css
p {
  color: blue;
}

/* This rule will win over the first one since they have the same specificity */
p {
  color: red;
}
```

Whereas in this example the first rule wins because source order is overruled by specificity:

```css
/* This rule will win since it is more specific */
.footnote {
  color: blue;
}

p {
  color: red;
}
```

One thing you should bear in mind when considering cascade and specificity, and what styles get applied over other styles, is that all this happens at the property level — properties override other properties, but you don't get entire rules overriding other rules. When several CSS rules match the same element, they are all applied to that element. Only after that are any conflicting properties evaluated to see which individual styles will win over others.

## Inheritance

CSS inheritance is the last piece we need to investigate to get all the information and understand what style is applied to an element. The idea is that some property values applied to an element will be inherited by that element's children, and some won't.

For example, it makes sense for `font-family` and `color` to be inherited, as that makes it easy for you to set a site-wide base font by applying a font-family to the `<html>` element; you can then override the fonts on individual elements where needed. It would be really annoying to have to set the base font separately on every element.

As another example, it makes sense for `margin`, `padding`, `border`, and `background-image` to NOT be inherited. Imagine the styling/layout mess that would occur if you set these properties on a container element and had them inherited by every single child element, and then had to unset them all on each individual element!

Which properties are inherited by default and which aren't is largely down to common sense. If you want to be sure, however, you can consult the [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) — each separate property page contains a summary table including various details about that element, including whether it is inherited or not.

import Nav from './Nav'

<Nav/>
