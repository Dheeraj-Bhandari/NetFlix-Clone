const user = JSON.parse(localStorage.getItem("users")) || [];

function displayProfile() {
    event.preventDefault();
    const name = {name: document.getElementById("addProfile-user-inputBox").value};
    user.push(name);
    localStorage.setItem("users", JSON.stringify(user));
    location.href = "../Pages/Manage_profilesection.html"
   
}

document.getElementById('addProfile-mainbtn1').addEventListener('click', function(){
    location.href = "../Pages/Manage_profilesection.html"
})
