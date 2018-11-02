import $ from 'jquery';

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

$('#a-button-that-deletes').click((e) => {
    e.preventDefault();

});

$('#a-button-that-works').click((e) => {
    e.preventDefault();
    let movieName = $('#movie-title').val();
    let stars = $('#star-rating').val();
    const movieData = {
        title: movieName,
        rating: stars,
        id: movies.length + 1
    };
    const newMovie = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(movieData)
    };
    const updateMovie = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(movieData)
    };
    getMovies()
        .then(data => data.find(movie => movie.title === movieName)).then(data => {
        if (data.length === 0) {
            fetch('/api/movies', newMovie).then();
        } else {
            fetch(`/api/movies/${data.id}`, updateMovie).then();
        }
    });
});

for (let movie of movies) {
    $('#movies').append(`<option value="${movie.id}">${movie.title}</option>`);
}

$('#movies').change(() => {
    getMovies()
        .then(data => data.find(({id}) => id.toString() === $('#movies').val()))
        .then(data => {
            $('#movie-title').val(data.title);
            $('#star-rating').val(`${data.rating}`);
        });
});

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