---
title: Pick a Color, any Color
tags: ['javascript', 'react']
---

In this assignment, you'll create an HSL(a) color picker with React.

### First, a _little_ bit of color theory...

On the web, and computers in general, we often think of colors using the [**RGB**](https://en.wikipedia.org/wiki/RGB_color_model) color model. In HTML and CSS, we often use [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) triplets to describe colors in RGB. For example, `#76BCBB` represents a nice shade of blue: <span style="display: inline-block; background-color: #76BCBB; width: 1em; height: 1em; border-radius: 0.5em"></span>. `76` is the _red_ component, `BC` for _green_, and `BB` for _blue_. Those hexadecimal numbers translate, respectively, to `118`, `188`, `187` in decimal. The range for each color is `0` through `255`.

Here is a short video [to explain how hexadecimal colors work](https://www.youtube.com/watch?v=c56x1aj2CPA) -- and here is a [slightly longer video](https://www.youtube.com/watch?v=6cJd7eyYBFs) if the short video doesn't explain enough.

In this model, the three _additive_ primary colors (red, green, and blue) are combined to create colors. The absence of these colors creates black, while all three colors at full strength combine to create white. In hexadecimal, `FF` represents the decimal value `255`. This helps to explain why `#FFFFFF` represents white. We can also use other notations in CSS to specify colors, such as `rgb(118, 188, 187)`, where the decimal values are given.

RGB isn't the only way we can use numbers to represent colors; there exists _many_ color models, some with specialized purposes, such as [**CMYK**](https://en.wikipedia.org/wiki/CMYK_color_model) a _subtractive_ model used in printing. In many color models, the relationship between the color components isn't always evident in any meaningful way, especially if you're trying to combine them to find a specific color. Try looking for that perfect shade of blue on an RGB color picker, you will probably find it to be a little counter-intuitive. Some color models are easy to reason about, such as [**HSL**](https://en.wikipedia.org/wiki/HSL_and_HSV) (hue, saturation, lightness) and **HSB** (hue, saturation, brightness). Like RGB, CSS supports defining colors in HSL:

`hsl(50,8%,20%)`

The first value `hue` is given in degrees (around a color wheel), the second value is a percentage of saturation (0% being grey, 100% fully saturated), and the third value, a percentage of lightness (0% black, 100% white).

You can also read [this short guide to HSL](https://www.nixsensor.com/what-is-hsl-color/)

## Objectives

- Respond to user events in React
- Use state in react to drive changes to a user interface
- Use props to drive inline styles to dynamically update the appearance of DOM elements
- Understand RGB vs HSL color models
- Use controlled form inputs in React

## Requirements

Use `range` type `input` elements to drive a color display. You'll end up with something like this:

![](https://raw.githubusercontent.com/suncoast-devs/handbook/master/assignments/assets/color-picker.gif)

**HINT**: You will want to combine techniques of string interpolation and using
[inline styles in React](https://reactjs.org/docs/dom-elements.html#style), for
example:

```
// HINT: Instead of hard coded values here, use your
// this.state attributes to dynamically create this color
const newBackgroundColor = `hsl(50,8%,20%)`
const newStyle = { backgroundColor: newBackgroundColor  }
```

Then you can dynamically set the `backgroundColor` of an element in your component using [inline styles](https://reactjs.org/docs/dom-elements.html#style)

```jsx
<div style={newStyle}>

</div>
```

### Setup

```shell
app-app ColorPicker
```

### Explorer Mode

- [ ] Represent the three values, `hue`, `saturation`, and `lightness` in your state.
- [ ] Add three sliders that update their respective values (`hue`, `saturation`, and `lightness`) in the state when changed.
- [ ] Display the color on the screen, in both text (i.e. `hsl(50, 8%, 20%)`) and the actual color as a background color on an element.
- [ ] Initialize the state to a random color when the page is loaded.
- [ ] Add a button that picks a new random color.
- [ ] In all cases, the sliders should be in the correct positions to represent the current color.

### Adventure Mode

- [ ] Add a fourth slider for `alpha`, be sure to put some kind of pattern behind your color so the user can see the transparency effect.
- [ ] Add a section that displays a CSS class that applies the current background color to an element, just like [https://cssgradient.io/](https://cssgradient.io/)
- [ ] Only display the output color text in `hsla()` if the alpha value is less than `1`.

## Additional Resources

- [HSL Color Picker](http://hslpicker.com/)
- [Inline styles in React](https://reactjs.org/docs/dom-elements.html#style)
- [HSL colors](https://developer.mozilla.org/en-us/docs/web/css/color_value) on MDN
