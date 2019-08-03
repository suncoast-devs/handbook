<h1> Welcome to Javascript </h2>

(using Cohort XIV lecture notes: https://www.youtube.com/watch?v=kXCmz-GiEeg&list=PLyKTFNBDP80BROdsw5K1Evze5UJ61N7VU&index=2)

Javascript lets you create content that updates dynamically, animate portions of your webpage, and controls your content.

<h2> Learning Objects </h2>
<ul>
  <li> What JavaScript can do </li>
  <li> Scripts - lines of code </li>
  <li> Variables - ways to manipulate data </li>
  <li> REPL - Read Eval Print Loop </li>
</ul>

<h2> Recommended Previous Knowledge </h2>
HTML and CSS give you the static content of a website.  Once you know enough HTML and CSS to get a website running, you can go directly to JavaScript and use it to dynamically play with what you have.

<h2> NOTES </h2>

<h4> What is it? </h4>

"JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles." from (https://developer.mozilla.org/en-US/docs/Web/JavaScript)

What does that mean? JavaScript can do, maybe not anything, but many many things.

How do we use it? By turning our plan into algorithms.  
We add scripts to the code to run in order and tell the browser to do _something_. These scripts are our instructions for what we want to happen. These instructions have to be **VERY** specific. We put instructions together in an order to make an algorithm.

A line of code does (usually) 1 thing: it is an instruction to manipulate date either by storing or manipulating data. We store data in variables.

Examples of variables (14:09)

````const x = 5;

const firstName = "Mark";

let dayOfWeek = "Monday";

let numberOfCupsOfCoffee = 1;

var notThis = "hello";```

"const" is your default.
"const" cannot be changed, "let" and "var" can.
_"var" is old and gross. Don't use it_

This example had different types of data: numbers and words.  Every variable had a value and a type.

Types (some of them) (19:23)
```const x = 5; // Number

const lastName = "Dewey"; // String

const stillAString = "255"; // String```
````

Basic Math (21:14)

````const x = 5;

const y = 10;

const z = x + y; // Should be 15

const a = x - y; // -5


const firstName = "Sherlock";

const lastName = "Holmes";

const fullName = firstName + " " + lastName;```
```


The "fullName" has a space in the middle because we want a space in between the names.  Javascript is very literal, and if we didn't have this space fullName would equal SherlockHolmes.  This example shows that we can add variables together.  Make sure you are aware of the types of variable you are adding together; you may get an error, like "NaN".  "NaN" is not a number.  JavaScript is trying, but the calculation you asked for doesn't return a number.

Remember: It is ok to change variables and it is okay to use "const" - it just depends on what you need for your data. But once you declare a "const" you cannot change its value.


If you are adding things together, these three lines of code are functionally the same (42:03):

```time = time + 1

time += 1

time ++```
```

JavaScript is very trusting of the developer to know what they are trying to do.


<h4>Terminal commands you may find useful in the future:</h4>

node // runs JavaScript in terminal
````
