
const TableContainer = document.querySelector(".table-body-wrapper");
let get_card=[];

 get_card =localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : [];



   function sumOfCard(){
     const total_price=document.getElementById("Total-price");
     const subtotal=document.getElementById("Subtotal");
     const FastCargo=document.getElementById("FastCargo");
     const cargo_price=15;
     let productsTotal=0;
     get_card.length > 0 && get_card.filter(item=> productsTotal+=(item.price.newPrice)*(item.quantity));
// // //   // && anlamı cartın uzunluğu sıfırdan buyükse  bu değer true gelirse çalışıor
     subtotal ? subtotal.innerHTML=`$${productsTotal.toFixed(2)}` :"";
     total_price ? total_price.innerHTML=`$${productsTotal.toFixed(2)}` :"";
     FastCargo ?FastCargo.addEventListener("change",(e)=>{
       console.log(e.target.checked);
// // //     // eğer inputum checked olursa bu bana true döner bunu  change eventiyle yakalarım 
       if(e.target.checked){
        total_price.textContent=`$${(productsTotal+cargo_price).toFixed(2)}`;
       }
       else{
         total_price.textContent=`$${productsTotal.toFixed(2)}`;
       }
     }):"";
   };

function appenCards(){
  let add_in_tableContainer = "";
  get_card && get_card.forEach((element) => {
    add_in_tableContainer +=`
    <tr class="table-body-item">
    <td></td>
    <td class="table-image">
      <img src=${element.img.singleImage} alt="" />
      <i class="bi bi-x-circle-fill delete-cart" data-id=${element.id}></i>
    </td>
    <td>${element.name}</td>
    <td>$${element.price.newPrice.toFixed(2)}</td>
    <td>${element.quantity}</td>
    <td>$${(element.price.newPrice*element.quantity).toFixed(2)}</td>
  </tr>
    `;
  });
  TableContainer ? TableContainer.innerHTML = add_in_tableContainer : "";
  sumOfCard();
  deleteCard();
}

function deleteCard(){
  const delete_card =document.querySelectorAll(".delete-cart");
  delete_card.forEach(del=>{
    del.addEventListener("click",(e)=>{
    const cart_id=e.target.dataset.id;
    get_card=get_card.filter(item=>item.id !==Number(cart_id));
    localStorage.setItem("Cart",JSON.stringify(get_card));
    const header_cart=document.querySelector(".header-card-count");
    header_cart.textContent=JSON.parse(localStorage.getItem("Cart")).length;
    appenCards();
    });
  });
}




function All(){
  appenCards();
}

export default All();