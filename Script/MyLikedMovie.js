import navbar from "../Components/navbar.js";
document.getElementById('header').innerHTML = navbar;

import footernew from "../Components/footernew.js";
document.getElementById('footer').innerHTML = footernew;


const apiKey = '9e997fe8c2efd000188bc88e3dda6d23';
const youtubeApiKey = 'AIzaSyC7bWr31DArqVECDyRJbH-g106fKypGKRE'
const apiEndPoint = 'https://api.themoviedb.org/3'
const imgPath = "https://image.tmdb.org/t/p/original"
const apiPath = {
    fetchAllCategories: `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`,
    fetchAllTVCategories: `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`,
    fecthTrending: `${apiEndPoint}/trending/all/week?api_key=${apiKey}&language=en-US`,
    fecthPopularTvShow: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`,
    fecthTopRatedTvShow: `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`,
    fecthLatestTvShow: `https://api.themoviedb.org/3/tv/latest?api_key=${apiKey}&language=en-US`,
    fetchMoviesList: (id) => `${apiEndPoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
    fecthMovie: (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
    fecthTvShow: (id) => `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`,
    searchMovieTraileronYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${youtubeApiKey}`
}


//For boosting the app
function init() {
    // fecthTrendingMovies();
    // fecthAndBuildAllTVSection();
}



window.addEventListener('load', function () {
    // init();
    window.addEventListener('scroll', function () {
        //header color update
        const header = document.getElementById('header');
        if (window.screenY > 5) header.classList.add('black-bg')
        else header.classList.remove('black-bg')
    })

})


document.getElementById('brandlogo').addEventListener('click', function () {
    location.location.href = "/Pages/Netflix_Home_Page.html";
})

async function fecthSaveList(id) {
    const res = await fetch(apiPath.fecthMovie(id))
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
        return data;
    }
    else {
        const res = await fetch(apiPath.fecthTvShow(id))
        const data = await res.json();
        // console.log(data);
        return data;
    }
}

const saveMovieData = JSON.parse(localStorage.getItem('myLikedMovie')) || [];


async function appendsavedMovieData() {
    if (saveMovieData.length > 1) {
        saveMovieData.map((ele) => {
            fetch(apiPath.fecthMovie(ele))
                .then(res => res.json())
                .then(res => {
                    if (res.status_code == 34) {

                    }
                    else {
                        buildMovieSection(res)

                    }
                })
        })
    }
}
appendsavedMovieData();
function buildMovieSection(item) {

    const movieRow = document.getElementById("movieRow");


    const sqone = document.createElement('div');
    sqone.className = "square one";

    const cover = document.createElement('div');
    cover.className = "cover";
    cover.id = "cover";

    const coveridimg = document.createElement('img');
    coveridimg.id = `coverid${item.id}`
    coveridimg.src = `${imgPath}${item.backdrop_path}`
    coveridimg.alt = `${item.title}`

    cover.append(coveridimg);

    const text = document.createElement('div');
    text.className = 'text';

    const texticon = document.createElement('div');
    texticon.id = 'texticon';

    const textfirst3icon = document.createElement('div');
    textfirst3icon.id = 'textfirst3icon';

    const button1 = document.createElement('button');
    button1.addEventListener('click', function () {
        searchMovieTrailerandPlay(`${item.title || item.name}`);
    });
    const i1 = document.createElement('i');
    i1.className = 'fa-1x fa-solid fa-play';
    button1.append(i1);

    const button2 = document.createElement('button');
    button2.addEventListener('click', function () {
        const savedlist = JSON.parse(localStorage.getItem('myLikedMovie')) || [];
        const index = savedlist.indexOf(item.id);
        savedlist.splice(index, 1);
        localStorage.setItem('myLikedMovie', JSON.stringify(savedlist));
        location.reload();
        
    });
    const i2 = document.createElement('i');
    i2.className = 'fa fa-trash';
    button2.append(i2);

    const button3 = document.createElement('button');

    const i3 = document.createElement('i');
    i3.className = 'fa-1x  fa-solid fa-plus';
    button3.append(i3);
    button3.addEventListener('click', function () {
        const myLikedMovieLC = JSON.parse(localStorage.getItem("SavedList")) || [];
       
            if (!myLikedMovieLC.includes(item.id)) {
                myLikedMovieLC.push(item.id);
                localStorage.setItem('SavedList', JSON.stringify(myLikedMovieLC));
                
                const i = `<i class="fa fa-check" aria-hidden="true"></i>`;
                button3.innerHTML = i;
                $.toast({
                    heading: 'Added To My List',
                    hideAfter: 3000,
                    icon: 'success',
                    position: 'top-right',
                    showHideTransition: 'plain',
                    loaderBg: '#9EC600'
                })
            }
            else {

                $.toast({
                    heading: 'Already Added My List',
                    hideAfter: 3000,
                    icon: 'warning',
                    position: 'top-right',
                    showHideTransition: 'plain',
                    loaderBg: '#9EC600'
                })
            }
            console.log(myLikedMovieLC);

        
    })


    textfirst3icon.append(button1, button2, button3);

    const textlasticon = document.createElement('div');
    textlasticon.id = 'textlasticon';

    const button4 = document.createElement('button');
    button4.addEventListener('click', function () {
        localStorage.setItem('movieId', item.id);

        location.href = "/Pages/Detail_Page.html"
    });
    const i4 = document.createElement('i');
    i4.className = 'fa-1x fa-solid fa-arrow-down';
    button4.append(i4)
    textlasticon.append(button4);

    texticon.append(textfirst3icon, textlasticon);


    const textcontent = document.createElement('div');
    textcontent.id = 'textcontent';



    const textp = document.createElement('div');
    textp.id = 'textp';
    const span = document.createElement('span');
    span.innerText = '97% Match ';
    const text1 = document.createElement('p');
    text1.innerText = ' U/A 13+ 3 Season'
    textp.append(span, text1);

    const itemgenres = document.createElement('div');
    itemgenres.id = 'itemgenres';
    const text2 = document.createElement('p');
    text2.innerText = 'Quirky. Feel-Good. Teen';
    itemgenres.append(text2);

    textcontent.append(textp, itemgenres);


    text.append(texticon, textcontent);

    sqone.append(cover, text);



    movieRow.append(sqone);

    // console.log(sqone);

}


// window.changebackgifonhover= changebackgifonhover;


// Play Full Screen Function


// Search Trailer

function searchMovieTrailerandPlay(movieName) {
    console.log("Helo")
    // if(!movieName) return;

    fetch(apiPath.searchMovieTraileronYoutube(movieName))
        .then(res => res.json())
        .then(res => {
            console.log(res.items);
            const VideoId = res.items[0];
            const youtubeUrl = `https://www.youtube.com/watch?v=${VideoId.id.videoId}`
            console.log(youtubeUrl);
            // window.open(youtubeUrl, '_blank')
            //    const iframelement  = document.getElementById(iframeId)
            //    iframelement.src = `https://www.youtube.com/embed/${VideoId.id.videoId}?autoplay=1&mute=1`
            playfullscreentrailer(`https://www.youtube.com/embed/${VideoId.id.videoId}?autoplay=1&mute=1`)
        }).catch(err => console.log(err))
}


function playfullscreentrailer(src) {
    const frame = `
    <iframe id="iframe" src="${src}" style="position:fixed; margin-top: 20px; top: 20px;; left:0; bottom:0; right:0;
    width:100%; height:90%; border:none; margin:0; padding:0; overflow:visible; ">`


    console.log(frame)
    document.getElementById('movies-cont').style.display = "none";
    document.getElementById('footer').style.display = "none";

    document.getElementById('video').innerHTML = frame;

    document.addEventListener('keydown', (event) => {
        if (event.key == 'Escape') {
            const frame = `<iframe id="iframe" width="800" height="500" src="">
            </iframe>`

            console.log("Inside")
            // alert("Escape")
            document.getElementById('video').innerHTML = null;
            document.getElementById('movies-cont').style.display = "block";
            document.getElementById('footer').style.display = "block";
        }
    }, false);
}

window.playfullscreentrailer = playfullscreentrailer;
window.searchMovieTrailerandPlay = searchMovieTrailerandPlay;

// Play Full Screen Function End