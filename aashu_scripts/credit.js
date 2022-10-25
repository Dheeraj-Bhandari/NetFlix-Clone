import navbar from "/aashu_components/navbar.js";
document.querySelector("#navbar").innerHTML=navbar();

import {footer} from "/aashu_components/footer.js"

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
    window.location.href="/Signout/signout.html";
})

let fname=document.querySelector("#fname").value;
if(fname!=null){
   let ema= document.querySelector("#ema");
   ema.style.transform="translateY(-0.8em)";
}
else{
    let ema= document.querySelector("#ema");
   
   ema.style.transform="none";
}
let lname=document.querySelector("#lname").value;
if(lname!=null){
    let ema= document.querySelector("#lna");
    ema.style.transform="translateY(-0.8em)";
 }
 else{
     let ema= document.querySelector("#lna");
    
    ema.style.transform="none";
 }
let card_num=document.querySelector("#card_num").value;
if(card_num!=null){
    let ema= document.querySelector("#card");
    ema.style.transform="translateY(-0.8em)";
 }
 else{
     let ema= document.querySelector("#card");
    
    ema.style.transform="traslatY(0.8em)";
 }
let expiration=document.querySelector("#expiration").value;
if(expiration!=null){
    let ema= document.querySelector("#expir");
    ema.style.transform="translateY(-0.8em)";
 }
 else{
     let ema= document.querySelector("#expir");
    
    ema.style.transform="none";
 }
let cvv=document.querySelector("#cvv").value;
if(cvv!=null){
    let ema= document.querySelector("#cv");
    ema.style.transform="translateY(-0.8em)";
 }
 else{
     let ema= document.querySelector("#cv");
    
    ema.style.transform="none";
 }
