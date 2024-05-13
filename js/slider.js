
  //? Slider Start

  const imgs = document.querySelectorAll(".s");
  let counter = 0;
  const left_btn = document.querySelector("#slide_left");
  const right_btn = document.querySelector("#slide_right");
  const slider_container = document.querySelector(".slider-elements");
  const slider_dot = document.querySelectorAll(".slider-dot");
  const mediaQueryCondition = window.matchMedia("( max-width: 1280px )");

  let dot_counter = 0;
  slidedots();

  function slidedots() {
    for (let i = 0; i < slider_dot.length; i++) {
      slider_dot[i].style.opacity = "0.5";
    }
    slider_dot[dot_counter].style.opacity = "1";
  }
  if (mediaQueryCondition.matches) {
    // const slide = setInterval(() => {
    //   slidedots();
    //   counter += 100;
    //   if (counter < 0) {
    //     counter = (imgs.length - 1) * 100;
    //   }
    //   if (counter > (imgs.length - 1) * 100) {
    //     counter = 0;
    //   }
    //   slider_container.style.transform = `translateX(-${counter}dvw)`;
    //   slidedots();
    //   dot_counter++;
    //   if (dot_counter > 2) {
    //     dot_counter = 0;
    //   }
    //   slidedots();
    // }, 3000);
    slider_dot[0].addEventListener("click", () => {
      counter = 0;
      dot_counter = 0;
      slider_container.style.transform = `translateX(-${counter}dvw)`;
      // clearInterval(slide);
      slidedots();
    });
    slider_dot[1].addEventListener("click", () => {
      counter = 100;
      dot_counter = 1;
      slider_container.style.transform = `translateX(-${counter}dvw)`;
      // clearInterval(slide);
      slidedots();
    });
    slider_dot[2].addEventListener("click", () => {
      counter = 200;
      dot_counter = 2;
      slider_container.style.transform = `translateX(-${counter}dvw)`;
      // clearInterval(slide);
      slidedots();
    });
  } else {
    slidedots();
    const time = setInterval(() => {
      counter += 100;
      if (counter < 0) {
        counter = (imgs.length - 1) * 100;
      }
      if (counter > (imgs.length - 1) * 100) {
        counter = 0;
      }
      slider_container.style.transform = `translateX(-${counter}dvw)`;
      dot_counter++;
      if (dot_counter > 2) {
        dot_counter = 0;
      }
      if (dot_counter < 0) {
        dot_counter = 2;
      }
      slidedots();
    }, 3000);

    slider_dot[0].addEventListener("click", () => {
      counter = 0;
      dot_counter = 0;
      slider_container.style.transform = `translateX(-${counter}dvw)`;
      slidedots();
      clearInterval(time);
    });
    slider_dot[1].addEventListener("click", () => {
      dot_counter = 1;
      counter = 100;
      slider_container.style.transform = `translateX(-${counter}dvw)`;
      slidedots();
      clearInterval(time);
    });
    slider_dot[2].addEventListener("click", () => {
      dot_counter = 2;
      counter = 200;
      slider_container.style.transform = `translateX(-${counter}dvw)`;
      slidedots();
      clearInterval(time);
    });

    function slideitem() {
      if (counter < 0) {
        counter = (imgs.length - 1) * 100;
      }
      if (counter > (imgs.length - 1) * 100) {
        counter = 0;
      }
      if (dot_counter > 2) {
        dot_counter = 0;
      }
      if (dot_counter < 0) {
        dot_counter = 2;
      }
      slidedots();
      clearInterval(time);
      slider_container.style.transform = `translateX(-${counter}dvw)`;
    }
    left_btn.addEventListener("click", () => {
      dot_counter -= 1;
      counter -= 100;
      slideitem();
      // clearInterval(time);
    });
    right_btn.addEventListener("click", () => {
      dot_counter += 1;
      counter += 100;
      slideitem();
      // clearInterval(time);
    });
    slideitem();
  }
  //? slider end



