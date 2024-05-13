
 import Product from "./product.js";
import all from  "./cart.js";
import product from "./product.js";
import search from "./search.js";

// array formatında verierimi almak için json strigfy kullanırım 

//? add product to local storage start

const url=("../js/data.json");


function getData(url){
    fetch(url)
    .then(resp=>{
        // console.log(resp);
        if(!resp.ok) throw new Error(" was not valid response");
        // it means its not between 200-299 
        return resp.json(); 
    })
    .then(data=>{
        data ? localStorage.setItem("Products",JSON.stringify(data)) : [];
      
        search(data);
    })
    .catch(err=>{
        console.log(err);
    })
}
getData(url)


  
if( window.localStorage )
  {
    if( !localStorage.getItem('firstLoad') )
    {
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  
    else
      localStorage.removeItem('firstLoad');
  }
;



const header_cart=document.querySelector(".header-card-count");


header_cart.innerHTML=localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")).length
: "0" ;

// //!modal dialog start 
// const modalDialog=document.querySelector(".modal-dialog");
// const btnCloseDialog=document.querySelector(".modal-dialog .modal-close");
// btnCloseDialog.addEventListener("click",()=>{
//   modalDialog.classList.remove("show");
// });

// setTimeout(() => {
//   modalDialog.classList.add("show");
// }, 3000);
// //! modal dialog end 


//? add product to local storage end



