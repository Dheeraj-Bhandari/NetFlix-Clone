var login = JSON.parse(localStorage.getItem("........")) || [];
document.querySelector("form").addEventListener("submit", myFun);
function myFun() {
  // console.log("dfgdg")
  // document.getElementById("email").value = "";
  // document.getElementById("password").value = "";
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var flag = false;

  for (var i = 0; i < login.length; i++) {
    if (login[i].email === email && login[i].password === password) {
      flag = true;
    }
  }
  if (flag) {
    event.preventDefault();
    console.log(1);
    alert("login Sucessfull ✔️");
    window.location.href = "./Pages/Netflix_Home_Page.html";
  } else {
    alert("Wrong Credential   ❌");
  }
}

