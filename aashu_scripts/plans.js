import navbar from "../aashu_components/navbar.js";
document.querySelector("#navbar").innerHTML=navbar();

import {footer} from "../aashu_components/footer.js"

document.querySelector("#footer").innerHTML=footer();

document.querySelector("#footer").innerHTML=footer();

document.querySelector("#right_menu").innerText="Sign Out";

document.querySelector("#next").addEventListener("click",()=>{
    const plan = localStorage.getItem('NetflixPlan');
    if(plan!=null){

        window.location.href="./payment_method.html"
    }
    else{
        alert("Please Choose A Plan")
    }
})


document.querySelector("#right_menu").addEventListener("click",()=>{
    event.preventDefault();
    window.location.href="./Signout/signout.html";
})



// Dheeraj js
document.getElementById('Mobileplan').addEventListener('click', Addmobileplan);
document.getElementById('basicplan').addEventListener('click', AddbasicPlan);
document.getElementById('standredplan').addEventListener('click', AddStandredplan);
document.getElementById('premiumplan').addEventListener('click', Addprimumplan);

function Addmobileplan(){
    localStorage.setItem('NetflixPlan', 'MobilePlan');
    document.getElementById('Mobileplan').style.opacity='1';
    document.getElementById('basicplan').style.opacity='0.5';
    document.getElementById('standredplan').style.opacity='0.5';
    document.getElementById('premiumplan').style.opacity='0.5';

   
    document.getElementById('PlanAmountone').style.color='red'
    document.getElementById('QualityTypeone').style.color='red'
    document.getElementById('reso_type_one').style.color='red'
    document.getElementById('reso_item-two').style.color='red'
   
    // 

    document.getElementById('PlanAmounttwo').style.color='black'
    document.getElementById('QualityTypetwo').style.color='black'
    document.getElementById('reso_type_tow').style.color='black'
    document.getElementById('reso_item_three').style.color='black'
   
    document.getElementById('PlanAmountthree').style.color='black'
    document.getElementById('QualityTypethree').style.color='black'
    document.getElementById('reso_type_three').style.color='black'
    document.getElementById('reso_item-four').style.color='black'
   
    document.getElementById('PlanAmountfour').style.color='black'
    document.getElementById('QualityTypefour').style.color='black'
    document.getElementById('reso_type_four').style.color='black'
    document.getElementById('reso_item-five').style.color='black'
   
}
function AddbasicPlan(){
    localStorage.setItem('NetflixPlan', 'BasicPlan');
    document.getElementById('Mobileplan').style.opacity='0.5';
    document.getElementById('basicplan').style.opacity='1';
    document.getElementById('standredplan').style.opacity='0.5';
    document.getElementById('premiumplan').style.opacity='0.5';

    document.getElementById('PlanAmountone').style.color='black'
    document.getElementById('QualityTypeone').style.color='black'
    document.getElementById('reso_type_one').style.color='black'
    document.getElementById('reso_item-two').style.color='black'
   
    // 

    document.getElementById('PlanAmounttwo').style.color='red'
    document.getElementById('QualityTypetwo').style.color='red'
    document.getElementById('reso_type_tow').style.color='red'
    document.getElementById('reso_item_three').style.color='red'
   
    document.getElementById('PlanAmountthree').style.color='black'
    document.getElementById('QualityTypethree').style.color='black'
    document.getElementById('reso_type_three').style.color='black'
    document.getElementById('reso_item-four').style.color='black'
   
    document.getElementById('PlanAmountfour').style.color='black'
    document.getElementById('QualityTypefour').style.color='black'
    document.getElementById('reso_type_four').style.color='black'
    document.getElementById('reso_item-five').style.color='black'
   
}
function AddStandredplan(){
    localStorage.setItem('NetflixPlan', 'StandredPlan');
    document.getElementById('Mobileplan').style.opacity='0.5';
    document.getElementById('basicplan').style.opacity='0.5';
    document.getElementById('standredplan').style.opacity='1';
    document.getElementById('premiumplan').style.opacity='0.5';
   
    document.getElementById('PlanAmountone').style.color='black'
    document.getElementById('QualityTypeone').style.color='black'
    document.getElementById('reso_type_one').style.color='balck'
    document.getElementById('reso_item-two').style.color='black'
   
    // 

    document.getElementById('PlanAmounttwo').style.color='black'
    document.getElementById('QualityTypetwo').style.color='black'
    document.getElementById('reso_type_tow').style.color='black'
    document.getElementById('reso_item_three').style.color='black'
   
    document.getElementById('PlanAmountthree').style.color='red'
    document.getElementById('QualityTypethree').style.color='red'
    document.getElementById('reso_type_three').style.color='red'
    document.getElementById('reso_item-four').style.color='red'
   
    document.getElementById('PlanAmountfour').style.color='black'
    document.getElementById('QualityTypefour').style.color='black'
    document.getElementById('reso_type_four').style.color='black'
    document.getElementById('reso_item-five').style.color='black'
}
function Addprimumplan(){
    localStorage.setItem('NetflixPlan', 'PreimiumPlan');
    document.getElementById('Mobileplan').style.opacity='0.5';
    document.getElementById('basicplan').style.opacity='0.5';
    document.getElementById('standredplan').style.opacity='0.5';
    document.getElementById('premiumplan').style.opacity='1';

    document.getElementById('PlanAmountone').style.color='black'
    document.getElementById('QualityTypeone').style.color='black'
    document.getElementById('reso_type_one').style.color='black'
    document.getElementById('reso_item-two').style.color='black'
   
    // 

    document.getElementById('PlanAmounttwo').style.color='black'
    document.getElementById('QualityTypetwo').style.color='black'
    document.getElementById('reso_type_tow').style.color='black'
    document.getElementById('reso_item_three').style.color='black'
   
    document.getElementById('PlanAmountthree').style.color='black'
    document.getElementById('QualityTypethree').style.color='black'
    document.getElementById('reso_type_three').style.color='black'
    document.getElementById('reso_item-four').style.color='black'
   
    document.getElementById('PlanAmountfour').style.color='red'
    document.getElementById('QualityTypefour').style.color='red'
    document.getElementById('reso_type_four').style.color='red'
    document.getElementById('reso_item-five').style.color='red'
   
}

// dheeraj js end