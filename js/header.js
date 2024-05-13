 function SideBar() {
  //? Side Bar Srart
  const btnSideBar = document.querySelector("#btnSideBar");
  const SideBar = document.querySelector(".header-center");
  const MobileCloseIcon = document.querySelector(".sidebar-icon");
  const Search_Close_Icon = document.querySelector("#search-close-icon");
   btnSideBar ? btnSideBar.addEventListener("click", () => {
    SideBar.style.left = "0";
  }) : "";
  MobileCloseIcon ? MobileCloseIcon.addEventListener("click", () => {
    SideBar.style.left = "-100%";
  }): "";
  // click outside
  document.addEventListener("click", (e) => {
    if (
      !e.composedPath().includes(SideBar) &&
      !e.composedPath().includes(btnSideBar)
    ) {
      SideBar.style.left = "-100%";
    }
  });

  //? Side Bar End
}

function SearchModal() {
  //? Search Modal Start

  const SearchIcon = document.querySelector(".toggle-button");
  const Search_Container = document.querySelector(".search-container");
  const Search_Close_Icon = document.querySelector("#search-close-icon");
  const Search_Wrapper = document.querySelector(".search-wrapper");
  SearchIcon.addEventListener("click", () => {
    Search_Container.style.visibility = "visible";
    Search_Container.style.opacity = "1";
  });
   Search_Close_Icon ? Search_Close_Icon.addEventListener("click", () => {
    Search_Container.style.visibility = "hidden";
    Search_Container.style.opacity = "0";
  }) : "";

  // click outside
  document.addEventListener("click", (e) => {
    if (
      !e.composedPath().includes(SearchIcon) &&
      !e.composedPath().includes(Search_Wrapper)
    ) {
      Search_Container.style.visibility = "hidden";
      Search_Container.style.opacity = "0";
    }
  });

  //? Serach Modal End
}


    SideBar();
    SearchModal();


