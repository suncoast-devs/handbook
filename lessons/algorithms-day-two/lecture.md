theme: Next, 1

# Algorithms Continued

---

# So you've been challenged to come up with an algorithm!

Where do we start?
What kind of language do we use?
How detailed do we need to be?

---

# [fit] Algorithm Detail

The more details, the better!

New developers/algorithm-creators don't specify enough detail.

Typical new SDG student generates about a **third** to a **fourth** the amount of detail required in an algorithm.

![fit right](./assets/owl.jpg)

---

# [fit] So, how do we learn and practice?

    Use precise language

    Break problems into smaller pieces

    Learn common problem-solving approaches

    Practice, practice, practice ... and more practice.

It takes **time**

---

# [fit] Precise language

- We will be using programming languages like `C#` and `SQL` and `TypeScript` to write our algorithms.

- For now, we will be using **human** language, **English** specifically, which is an imprecise language.

---

# [fit] Use your imagination

- When creating algorithms, pretend that you are giving instructions to:
  - A baby that just learned to speak
  - A robot that only knows a few specific words or phrases
  - The pickiest, [pedantic](https://www.dictionary.com/browse/pedantic) person you know.
  - ... then **double** or **triple** the specificity and detail

---

# Break a problem down

---

# Zeno's Dichotomy Paradox

Who knows it?

---

# Zeno's Dichotomy Paradox

     That which is in locomotion must arrive
     at the halfway stage before it arrives
     at the goal.

     —  as recounted by Aristotle, Physics VI:9, 239b10

---

![fit](https://i.pinimg.com/originals/23/b5/e1/23b5e1f59142a308e91f9918cfa46513.gif)

---

# Mathematically, you **do** arrive at your goal

    Curious students can see me after class to see how

---

# [fit] Take a significant problem and

# [fit] break it into (two?) smaller problems

---

# [fit] We might know this as "delegation"

---

# [fit] We may not know how to

# [fit] solve an entire problem.

<br/>

# [fit] We can look at parts

# [fit] that we _can_ solve

---

# [fit] Example: Spaghetti and Sauce

![](https://i1.wp.com/www.angsarap.net/wp-content/uploads/2015/11/Tomato-Sauce-Spaghetti.jpg?resize=720%2C1080&ssl=1)

---

# [fit] Major Steps

- Make Sauce
- Make Spaghetti

---

# [fit] Break this down

[.column]

- Sauce:
  - Garlic, Onion, Basil, Tomatoes

[.column]

- Spaghetti
  - Eggs, flour, semolina, salt
  - Make dough
  - Rise
  - Roll
  - Cut
  - Cook

---

# [fit] Even this is too simplistic

    Anyone who cooks knows I've summarized many of these steps.

<br/>

# Breaking down problems into manageable steps is an **art**

---

# [fit] Transform a problem

    Take a problem in an area we don't
    know how to solve and turn it into
    one that we do!

---

[.autoscale: true]

# [fit] Here is a simple to state problem.

# [fit] See if you can solve it (no computer usage)

# [fit] I'll give you thirty seconds

---

# [fit] Ready, set, go ...

---

# [fit] Add up the first 1000 numbers

# [fit] `1 + 2 + 3 + ... + 998 + 999 + 1000`

---

# [fit] Did you do it?

---

# [fit] Transforming the problem

# [fit] `1 + 2 + 3 + ... + 998 + 999 + 1000`

---

# [fit] Transforming the problem

# [fit] `1 + 2 + 3 + ... + 998 + 999 + 1000`

[.column]

`1`
`2`
`3`

[.column]

`1000`
`999`
`998`

---

# [fit] Transforming the problem

# [fit] `1 + 2 + 3 + ... + 998 + 999 + 1000`

[.column]

`1`
`2`
`3`

[.column]

`+`
`+`
`+`

[.column]

`1000`
`999`
`998`

---

# [fit] Transforming the problem

# [fit] `1 + 2 + 3 + ... + 998 + 999 + 1000`

[.column]

`1`
`2`
`3`

[.column]

`+`
`+`
`+`

[.column]

`1000`
`999`
`998`

[.column]

`= 1001`
`= 1001`
`= 1001`

---

# [fit] Transforming the problem

# [fit] `1 + 2 + 3 + ... + 998 + 999 + 1000`

<br/>

    There are 500 of these pairs.

    500 * 1001 = 500,500

[.column]

`1`
`2`
`3`

[.column]

`+`
`+`
`+`

[.column]

`1000`
`999`
`998`

[.column]

`= 1001`
`= 1001`
`= 1001`

---

# General formula

$$\frac{n(n + 1)}{2}$$

---

# Breaking problem down: Mail

    As another example ... Donald Knuth gives the
    method a post office typically uses to route
    mail: letters are sorted into separate bags
    for different geographical areas, each of
    these bags is sorted into batches for
    smaller sub-regions, and so on until they
    are delivered.

---

# Breaking problem down, one bit at a time.

`Find the largest number in a list.`

---

# Reduce the problem by ONE

The largest number in a list is either:

- The first number in a list
- **or**
- If other numbers are remaining in the list ... the largest number is in the remainder of the list

---

# Example:

Find largest number in:

`43,71,75,66,48`

---

# Example

- Largest number of `43,71,75,66,48` is either `43`
- **or**
- Largest number in `71,75,66,48`

---

# Example

- Largest number of `71,75,66,48` is either `71`
- **or**
- Largest number in `75,66,48`

---

# Example

- Largest number of `75,66,48` is either `75`
- **or**
- Largest number in `66,48`

---

# Example

- Largest number of `66,48` is either `66`
- **or**
- Largest number in `48`

---

# Example

- Largest number of `48` is `48`

---

- So largest number of `66,48` is `68`

---

- So largest number of `75,66,48` is `75`

---

- So largest number of `71,75,66,48` is `75`

---

- So largest number of `43,71,75,66,48` is `75`

---

# Example

- Median number in a list

  - First sort
  - Then find middle number
    - If there are an odd count of numbers, take the middle
    - If there are even count of numbers, everage the two middle numbers.

---

# Example

`43,71,75,66,48`

sorted

`43,48,66,71,75`

Middle is 66

---

# Example

`4,56,97,25,21,2`

sorted

`2,4,21,25,56,97`

Middle is `21` and `25`, so median is: `23`

---

[.build-lists: true]

# 0, 1, few, $$ \infty $$

- Solving a problem with _zero_ inputs is typically easy
- Solving a problem with _one_ input is typically easy
- Solving a problem with a _few_ inputs is typically easy due to our natural intuition
- Solving a problem with a _huge_ amount of input challenges our intuition and assumptions

- See an example of adding up the first N numbers.

---

# [fit] Use "0, 1, few, $$ \infty $$" in your thinking process

- Perhaps start with an input size of "a few."
- Use your intuition to understand the problem
- Don't forget about `0` and `1` inputs
  - (sometimes the problem has a curveball here)
- See if your intuition still works with $$ \infty $$

---

# [fit] Idea of conditions and loops in algorithms

- When thinking of an algorithm, it often helps to solve a smaller version of the problem
- Then, see if applying that process to each element of the input works.
- This is "looping."
- We'll work with looping **often** in this class

---

# [fit] Idea of conditions and loops in algorithms

_"If something is true"_ or _"If something is false"_ help determine if or when we should do some smaller steps

---

# [fit] Loop with counting

- "Do the following X times"
- "Do the following until X is less-than/more-than/equal to Y"

---

# [fit] Computers are _very_ good at conditions and loops.

    Computers are primarily machines that work with conditions and loops.

---
