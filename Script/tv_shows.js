import navbar from "../Components/navbar.js";



document.getElementById('header').innerHTML = navbar;
import footernew from "../Components/footernew.js";
document.getElementById('footer').innerHTML = footernew;


window.addEventListener('load', function () {
    init();
   window.addEventListener('scroll', function(){
        //header color update
        const header = document.getElementById('header');
        if(window.screenY>5) header.classList.add('black-bg')
        else header.classList.remove('black-bg')
    })

})


const apiKey = '9e997fe8c2efd000188bc88e3dda6d23';
const youtubeApiKey = 'AIzaSyC7bWr31DArqVECDyRJbH-g106fKypGKRE'
const apiEndPoint = 'https://api.themoviedb.org/3'
const imgPath = "https://image.tmdb.org/t/p/original"
const apiPath = {
    fetchAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`,
    fetchAllTVCategories: `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`,
    fecthTrending: `${apiEndPoint}/trending/all/week?api_key=${apiKey}&language=en-US`,
    fecthPopularTvShow :  `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`,
    fecthTopRatedTvShow :  `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`,
    fecthLatestTvShow :  `https://api.themoviedb.org/3/tv/latest?api_key=${apiKey}&language=en-US`,
    fetchMoviesList: (id) => `${apiEndPoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
    searchMovieTraileronYoutube :(query)=> `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${youtubeApiKey}`
}


//For boosting the app
function init() {
    // fecthTrendingMovies();
    fecthAndBuildAllTVSection();
}

// function fecthTrendingMovies(){
//     fecthAndbuildMovieSection(apiPath.fecthTrending, 'Trending Now')
//     .then(list=>{
//         const randomMInd = parseInt(Math.random()*list.length);
//         buildBannerSection(list[randomMInd]);
//     }).catch(err=>{
//         console.error(err)
//     });
// }



function fecthAndBuildAllTVSection() {
    fetch(apiPath.fetchAllTVCategories)
        .then(res => res.json())
        .then(res => {
            const categories = res.genres;
            if (Array.isArray(categories) && categories.length) {
                categories.forEach(category => {
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
                buildMovieSection(movies.slice(0,16), categoryName);
            }
            return movies;
        })
        .catch(err => console.log(err));
}

async function fecthTvShow(){
    const res = await fetch(apiPath.fecthPopularTvShow);
    const data = await res.json();

    const Topratedres = await fetch(apiPath.fecthTopRatedTvShow);
    const Toprateddata = await Topratedres.json();


    const Latestres = await fetch(apiPath.fecthTopRatedTvShow);
    const latestTvShowdata = await Latestres.json();
    console.log(data);
    buildMovieSection(latestTvShowdata.results.slice(0,16), 'Latest TV Show')
    buildMovieSection(data.results.slice(0,16), 'Popular On TV')
    buildMovieSection(Toprateddata.results.slice(0,16), 'Top Rated Tv Show')
}
fecthTvShow();

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
                                <button onclick="MovieDetailsPage(${item.id})" ><i class="fa-1x fa-solid fa-play"></i></button>
                                <button id="${item.id}" onclick="saveToMyList(${item.id})" ><i class="fa-1x fa-plus" aria-hidden="true"></i></button>
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
                                <p><span id='avgrating' >Avg Rating ${(item.vote_average).toFixed(1)}</span> Quirky. Feel-Good. Teen</p>
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
window.saveToMyList= saveToMyList;
// window.changebackgifonhover= changebackgifonhover;

function MovieDetailsPage(id){
    localStorage.setItem('movieId', id);
    console.log(id);
    location.href = "/Pages/Detail_Page.html"
}

const saveListItems = JSON.parse(localStorage.getItem("SavedList")) || [];
function saveToMyList(id){
    if(!saveListItems.includes(id)){
        saveListItems.push(id);
        localStorage.setItem('SavedList', JSON.stringify(saveListItems));
    }
    const button   = document.getElementById(id);
    const i = `<i class="fa fa-check" aria-hidden="true"></i>`;

    button.innerHTML =i;
    
    console.log(saveListItems);

    
   
}

// function changebackgifonhover(itemid){
    
//     itemid.src = 'https://img.buzzfeed.com/buzzfeed-static/static/2021-07/22/16/enhanced/5cdbc5809df1/anigif_enhanced-8810-1626970483-2.gif'
//     // element.style.background = 'url(https://img.buzzfeed.com/buzzfeed-static/static/2021-07/22/16/enhanced/5cdbc5809df1/anigif_enhanced-8810-1626970483-2.gif)';
// }