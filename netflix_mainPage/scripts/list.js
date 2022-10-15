import { navbar } from "../components/navbar.js";
document.getElementById("header").innerHTML = navbar;
const imgPath = `https://image.tmdb.org/t/p/original/`;


var arr = JSON.parse(localStorage.getItem("wishList"));
console.log(arr);

 async function displayList() {
    for(var i = 0; i < arr.length; i++) {
        const id = arr[i];
        console.log(id);
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c711fb267186115e70fda43ea1f1972c&language=en-US`);
            const res2 = await res.json();
            console.log(res2);
            

                const div = document.createElement("div");
                div.setAttribute("id", "div");

                const image = document.createElement("img");
                image.setAttribute("src", `${imgPath}${res2.backdrop_path}`);
                image.setAttribute("id", "listImg")

                div.append(image);

                document.getElementById("box").append(div);
        
        } catch(err) {
            console.log(err);
        }
    }
   
}
displayList();