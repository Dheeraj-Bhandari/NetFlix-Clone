import navbar from "../Components/navbar.js";

document.getElementById('header').innerHTML = navbar;

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

window.displayMovies = displayMovies;
const imgPath = `https://image.tmdb.org/t/p/original/`;


async function displayMovies() {
    document.getElementById("movie_box").innerHTML = " ";
    var input = document.getElementById("input").value;
    console.log(input);

    let url = `https://api.themoviedb.org/3/search/movie?api_key=c711fb267186115e70fda43ea1f1972c&query=${input}`;

    try {
        const res = await fetch (url);
        var res2 = await res.json();

        console.log(res2);

        res2.results.map((elem) => {

            var div = document.createElement("div");
            div.setAttribute("id", "search_div")



            // var title = document.createElement("h4");
            // title.innerText = "Explore titles relating to:" + `${input}`;
            // title.setAttribute("id", "title");

            // titleDiv.append(title);
            
            var image = document.createElement('img');
            image.setAttribute("id", "searchImg");
            image.setAttribute('src', `${imgPath}${elem.backdrop_path}`);

            div.append(image);
            

            document.getElementById("movie_box").append(div);
        })
    } catch(err) {
        console.log(err);
    }
}

window.debounceMovies = debounceMovies;
