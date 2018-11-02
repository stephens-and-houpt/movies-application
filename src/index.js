/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
import {getMovies} from './api.js';
import {movies} from '../db.json';


const movieData = {
    title: 'Star Wars - Return of the Jedi',
    rating: '5',
    id: movies.length + 1
};

const newMovie = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(movieData)
};


(fetch('/api/movies', newMovie)).then();


getMovies().then((movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`)
  })
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);

});


// const postNewMove = (newMovie) =>

// fetch('../db.json', newMovie).then( data => data.json()).then(data => console.log(data));