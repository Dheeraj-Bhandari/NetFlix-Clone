import navbar from "../aashu_components/navbar.js";
document.querySelector("#navbar").innerHTML=navbar();

import {footer} from "../aashu_components/footer.js"

document.querySelector("#footer").innerHTML=footer();
document.querySelector("#right_menu").innerText="Sign Out"

document.querySelector("#next").addEventListener("click",()=>{
    let first=document.querySelector("#first_input").value;
    let second=document.querySelector("#second_input").value;
    let third=document.querySelector("#third_input").value;
    let fourth=document.querySelector("#fourth_input").value;

    if(first==="1" && second==="2" && third==="3" && fourth==="4"){
        window.location.href="./home_page.html";
    }
    else{
        alert("Please do the payment ! After that OTP will come")
    }
})