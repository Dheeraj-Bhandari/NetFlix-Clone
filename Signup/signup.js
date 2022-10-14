var login = JSON.parse(localStorage.getItem("........")) || [];
document.querySelector("#btn1").addEventListener("click", myFun);
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
    alert("login Sucessfull ✔️");
    window.location.href = "";
  } else {
    alert("Wrong Credential   ❌");
  }
}

