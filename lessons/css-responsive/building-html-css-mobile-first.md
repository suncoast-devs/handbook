---
title: Build a page mobile first.
order: 4
---

In this section we will build a page to display the members of our team and some
paragraphs of text about them.

Here is a sketch of the site we will make:

![responsive wireframe](./assets/responsive-wireframe.png)

---

<CodePen>

We start by placing the content on the page without any concern for the HTML
structure or CSS style. By getting the content on the page first we can work on
structure and style in an incremental manner.

<pre data-lang='html'>
{`
Welcome to our site.

Super Team.

Ada Lovelace
Alan Turing
Margaret Hamilton

Remote, hyperlinked broadband network patch, broadband. Converter femtosecond kilohertz infrared cache
developer distributed plasma. Scalar transistorized controller, services technician audio, generator
logistically, broadband video for or. Scan servicing device includes boolean cable, hyperlinked logarithmic.
Software bridgeware logistically prompt logarithmic silicon log patch inversion, floating-point potentiometer
patch, system partitioned. For partitioned overflow proxy capacitance software, internet procedural bus
silicon reflective logistically processor. Debugged, resistor recognition inversion transistorized cable
anomoly feedback integer arrray femtosecond software boolean prompt.

Logarithmic transistorized gigabyte backbone connectivity recursive, converter. Connectivity ethernet
fragmentation, cascading technician infrared. Silicon femtosecond internet, backbone femtosecond bypass. Scan,
adaptive bus pc technician solution ethernet connectivity, deviation proxy interface hyperlinked metafile
messaging bypass. Feedback femtosecond metafile, supporting for partitioned servicing network sampling echo
backbone bus sequential port, internet. Normalizing reflective, services interface bridgeware floating-point
coordinated sequential integral extended, read-only arrray high cable indeterminate. Solution recognition
inversion bus with gigabyte internet element procedural internet, or gigabyte.

Echo ethernet floating-point analog in computer plasma indeterminate integral interface inversion element.
Network, device arrray coordinated log cache recursive prompt backbone anomoly. Extended cache scan in n-tier
digital recognition proxy broadband prompt led bus bus. Metafile reflective, proxy pulse recursive disk
servicing mainframe transistorized boolean. Bus, infrared ethernet record cable adaptive. Cable inversion
system interface overflow backbone. Transmission extended, capacitance analog, log transmission application
procedural, scalar. Anomoly inversion prompt debugged generator deviation.
`}
</pre>

<pre data-lang='css'>
{`

`}
</pre>

</CodePen>

---

## Apply semantics to the HTML

<CodePen>

The next step is to apply semantics to the HTML to give the document a
structure.

Even applying this level of structure we can already see the design of the page
emerging.

<pre data-lang='html'>
{`
<header>
  Welcome to our site
</header>
<section>
  <aside>
    <h3>Super team:</h3>
    <ul>
      <li><a href="mailto:ada-lovelace@example.com">Ada Lovelace</a></li>
      <li><a href="mailto:alan-turing@example.com">Alan Turing</a></li>
      <li><a href="mailto:margret-hamilton@example.com">Margaret Hamilton</a></li>
    </ul>
  </aside>

  <main>
    <p>
      Remote, hyperlinked broadband network patch, broadband. Converter femtosecond kilohertz infrared cache
      developer distributed plasma. Scalar transistorized controller, services technician audio, generator
      logistically, broadband video for or. Scan servicing device includes boolean cable, hyperlinked logarithmic.
      Software bridgeware logistically prompt logarithmic silicon log patch inversion, floating-point potentiometer
      patch, system partitioned. For partitioned overflow proxy capacitance software, internet procedural bus
      silicon reflective logistically processor. Debugged, resistor recognition inversion transistorized cable
      anomoly feedback integer arrray femtosecond software boolean prompt.
    </p>
    <p>
      Logarithmic transistorized gigabyte backbone connectivity recursive, converter. Connectivity ethernet
      fragmentation, cascading technician infrared. Silicon femtosecond internet, backbone femtosecond bypass. Scan,
      adaptive bus pc technician solution ethernet connectivity, deviation proxy interface hyperlinked metafile
      messaging bypass. Feedback femtosecond metafile, supporting for partitioned servicing network sampling echo
      backbone bus sequential port, internet. Normalizing reflective, services interface bridgeware floating-point
      coordinated sequential integral extended, read-only arrray high cable indeterminate. Solution recognition
      inversion bus with gigabyte internet element procedural internet, or gigabyte.
    </p>
    <p>
      Echo ethernet floating-point analog in computer plasma indeterminate integral interface inversion element.
      Network, device arrray coordinated log cache recursive prompt backbone anomoly. Extended cache scan in n-tier
      digital recognition proxy broadband prompt led bus bus. Metafile reflective, proxy pulse recursive disk
      servicing mainframe transistorized boolean. Bus, infrared ethernet record cable adaptive. Cable inversion
      system interface overflow backbone. Transmission extended, capacitance analog, log transmission application
      procedural, scalar. Anomoly inversion prompt debugged generator deviation.
    </p>
  </main>
</section>
`}
</pre>

<pre data-lang='css'>
{`

`}
</pre>

</CodePen>

---

## Apply CSS for the mobile view

<CodePen>

Now we will add styling to the page to represent the format of the page in it's
narrow, mobile view. By adding a little more CSS to our page we have a closer
representation of the design.

<pre data-lang='html'>
{`
<header>
  Welcome to our site
</header>
<section>
  <aside>
    <h3>Super team:</h3>
    <ul>
      <li><a href="mailto:ada-lovelace@example.com">Ada Lovelace</a></li>
      <li><a href="mailto:alan-turing@example.com">Alan Turing</a></li>
      <li><a href="mailto:margret-hamilton@example.com">Margaret Hamilton</a></li>
    </ul>
  </aside>

  <main>
    <p>
      Remote, hyperlinked broadband network patch, broadband. Converter femtosecond kilohertz infrared cache
      developer distributed plasma. Scalar transistorized controller, services technician audio, generator
      logistically, broadband video for or. Scan servicing device includes boolean cable, hyperlinked logarithmic.
      Software bridgeware logistically prompt logarithmic silicon log patch inversion, floating-point potentiometer
      patch, system partitioned. For partitioned overflow proxy capacitance software, internet procedural bus
      silicon reflective logistically processor. Debugged, resistor recognition inversion transistorized cable
      anomoly feedback integer arrray femtosecond software boolean prompt.
    </p>
    <p>
      Logarithmic transistorized gigabyte backbone connectivity recursive, converter. Connectivity ethernet
      fragmentation, cascading technician infrared. Silicon femtosecond internet, backbone femtosecond bypass. Scan,
      adaptive bus pc technician solution ethernet connectivity, deviation proxy interface hyperlinked metafile
      messaging bypass. Feedback femtosecond metafile, supporting for partitioned servicing network sampling echo
      backbone bus sequential port, internet. Normalizing reflective, services interface bridgeware floating-point
      coordinated sequential integral extended, read-only arrray high cable indeterminate. Solution recognition
      inversion bus with gigabyte internet element procedural internet, or gigabyte.
    </p>
    <p>
      Echo ethernet floating-point analog in computer plasma indeterminate integral interface inversion element.
      Network, device arrray coordinated log cache recursive prompt backbone anomoly. Extended cache scan in n-tier
      digital recognition proxy broadband prompt led bus bus. Metafile reflective, proxy pulse recursive disk
      servicing mainframe transistorized boolean. Bus, infrared ethernet record cable adaptive. Cable inversion
      system interface overflow backbone. Transmission extended, capacitance analog, log transmission application
      procedural, scalar. Anomoly inversion prompt debugged generator deviation.
    </p>
  </main>
</section>
`}
</pre>

<pre data-lang='css'>
{`
/* Set the base font size. This is the size represented by 1rem so other rem sizes will be a multiple of this. */
:root {
  font-size: 14px;
}

/* Remove all defautl browser margin and padding so we can control that ourselves */
* {
  margin: 0;
  padding: 0;
}

/* Default font family for the page */
body {
  font-family: Georgia, serif;
}

/* Customize the header font, font-size, padding and colors */
header {
  font-family: sans-serif;
  font-size: 3rem;
  padding: 1rem;
  background-color: #f7f0da;
  color: #85577e;
  text-align: center;
}

/* Give all h3 a little space below the text*/
h3 {
  margin-bottom: 0.6rem;
}

/* Give all paragraphs a little space below the text*/
p {
  margin-bottom: 1.5rem;
}

/* Give all paragraphs a little space below the text*/
section {
  padding: 0 2rem;
}

/* Put a little marging above and below the aside, which has the names of our team members */
aside {
  margin: 2rem 0;
}

/* Remove bullets from the list of team members */
aside ul {
  list-style: none;
}

/* Format the list of team member links by removing the underline, a custom color and some padding */
aside ul li a {
  color: #900;
  text-decoration: none;
  padding: 3px 0;
}
`}
</pre>

</CodePen>

---

## Adding more content and changing style when the page is wider.

When the page is wider lets make a number of changes:

1. When wider, lets put the list of team members on the side. We'll make this
   happen via `flexbox`
2. When wider, lets replace our text at the top of the page with our logo

<CodePen>

To achieve this we can add CSS rules to our page that only apply under certain
conditions. We do this with a new element called a `media query` -- The _media
query_ works by using the `@media` directive and a conditional statement that
controls when the contained CSS rules apply.

See the new CSS added at the end and within the
`@media all and (min-width: 800px)` block.

To see the effect you can either:

- Click the `0.5x` or `0.25x` buttons
- or click on the codepen icon to open the sample full screen and then adjust
  your browser width.
- If you click on the codepen icon, try resizing your browser to just wider and
  narrower than 800px and you will see the site switch between the two styles.

```css
@media condition {
  /* rules here */
  p {
    font-size: 3rem;
  }
}
```

When the condition is true, the CSS rules within will be active as if they were
directly placed in the CSS file. When the condition is false, those CSS rules
will **not** be applied to the page.

<pre data-lang='html'>
{`
<header>
  Welcome to our site
</header>
<section>
  <aside>
    <h3>Super team:</h3>
    <ul>
      <li><a href="mailto:ada-lovelace@example.com">Ada Lovelace</a></li>
      <li><a href="mailto:alan-turing@example.com">Alan Turing</a></li>
      <li><a href="mailto:margret-hamilton@example.com">Margaret Hamilton</a></li>
    </ul>
  </aside>

  <main>
    <p>
      Remote, hyperlinked broadband network patch, broadband. Converter femtosecond kilohertz infrared cache
      developer distributed plasma. Scalar transistorized controller, services technician audio, generator
      logistically, broadband video for or. Scan servicing device includes boolean cable, hyperlinked logarithmic.
      Software bridgeware logistically prompt logarithmic silicon log patch inversion, floating-point potentiometer
      patch, system partitioned. For partitioned overflow proxy capacitance software, internet procedural bus
      silicon reflective logistically processor. Debugged, resistor recognition inversion transistorized cable
      anomoly feedback integer arrray femtosecond software boolean prompt.
    </p>
    <p>
      Logarithmic transistorized gigabyte backbone connectivity recursive, converter. Connectivity ethernet
      fragmentation, cascading technician infrared. Silicon femtosecond internet, backbone femtosecond bypass. Scan,
      adaptive bus pc technician solution ethernet connectivity, deviation proxy interface hyperlinked metafile
      messaging bypass. Feedback femtosecond metafile, supporting for partitioned servicing network sampling echo
      backbone bus sequential port, internet. Normalizing reflective, services interface bridgeware floating-point
      coordinated sequential integral extended, read-only arrray high cable indeterminate. Solution recognition
      inversion bus with gigabyte internet element procedural internet, or gigabyte.
    </p>
    <p>
      Echo ethernet floating-point analog in computer plasma indeterminate integral interface inversion element.
      Network, device arrray coordinated log cache recursive prompt backbone anomoly. Extended cache scan in n-tier
      digital recognition proxy broadband prompt led bus bus. Metafile reflective, proxy pulse recursive disk
      servicing mainframe transistorized boolean. Bus, infrared ethernet record cable adaptive. Cable inversion
      system interface overflow backbone. Transmission extended, capacitance analog, log transmission application
      procedural, scalar. Anomoly inversion prompt debugged generator deviation.
    </p>
  </main>
</section>
`}
</pre>

<pre data-lang='css'>
{`
/* Set the base font size. This is the size represented by 1rem so other rem sizes will be a multiple of this. */
:root {
  font-size: 14px;
}

/* Remove all defautl browser margin and padding so we can control that ourselves */
* {
  margin: 0;
  padding: 0;
}

/* Default font family for the page */
body {
  font-family: Georgia, serif;
}

/* Customize the header font, font-size, padding and colors */
header {
  font-family: sans-serif;
  font-size: 3rem;
  padding: 1rem;
  background-color: #f7f0da;
  color: #85577e;
  text-align: center;
}

/* Give all h3 a little space below the text*/
h3 {
  margin-bottom: 0.6rem;
}

/* Give all paragraphs a little space below the text*/
p {
  margin-bottom: 1.5rem;
}

/* Give all paragraphs a little space below the text*/
section {
  padding: 0 2rem;
}

/* Put a little marging above and below the aside, which has the names of our team members */
aside {
  margin: 2rem 0;
}

/* Remove bullets from the list of team members */
aside ul {
  list-style: none;
}

/* Format the list of team member links by removing the underline, a custom color and some padding */
aside ul li a {
  color: #900;
  text-decoration: none;
  padding: 3px 0;
}

/* When the page is more than 800px wide */
@media all and (min-width: 800px) {
  header {
    /* Add a centered, non-repeated, background image to the header. We use a data style URI to place the content inline in the CSS. This is typically used for small icons, but here we use this style to avoid external assets in our demo) */
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzVhOTE5MTt9LmNscy0ye2ZpbGw6I2Q2NTYyYjt9LmNscy0ze2ZpbGw6I2Y5YTAxYjt9LmNscy00e2ZpbGw6I2ZmZjIwMDt9LmNscy01e2ZpbGw6I2IyZDIzNTt9LmNscy02e2ZpbGw6IzEwMGYwZjtmaWxsLW9wYWNpdHk6MC4zO30uY2xzLTd7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi1sb2dvPC90aXRsZT48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00ODUsMTc0LjNjLTE2LjYyLTM3LjU1LTUxLjA1LTk0LjA4LTgzLjMzLTExNS4xMS02Ny41NC00NC0xMzguODMtNjEuODEtMjI3LjkyLTI4LjI3LTExMiw0Mi4xOS0xNDMsMTUwLjc2LTE0NS4yLDE1Ni44M0MxOCwyMTcuMjYsMTEuMjEsMjQ5LjYzLDE0LjIxLDI3NS4zMiwyOC4wNywzOTQuMjgsMTIxLjY4LDQ5NSwyNzQuNTUsNDk4LjQ4YzU2LjY4LDEuMjgsMTMzLjE3LTM4LjU5LDE2NS03Ny41M0M1MTcuMTMsMzI1Ljg4LDUwMS42LDIxMS44NSw0ODUsMTc0LjNaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNDU0LjY1LDE2MS41NEM0MzkuNzYsMTI3LjYsNDE0LDk4Ljg1LDM4NS4xMSw3OS44NCwzMjQuNiw0MC4wNSwyNjAuNzMsMjQsMTgwLjkxLDU0LjI5LDgwLjUyLDkyLjQyLDUyLjc2LDE5MC41Nyw1MC44MiwxOTYuMDYsNDEuNDEsMjIyLjczLDM1LjQzLDI1MiwzOCwyNzUuMjJzMTUuNCw1NS45MiwxNS40LDU1LjkybDQxMC4zNy43MnMxMC4wNi00Ni42LDEwLjkyLTc2LjcxUzQ2OS41NCwxOTUuNDgsNDU0LjY1LDE2MS41NFoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik00NjIsMzM5LjcybC00MDQuMzktMS44czQuNzUsMTIuODMsNy40MiwxOC4yYzEuMjEsMi40NCw4Ljc2LDE2LDguNzYsMTZsMzcwLjg0LDEuMnM2LjU5LTkuNTksMTAuNzgtMTYuNzlTNDYyLDMzOS43Miw0NjIsMzM5LjcyWiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTQ0Mi42LDM3OS41OXMtMTEuNDQsMTUuMTQtMTYuMjEsMjEuNzQtMjEuNiwyMS4xMy0yMS42LDIxLjEzbC0yOTItMy41OXMtMTIuODMtMTAuMTYtMjAuODQtMTljLTguMjgtOS4xNy0xNS43OC0yMi4yMi0xNS43OC0yMi4yMloiLz48cGF0aCBjbGFzcz0iY2xzLTUiIGQ9Ik0zOTcuMjQsNDMwLjM5UzMzNS42Niw0ODAsMjYxLjE3LDQ3N3MtMTQxLjYyLTUwLjYxLTE0MS42Mi01MC42MVoiLz48cGF0aCBjbGFzcz0iY2xzLTYiIGQ9Ik0xMjAsMTgzbDE0LjU1LDEuMTMsMTEuNzQsMTYuODhzNTAuNzItMy41Niw2My41OSw0LjMyLDI0LjMxLDI2Ljc4LDI0LjMxLDI2Ljc4bC0xMy40My41NnMtNS4yOS0xMy4wOC0xOC0xNy41OS02Mi4wOSw5LjU3LTYyLjA5LDkuNTdsLTExLjE5LTE1Ljc2LTEwLjA3LDEwLjdTNTkuODQsMjExLDUwLjYxLDIxNS4xMnMtMTcuMjUsMjMuNTMtMTcuMjUsMjMuNTNMMjMuODUsMjM3czExLjI5LTI4Ljc4LDIzLjQxLTM0Ljc4LDYyLjA5LDEuMTIsNjIuMDksMS4xMloiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik0xMjAsMTc0bDE0LjU1LDEuMTIsMTEuNzQsMTYuODlzNTAuNzItMy41Nyw2My41OSw0LjMxLDI0LjMxLDI2Ljc5LDI0LjMxLDI2Ljc5bC0xMy40My41NnMtNS4yOS0xMy4wOS0xOC0xNy41OS02Mi4wOSw5LjU3LTYyLjA5LDkuNTdsLTExLjE5LTE1Ljc2LTEwLjA3LDEwLjY5cy01OS41OC04LjY2LTY4LjgxLTQuNS0xNy4yNSwyMy41Mi0xNy4yNSwyMy41MkwyMy44NSwyMjhzMTEuMjktMjguNzgsMjMuNDEtMzQuNzksNjIuMDksMS4xMyw2Mi4wOSwxLjEzWiIvPjxwYXRoIGNsYXNzPSJjbHMtNiIgZD0iTTMyNC4zNiwyNDkuNzcsMzQ1LjYxLDI0N2wxNC41NSwyNC43NywzNS4zOS0uOTJjMTkuODYtLjUyLDQxLjU3LTIsNjEsNC41OCwyNC41OCw4LjMzLDM1LDI4LjY1LDQyLjQzLDUyLjE2LDAsMC0xNy4zMi0yLjIxLTE3LjM0LTIuMjUtNC41Ni02LjYtMTQtMTguNzMtMTYuODgtMjEtOC4yNy02LjYzLTE4LjY2LTguODUtMjkuMjMtMTAuNjYtMTIuNDYtMi4xNC0yMy42MywxLjYzLTM1LjgyLDMuNDYtMTQuOSwyLjIzLTI5LjEzLDYuMTgtNDQsOC40MmwtMTcuOS0yNS44OUwzMTguMiwzMDEuNTVsLTQ1LjQyLTQuODVjLTEzLjY4LTEuNDUtMzAuMzQtNS4yLTQ0LjQ2LTIuNDdDMjExLjg3LDI5Ny40MSwxOTcsMzEwLDE5Mi41NiwzMjEuNWwtMTYuNDUtMWMxMC40NC0xOC43NywzMC4xMS0zNS45NCwzMi4wOC0zNi43OCwxNC4xNy02LDI5LjA5LTExLjM2LDYwLjYyLTEwLjEzbDM4Ljc2LDEuNVoiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik0zMjQuMzYsMjQwLjc2LDM0NS42MSwyMzhsMTQuNTUsMjQuNzYsMzUuMzktLjkyYzE5Ljg2LS41MSw0MS41Ny0yLDYxLDQuNTksMjQuNTgsOC4zMywzNSwyOC42NCw0Mi40Myw1Mi4xNiwwLDAtMTcuMzItMi4yMi0xNy4zNC0yLjI1LTQuNTYtNi42LTE0LTE4Ljc0LTE2Ljg4LTIxLTguMjctNi42NC0xOC42Ni04Ljg1LTI5LjIzLTEwLjY3LTEyLjQ2LTIuMTQtMjMuNjMsMS42My0zNS44MiwzLjQ2LTE0LjksMi4yNC0yOS4xMyw2LjE5LTQ0LDguNDJsLTE3LjktMjUuODktMTkuNTgsMjItNDUuNDItNC44NGMtMTMuNjgtMS40Ni0zMC4zNC01LjIxLTQ0LjQ2LTIuNDdDMjExLjg3LDI4OC40MSwxOTcsMzAxLDE5Mi41NiwzMTIuNWwtMTYuNDUtMWMxMC40NC0xOC43NiwzMC4xMS0zNS45NCwzMi4wOC0zNi43NywxNC4xNy02LDI5LjA5LTExLjM3LDYwLjYyLTEwLjE0bDM4Ljc2LDEuNTFaIi8+PC9zdmc+);
    background-repeat: no-repeat;
    background-position: center;

    /* Give some extra margin */
    margin: 1.5rem 0;

    /* Make the text transparent so it does not show and only our image is visible */
    color: transparent;
  }

  /* Make the section element flexbox so the aside and the main will be in a row */
  section {
    padding-top: 2rem;
    display: flex;
  }

  /* Remove the margin for the aside and set it to just over 1/3 the width */
  aside {
    margin: 0;
    width: 35%;
  }

  /* Make the main part of the content the remainder of the width and use a sligihtly larger font */
  main {
    font-size: 1.5rem;
    width: 65%;
  }
}
`}
</pre>

</CodePen>

---

## Content changes

We can also adjust the content itself under different media query conditions.

<CodePen>

When the page is wider lets show the team member's email addresses as well as
adding an icon.

In order to do this we will add a data-email attribute to each team member's a
tag. We can then access this data from the CSS and have it displayed in an after
pseudo selector.

```css
/* When wider than 1000 pixels, we will create an `after` element for all `a` elements in the team member list */
/* The content for this will be fetched from the `data-email` attribute */
@media all and (min-width: 1001px) {
  aside ul li a:after {
    content: " (" attr(data-email) ")";
    font-size: 11px;
    font-style: italic;
    color: #666;
  }
}

/* When wider than 700 pxels but less than 1000px we will add the word `Email:` before the team member name */
@media all and (max-width: 1000px) and (min-width: 700px) {
  aside ul li a:before {
    content: "Email: ";
    font-style: italic;
    color: #666;
  }
}

/* When the width is between 520 and 700 pixels, OR, the width is more than 1151 pixels */
/* Add a background image of an email icon on the left and add a little padding so the background image shows */
@media all and (max-width: 699px) and (min-width: 520px), (min-width: 1151px) {
  aside ul li a {
    padding-left: 21px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAACS0lEQVQ4EaVSW24TMRQ9nnFmJknT5olIi9TSBz9IoILEMlgEq+CHBbAF+GUZlZCQkKACKapQX6QBlIdK27SaZDIzmZc5nvaPv/ZKtq+vfY7PvddCKYW7mHEXsMbKN++/fnRKle2LaVz2wsTIKCiDQkono7qUI6Ov9zdDQaRx7LsX/cNuF28/dLpMQ+398vSSW0hUTI+LIsl/1jnxlOvF6sWrd10pTLsepwqjywjVBYnWko0gBYiEyQQFZRpCQNLX+9PLOU7+ztGu8+76w7o8n8S1KMlwchrANIGSY2EWA2GkILnXID1KBQG7oHAw8NH5E+DZhgWrVK3JIEpgSYHHG3Xs9y5h86ntzUUEjJE3BzsaLIHdowm+9XxsrdWxtGBSZQrphyl0J+9Xbai1GvZIIljE51tVRJqAOVimwvefLj4fzbC1WkND380oU6enCXITink5WG4W8enHGAf9KSyDaXDs9z3sdMZo82yl4eTxaxDbOAuTa58qJl6Isg08edTC7vGEcQHWD18OJ3kMfHUehigWeUkbz1gD3XVgFkRwvQArrQpsq4B6xcL+yAPrh6ebDTSrDrwwwvBsCoPBLOOk2B0/nCfstZx6PtbbiwSzWizKatPB6j0nb6NilonKUCgX4CwvYnDmwp/b/ChxKv2r0e+xG64/aBSMkpVCGGn+qpYu9EQTfEwr0Wy1IlB1illvOJm7Z4OBjGfjwcvXO027Ui5L2xSSzTdYet17wxAwKEjT3HBpX6VJFAXu1fi8NxoK/lPNfWvLld0aTeA/EN804+GNd6sAAAAASUVORK5CYII=)
      left center no-repeat;
  }
}
```

To best see the results, click on the _codepen_ icon to open the page full
width, then slowing shrink the width of the page to see the effect of the CSS
for the `aside`.

<pre data-lang='html'>
{`
<header>
  Welcome to our site
</header>
<section>
  <aside>
    <h3>Super team:</h3>
    <ul>
      <!--- The data-email attribute is added so we can access it via CSS --->
      <li><a data-email="ada-lovelace@example.com" href="mailto:ada-lovelace@example.com">Ada Lovelace</a></li>
      <li><a data-email="alan-turing@example.com" href="mailto:alan-turing@example.com">Alan Turing</a></li>
      <li><a data-email="margaret-hamilton@example.com" href="mailto:margret-hamilton@example.com">Margaret Hamilton</a>
      </li>
    </ul>
  </aside>

  <main>
    <p>
      Remote, hyperlinked broadband network patch, broadband. Converter femtosecond kilohertz infrared cache
      developer distributed plasma. Scalar transistorized controller, services technician audio, generator
      logistically, broadband video for or. Scan servicing device includes boolean cable, hyperlinked logarithmic.
      Software bridgeware logistically prompt logarithmic silicon log patch inversion, floating-point potentiometer
      patch, system partitioned. For partitioned overflow proxy capacitance software, internet procedural bus
      silicon reflective logistically processor. Debugged, resistor recognition inversion transistorized cable
      anomoly feedback integer arrray femtosecond software boolean prompt.
    </p>
    <p>
      Logarithmic transistorized gigabyte backbone connectivity recursive, converter. Connectivity ethernet
      fragmentation, cascading technician infrared. Silicon femtosecond internet, backbone femtosecond bypass. Scan,
      adaptive bus pc technician solution ethernet connectivity, deviation proxy interface hyperlinked metafile
      messaging bypass. Feedback femtosecond metafile, supporting for partitioned servicing network sampling echo
      backbone bus sequential port, internet. Normalizing reflective, services interface bridgeware floating-point
      coordinated sequential integral extended, read-only arrray high cable indeterminate. Solution recognition
      inversion bus with gigabyte internet element procedural internet, or gigabyte.
    </p>
    <p>
      Echo ethernet floating-point analog in computer plasma indeterminate integral interface inversion element.
      Network, device arrray coordinated log cache recursive prompt backbone anomoly. Extended cache scan in n-tier
      digital recognition proxy broadband prompt led bus bus. Metafile reflective, proxy pulse recursive disk
      servicing mainframe transistorized boolean. Bus, infrared ethernet record cable adaptive. Cable inversion
      system interface overflow backbone. Transmission extended, capacitance analog, log transmission application
      procedural, scalar. Anomoly inversion prompt debugged generator deviation.
    </p>
  </main>
</section>
`}
</pre>

<pre data-lang='css'>
{`
/* Set the base font size. This is the size represented by 1rem so other rem sizes will be a multiple of this. */
:root {
  font-size: 14px;
}

/* Remove all defautl browser margin and padding so we can control that ourselves */
* {
  margin: 0;
  padding: 0;
}

/* Default font family for the page */
body {
  font-family: Georgia, serif;
}

/* Customize the header font, font-size, padding and colors */
header {
  font-family: sans-serif;
  font-size: 3rem;
  padding: 1rem;
  background-color: #f7f0da;
  color: #85577e;
  text-align: center;
}

/* Give all h3 a little space below the text*/
h3 {
  margin-bottom: 0.6rem;
}

/* Give all paragraphs a little space below the text*/
p {
  margin-bottom: 1.5rem;
}

/* Give all paragraphs a little space below the text*/
section {
  padding: 0 2rem;
}

/* Put a little marging above and below the aside, which has the names of our team members */
aside {
  margin: 2rem 0;
}

/* Remove bullets from the list of team members */
aside ul {
  list-style: none;
}

/* Format the list of team member links by removing the underline, a custom color and some padding */
aside ul li a {
  color: #900;
  text-decoration: none;
  padding: 3px 0;
}

/* When the page is more than 800px wide */
@media all and (min-width: 800px) {
  header {
    /* Add a centered, non-repeated, background image to the header. We use a data style URI to place the content inline in the CSS. This is typically used for small icons, but here we use this style to avoid external assets in our demo) */
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzVhOTE5MTt9LmNscy0ye2ZpbGw6I2Q2NTYyYjt9LmNscy0ze2ZpbGw6I2Y5YTAxYjt9LmNscy00e2ZpbGw6I2ZmZjIwMDt9LmNscy01e2ZpbGw6I2IyZDIzNTt9LmNscy02e2ZpbGw6IzEwMGYwZjtmaWxsLW9wYWNpdHk6MC4zO30uY2xzLTd7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi1sb2dvPC90aXRsZT48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00ODUsMTc0LjNjLTE2LjYyLTM3LjU1LTUxLjA1LTk0LjA4LTgzLjMzLTExNS4xMS02Ny41NC00NC0xMzguODMtNjEuODEtMjI3LjkyLTI4LjI3LTExMiw0Mi4xOS0xNDMsMTUwLjc2LTE0NS4yLDE1Ni44M0MxOCwyMTcuMjYsMTEuMjEsMjQ5LjYzLDE0LjIxLDI3NS4zMiwyOC4wNywzOTQuMjgsMTIxLjY4LDQ5NSwyNzQuNTUsNDk4LjQ4YzU2LjY4LDEuMjgsMTMzLjE3LTM4LjU5LDE2NS03Ny41M0M1MTcuMTMsMzI1Ljg4LDUwMS42LDIxMS44NSw0ODUsMTc0LjNaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNDU0LjY1LDE2MS41NEM0MzkuNzYsMTI3LjYsNDE0LDk4Ljg1LDM4NS4xMSw3OS44NCwzMjQuNiw0MC4wNSwyNjAuNzMsMjQsMTgwLjkxLDU0LjI5LDgwLjUyLDkyLjQyLDUyLjc2LDE5MC41Nyw1MC44MiwxOTYuMDYsNDEuNDEsMjIyLjczLDM1LjQzLDI1MiwzOCwyNzUuMjJzMTUuNCw1NS45MiwxNS40LDU1LjkybDQxMC4zNy43MnMxMC4wNi00Ni42LDEwLjkyLTc2LjcxUzQ2OS41NCwxOTUuNDgsNDU0LjY1LDE2MS41NFoiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik00NjIsMzM5LjcybC00MDQuMzktMS44czQuNzUsMTIuODMsNy40MiwxOC4yYzEuMjEsMi40NCw4Ljc2LDE2LDguNzYsMTZsMzcwLjg0LDEuMnM2LjU5LTkuNTksMTAuNzgtMTYuNzlTNDYyLDMzOS43Miw0NjIsMzM5LjcyWiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTQ0Mi42LDM3OS41OXMtMTEuNDQsMTUuMTQtMTYuMjEsMjEuNzQtMjEuNiwyMS4xMy0yMS42LDIxLjEzbC0yOTItMy41OXMtMTIuODMtMTAuMTYtMjAuODQtMTljLTguMjgtOS4xNy0xNS43OC0yMi4yMi0xNS43OC0yMi4yMloiLz48cGF0aCBjbGFzcz0iY2xzLTUiIGQ9Ik0zOTcuMjQsNDMwLjM5UzMzNS42Niw0ODAsMjYxLjE3LDQ3N3MtMTQxLjYyLTUwLjYxLTE0MS42Mi01MC42MVoiLz48cGF0aCBjbGFzcz0iY2xzLTYiIGQ9Ik0xMjAsMTgzbDE0LjU1LDEuMTMsMTEuNzQsMTYuODhzNTAuNzItMy41Niw2My41OSw0LjMyLDI0LjMxLDI2Ljc4LDI0LjMxLDI2Ljc4bC0xMy40My41NnMtNS4yOS0xMy4wOC0xOC0xNy41OS02Mi4wOSw5LjU3LTYyLjA5LDkuNTdsLTExLjE5LTE1Ljc2LTEwLjA3LDEwLjdTNTkuODQsMjExLDUwLjYxLDIxNS4xMnMtMTcuMjUsMjMuNTMtMTcuMjUsMjMuNTNMMjMuODUsMjM3czExLjI5LTI4Ljc4LDIzLjQxLTM0Ljc4LDYyLjA5LDEuMTIsNjIuMDksMS4xMloiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik0xMjAsMTc0bDE0LjU1LDEuMTIsMTEuNzQsMTYuODlzNTAuNzItMy41Nyw2My41OSw0LjMxLDI0LjMxLDI2Ljc5LDI0LjMxLDI2Ljc5bC0xMy40My41NnMtNS4yOS0xMy4wOS0xOC0xNy41OS02Mi4wOSw5LjU3LTYyLjA5LDkuNTdsLTExLjE5LTE1Ljc2LTEwLjA3LDEwLjY5cy01OS41OC04LjY2LTY4LjgxLTQuNS0xNy4yNSwyMy41Mi0xNy4yNSwyMy41MkwyMy44NSwyMjhzMTEuMjktMjguNzgsMjMuNDEtMzQuNzksNjIuMDksMS4xMyw2Mi4wOSwxLjEzWiIvPjxwYXRoIGNsYXNzPSJjbHMtNiIgZD0iTTMyNC4zNiwyNDkuNzcsMzQ1LjYxLDI0N2wxNC41NSwyNC43NywzNS4zOS0uOTJjMTkuODYtLjUyLDQxLjU3LTIsNjEsNC41OCwyNC41OCw4LjMzLDM1LDI4LjY1LDQyLjQzLDUyLjE2LDAsMC0xNy4zMi0yLjIxLTE3LjM0LTIuMjUtNC41Ni02LjYtMTQtMTguNzMtMTYuODgtMjEtOC4yNy02LjYzLTE4LjY2LTguODUtMjkuMjMtMTAuNjYtMTIuNDYtMi4xNC0yMy42MywxLjYzLTM1LjgyLDMuNDYtMTQuOSwyLjIzLTI5LjEzLDYuMTgtNDQsOC40MmwtMTcuOS0yNS44OUwzMTguMiwzMDEuNTVsLTQ1LjQyLTQuODVjLTEzLjY4LTEuNDUtMzAuMzQtNS4yLTQ0LjQ2LTIuNDdDMjExLjg3LDI5Ny40MSwxOTcsMzEwLDE5Mi41NiwzMjEuNWwtMTYuNDUtMWMxMC40NC0xOC43NywzMC4xMS0zNS45NCwzMi4wOC0zNi43OCwxNC4xNy02LDI5LjA5LTExLjM2LDYwLjYyLTEwLjEzbDM4Ljc2LDEuNVoiLz48cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik0zMjQuMzYsMjQwLjc2LDM0NS42MSwyMzhsMTQuNTUsMjQuNzYsMzUuMzktLjkyYzE5Ljg2LS41MSw0MS41Ny0yLDYxLDQuNTksMjQuNTgsOC4zMywzNSwyOC42NCw0Mi40Myw1Mi4xNiwwLDAtMTcuMzItMi4yMi0xNy4zNC0yLjI1LTQuNTYtNi42LTE0LTE4Ljc0LTE2Ljg4LTIxLTguMjctNi42NC0xOC42Ni04Ljg1LTI5LjIzLTEwLjY3LTEyLjQ2LTIuMTQtMjMuNjMsMS42My0zNS44MiwzLjQ2LTE0LjksMi4yNC0yOS4xMyw2LjE5LTQ0LDguNDJsLTE3LjktMjUuODktMTkuNTgsMjItNDUuNDItNC44NGMtMTMuNjgtMS40Ni0zMC4zNC01LjIxLTQ0LjQ2LTIuNDdDMjExLjg3LDI4OC40MSwxOTcsMzAxLDE5Mi41NiwzMTIuNWwtMTYuNDUtMWMxMC40NC0xOC43NiwzMC4xMS0zNS45NCwzMi4wOC0zNi43NywxNC4xNy02LDI5LjA5LTExLjM3LDYwLjYyLTEwLjE0bDM4Ljc2LDEuNTFaIi8+PC9zdmc+);
    background-repeat: no-repeat;
    background-position: center;

    /* Give some extra margin */
    margin: 1.5rem 0;

    /* Make the text transparent so it does not show and only our image is visible */
    color: transparent;
  }

  /* Make the section element flexbox so the aside and the main will be in a row */
  section {
    padding-top: 2rem;
    display: flex;
  }

  /* Remove the margin for the aside and set it to just over 1/3 the width */
  aside {
    margin: 0;
    width: 35%;
  }

  /* Make the main part of the content the remainder of the width and use a sligihtly larger font */
  main {
    font-size: 1.5rem;
    width: 65%;
  }
}

/* When wider than 1000 pixels, we will create an after element for all a elements in the team member list */
/* The content for this will be fetched from the data-email attribute */
@media all and (min-width: 1001px) {
  aside ul li a:after {
    content: ' (' attr(data-email) ')';
    font-size: 11px;
    font-style: italic;
    color: #666;
  }
}

/* When wider than 700 pixels but less than 1000px we will add the word Email before the team member name */
@media all and (max-width: 1000px) and (min-width: 700px) {
  aside ul li a:before {
    content: 'Email: ';
    font-style: italic;
    color: #666;
  }
}

/* When the width is between 520 and 700 pixels, OR, the width is more than 1151 pixels */
/* Add a background image of an email icon on the left and add a little padding so the background image shows */
@media all and (max-width: 699px) and (min-width: 520px), (min-width: 1151px) {
  aside ul li a {
    padding-left: 21px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAACS0lEQVQ4EaVSW24TMRQ9nnFmJknT5olIi9TSBz9IoILEMlgEq+CHBbAF+GUZlZCQkKACKapQX6QBlIdK27SaZDIzmZc5nvaPv/ZKtq+vfY7PvddCKYW7mHEXsMbKN++/fnRKle2LaVz2wsTIKCiDQkono7qUI6Ov9zdDQaRx7LsX/cNuF28/dLpMQ+398vSSW0hUTI+LIsl/1jnxlOvF6sWrd10pTLsepwqjywjVBYnWko0gBYiEyQQFZRpCQNLX+9PLOU7+ztGu8+76w7o8n8S1KMlwchrANIGSY2EWA2GkILnXID1KBQG7oHAw8NH5E+DZhgWrVK3JIEpgSYHHG3Xs9y5h86ntzUUEjJE3BzsaLIHdowm+9XxsrdWxtGBSZQrphyl0J+9Xbai1GvZIIljE51tVRJqAOVimwvefLj4fzbC1WkND380oU6enCXITink5WG4W8enHGAf9KSyDaXDs9z3sdMZo82yl4eTxaxDbOAuTa58qJl6Isg08edTC7vGEcQHWD18OJ3kMfHUehigWeUkbz1gD3XVgFkRwvQArrQpsq4B6xcL+yAPrh6ebDTSrDrwwwvBsCoPBLOOk2B0/nCfstZx6PtbbiwSzWizKatPB6j0nb6NilonKUCgX4CwvYnDmwp/b/ChxKv2r0e+xG64/aBSMkpVCGGn+qpYu9EQTfEwr0Wy1IlB1illvOJm7Z4OBjGfjwcvXO027Ui5L2xSSzTdYet17wxAwKEjT3HBpX6VJFAXu1fi8NxoK/lPNfWvLld0aTeA/EN804+GNd6sAAAAASUVORK5CYII=)
      left center no-repeat;
  }
}
`}
</pre>

</CodePen>

---
