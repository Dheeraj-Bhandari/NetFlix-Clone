import navbar from "../aashu_components/navbar.js";
document.querySelector("#navbar").innerHTML=navbar();

import {footer} from "../aashu_components/footer.js"

document.querySelector("#footer").innerHTML=footer();

document.querySelector("#next").addEventListener("click",()=>{
    window.location.href="./password_creation.html"
})