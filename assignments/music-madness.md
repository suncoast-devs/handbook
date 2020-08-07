---
title: Music Madness
tags: ['javascript', 'react']
---

For tonight, I want you to show off what you favorite music is. You will be creating a multiple page app, using react-router.

## Objectives

- Create a SPA, with a few pages
- Deploying your website

## Requirements

- Build a website that has 4 pages.
  - One landing
  - One page for your each of your top three favorite bands.

### Setup

```shell
app-app --delta-hooks MusicMadness
```

### Explorer Mode

- [ ] Add `react-router-dom` to your project.
- [ ] Create a Landing page that displays a short description of all three of your bands
- [ ] Build 3 band pages, each on their own URL. These pages should have a
  - [ ] a band picture
  - [ ] band name
  - [ ] latest album information
- [ ] Each page should have a navigation bar that allows the user to browse from page to page
- [ ] Deploy your site

_TIP_: for Explorer mode focus on getting the router set up and linking up the pages to each other.

### Adventure Mode

- [ ] Add a JSON file to your application containing data about bands
- [ ] Use information in the URL to determine the band to render (from the data in the JSON file)

### Epic Mode

- [ ] Integrate with [Last.fm API](https://www.last.fm/api). This API has many features. Go crazy, the sky is the limit.

## Additional Resources

- [npm react-router-dom](https://www.npmjs.com/package/react-router-dom)
- `npm install --save react-router-dom`
