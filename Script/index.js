import navbar from "../Components/navbar.js";

document.getElementById('header').innerHTML = navbar;

const apiKey = '9e997fe8c2efd000188bc88e3dda6d23';
const youtubeApiKey = 'AIzaSyC7bWr31DArqVECDyRJbH-g106fKypGKRE'
const apiEndPoint = 'https://api.themoviedb.org/3'
const imgPath = "https://image.tmdb.org/t/p/original"
const apiPath = {
    fetchAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`,
    fecthTrending: `${apiEndPoint}/trending/all/week?api_key=${apiKey}&language=en-US`,
    fetchMoviesList: (id) => `${apiEndPoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
    searchMovieTraileronYoutube :(query)=> `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${youtubeApiKey}`
}


//For boosting the app
function init() {
    fecthTrendingMovies();
    fecthAndBuildAllSection();
}

function fecthTrendingMovies(){
    fecthAndbuildMovieSection(apiPath.fecthTrending, 'Trending Now')
    .then(list=>{
        const randomMInd = parseInt(Math.random()*list.length);
        buildBannerSection(list[randomMInd]);
    }).catch(err=>{
        console.error(err)
    });
}

function buildBannerSection(movie){
    const bannercont = document.getElementById('banner-section');
    bannercont.style.backgroundImage = `url(${imgPath}${movie.backdrop_path})`

    const div = document.createElement('div');
    div.innerHTML = `
   
            <h2 class="banner-title">${movie.title}</h2>
            <p class="banner-info">Trending in Movies | Rating - ${movie.vote_average}</p>
            <p class="banner-overview">${movie.overview && movie.overview.length>200 ? movie.overview.slice(0,200).trim()+"...": movie.overview}</p>
            <div class="action-button-cont">
                <button class="action-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard">
                        <path
                            d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                            fill="currentColor"></path>
                    </svg>&nbsp;&nbsp; Play</button>
                <button class="action-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                            fill="currentColor"></path>
                    </svg>&nbsp;&nbsp;More info</button>
            </div>
      
    `;
    div.className = 'banner-content container';
    bannercont.append(div);
}


function fecthAndBuildAllSection() {
    fetch(apiPath.fetchAllCategories)
        .then(res => res.json())
        .then(res => {
            const categories = res.genres;
            if (Array.isArray(categories) && categories.length) {
                categories.slice(0, 3).forEach(category => {
                    fecthAndbuildMovieSection(apiPath.fetchMoviesList(category.id), category.name);
                })
            }
            // console.table(movies);
        })
        .catch(err => console.log(err));
}

function fecthAndbuildMovieSection(fecthUrl, categoryName) {
    console.log(fecthUrl, categoryName);
    return fetch(fecthUrl)
        .then(res => res.json())
        .then(res => {
            // console.table(res.results)
            const movies = res.results;
            if(Array.isArray(movies) && movies.length){
                buildMovieSection(movies.slice(0,9), categoryName);
            }
            return movies;
        })
        .catch(err => console.log(err));
}

// function buildMovieSection(list,categoryName){
// console.log(list, categoryName);
// const movieCont = document.getElementById("movies-cont");
// const moviesListHtml = list.map(item=>{
//     // onmouseenter="searchMovieTrailer('${item.title} trailer','yt${item.id}')"
//     return `
//     <div class="movie-item"  >
//         <img  class="movie-item-img"  src="${imgPath}${item.backdrop_path}" alt="${item.title}" />
//         <iframe  width="245" height="150" src="" id="yt${item.id}" ></iframe>
//         </div>
       
//     `;
// }).join('');

// const movieSectionHtml = `
// <h2 class="movie-section-heading" >${categoryName}<span class="explore-nudge">Explore All</span> </h2>
// <div class="movies-row">
//    ${moviesListHtml}
// </div>
// `;

// const div = document.createElement('div');
// div.className = 'movie-section'
// div.innerHTML = movieSectionHtml;

// movieCont.append(div);

// // console.log(movieSectionHtml);

// }
function buildMovieSection(list,categoryName){
    console.log(list, categoryName);
    const movieCont = document.getElementById("movies-cont");
    const moviesListHtml = list.map(item=>{
        // onmouseenter="searchMovieTrailer('${item.title} trailer','yt${item.id}')"
        // onmouseenter="changebackgifonhover()"
        // onmouseover="changebackgifonhover(coverid${item.id})"
        return `
        <div class="square one">
                    <div class="cover" id="cover"  >
                    <img  id="coverid${item.id}" src="${imgPath}${item.backdrop_path}" alt="${item.title}" />
                    </div>
                    <div class="text">
                        <div id="texticon">
                            <div id="textfirst3icon">
                                <button><i class="fa-1x fa-solid fa-play"></i></button>
                                <button><i class="fa-1x fa-plus" aria-hidden="true"></i></button>
                                <button><i class="fa-1x fa-solid fa-thumbs-up"></i></button>
                            </div>
                            <div id="textlasticon">
                                <button onclick="MovieDetailsPage(${item.id})"><i class="fa-1x fa-solid fa-arrow-down"></i></button>
                            </div>
                        </div>
        
        
                        <div id="textcontent">
                            <div id="textp"><span>97% Match</span>
                                <p> &nbsp U/A 13+ 3 Season</p>
                            </div>
                            <div id="itemgenres">
                                <p>Quirky. Feel-Good. Teen</p>
                            </div>
                        </div>
                    </div>
                </div>
           
        `;
    }).join('');
    
    const movieSectionHtml = `
    <h2 id="movieh3" >${categoryName}<span class="explore-nudge">Explore All</span> </h2>
    <div id="movieRow">
       ${moviesListHtml}
    </div>
    `;
    
    const div = document.createElement('div');
    div.id = 'movieSection'
    div.innerHTML = movieSectionHtml;
    
    movieCont.append(div);
    
    // console.log(movieSectionHtml);
    
    }



function searchMovieTrailer(movieName, iframeId){
    console.log(document.getElementById(iframeId), iframeId);
    if(!movieName) return;

    fetch(apiPath.searchMovieTraileronYoutube(movieName))
    .then(res=>res.json())
    .then(res=>{
        console.log(res.items[0]);
        const VideoId = res.items[0];
        const youtubeUrl = `https://www.youtube.com/watch?v=${VideoId.id.videoId}`
        console.log(youtubeUrl);
        // window.open(youtubeUrl, '_blank')
       const iframelement  = document.getElementById(iframeId)
       iframelement.src = `https://www.youtube.com/embed/${VideoId.id.videoId}?autoplay=1&mute=1`
    }).catch(err=>console.log(err))
}

window.addEventListener('load', function () {
    init();
   window.addEventListener('scroll', function(){
        //header color update
        const header = document.getElementById('header');
        if(window.screenY>5) header.classList.add('black-bg')
        else header.classList.remove('black-bg')
    })

})


document.getElementById('brandlogo').addEventListener('click', function(){
    location.reload();
})




window.MovieDetailsPage= MovieDetailsPage;
window.changebackgifonhover= changebackgifonhover;

function MovieDetailsPage(id){
    localStorage.setItem('movieId', id);
    console.log(id);
    location.href = "/Pages/Detail_Page.html"
}

// function changebackgifonhover(itemid){
    
//     itemid.src = 'https://img.buzzfeed.com/buzzfeed-static/static/2021-07/22/16/enhanced/5cdbc5809df1/anigif_enhanced-8810-1626970483-2.gif'
//     // element.style.background = 'url(https://img.buzzfeed.com/buzzfeed-static/static/2021-07/22/16/enhanced/5cdbc5809df1/anigif_enhanced-8810-1626970483-2.gif)';
// }