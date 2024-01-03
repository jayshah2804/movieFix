# MOVIEFIX

In the project directory, you can run:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## List of Requirement that I have covered

- Implemented smooth scrolling behavior to load movies in both the direction
- When user is scrolling, added the loading spinner in both the direction and while in image is loading, added Shimmer UI for better UX
- Upon clicking on filters, movies are getting filtered based on Genre
- Upon hovering on any movie's image, it will be popped up a bit and show the information like, movie name, duration, type, popularity
- Made a searchbox in which user can search any movie name, it will also load infinitly as the user scrolls down
- Implemented the concept of debouncing in searchnig, API call will not be made if the time between two key press is less than 500ms
- Implemented caching mechanism while searching. If the user is searching for the same keyword again, then the data will be returned from the cache
