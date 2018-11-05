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

const makeTableHTML = (movie) => {
    $('#table-content').append(`<tr>`);
    $('#table-content').append(`<td>${movie.title}</td>`);
    switch (movie.rating) {
        case("5"):
            $('#table-content').append(`<td><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>`);
            break;
        case("4"):
            $('#table-content').append(`<td><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>`);
            break;
        case("3"):
            $('#table-content').append(`<td><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>`);
            break;
        case("2"):
            $('#table-content').append(`<td><i class="fas fa-star"></i><i class="fas fa-star"></i></td>`);
            break;
        default:
            $('#table-content').append(`<td><i class="fas fa-star"></i></td>`);
            break;
    }
    switch (movie.genre) {
        case("Horror"):
            $('#table-content').append(`<td><i class="fas fa-ghost"></i></td></tr>`);
            break;
        case("Romance"):
            $('#table-content').append(`<td><i class="fas fa-heart"></i></td></tr>`);
            break;
        case("Sci-fi"):
            $('#table-content').append(`<td><i class="fas fa-user-astronaut"></i></td></tr>`);
            break;
        case("Musical"):
            $('#table-content').append(`<td><i class="fas fa-music"></i></td></tr>`);
            break;
        case("Family"):
            $('#table-content').append(`<td><i class="fas fa-users"></i></td></tr>`);
            break;
        case("Documentary"):
            $('#table-content').append(`<td><i class="fas fa-landmark"></i></td></tr>`);
            break;
        case("Western"):
            $('#table-content').append(`<td><i class="fas fa-horse"></i></td></tr>`);
            break;
        case("Action"):
            $('#table-content').append(`<td><i class="fas fa-fist-raised"></i></td></tr>`);
            break;
        case("Comedy"):
            $('#table-content').append(`<td><i class="fas fa-grin-squint-tears"></i></td></tr>`);
            break;
        case("Drama"):
            $('#table-content').append(`<td><i class="fas fa-theater-masks"></i></td></tr>`);
            break;
        default:
            $('#table-content').append(`<td><i class="fas fa-globe"></i></td></tr>`);
            break;
    }
};

$('#a-button-that-works').click((e) => {
    e.preventDefault();
    let movieName = $('#movie-title').val();
    let stars = $('#star-rating').val();
    let genre = $('#genre').val();
    let movieData = {
        title: movieName,
        rating: stars,
        genre,
        id: movies.length + 1
    };
    let newMovieData = {
        title: movieName,
        rating: stars,
        id: movies.length + 1,
        genre,
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
            $('#genre').val(`${data.genre}`);
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

$('#table-content').html(`
    <tr>
        <td><img src="img/Disk-1s-200px.svg" alt="loading"></td>
        <td><img src="img/Disk-1s-200px.svg" alt="loading"></td>
        <td><img src="img/Disk-1s-200px.svg" alt="loading"></td>
    </tr>`);
$('#table-content').html("");
for (let movie of movies) {
    makeTableHTML(movie);
}


$('#title-sort').click(function () {
    $('#table-content').html(`
    <tr>
        <td><img src="img/Disk-1s-200px.svg" alt="loading"></td>
        <td><img src="img/Disk-1s-200px.svg" alt="loading"></td>
        <td><img src="img/Disk-1s-200px.svg" alt="loading"></td>
    </tr>`);
    getMovies().then(data => data.sort(data.title)).then(movies => {

        movies.sort(function(a, b){
            var x = a.title.toLowerCase();
            var y = b.title.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        $('#table-content').html("");
        for (let movie of movies) {
            makeTableHTML(movie);
        }
    });
});

$('#rating-sort').click(function () {
    $('#table-content').html(`
    <tr>
        <td><img src="img/Disk-1s-200px.svg" alt="loading"></td>
        <td><img src="img/Disk-1s-200px.svg" alt="loading"></td>
        <td><img src="img/Disk-1s-200px.svg" alt="loading"></td>
    </tr>`);
    getMovies().then(data => data.sort(data.title)).then(movies => {

        movies.sort(function(a, b){
            var x = a.rating.toLowerCase();
            var y = b.rating.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        $('#table-content').html("");
        for (let movie of movies) {
            makeTableHTML(movie);
        }
    });
});

$('#genre-sort').click(function () {
    $('#table-content').html(`
    <tr>
        <td><img src="img/Disk-1s-200px.svg" alt="loading"></td>
        <td><img src="img/Disk-1s-200px.svg" alt="loading"></td>
        <td><img src="img/Disk-1s-200px.svg" alt="loading"></td>
    </tr>`);
    getMovies().then(data => data.sort(data.title)).then(movies => {

        movies.sort(function(a, b){
            var x = a.genre.toLowerCase();
            var y = b.genre.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        $('#table-content').html("");
        for (let movie of movies) {
            makeTableHTML(movie);
        }
    });
});