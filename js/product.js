import { product2 } from "./glide.js";

let products = [];
let cart = [];
let get_product = [];
products = localStorage.getItem("Products")
  ? JSON.parse(localStorage.getItem("Products"))
  : [];

cart = localStorage.getItem("Cart")
  ? JSON.parse(localStorage.getItem("Cart"))
  : [];
get_product = localStorage.getItem("Wishlist")
  ? JSON.parse(localStorage.getItem("Wishlist"))
  : [];

const wishlist_wrapper = document.querySelector(".wishlist-wrapper");

function AddToCart() {
  const header_cart = document.querySelector(".header-card-count");
  header_cart.innerHTML = cart.length;
  // bu fonksiyonu tüm ürünlerim yüklendikten sonra çalıştırıcam bu yüzden products func içinde tanımladım
  const add_to_card_buttons = [
    ...document.getElementsByClassName("add-to-cart"),
  ];
  add_to_card_buttons.forEach((button) => {
    const incard = cart.find((item) => item.id === Number(button.dataset.id));
    if (incard) {
      button.setAttribute("disabled", "disabled");
    } else {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const button_id = e.target.dataset.id;
        const find_product = products.find(
          (product) => product.id === Number(button_id)
        );
        cart.push({ ...find_product, quantity: 1 });
        //   farklı farklı arraylarin içine koymaması için bunu süslü parantez ile çevreleiyip tek bir arrayin içine
        // koydum
        localStorage.setItem("Cart", JSON.stringify(cart));
        button.setAttribute("disabled", "disabled");
        header_cart.innerHTML = cart.length;
      });
    }
  });
  Router();
}

function Router() {
  const link = [...document.getElementsByClassName("Detail_Router")];

  link.forEach((router) => {
    router.addEventListener("click", (e) => {
      const router_id = e.target.dataset.id;
      e.preventDefault();
      window.location.href = "product-details.html";
      localStorage.setItem("productId", JSON.stringify(router_id));
    });
  });
}
function Get_Wishlist() {
  //! add to wishlist if  item already exist in card make button disable
  const wishlist_open = document.querySelector(".bi-heart");
  const wishlist_icon = document.getElementsByClassName("add-to-wishlist");
  [...wishlist_icon].forEach((icon) => {
    cart.forEach((item) => {
      if (item.id === Number(icon.dataset.id)) {
        icon.setAttribute("disabled", "disabled");
      }
    });
    get_product.forEach((item) => {
      if (item.id === Number(icon.dataset.id)) {
        icon.setAttribute("disabled", "disabled");
      }
    });
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      const wishlist_id = e.target.dataset.id;
      const get_clicked_item = products.find(
        (item) => item.id === Number(wishlist_id)
      );
      get_product.push({ ...get_clicked_item });
      icon.setAttribute("disabled", "disabled");
      localStorage.setItem("Wishlist", JSON.stringify(get_product));
      if (JSON.parse(localStorage.getItem("Wishlist")).length > 0) {
        wishlist_open.classList.add("bg-blue");
      } else {
        wishlist_open.classList.remove("bg-blue");
      }

      deleteItemFromWishlist();
      Product();
    });
  });
}

function AppendWishlist() {
  let wishlist = "";
  // const wishlist_items = JSON.parse(localStorage.getItem("Wishlist"));
  get_product
    ? get_product.forEach((wishlist_item) => {
        wishlist += `
  <div class="wishlist-card">
  <i class="bi bi-x-circle wishlist-close" data-id=${wishlist_item.id}></i>
    <div class="wishlist-detail">
      <div class="wishlist-img">
        <img src="${wishlist_item.img.singleImage}" alt="">
      </div>
    <div class="wishlist-content">
       <h5>${wishlist_item.name}</h5>
        <p><s>$${wishlist_item.price.oldPrice.toFixed(
          2
        )}</s>$${wishlist_item.price.newPrice.toFixed(2)}</p>
    </div>
    </div>
    <div class="wishlist_to_Cart">
        <button data-id=${
          wishlist_item.id
        } class="wishlist-to-cart">Add To Cart</button>
    </div>
  </div>
  `;
      })
    : [];
  wishlist_wrapper.innerHTML = wishlist;
  deleteItemFromWishlist();
  controlwishlist();
}
function basket_info() {
  const basket_info = document.querySelector(".added-to-cart");
  const add_to_cart = document.querySelectorAll(".add-to-cart");

  add_to_cart.forEach((item) => {
    item.addEventListener("click", (e) => {
      basket_info.classList.add("active");
      setTimeout(() => {
        basket_info.classList.remove("active");
      }, 5000);
    });
  });
}

function deleteItemFromWishlist() {
  const wishlist_close = document.querySelectorAll(".wishlist-close");
  const wishlist_icon = document.querySelectorAll(".add-to-wishlist");
  wishlist_close.forEach((wishlist_item) => {
    wishlist_item.addEventListener("click", (e) => {
      const wishlist_item_id = Number(e.target.dataset.id);
      console.log(wishlist_item_id);
      get_product = get_product.filter(
        (item) => item.id !== Number(wishlist_item_id)
      );
      localStorage.setItem("Wishlist", JSON.stringify(get_product));
      window.location.href = window.location.href;
      wishlist_icon[wishlist_item_id - 1].removeAttribute("disabled");
      AppendWishlist();
      controlwishlist();
    });
  });
}
function WishlistToCard() {
  const Add_To_Cart = document.querySelectorAll(".wishlist-to-cart");
  Add_To_Cart.forEach((wishlist_btn) => {
    wishlist_btn.addEventListener("click", (e) => {
      const clicked_btn = Number(e.target.dataset.id);
      const wishlit_item = products.find((item) => item.id === clicked_btn);
      get_product = get_product.filter(
        (item) => item.id !== Number(clicked_btn)
      );
      cart.push({ ...wishlit_item, quantity: 1 });
      localStorage.setItem("Cart", JSON.stringify(cart));
      localStorage.setItem("Wishlist", JSON.stringify(get_product));
      window.location.href = window.location.href;
      // bunun sayesinde sayfayı yeniledik
      AppendWishlist();
      AddToCart();
    });
  });
}
function controlwishlist() {
  if (get_product.length == 0) {
    wishlist_wrapper.innerHTML = `
    <h4 class="wishlist-info">No Products in Your wish List</h4>
    <h4 class="wishlist-emoji">😥😥😥</h4>
    <button class="navigate-to-slider">Start Shopping</button>
    `;
  }
  const navigate_slider = document.querySelector(".navigate-to-slider");
  const product_wrapper = document.querySelector(".product-wrapper");

  if (product_wrapper === null) {
    navigate_slider
      ? navigate_slider.addEventListener("click", () => {
          window.location.href = "index.html";
          navigate_slider.addEventListener("click", (e) => {
            wishlist_wrapper.classList.remove("active");
            product_wrapper.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          });
        })
      : "";
  } else {
    navigate_slider
      ? navigate_slider.addEventListener("click", (e) => {
          wishlist_wrapper.classList.remove("active");
          product_wrapper.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        })
      : "";
  }
}

function Product(){
  const productsContainer = document.getElementById("product-list");
  let results = "";
  products.forEach((product) => {
    results += `
           <li class="product-item glide__slide">
                <div class="product-image">
                  <div href="#">
                    <img src=${product.img.singleImage} alt="" class="img1">
                    <img src=${product.img.thumbs[1]} alt="" class="img2">
                  </div>
                </div>
                <div class="product-info">
                  <div href="$" class="product-title">${product.name}</div>
                  <ul class="product-star">
                    <li>
                      <i class="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i class="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i class="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i class="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i class="bi bi-star"></i>
                    </li>
                  </ul>
                  <div class="product-prices">
                    <strong class="new-price">$ ${product.price.newPrice.toFixed(
                      2
                    )}</strong>
                    <span class="old-price">$ ${product.price.oldPrice} </span>
                  </div>
                  <span class="product-discount">${product.discount}%</span>
                  <div class="product-links">
                    <button class="add-to-cart" data-id=${product.id}>
                      <i class="bi bi-basket-fill"></i>
                    </button>
                    <button class="add-to-wishlist" data-id=${product.id}>
                      <i class="bi bi-heart-fill"></i>
                    </button>
                    <button data-id=${product.id} class="Detail_Router">
                      <i class="bi bi-eye-fill"></i>
                    </button>
                    <button>
                      <i class="bi bi-share-fill"></i>
                    </button>
                  </div>
                </div>
              </li>
        `;
    productsContainer ? (productsContainer.innerHTML = results) : "";
  });
  AddToCart();
  Get_Wishlist();
  product2();
  AppendWishlist();
  deleteItemFromWishlist();
  WishlistToCard();
  controlwishlist();
  basket_info();
}


export default Product();
