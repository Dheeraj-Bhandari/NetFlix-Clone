import navbarnew from "../Components/navbarnew.js";
import footernew from "../Components/footernew.js";


document.getElementById('main-header').innerHTML = navbarnew;
document.getElementById('footer').innerHTML = footernew;



const apiKey = '9e997fe8c2efd000188bc88e3dda6d23';
const youtubeApiKey = 'AIzaSyC7bWr31DArqVECDyRJbH-g106fKypGKRE'
// const youtubeApiKey = 'AIzaSyBa770uGbngfNCOB2sg8ykjuXkWTGFZTxs'
const apiEndPoint = 'https://api.themoviedb.org/3'
const imgPath = "https://image.tmdb.org/t/p/original"
const apiPath = {
    fetchAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`,
    fecthTrending: `${apiEndPoint}/trending/all/week?api_key=${apiKey}&language=en-US`,
    fetchMoviesList: (id) => `${apiEndPoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
    fecthMovie: (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
    fecthTvshow: (id) => `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`,
    fecthSimilarMovie: (id) => `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`,
    fecthSimilarTVShow: (id) => `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${apiKey}&language=en-US&page=1`,
    fecthCrewDetails: (id) => `${apiEndPoint}/movie/${id}/credits?api_key=${apiKey}&language=en-US`,
    fecthTvShowCrewDetails: (id) => `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}&language=en-US`,
    searchMovieTraileronYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${youtubeApiKey}`,
    fecthRecommendedMovie : (id)=> `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`

}

fecthMovie();
async function fecthMovie() {
    const moviedetals = localStorage.getItem('movieId');

    const res = await fetch(apiPath.fecthMovie(moviedetals));
    const data = await res.json();
    const crewres = await fetch(apiPath.fecthCrewDetails(moviedetals));
    const crewdata = await crewres.json();
    console.log(data);
    console.log(crewdata);


    if (Array.isArray(crewdata.cast) && crewdata.cast) {

        const res = await fetch(apiPath.fecthMovie(moviedetals));
        const data = await res.json();


        const crewres = await fetch(apiPath.fecthCrewDetails(moviedetals));
        const crewdata = await crewres.json();

        const similarMovieres = await fetch(apiPath.fecthSimilarMovie(moviedetals));
        const similarMovieData = await similarMovieres.json();
        const cast = crewdata.cast.filter(function(ele){
            return ele.profile_path!=null
        })
        appenddataMovieSection(data, cast);
        appendVideo(data);
        appenddataCrewSection(data, cast);
        movieLikeThisSection(similarMovieData.results,'MovieLikeThisSection');
    //     console.log("yes is arary")
    //     console.log(data);
    //     console.log(cast);
    //     console.log(similarMovieData.results);
    }
    else {
        console.log("Inside Tv Show Condition")

        const similarMovieres = await fetch(apiPath.fecthSimilarTVShow(moviedetals));
        const similarMovieData = await similarMovieres.json();

        const res = await fetch(apiPath.fecthTvshow(moviedetals));
        const data = await res.json();


        const crewres = await fetch(apiPath.fecthTvShowCrewDetails(moviedetals));
        const crewdata = await crewres.json();

        const cast = crewdata.cast.filter(function(ele){
            return ele.profile_path!=null
        })

        // console.log(data);
        // console.log(cast);
        appenddataMovieSection(data, cast);
        appendVideo(data);
        appenddataCrewSection(data, cast);
        movieLikeThisSection(similarMovieData.results,'MovieLikeThisSection');
        // console.log(similarMovieData.results);
    }


}


function appenddataMovieSection(data, cast) {
    if(cast.length<2) return;
    const videoSectiondata = `
  
    <div id="videoSection" style="background-image: url(${imgPath}${data.backdrop_path});">
                <div class="movieimg">
                    <img class="movieImg"
                        src="${imgPath}${data.poster_path}" alt="Movie Poster">
                </div>
                <div class="movieDetails">
                    <div class="movenameandType">
                        <h1>${data.title || data.original_name}</h1>
                        <h3>${data.release_date || data.first_air_date} (${data.original_language}) <br> Action, Adventure,
                         Thriller, Adventure  <br> RunTime || Episodes ${data.runtime || data.number_of_episodes} MIN || Episodes</h3>
                    </div>
                    <div class="addToWacthList">
                        <i id="${data.id}"  onclick="saveToMyList(${data.id})" class="fa-solid fa-lg fa-heart"></i>
                        <span onclick = "playfullscreentrailer()" ><i class="fa-solid fa-lg  fa-play"></i> Play Trailer</span>
                    </div>
    
                    <div class="movieOverView">
                        <h2>Overview</h2>
                        <h3>${data.overview}</h3>
                        <br>
                        <h2>Lead Cast</h2>
                    </div>

                    <div class="movieDirectorName">
                        <div class="directorNmae">
                            <p>${cast[0].original_name}</p>
                            <p>${cast[0].character}</p>
                        </div>
                        <div class="screenplay">
                            <p>${cast[1].original_name}</p>
                            <p>${cast[1].character}</p>
                        </div>
                    </div>
    
                </div>
            </div>
    `

    document.getElementById('videoSectionParentDiv').innerHTML = videoSectiondata;
}

function appendVideo(data) {
    const movieName = data.title || data.original_name;
    
    if (!movieName) return;

    fetch(apiPath.searchMovieTraileronYoutube(movieName))
        .then(res => res.json())
        .then(res => {
            console.log(res.items[0]);
            const VideoId = res.items[0];
            const youtubeUrl = `https://www.youtube.com/watch?v=${VideoId.id.videoId}`
            console.log(youtubeUrl);
            // window.open(youtubeUrl, '_blank')
            const iframelement = document.getElementById('iframe')
            iframelement.src = `https://www.youtube.com/embed/${VideoId.id.videoId}?autoplay=1&mute=1`
            localStorage.setItem('curTrailerVideosrc', `https://www.youtube.com/embed/${VideoId.id.videoId}?autoplay=1&mute=0`);
            console.log(iframelement.src)
        }).catch(err => console.log(err))


}

function appenddataCrewSection(data, cast) {
    const min = Math.min(cast.length, 15);

    for (var i = 0; i < min; i++) {

        const crewDatacard = `
            <div class="profile">
                    <img src="${imgPath}${cast[i].profile_path}" alt="${cast[i].original_name} avatar">
                    <p>${cast[i].original_name}</p>
                    <p>${cast[i].character}</p>
                </div>
            `

        const div = document.createElement('div');
        div.className = 'profile';
        const img = document.createElement('img');
        img.src = `${imgPath}${cast[i].profile_path}`;

        const p1 = document.createElement('p');
        p1.innerText = `${cast[i].original_name}`

        const p2 = document.createElement('p');
        p2.innerText = `${cast[i].character}`

        div.append(img, p1, p2);

        document.getElementById('castsection').append(div);
    }


}

function movieLikeThisSection(data, section) {


    data.slice(0, 10).map((data) => {
        const div = document.createElement('div');
        div.className = 'movie';
        const img = document.createElement('img');
        img.src = `${imgPath}${data.backdrop_path}`;
        img.alt = "Movie img"
        img.addEventListener('click', function () {

            console.log(data.id);
            localStorage.setItem('movieId', data.id);

            location.reload();
        })
        div.append(img);

        document.getElementById(section).append(div);
    })


}

async function fecthRecommendedMovie(){
    const moviedetals = localStorage.getItem('movieId');

    const res = await fetch(apiPath.fecthRecommendedMovie(moviedetals));
    const data  = await res.json();
    movieLikeThisSection(data.results,'recoomendedMovie')
    console.log('rec',data);
}fecthRecommendedMovie()

// navbar js

// window.addEventListener('load', function () {

//     window.addEventListener('scroll', function () {
//         //header color update
//         const header = document.getElementById('header');
//         if (window.screenY > 5) header.classList.add('black-bg')
//         else header.classList.remove('black-bg')
//     })

// })

// window.addEventListener('keypress', function(e){
//     if('key'=='Enter'){
//         console.log("Enter")
//     }
// })
window.playfullscreentrailer = playfullscreentrailer;
function playfullscreentrailer(){
    const iframsrcLS = localStorage.getItem('curTrailerVideosrc');
    console.log('inside func')
    const frame = `
     <iframe id="iframe" src="${iframsrcLS}" style="position:fixed; top:0; left:0; bottom:0; right:0;
             width:100%; height:100%; border:none; margin:0; padding:0; overflow:visible; autoplay=1;">`
             document.getElementById('video').innerHTML=frame;
            const div = document.createElement('div');
            const btn = document.createElement('button');
            div.id = "ExitTrailerBtn"
            btn.innerText ="Exit"
            div.append(btn);
           
    document.getElementById('video').append(div);
    document.addEventListener('keydown', (event) => {
        if(event.key=='Escape'){
          const frame =   `<iframe id="iframe" width="800" height="500" src="${iframsrcLS}">
            </iframe>`
            // document.getElementById('video').innerHTML=null;
            // console.log("Inside")
            // alert("Escape")
            document.getElementById('video').innerHTML=frame;
        }
      }, false);
}


window.saveToMyList= saveToMyList;
const saveListItems = JSON.parse(localStorage.getItem("SavedList")) || [];
function saveToMyList(id){
    if(!saveListItems.includes(id)){
        saveListItems.push(id);
        localStorage.setItem('SavedList', JSON.stringify(saveListItems));
    }
    const button   = document.getElementById(id);
    // const i = `<i class="fa fa-check" aria-hidden="true"></i>`;

    // button.innerHTML =null;
    // button.innerHTML=i;
    button.className='fa fa-check'
    
    console.log(saveListItems);

}