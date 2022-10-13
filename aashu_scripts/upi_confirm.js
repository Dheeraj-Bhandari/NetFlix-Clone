import navbar from "../aashu_components/navbar.js";
document.querySelector("#navbar").innerHTML=navbar();

import {footer} from "../aashu_components/footer.js"

document.querySelector("#footer").innerHTML=footer();
document.querySelector("#right_menu").innerText="Sign Out"


document.querySelector("#next").addEventListener("click",()=>{
    let chk_val=document.querySelector("#check");
    if(chk_val.checked){
        window.location.href="./upi_done.html";
    }
    else{
       alert("Please check on I agree !")
    }
})


let upi_text=localStorage.getItem("payment_check_upi");

document.querySelector("#upi_pay").innerText=upi_text;