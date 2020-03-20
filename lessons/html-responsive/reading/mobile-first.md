import CodePen from '@handbook/CodePen'

# Mobile First

You may think that concentrating on the mobile experience first sounds pointless, as we are more used to dealing with desktop sites, and we surely need to consider the full gamut of features for the overall experience across desktop, mobile, etc., before then paring it down to a mobile experience that is simpler, more streamlined, or whatever. This rings true, yes, but in our experience mobile first is more about having the mobile implementation as a default layer to build on.

We should also consider that the web is increasingly dominated by mobile devices. Tablets and smartphones are becoming the primary device by which many users browse the web. If we are considering the international market for our web applications and sites we should also consider that in many parts of the world, a smartphone or tablet is the only computing device many people own.

---

# Why Mobile First?

We consider the overall experience during the planning stage, look at what subset of features will be available on mobile, desktop, etc. in tandem and how they will be implemented. Then at implementation stage, we present the mobile layout and functionality as the default configuration provided, before additional information is loaded on top of that, whenever appropriate.

This has many technical advantages, which we will present in a moment, but it also has a planning, project management, and psychological impact as well. By developing on a smaller device we are forced to prioritize and focus on the most core features of our application. When we consider that many applications are developed in an agile methodology and perhaps focus on the concept of [MVP - Minimum Viable Product](https://www.agilealliance.org/glossary/mvp/) developing for the small screen first makes sense. We will be less inclined to throw in every feature to the initial implementation. Perhaps, as we develop the app, we will discover that some features, functions, or entire pages aren't even needed.

There are some technical impacts to consider as well. If we do not load assets and code that the device does not need we are more likely to present a site that feels _faster_ to the user. This also lowers the impact on our servers and our bandwidth. It also saves the user's bandwidth, memory, and power. For mobile users that might be on a restrictive connection, that is a win.

# Embrace Constraints

Anyone who has ever tried to enter data into a form on a mobile device, or even just navigated around a complex site, knows this well. This is why we should try to simplify things on mobile, keeping each view cut down to a single, simple purpose where possible, and reducing the amount of typing users are expected to do. The latter will please desktop users as well as mobile users!

On top of everything else, you have to consider the kinds of situations mobile devices will be used in, and the kinds of tasks users most commonly want to perform on mobiles. A phrase you'll read in a few places is "one eyeball, one thumb", referring to how much of the user's attention you are likely to have. Of course, your users will be concentrating on what they're doing, but they are likely to be in a car with bad lighting, or in a noisy bar with the sport on TV in the background! You need to consider this, and again make sure your content/functionality is simple, legible and distraction-free as much as possible.

When developing mobile app layouts, you often run into problems with navigation menus. The concept is the same regardless of the target device — you want to provide a mechanism for users to search for things and get to different views/pages of the application — but because mobile screens are so much smaller, a reasonable desktop navigation can spoil the experience by filling up most of the initial view of the app, covering up the content.

---

import Nav from './Nav'

<Nav/>
