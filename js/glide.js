const productsContainer = document.getElementById("product-list");


export  function product2(){
const config2 ={
    bound:true,
    perView:4,
    gap:20,
    breakpoints:{
        992:{
            perView:1,
        }
    }
}

 productsContainer && new Glide(".product-carousel1",config2).mount();
}





