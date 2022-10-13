function navbar(){
 return  `
    <div class="header-cont container">
            <div class="left-cont">
            <a href="/"> <img class="brandlogo" id="brandlogo"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt=""> </a>
               
                <ul class="main-nav ">
                    
                    <a href="/Pages/Netflix_Home_Page.html"><li class="nav-item active">Home</li> </a>
                    <a href="/Pages/Tv_Shows.html"><li class="nav-item active">Tv Shows</li> </a>
                    <a href="/Pages/Movie.html"><li class="nav-item active">Movie</li> </a>
                    <a href="/Pages/Movie.html"><li class="nav-item active">News & Popular</li> </a>
                    <a href="/Pages/My_List.html"><li class="nav-item active">My List</li> </a>
                    <a href="/Pages/Movie.html"><li class="nav-item active">Browse by Languages</li> </a>
                  
                </ul>
            </div>
            <div class="right-cont">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="search-icon">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M13 11C13 13.7614 10.7614 16 8 16C5.23858 16 3 13.7614 3 11C3 8.23858 5.23858 6 8 6C10.7614 6 13 8.23858 13 11ZM14.0425 16.2431C12.5758 17.932 10.4126 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 11.9287 15.8417 12.8205 15.5507 13.6497L24.2533 18.7028L22.7468 21.2972L14.0425 16.2431Z"
                        fill="currentColor"></path>
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="Hawkins-Icon Hawkins-Icon-Standard">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M13 4.57092C16.3922 5.05624 18.9998 7.9736 18.9998 11.5V15.2538C20.0486 15.3307 21.0848 15.4245 22.107 15.5347L21.8926 17.5232C18.7219 17.1813 15.409 17 11.9998 17C8.59056 17 5.27764 17.1813 2.10699 17.5232L1.89258 15.5347C2.91473 15.4245 3.95095 15.3307 4.99978 15.2538V11.5C4.99978 7.97345 7.6076 5.05599 11 4.57086V2H13V4.57092ZM8.62568 19.3712C8.6621 20.5173 10.1509 22 11.9993 22C13.8477 22 15.3365 20.5173 15.373 19.3712C15.38 19.1489 15.1756 19 14.9531 19H9.04555C8.82308 19 8.61862 19.1489 8.62568 19.3712Z"
                        fill="currentColor"></path>
                </svg>

                <div id="menuItem">
                    <img src="https://occ-0-2041-3662.1.nflxso.net/art/0d282/eb648e0fd0b2676dbb7317310a48f9bdc2b0d282.png"
                        alt="">
                    <div id="menupages">

                        <a href="/Pages/Manage_Profiles.html"><i class="fa fa-pencil" aria-hidden="true"></i> Manage
                            Profile</a>
                        <a href=""><i class="fa fa-user" aria-hidden="true"></i> Account</a>
                        <a href=""><i class="fa fa-question-circle" aria-hidden="true"></i> HelpCenter</a>
                        <a href="">Sign Out of Netflix</a>
                    </div>
                </div>
            </div>

        </div>
    `
    
}

export default navbar();