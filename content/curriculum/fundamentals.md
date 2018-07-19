---
title: Fundamentals
---

TODO: A survey of the fundaments section of our program.

## HTML
HTML is the most basic structure of a webpage. All other languages, frameworks, etc. that are on the web form themselves around the foundation that is HTML. 

It's primary purpose is to put text, pictures, and links onto a website. If you're only doing that, it will remain pretty simple. As you begin learning more of the tools it has to offer though, you will realize that it can do quite a bit more. With a Macbook, a little practice, and some patience, HTML can help us send information across the Internet to another website or computer, embed an entire other webpage into the one we're building, or even make text move horizontally across the screen at our desired pace. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee

HTML is an integral part of any website. Despite it's importance, without the help of it's two best buds in the whole world it's still pretty simple.

## CSS
CSS is what allows us to make a webpage look the way we want it to. 

By linking your HTML page up with a set of CSS rules, you can make your website conform to a more visually appealing standard than black text on white background. You can create large sweeping rules, like making all of the text bright shiny blue and the background a daring shade of magenta, or you can be more surgical and tell every element on the page specifically where to be and how to look.

Often we will use a hybrid approach, telling this section to look like this and this other section over here to have brighter text and a shadowy backdrop.

<!-- Discuss classes, id's? -->

## JavaScript

Javascript is what allows us to make a webpage move and think. If HTML is the bones, and CSS is the skin and hair, then JavaScript is the muscles, the heart, and the brain.

With Javascript, we can change almost every facet of our webpage based on just about anything. A JavaScript file has nearly complete control of the page that it is tied to. It can read from the page, and write to it as well. It can send information over to other pages. It can make things on the page move, or even make the user stop. 

**Oh**, the user!

Yes, JavaScript is generally where we start to think more deeply about the people who come to visit our websites. What sort of things are they going to want to do, and what should the webpage do in response? When they make a choice in that dropdown menu, it should probably close itself. When they click the **SIGN UP** button, that probably means they want to be taken to a screen that will accept their desired username and password. Oh, whoops! They clicked it by accident! That 'Return' button should probably remember where they came from and what they were doing.

JavaScript is certainly the most powerful of the three.

## Why not just one?

HTML really isn't smart enough to do everything on it's own, and CSS lacks the basic structure for it, but with the power and adaptability of JavaScript, we could write an entire webpage using only it and an HTML file that will accept it's utter dominance! So why all the fuss about the other two? 

Well, as you begin to work on bigger, cooler apps, you'll come to realize that things can get messy fast. Without separating the responsibilities out into different and distinct places, you will end up with a massive behemoth of a (java)Script that no one, not even you, will ever want to work on. It's a bit like asking why we don't put all of our clothes into one big drawer instead of having separate ones for socks and shorts.

Do you really want to dig through all of it anytime you need anything? For the very same reasons, I'd rather go to the CSS file if I want to make a style change.

## Version Control

<!-- I guess I can't really explain it very well except by analogy and example -->

Cleanliness and order are important when it comes to building anything, and the same is especially true when you're building software. Only *one* person can put in any *one* nail at the construction site, but on a dev team we could all be holding the same nailgun, fixing up the same spot in a myriad of different ways.

When we go to compare our work, we'll want to see who punched in that proverbial nail at the most perfect angle, the angle that will ensure it's position in this proverbial wall for as long as possible and without producing any chipping or fractures in the future.

In this analogy, the wall is our program and the nail is the update you've made it to it. We want to ensure that we get the best version of that update, the one which is least likely to produce bugs rather than just whichever one is sent to the website last. Version control gives us a way to do that.

When we go to compare our work, we realize that our top developer Sam found a bug that would have been produced by every other person's solution. Everyone claps Sam on the back and says "Great job!", and everyone agrees to push Sam's changes into the new update! 

"But wait!", Laura cries with the fierce determination she is known for when faced with a bug to be squashed, "he missed this one!"

The team goes over Laura's changes once more and realizes that yes, she also found a possible bug, and dealt with it handily! There is an uproar of applause as the project manager schedules a celebratory lunch and Sam and Laura briefly discuss who should go about combining the two sets of changes. Laura volunteers, as she has gotten through a lot of bugs today and is feeling even more daring than usual. She downloads Sam's version of the project, and adds the parts of his that avoid a bug to all of her changes.

Just like that, we've ensured that the newest update has all of the best parts of all of our changes, without any overlapping changes, and while producing the fewest possible bugs. 
