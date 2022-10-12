import { navbar } from "../components/navbar.js";
document.getElementById("header").innerHTML = navbar;


const api_key = "c711fb267186115e70fda43ea1f1972c";
const api_Endpoint = "https://api.themoviedb.org/3";
const imgPath = `https://image.tmdb.org/t/p/original/`;
const api_path = {
    fetchAllCategories: `${api_Endpoint}/genre/movie/list?api_key=${api_key}`,
    fetchMovieList: (id) => `${api_Endpoint}/discover/movie?api_key=${api_key}&with_genres=${id}`,
    fecthTrending: `${api_Endpoint}/trending/all/week?api_key=${api_key}&language=en-US`,
}

function showData() {
    fecthTrendingMovies();
    fetchAndBuildSections();
}


function fecthTrendingMovies(){
    fetchAndBuildMovieSection(api_path.fecthTrending, 'Trending Now')
    .then(list =>{
        const randomIndex = parseInt(Math.random() * list.length);
        buildBannerSection(list[randomIndex]);
    }).catch(err =>{
        console.error(err)
    });
}

function buildBannerSection(movie){
    const bannercont = document.getElementById('banner-section');
    bannercont.style.backgroundImage = `url(${imgPath}${movie.backdrop_path})`

    const div = document.createElement('div');
    div.innerHTML = `
   
            <h2 class="banner_title">${movie.title}</h2>
            <p class="bannerInfo">Trending in Movies | Rating - ${movie.vote_average}</p>
            <p class="banner_overview">${movie.overview && movie.overview.length>200 ? movie.overview.slice(0,200).trim()+"...": movie.overview}</p>
            <div class = "action-button-cont">
            <button class = "action-btn"><svg width="24" height="24" viewBox="0 -3 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>PLAY</button>
            <button class = "action-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg>More Info</button>
       
            </div>
      
    `;
    div.className = 'banner-content container';
    bannercont.append(div);
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
                    category.name)
            })
        }
        
    }).catch(err => console.log(err));
}

function fetchAndBuildMovieSection(fetchurl, categoryName) {
    // console.log(fetchurl, categoryName)
    return fetch(fetchurl)
    .then(res => res.json())
    .then(res => {
        // console.table(res.results);
        const movies = res.results;
        if(Array.isArray(movies) && movies.length) {
            buildMovieSection(movies, categoryName);
        }
       return movies;
    }).catch(err => console.log(err));
}

function buildMovieSection(list, categoryName) {
    // console.log(list, categoryName);
    const moviesCont = document.getElementById('movie_cont');

    const movieListHtml = list.map((item) => {
    console.log(item) ;
    return `<img class = "movie_item" src = "${imgPath}${item.backdrop_path}" alt="">
            <button id = "wishList" onclick = "addToWishList(${item.id})">Add to Wishlist</button>` 
    // const img = document.createElement("img");
    // img.setAttribute("class","movie_item"
    // img.setAttribute("src", "${imgPath}${item.backdrop_path}");
    // return img;
    
    });
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
const wishList = JSON.parse(localStorage.getItem("wishList")) || [];
window.addToWishList = addToWishList;


function addToWishList(data) {
    wishList.push(data);
    localStorage.setItem("wishList", JSON.stringify(wishList));
    // location.href = "list.html";
}


window.addEventListener('load', function() {
    showData();
    window.addEventListener('scroll', function(){
        const header = document.getElementById('header');
        if(window.screenY > 5) header.classList.add('black-bg')
        else header.classList.remove('black-bg')
    })

});

