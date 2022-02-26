---
title: Formatting dates
order: 14
---

# Formatting dates

You may have noticed that the dates displayed for a review are not
user-friendly. We are getting values such as `2020-07-06T22:34:42.721481`. Let
us look at an approach to format these dates.

There are two popular libraries for formatting dates:
[date-fns](https://date-fns.org/) and [moment](https://momentjs.com/). In this
application, we will use `date-fns` to format dates.

To add the javascript library, use the following steps:

From the `ClientApp` directory:

```shell
npm install date-fns
```

The [format](https://date-fns.org/v2.14.0/docs/format) function from `date-fns`
has useful configuration options.

First, import the format function:

```javascript
import format from 'date-fns/format'
```

We want a format such as: "Monday, July 6th, 2020 at 10:50 PM". To generate
this, we need to review the
[documentation for all the tokens to apply in the format](https://date-fns.org/docs/format).

- `EEEE` day of the week
- `MMMM` month
- `do` day of the month
- `yyyy` calendar year
- `h` hour
- `mm` minute
- `aaa` AM or PM

So our format string is:

```javascript
const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`
```

Then to use this, we need to convert `review.createdAt` to a `Date` object and
pass that and the format string to the `format` function from `date-fns`.

```jsx
<time>
  {review.createdAt ? format(new Date(review.createdAt), dateFormat) : null}
</time>
```

Another excellent option might use a relative time (e.g. `20 days ago`) if the
review is recent (perhaps in the last month) and the long descriptive time if it
is older than that.

Look into `date-fns` method
[differenceInDays](https://date-fns.org/v2.14.0/docs/differenceInDays) as an
example of how to perform this type of logic.

---

<!-- Formats dates -->
<GithubCommitViewer repo="suncoast-devs/TacoTuesday" commit="7f6be20cc388e06eaaf78281ebdd555c8af3a69e" />
