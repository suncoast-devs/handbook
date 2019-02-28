# A Picture is Worth 1,000 Words

Get to know React Router by building yourself a small photo gallery site.

## Objectives

- Adding dependencies to your React Project
- Navigating JSON data structures
- Using the React Router library
- Using parameters in React Router

## Requirements

Using the JSON data below as a starter, build a photo gallery app. Here's [an example](http://things-i-like.surge.sh/).

```JSON
{
  "pandas": {
    "title": "Panda Bears",
    "description": "Pandas are bears native to south-central China, and are objectively the cutest animals on earth.",
    "photos": [
      {
        "title": "Panda Waving",
        "imageURL": "https://cdn-images-1.medium.com/max/1600/1*i1vVm3EqqDIkyucD0079wg.jpeg",
        "sourceURL": "https://codeburst.io/pandas-for-data-stuff-code-challenge-7972207a8294"
      },
      {
        "title": "Großer Panda im Ocean Park, Hongkong",
        "imageURL":
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/2560px-Grosser_Panda.JPG",
        "sourceURL": "https://en.wikipedia.org/wiki/Giant_panda"
      }
    ]
  },
  "miniatures": {
    "title": "Miniature Painting",
    "description": "I enjoy painting miniatures. I've only been painting for about 6-months, here's some of my work.",
    "photos": [
      {
        "title": "Blood Rage, Ram Clan",
        "imageURL":
          "https://i.pinimg.com/originals/46/c5/d2/46c5d2b5785b25e4487abc0fbbc17f04.jpg",
        "sourceURL": "https://i.pinimg.com/originals/46/c5/d2/46c5d2b5785b25e4487abc0fbbc17f04.jpg"
      },
      {
        "title": "A powerful druid, protecting his land",
        "imageURL":
          "https://i.pinimg.com/originals/f9/7b/1a/f97b1a3a728540ee5468923047b58e0f.jpg",
        "sourceURL": "https://i.pinimg.com/originals/f9/7b/1a/f97b1a3a728540ee5468923047b58e0f.jpg"
      }
    ]
  }
}
```

Save this as a JSON file in your project and import it.

If you hot-link photos from the internet, be sure to include a valid link back to the source.

### Explorer Mode

- [ ] You should have at least 4 components: `App`, `CategoryList`, `PhotoList`, `PhotoDetail`.
- [ ] On the home page, your category list should render the title of each category and link using the key. For examples "Panda Bears" should link to `/pandas`
- [ ] Render each photo in the given category on the photo list page with a thumbnail sized version of your photos.
- [ ] Render a large version of the photo on the photo details page.

### Adventure Mode

- [ ] Customize the given data to include your own photos and categories.
- [ ] Add bread crumb navigation, as seen in the example.
- [ ] Add a thumbnail to the first photo in each category to the home page, as seen in the example.

### Epic Mode

- [ ] Find an external API for a photo sharing site (such as Flickr) and use data from the API rather than the given JSON file.

## Additional Resources

- [React Router Documentation](https://reacttraining.com/react-router/web/guides/quick-start)
