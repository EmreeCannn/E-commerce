function commentFunction() {
  const commentStars = document.querySelectorAll(
    ".review-form-stars-list .star"
  );
  commentStars.forEach((star) => {
    star.addEventListener("click", (e) => {
      e.preventDefault();
      commentStars.forEach((star) => star.classList.remove("active"));
      star.classList.add("active");
    });
  });
}
const reviews_form = document.querySelector(".reviews-form");
const comment_List=document.querySelector(".tab-panel-comment-list");


const count=document.querySelector(".count") ? document.querySelector(".count"):"";
let users_data = [];
users_data=localStorage.getItem("user_info")? JSON.parse(localStorage.getItem("user_info")) : [];
let sayaç=localStorage.getItem("sayaç") ? JSON.parse(localStorage.getItem("sayaç")) : 0;
// sayaç=localStorage.getItem("counter") ? JSON.parse(localStorage.getItem("counter")) :0;
count.textContent=sayaç;
let result = "";
const commentForm = (e) => {
  e.preventDefault();
  sayaç+=1;
  const reviews_form = document.querySelector(".reviews-form");
  let user_reviews = document.getElementById("user-reviews");
  let user_name = document.getElementById("user-name");
  const user_name_value = user_name.value;
  const user_reviews_value = user_reviews.value;
  const date = new Date();
  const date2 = date.toLocaleDateString();
  const newDate = date2.split(".");
  users_data.push({
    name: user_name_value,
    reviews: user_reviews_value,
    day:newDate[0],
    month:newDate[1],
    year:newDate[2],
  });
  localStorage.setItem("user_info",JSON.stringify(users_data));
  localStorage.setItem("sayaç",JSON.stringify(sayaç));
  user_name.value = "";
  user_reviews.value = "";
  count.textContent=sayaç;
  const star_id=countStars();
  console.log(star_id);
  window.location.href=window.location.href;
  
};

const appenduserinfo = () => {
  console.log(users_data);
  users_data.forEach((data) => {
    result += `
        <li class="comment-item">
        <div class="comment-avatar">
          <img src="img/avatars/avatar2.jpg" alt="" class="avatar-img">
        </div>
        <div class="comment-text">
          <ul class="comment-stars">
            
          </ul>
          <div class="meta">
            <div class="username">
              <strong>${data.name}</strong>
            </div>
            <div class="current-date">
              <time>- ${data.day}:${data.month}:${data.year}</time>
            </div>
          </div>
          <div class="user-text-result">
            <p>${data.reviews}</p>
          </div>
        </div>
      </li>`;
     
  });
  comment_List.innerHTML=result; 
};


function countStars(){
  const stars=document.querySelectorAll(".star");
  stars.forEach(star=>{
    star.addEventListener("click",(e)=>{
      star_id=star.dataset.id;
      console.log(star_id);
      return star_id;
    });
  })
}

reviews_form.addEventListener("submit", commentForm);
appenduserinfo();
commentFunction();
