const wishlist_wrapper=document.querySelector(".wishlist-wrapper");

const wishlist_open=document.querySelector(".bi-heart");

wishlist_open.addEventListener("click",(e)=>{
    e.preventDefault();
    wishlist_wrapper.classList.toggle("active");
})



