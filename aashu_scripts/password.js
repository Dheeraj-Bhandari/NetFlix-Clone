import navbar from "../aashu_components/navbar.js";
document.querySelector("#navbar").innerHTML=navbar();

import {footer} from "../aashu_components/footer.js"

document.querySelector("#footer").innerHTML=footer();

let login_user_arr=JSON.parse(localStorage.getItem("login_users"))||[]

document.querySelector("form").addEventListener("submit",()=>{
    event.preventDefault();

    let email=document.querySelector("#email").value;
    let pass=document.querySelector("#pass").value;
    class obj{
        constructor(e,p) {
            this.email=e;
            this.pass=p;
        }
    }

    let obj1=new obj(email,pass);
    


    let check_arr=login_user_arr.filter((ele)=>{
        return ele.email===email
    })
    if(check_arr.length>=1){
        alert("You are already signed up !Sign in")
    }
    else{
    login_user_arr.push(obj1);
    localStorage.setItem("login_users",JSON.stringify(login_user_arr));
    window.location.href="./step_2.html"
    }
})

// localStorage.setItem("netflix_email","admin123@gmail.com");

let email=localStorage.getItem("netflix_email");

document.querySelector("#email").value=email;

let chk_mail=document.querySelector("#email").value;
console.log(chk_mail);
if(chk_mail!=null){
   let ema= document.querySelector("#ema");
   console.log(ema);
   ema.style.transform="translateY(-0.8em)";
}
else{
    let ema= document.querySelector("#ema");
   
   ema.style.transform="none";
}
let chk_pass=document.querySelector("#pass").value;
if(chk_pass!=null){
    let ema= document.querySelector("#pas");
    ema.style.transform="translateY(-0.8em)";
 }
 else{
     let ema= document.querySelector("#pas");
    
    ema.style.transform="none";
 }



document.querySelector("#right_menu").addEventListener("click",()=>{
    event.preventDefault();
    window.location.href="./Signup/signup.html";
})
