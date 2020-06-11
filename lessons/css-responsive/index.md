---
title: Introduction to Responsive Web
order: 1
---

Now that we can create a semantic web page, style it with CSS, and control it's
layout with CSS layout technologies this lesson will cover how to cope with the
reality that visitors to our page/application will use many different devices
that are different sizes, pixel densities, and pehaps even with different
capabilities.

Being able to _respond_ to these differences while maintaining a single code
base gives us the best change of providing all our users the best experience.

## Learning Objectives

- Creating a mobile-first design
- Creating a responsive design
- Using media queries to build responsive; mobile first UIs.

## Why?

For Web developers, it is now fairly common to be called upon to create a Web
site or app that changes its user interface depending on the browser or device
accessing the site to provide an optimized experience. One approach to this is
to create different versions of your site/app for different platforms or
browsers and serve them appropriately after detecting which browser or platform
is looking at your site. But this is increasingly inefficient: browser sniffing
is inherently error prone, and maintaining multiple copies of your code can turn
out to be a nightmare.

It is usually much better to create a single version of your code which doesn't
care about what browser or platform is accessing the site. This tends to be
termed responsive design or adaptive design, two related but different
approaches. For a discussion on the differences between the two, read
[Responsive design versus adaptive design](https://developer.mozilla.org/en-US/docs/Archive/Apps/Design/UI_layout_basics/Responsive_design_versus_adaptive_design).

There are disadvantages to this approach as well. If the content, layout, and
functionality need to change greatly for different devices, it may not be such a
good approach. Also, taking an existing site and adding responsiveness to it, to
make it mobile/tablet friendly, can be a lot more effort than just creating a
separate mobile site or app, especially if it is a sprawling enterprise site.

---
