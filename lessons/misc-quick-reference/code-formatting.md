---
title: Code formatting guides
---

As in any creative endeavor, there will be multiple schools of thought about how
to format your code. This guide will provide some overall guidelines to help you
write clean, well-formatted code.

# Rule 1 - Follow your team's rules

Follow whatever formatting rules your team has implemented. For instance, at SDG
we do not use `;` at the end of lines in JavaScript. If your team does put `;`
at the end of lines, then you will too.

# Use an automated code formatting tool

Keeping Rule 1 in mind, hopefully, your team has configured automated code
formatting for your projects. If so, you should use these. It will keep your
code in the same style as all the other code in the project.

At SDG we use these formatters to generate consistent code format:

- [`Prettier`](https://prettier.io/)
- [`Omnisharper`](https://www.omnisharp.net/)

However, these formatters can only do so much to format code

# Rule 2 - Don't leave commented out code in your commits

We all comment out code while working on a feature. However, leaving behind
commented out code is a bad habit and leads to confusion by your fellow
developers, or yourself, in the future.

Review all your commits before submitting them to ensure that the comments you
placed in the code **explain** code, not leave behind old code.

# Rule 3 - Give your code some space

When writing code, try to use line breaks between sections of code. The thought
is that blocks of codes are like paragraphs in prose. If your favorite book
never used paragraphs it would be much more difficult to read. Adding breaks in
the code allows the reader to notice that one thought or set of logic is
complete and another is beginning. Use this to your advantage.

Let's look at an example in JavaScript.

```jsx
const url = 'http://handbook.suncoast.io/api'
const method = 'get'
const id = 42
const response = axios({ url, method })
if (response.data.ok === 'yup') {
  setInformation(response.data.information)
}
if (response.data.ok === 'maybe') {
  setError('something went wrong')
}
return (
  <ul>
    <li>Some UI Here</li>
  </ul>
)
```

There are four sections to this code, but we would not know it from reading this
example. The four sections are:

- Setup variables
- Fetch data from an API
- Analyze the response to set state
- Render UI

Let's improve the code by adding some visual space

```jsx
const url = 'http://handbook.suncoast.io/api'
const method = 'get'
const id = 42

const response = axios({ url, method, data: { id } })

if (response.data.ok === 'yup') {
  setInformation(response.data.information)
}

if (response.data.ok === 'maybe') {
  setError('something went wrong')
}

return (
  <ul>
    <li>Some UI Here</li>
  </ul>
)
```

Hopefully the visual differentiation helps. Notice that we even separate the
last `const` variable from the first three. Even though the pattern of the code
is the same, the **purpose** is different. The first three are about setting up
the parameters for an API call, whereas the last is the API call itself.

# Use good variable names

Let's look at that last example again, but this time with poor variable names

```jsx
const u = 'http://handbook.suncoast.io/api'
const meth = 'get'
const i = 42

const r = axios({ url: u, method: meth, data: { id: i } })

if (r.data.ok === 'yup') {
  setInformation(r.data.information)
}

if (r.data.ok === 'maybe') {
  setError('something went wrong')
}

return (
  <ul>
    <li>Some UI Here</li>
  </ul>
)
```

Notice that we had to expand the variable names in the `axios` call since we
used different variables than the expected property names. Also, `r`, while
shorter, doesn't represent the contents and purpose of the variable, a
`response`.

Generally try to be as verbose as possible to explain the content and purpose of
a variable, but no further. We don't need the variable to be
`urlToTheAPIWeGetOurInformationFrom`, but `url` is enough in this context.

There are cases where common shorter names are acceptable and you are free to
use short, less context-providing, variable names in those cases. For instance,
it is common in a `sort` function to use `a` and `b` like so:
`scores.sort((a,b) => a - b))`

# Keep your code organized in files

When writing code, such as a React component, it is common to extract a smaller
component from a larger one as the code size grows. Once you have, consider if
this component deserves to be its own file. If the component is of significant
size, it should be its own file just for clarity's sake. If the component is
going to be used by more than one component than it should be it's own file.

These same rules apply to `C#` classes, to JavaScript modules, and any other
style code.

# Working but long code > short and slick non-working code

Be ok with generating a long implementation of some logic. However, take some
time after getting the code to work to consider if there are more expressive and
efficient ways to write the same code.

Tools to do so:

- Investigate your language features to see if there are built-in methods to
  perform some of your steps
- Ask for a peer review of your code
- Take a break and come back to the code with fresh eyes and take another look
  at the problem
