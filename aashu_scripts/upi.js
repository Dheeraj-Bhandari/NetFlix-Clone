import navbar from "/aashu_components/navbar.js";
document.querySelector("#navbar").innerHTML=navbar();

import {footer} from "/aashu_components/footer.js"

document.querySelector("#footer").innerHTML=footer();

document.querySelector("#right_menu").innerText="Sign Out"

document.querySelector(".one").addEventListener("click",()=>{
    // console.log(1)
    // console.log(document.querySelector(".one").innerHTML);
    document.querySelector("#app").innerHTML=document.querySelector(".one").innerHTML;
})
document.querySelector(".two").addEventListener("click",()=>{
    console.log(1)
    console.log(document.querySelector(".two").innerHTML);
    document.querySelector("#app").innerHTML=document.querySelector(".two").innerHTML;
})
document.querySelector(".three").addEventListener("click",()=>{
    console.log(1)
    console.log(document.querySelector(".three").innerHTML);
    document.querySelector("#app").innerHTML=document.querySelector(".three").innerHTML;
})
document.querySelector(".four").addEventListener("click",()=>{
    console.log(1)
    console.log(document.querySelector(".four").innerHTML);
    document.querySelector("#app").innerHTML=document.querySelector(".four").innerHTML;
})
document.querySelector(".five").addEventListener("click",()=>{
    console.log(1)
    console.log(document.querySelector(".five").innerHTML);
    document.querySelector("#app").innerHTML=document.querySelector(".five").innerHTML;
})




document.querySelector("#next").addEventListener("click",()=>{

    let upi_id=document.querySelector("#UPI_ID").value;
    if(upi_id.length>=10){
        console.log(upi_id);
    localStorage.setItem("payment_check_upi",upi_id);
    window.location.href="./upi_confirm.html"
    }
    else{
        alert("Enter valid upi id"); 
    }
})


document.querySelector("#right_menu").addEventListener("click",()=>{
    event.preventDefault();
    window.location.href="/Signout/signout.html";
})

