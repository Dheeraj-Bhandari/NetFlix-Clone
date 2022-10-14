import navbar from "../aashu_components/navbar.js";
document.querySelector("#navbar").innerHTML=navbar();

import {footer} from "../aashu_components/footer.js"

document.querySelector("#footer").innerHTML=footer();
document.querySelector("#right_menu").innerText="Sign Out"



document.querySelector("#next").addEventListener("click",()=>{
    event.preventDefault();
    console.log(1)
    let chk_val=document.querySelector("#agree");
    if(chk_val.checked){
    window.location.href="./credit_done.html"
    }
    else{
        alert("Please check on agree")
    }
})


document.querySelector("#right_menu").addEventListener("click",()=>{
    event.preventDefault();
    window.location.href="./Signout/signout.html";
})