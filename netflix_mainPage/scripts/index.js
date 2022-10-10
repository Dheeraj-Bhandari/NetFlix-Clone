import { navbar } from "../components/navbar.js";
document.getElementById("header").innerHTML = navbar;


const api_key = "c711fb267186115e70fda43ea1f1972c";
const api_Endpoint = "https://api.themoviedb.org/3";
const imgPath = `https://image.tmdb.org/t/p/original/`;
const api_path = {
    fetchAllCategories: `${api_Endpoint}/genre/movie/list?api_key=${api_key}`,
    fetchMovieList: (id) => `${api_Endpoint}/discover/movie?api_key=${api_key}&with_genres=${id}`
}

function showData() {
    fetchAndBuildSections();
}

function fetchAndBuildSections() {
    fetch(api_path.fetchAllCategories)
    .then(res => res.json())
    .then(res => {
        const categories = res.genres;
        if(Array.isArray(categories) && categories.length) {
            categories.forEach(category => {
                fetchAndBuildMovieSection(
                    api_path.fetchMovieList(category.id),
                    category)
            })
        }
        
    }).catch(err => console.log(err));
}

function fetchAndBuildMovieSection(fetchurl, category) {
    console.log(fetchurl, category)
    return fetch(fetchurl)
    .then(res => res.json())
    .then(res => {
        // console.table(res.results);
        const movies = res.results;
        if(Array.isArray(movies) && movies.length) {
            buildMovieSection(movies, category.name);
        }
       return movies;
    }).catch(err => console.log(err));
}

function buildMovieSection(list, categoryName) {
    console.log(list, categoryName);
    const moviesCont = document.getElementById('movie_cont');

    const movieListHtml = list.map(item => {
        return `<img class = "movie_item" src = "${imgPath}${item.backdrop_path}" alt="">`
    }).join(' ');
    const movieSectionHtml = `
    
        <h2 class = "section-heading">${categoryName}</h2>
        <div class = "movie-row">
        ${movieListHtml}
        </div>`
    
    
    const div = document.createElement('div');
    div.className = "movies-section";
    div.innerHTML = movieSectionHtml;

    moviesCont.append(div);
    
}
window.addEventListener('load', function() {
    showData();
});
