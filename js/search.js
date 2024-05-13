function searchFunc(data){
    const search_item=document.querySelector(".search-items");
    let result="";
    data.forEach(element => {
        result+=`
        <a href="" class="result-item" data-id=${element.id}>
              <img
                src="${element.img.singleImage}"
                alt="product1"
                class="search-image"
              />
              <div class="search-info">
                <h4>${element.name}</h4>
                <span class="search-sku">SKU:PD0016</span>
                <span class="search-price">$${(element.price.newPrice).toFixed(2)}</span>
              </div>
            </a>
        `
    });
    search_item.innerHTML=result;
    productRoute();
    filter(data);
}
function productRoute(){
    const result_item=document.querySelectorAll(".result-item");
    result_item.forEach(item=>{
        item.addEventListener("click",(e)=>{
            e.preventDefault();
            const id=item.dataset.id;
            if(id){
                localStorage.setItem("productId",JSON.stringify(id));
                window.location.href="product-details.html"
            }
        });
    })
}
function filter(data){
    const search_item=document.querySelector(".search-items");
    const input=document.querySelector("input");
    let filtered=[];
    input.addEventListener("input",(e)=>{
        let value=e.target.value;
        value=value.trim().toLowerCase();
        filtered=data.filter(item=>(item.name).toLowerCase().includes(value));
        console.log(filtered);
        let result="";
        if(filtered.length<2){
            search_item.style.gridTemplateColumns="1fr";
        }
      
        else{
            search_item.style.gridTemplateColumns="1fr 1fr"; 
        }
        filtered.forEach(item=>{
            result+=`
            <a href="" class="result-item" data-id=${item.id}>
                  <img
                    src="${item.img.singleImage}"
                    alt="product1"
                    class="search-image"
                  />
                  <div class="search-info">
                    <h4>${item.name}</h4>
                    <span class="search-sku">SKU:PD0016</span>
                    <span class="search-price">$${(item.price.newPrice).toFixed(2)}</span>
                  </div>
                </a>
            `
        });
        search_item.innerHTML=result;
        productRoute();
    });
  
}



export default searchFunc;