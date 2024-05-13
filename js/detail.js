
  const product_title = document.querySelector(".product-title");
  const product_description = document.querySelector(".detail-product-desc");
  const new_price = document.querySelector(".new_price");
  const old_price = document.querySelector(".old_price");
  const thumbs_wrapper = document.querySelector(".product-gallery-thumbnails");
  const single_img=document.querySelector("#single-img");
  const single_img_wrapper=document.querySelector(".main-image-wrapper");
  const reviewed_item=document.querySelector(".reviewed-item");
  const get_current_product_id = localStorage.getItem("productId")
    ? JSON.parse(localStorage.getItem("productId"))
    : localStorage.setItem("productId", JSON.stringify(1));

  const products = localStorage.getItem("Products")
    ? JSON.parse(localStorage.getItem("Products"))
    : [];

  const wishlist_item=localStorage.getItem("Wishlist")
  ? JSON.parse(localStorage.getItem("Wishlist"))
  : [];


  const is_product_match = products.find(
    (product) => product.id === Number(get_current_product_id)
  );
 
   
  
  single_img ? single_img.src=is_product_match.img.singleImage:"";
  reviewed_item.textContent=` reviews for ${is_product_match.name}`;
  product_title.innerHTML = is_product_match.name;
  product_description.innerHTML = is_product_match.details;
  new_price.innerHTML = `$${is_product_match.price.newPrice.toFixed(2)}`;
  old_price.innerHTML = `$${is_product_match.price.oldPrice.toFixed(2)}`;
  let thumbs = "";
  const thumnbs_img = is_product_match.img.thumbs;
  thumnbs_img.forEach((thumb) => {
    thumbs+=`
    <li>
      <img src="${thumb}" alt=""/ class="img-fluid thumb">
    </li>
    `
    thumbs_wrapper.innerHTML=thumbs;
  });
  
  [...thumbs_wrapper.children].forEach(item=>{
    item.addEventListener("click",()=>{
      for(let i=0;i<thumbs_wrapper.children.length;i++){
        thumbs_wrapper.children[i].classList.remove("active");
      }
      item.classList.add("active");
    })
  })
  const thumbs_img_result=document.querySelectorAll(".thumb");
  thumbs_img_result.forEach(item=>{
    item.addEventListener("click",(e)=>{
      const thumb_src=e.target.src;
      single_img.src=thumb_src;
    })
  })
  //? img a zoom yapmak için transform origin özelliğini kullanırız
  single_img_wrapper.addEventListener("mousemove",e=>{
    const x=e.clientX ;
    const y=e.clientY;
    
    
    single_img.style.transformOrigin =`${x}px ${y}px`;
    single_img.style.transform="scale(2.4)";
  });
  single_img_wrapper.addEventListener("mouseleave",(e)=>{
    single_img.style.transform="scale(1)";
    
  })

  //! colors seciton start
  const colors=document.querySelectorAll(".color-wrapper");
  const colors_wrapper=document.querySelector(".colors-wrapper");
  colors.forEach(color=>{
    color.addEventListener("click",e=>{
      colors.forEach(item=>{
        item.classList.remove("active");
      });
      color.classList.add("active");
    });
  })
  //! colors section end 
  //! size section start
  const sizes=document.querySelectorAll(".size-wrapper");
  sizes.forEach(size=>{
    size.addEventListener("click",e=>{
      sizes.forEach(item=>{
        item.classList.remove("active");
      });
      size.classList.add("active");
    });
  })
  //! size section end  

  //? add to cart start
  const addtocartbtn=document.querySelector(".addtocartbtn");
  const form=document.querySelector(".variations-form");
  const cart_value=document.getElementById("cart_value");
  const header_cart = document.querySelector(".header-card-count");
  let cart=localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) :[];
  const findcard=cart.find(item=>item.id==is_product_match.id);
  if(findcard){
    addtocartbtn.setAttribute("disabled","disabled");
  }
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    is_product_match.quantity=Number(cart_value.value);
    cart.push(is_product_match);
    localStorage.setItem("Cart",JSON.stringify(cart));
    header_cart.textContent=JSON.parse(localStorage.getItem("Cart")).length;
    addtocartbtn.setAttribute("disabled","disabled");
  })
//! add to cart end


const btn_tab=document.querySelectorAll(".tab-button");
const content=document.querySelectorAll(".content");
const tab_list_wrapper=document.querySelector(".product-detail-tab-list");

tab_list_wrapper.addEventListener("click",(e)=>{
  e.preventDefault();
  const id=e.target.dataset.id;
  if(id){
    btn_tab.forEach(btn=>{btn.classList.remove("active")});
    e.target.classList.add("active");
    content.forEach(cnt=>{cnt.classList.remove("active")});
    console.log(id);
    const item=document.getElementById(id);
    item.classList.add("active");
  }
});

const add_to_cart_animation= document.querySelector(".added-to-cart");

addtocartbtn.addEventListener("click",()=>{
  add_to_cart_animation.classList.add("active");
      setTimeout(() => {
        add_to_cart_animation.classList.remove("active");
      }, 5000);
})


