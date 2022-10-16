import navbarnew from "../Components/navbarnew.js";

document.getElementById('main-header').innerHTML = navbarnew

const apiKey = '9e997fe8c2efd000188bc88e3dda6d23';
// const youtubeApiKey = 'AIzaSyC7bWr31DArqVECDyRJbH-g106fKypGKRE'
const youtubeApiKey = 'AIzaSyBa770uGbngfNCOB2sg8ykjuXkWTGFZTxs'
const apiEndPoint = 'https://api.themoviedb.org/3'
const imgPath = "https://image.tmdb.org/t/p/original"
const apiPath = {
    fetchAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`,
    fecthTrending: `${apiEndPoint}/trending/all/week?api_key=${apiKey}&language=en-US`,
    fetchMoviesList: (id) => `${apiEndPoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
    SearchMovie : (value) => `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}`,
    multiSearchTVMOVIEPEOPLE:(value)=> `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${value}&page=1&include_adult=false`,
    searchMovieTraileronYoutube :(query)=> `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${youtubeApiKey}`,
    fecthTvshow: (id) => `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`,
}





// onclick="ShowTrailerVideoOnScreen('Black Adam')" 



window.MovieDetailsPage= MovieDetailsPage;
window.saveToMyList= saveToMyList;
window.myLikedMovie= myLikedMovie;



// Search Trailer

function searchMovieTrailer(movieName){
   console.log("Helo")
    // if(!movieName) return;

    fetch(apiPath.searchMovieTraileronYoutube(movieName))
    .then(res=>res.json())
    .then(res=>{
        console.log(res.items);
        const VideoId = res.items[1];
        const youtubeUrl = `https://www.youtube.com/watch?v=${VideoId.id.videoId}`
        console.log(youtubeUrl);
        // window.open(youtubeUrl, '_blank')
    //    const iframelement  = document.getElementById(iframeId)
    //    iframelement.src = `https://www.youtube.com/embed/${VideoId.id.videoId}?autoplay=1&mute=1`
       playfullscreentrailer(`https://www.youtube.com/embed/${VideoId.id.videoId}?autoplay=1&mute=1`)
    }).catch(err=>console.log(err))
}


function playfullscreentrailer(src){
    const frame = `
    <iframe id="iframe" src="${src}" style="position:fixed; margin-top: 20px; top: 20px;; left:0; bottom:0; right:0;
    width:100%; height:90%; border:none; margin:0; padding:0; overflow:visible; ">`


    console.log(frame)
    document.getElementById('main-header').style.display="none";
    document.getElementById('home').style.display="none";
    document.getElementById('main-content').style.display="none";
    document.getElementById('footer').style.display="none";
    document.getElementById('video').innerHTML=frame;

    document.addEventListener('keydown', (event) => {
        if(event.key=='Escape'){
          const frame =   `<iframe id="iframe" width="800" height="500" src="">
            </iframe>`
            // document.getElementById('video').innerHTML=null;
            console.log("Inside")
            // alert("Escape")
            document.getElementById('video').innerHTML =null;
            document.getElementById('main-header').style.display="block";
            document.getElementById('home').style.display="block";
            document.getElementById('main-content').style.display="block";
            document.getElementById('footer').style.display="block";
        }
      }, false);
}

window.playfullscreentrailer = playfullscreentrailer;
window.searchMovieTrailer = searchMovieTrailer;
window.SeeMovieDetails = SeeMovieDetails;
window.AddToLiked = AddToLiked;
window.AddtoMyList = AddtoMyList;
window.logout = logout;

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
  
    
    console.log(saveListItems);

}

const myLikedMovieLC = JSON.parse(localStorage.getItem("myLikedMovie")) || [];

function myLikedMovie(id){
    if(!myLikedMovieLC.includes(id)){
        myLikedMovieLC.push(id);
        localStorage.setItem('myLikedMovie', JSON.stringify(myLikedMovieLC));
    }
   
    
    console.log(myLikedMovieLC);

}

async function SeeMovieDetails(value){
    const api = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}`
    const res = await fetch(api);
    const data = await res.json();
    console.log("inside func movie")
    console.log(data)
    MovieDetailsPage(data.results[0].id)
    
}
async function AddToLiked(value){
    const api = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}`
    const res = await fetch(api);
    const data = await res.json();
    myLikedMovie(data.results[0].id)
    
}
async function AddtoMyList(value){
    const api = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}`
    const res = await fetch(api);
    const data = await res.json();
    if(data.results.length<1){
        const res = await fetch(apiPath.fecthTvshow(value));
        const data = await res.json();
        console.log(data);
        saveToMyList(data.results[0].id)
    }
    else{

        console.log(data);
        saveToMyList(data.results[0].id)
    }
    
}



function logout(){
    console.log("Logout")
    localStorage.setItem('login_user', false);
    window.location.href="\index.html"
}


// Search Movie function Start 

window.searchMovies = searchMovies;
//* DEBOUNCING ON SEARCH MOVIES//
function searchMovies() {
   const searchInput =  document.getElementById('input')
   searchInput.style.display='block';
//    searchInput.style.transition = 
    // location.href = "../Pages/search_movies.html";
}

let debounceMovies = debounce(displayMovies,300);

function debounce(fn, delay){
    let timerId;
    return function(){
        clearTimeout(timerId);
        timerId = setTimeout(function(){
            fn();
        },delay);
        // console.log(timerId);
    }
}

// Append Search result

function SearchMovieResultAppend(list,categoryName){
    console.log(list, categoryName);
    const movieCont = document.getElementById("searchMovieresult");
    const moviesListHtml = list.map(item=>{
        // onmouseenter="searchMovieTrailer('${item.title} trailer','yt${item.id}')"
        // onmouseenter="changebackgifonhover()"
        // onmouseover="changebackgifonhover(coverid${item.id})"
        return `
        <div class="square one">
                    <div class="cover" id="cover"  >
                    <img  id="coverid${item.id}" src="${imgPath}${item.backdrop_path || item.poster_path}" alt="${item.title}" />
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
                            <div id="textp">
                            <span>97% Match</span>
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




async function displayMovies() {
    var input = document.getElementById("input").value;
    console.log(input);
    const bannersection  = document.getElementById("home")
     const movieContainer = document.getElementById("main-content");
    if(input!=""){

        movieContainer.style.display= 'none';
        bannersection.style.display='none'
    }
    else{
        movieContainer.style.display= 'block';
        bannersection.style.display='block'
    }
    
    
    let url = `${apiPath.multiSearchTVMOVIEPEOPLE(input)}`;

    try {
        const res = await fetch (url);
        var searchMoviedata = await res.json();
        
        console.log(searchMoviedata);
        document.getElementById('searchMovieresult').innerHTML=null;
        const searchresultreduceed = searchMoviedata.results.filter(function(ele){
            return ele.poster_path!=null || ele.backdrop_path!=null
        })
        // console.log(searchresultreduceed)
        SearchMovieResultAppend(searchresultreduceed, "Movie Matched With Your Search")
       

    } catch(err) {
        console.log(err);
    }
}



// Search Movie Function End

window.check = check;

document.getElementById('input').addEventListener('change', function(){
    const input = document.getElementById('input');
console.log(input.value)
    console.log("Checking")
})

function check(){
    console.log("check")
}


