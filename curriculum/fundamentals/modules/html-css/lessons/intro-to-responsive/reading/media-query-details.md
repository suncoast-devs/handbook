import CodePen from '@handbook/CodePen'

# Media Query Details

The `@media` rule allows us to define additional CSS to apply based on a condition, or a set of conditions.

The `@media` at-rule may be placed at the top level of your code or nested inside any other conditional group at-rule.

## Media Types

The media condition may start with a media type and an option to indicate if this is `only` for this type or for all other types (`not`)

The types are:

|        |                                                                                     |
| ------ | ----------------------------------------------------------------------------------- |
| screen | Suitable for all devices.                                                           |
| print  | Intended for paged material and documents viewed on a screen in print preview mode. |
| speech | Intended for speech synthesizers.                                                   |
| all    | Suitable for all devices.                                                           |
|        |                                                                                     |

**Examples**

```css
@media print {
  body {
    font-size: 10pt;
  }
}

@media screen {
  body {
    font-size: 13px;
  }
}

@media screen, print {
  body {
    line-height: 1.2;
  }
}
```

---

## Media Features

The remaining portion of the condition concerns the media features. Primarily we work with device width, but a number of other features are useful.

|              |                                              |
| ------------ | -------------------------------------------- |
| width        | Width of the viewport                        |
| height       | Height of the viewport                       |
| aspect-ratio | Width-to-height aspect ratio of the viewport |
| orientation  | Orientation of the viewport                  |
| resolution   | Pixel density of the output device           |
| scan         | Scanning process of the output device        |
| grid         | Does the device use a grid or bitmap screen? |
|              |                                              |

**examples**

```css
/* When the screen is wider than 900px */
@media screen and (min-width: 900px) {
  article {
    padding: 1rem 3rem;
  }
}

/* When the screen resolution is 150 dots-per-inch */
@media screen and (resolution: 150dpi) {
  article {
    body {
      line-height: 1.4;
    }
  }
}
```

---

## What are good _break points_ for various devices?

In the olden days of the internet we would create different pages for specific devices. Today we create one site with variations of formatting via CSS and media queries. So thus we need to know a good set of pixel sizes to use for our media queries.

We'd like to have a definitive set of media queries to cover all devices. Unfortunately this is a tall order when the best we can do is general guidance for a set of _best practices_ list of media queries.

Thankfully the fine folks at [CSS Tricks](https://css-tricks.com) have a great list of [Media Queries for Standard Devices](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/) that makes a great starting point for our `@media` needs.

---

import Nav from './Nav'

<Nav/>
