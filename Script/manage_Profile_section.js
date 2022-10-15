
const memberDiv = document.querySelector("#member-Div");
function addUserProfile() {
   location.href = "../Pages/addUserProfle_page.html";
    
   
}


const users = JSON.parse(localStorage.getItem("users"));
console.log(users);
function displayMemberProfile() {
    users.map((elem) => {
        var bigBox = document.createElement('div');
        bigBox.setAttribute("id", "bigBox");

        var cont = document.createElement('div');
        cont.setAttribute("id", "cont");


        var box = document.createElement('div');
        box.setAttribute("id", "box");
    
        var image = document.createElement('img');
        image.setAttribute("src", "https://occ-0-1492-2705.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbV2URr-qEYOrESG0qnP2787XsIxWTMBh7QfJwyqYxMAVFNyiXAqFeu16gI8yTxg3kLwF2mUDKmZGfwBEDd7722xskhYwAMwsBBe.png?r=bd7");
        // image.style.height = "90px";
        image.setAttribute("id", "memberImg");

        var member = document.createElement('h1');
        member.innerText = elem.name;
        box.append(image, member);
        box.addEventListener('click', function(){
            localStorage.setItem("UserWatching", elem.name);
            location.href = "/Netflix_Home_Page_Static_Main/NetFlix_HomePage_Main.html"
        })
        
        cont.append(box);
        bigBox.append(cont);
        document.getElementById('ProfileContainer').append(bigBox);

        
    })
}
displayMemberProfile();



