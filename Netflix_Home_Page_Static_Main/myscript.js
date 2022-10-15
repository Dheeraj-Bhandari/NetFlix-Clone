const apiKey = '9e997fe8c2efd000188bc88e3dda6d23';


// onclick="ShowTrailerVideoOnScreen('Black Adam')" 

window.MovieDetailsPage= MovieDetailsPage;
window.saveToMyList= saveToMyList;
window.myLikedMovie= myLikedMovie;


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
    saveToMyList(data.results[0].id)
    
}



function logout(){
    console.log("Logout")
    localStorage.setItem('login_user', false);
    window.location.href="\index.html"
}