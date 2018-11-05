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
    let movieName = $('#movie-title').val();

    getMovies().then(data => data.find(movie => movie.title === movieName)).then(data => {
        const deleteMovie = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        fetch(`/api/movies/${data.id}`, deleteMovie).then();
    });
});

$('#a-button-that-works').click((e) => {
    e.preventDefault();
    let movieName = $('#movie-title').val();
    let stars = $('#star-rating').val();
    let movieData = {
        title: movieName,
        rating: stars,
        id: movies.length + 1
    };
    let newMovieData = {
        title: movieName,
        rating: stars,
        id: movies.length + 1,
        poster: "Movie-Poster-Template-Light-With-Image.jpg"
    };
    const newMovie = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newMovieData)
    };
    const updateMovie = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(movieData)
    };

    getMovies()
        .then(data => data.find(movie => movie.id.toString() === $('#movies').val())).then(data => {
        if (data === undefined) {
            fetch('/api/movies', newMovie).then();
        } else {
            fetch(`/api/movies/${data.id}`, updateMovie).then()
        }
    });
});


for (let movie of movies) {
    $('#movies').append(`<option value="${movie.id}">${movie.title}</option>`);
    if (movie.id === 1) {
    $('#movies-on-display').append(
        `<div class="carousel-item active">
                    <img class="d-block poster" src="img/${movie.poster}" alt="${movie.title}">
                    <div class="carousel-caption d-none d-md-block">
    <h5 class="text-light">${movie.title}</h5>
  </div>
                </div>`);
} else {
        $('#movies-on-display').append(`<div class="carousel-item">
                    <img class="d-block poster" src="img/${movie.poster}" alt="${movie.title}">
                    <div class="carousel-caption d-none d-md-block">
    <h5 class="text-light">${movie.title}</h5>
  </div>
                </div>`);
    }
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



