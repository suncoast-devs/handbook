# React User Events and Lifecycle

#### Day Three

##### React event handling

- [React Documentation](https://reactjs.org/docs/handling-events.html)
- Old way

HTML:

```html
<button class="my-rad-button">Click me!</button>
```

JS:

```js
const handleButtonClick = event => {
  console.log("button was clicked");
};

document
  .querySelector(".my-rad-button")
  .addEventListener("click", handleButtonClick);
```

React way:

```js
  handleButtonClick = (event) => {
    console.log("button was clicked")
  }

  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick} >Click me!</button>
      </div>
    );
  }
}
```

- In react we place the handle
- onClick
- onChange
- onSubmit
- preventDefault

##### React Lifecycle

- [React Lifecycle Documentation](https://reactjs.org/docs/state-and-lifecycle.html)
- Visual guides to React lifecycle
  > ![](https://pbs.twimg.com/media/DZ-97vzW4AAbcZj.jpg:small)
  - [Larger view of above image](https://pbs.twimg.com/media/DZ-97vzW4AAbcZj.jpg:large)
  - [https://cdn-images-1.medium.com/max/2000/1\*sn-ftowp0_VVRbeUAFECMA.png](https://cdn-images-1.medium.com/max/2000/1*sn-ftowp0_VVRbeUAFECMA.png)
  - [https://cdn-images-1.medium.com/max/1600/1\*u8hTumGAPQMYZIvfgQMfPA.jpeg](https://cdn-images-1.medium.com/max/1600/1*u8hTumGAPQMYZIvfgQMfPA.jpeg)

##### Today's work

- Demo: Convert Score Board
- Assignment: [Color Picker](../assignments/color-picker)
