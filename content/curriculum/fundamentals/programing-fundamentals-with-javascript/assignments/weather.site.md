# Weather Site

Create a web site that allows a user to search for a location and gets that places weather. 

## Objectives

### Explorer Mode

- [ ] create a simple HTML page that has a text box and a search `button` 
- [ ] Allow the user to type in a place, click the search button, and , using `openweathermap.org`, get the current weather for that location
- [ ] display the weather to user by adding elements to the DOM. 
- [ ] allow the user to search by zip or city name


### Adventure Mode

- [ ] Using the HTML5 Geolocation API, search for the users current location when page loads
- [ ] Store the Users last search and pull it and search for the value on page load
- [ ] remove the need for teh search button and search when the user stops typeing. HINT: use setTimeout and the change event. to track when the user stops typing. 

### Epic Mode

- [ ] Add a type a head using Google Places API

## Turning In

Your homework will be assigned to you via `issues` on your `assignments` repository. Once you are

These steps will be followed for almost every assignment going forward. Once you've completed at least _explorer_ mode and you're satisfied with your work, let's get it published. First let's get it up on GitHub.

- First, let's add all our work to git, and ask it to commit it:

  ```sh
  git add .
  git commit -m "My first webpage"
  ```

  Feel free to replace _"My first webpage"_ with a more meaningful message.

- Push our local commits to GitHub:

  ```sh
  git push -u origin master
  ```

  The `-u` option tells git we want to making pushing the `master` branch to `origin` the default, so next time, we can just type `git push`.

- Now that our source code is up on GitHub, let's publish our page to [Surge](https://surge.sh). The command to do this has already been setup for you:

  ```sh
  yarn deploy
  ```

Once you are completely, go to the issue on our `assignments` repository, leave the link the repo of your work, and close the issue. I will not know you are down until you close the issue. 




## Additional Resources
