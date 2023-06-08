// Burger
$(document).ready(function () {
  $('.header__burger').click(function (event) {
    $('.header__burger, .header__menu').toggleClass('active');
    $('body').toggleClass('lock'); // УБРАТЬ СКРОЛЛ ПРИ ОТКРЫТОМ БУРГЕРЕ
  });
});

$('.header__item').click(function (event) {
  $('.header__burger, .header__menu').removeClass('active');
  $('body').removeClass('lock'); // ВОЗВРАЩАЕМ СКРОЛЛ ПРИ ЗАКРЫТИИ БУРГЕРА
});
// Animation "якорные ссылки" start
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();
    const blockID = anchor.getAttribute('href')
    document.querySelector('' + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  });
}
// Modal pop
const btns = document.querySelectorAll('.application__btn');
const modalPop = document.querySelector('.modal');
const cancelBtn = document.querySelector('.login__box-cancel-pic');
const body = document.querySelector('body');

btns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    modalPop.classList.add('open');
    body.classList.add('open');
  });
});

cancelBtn.addEventListener('click', function () {
  modalPop.classList.remove('open');
  body.classList.remove('open');
});

body.addEventListener('wheel', function(event){
  if(modalPop.classList.contains('open')){
    event.preventDefault();
  }
}, {passive: false});
// Выод с помощью esc
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && modalPop.classList.contains('open')) {
    modalPop.classList.remove('open');
    body.classList.remove('open');
  }
});
// Выход с помощью нажатия в любую область экрана кроме модального окна
modalPop.addEventListener('click', function (event) {
  if (event.target === modalPop) {
    modalPop.classList.remove('open');
    body.classList.remove('open');
  }
});

// Slider app
let offset = 0; // смещение от левого края
const sliderLine = document.querySelector('.slider-line');
const dots = document.querySelectorAll('.dot');

document.querySelector('.slider-next').addEventListener('click', function(){
  offset += 237;
  if(offset >= 948) {
    offset = 0;
  }
  sliderLine.style.left = -offset + 'px';
  setActiveDot();

});
document.querySelector('.slider-prev').addEventListener('click', function(){
  offset -= 237;
  if(offset < 0) {
    offset = 711;
  }
  sliderLine.style.left = -offset + 'px';
  setActiveDot();
});
function setActiveDot() {
  dots.forEach(dot => dot.classList.remove('active'));
  const activeDot = dots[Math.floor(offset / 237)];
  activeDot.classList.add('active')
}
dots.forEach((dot, index) => {
  dot.addEventListener('click', function() {
    offset = index * 237;
    sliderLine.style.left = -offset + 'px';
    setActiveDot();
  });
});
let touchStartX = 0;
let touchEndX = 0;

sliderLine.addEventListener('touchstart', function(event) {
  touchStartX = event.changedTouches[0].clientX;
});

sliderLine.addEventListener('touchend', function(event) {
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe();
});
function handleSwipe() {
  if (touchEndX < touchStartX) {
    // свайп влево
    offset += 237;
    if(offset >= 948) {
      offset = 0;
    }
    sliderLine.style.left = -offset + 'px';
    setActiveDot();
  } else if (touchEndX > touchStartX) {
    // свайп вправо
    offset -= 237;
    if(offset < 0) {
      offset = 711;
    }
    sliderLine.style.left = -offset + 'px';
    setActiveDot();
  }
}
// Functional swiper
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    }
  }
});
// PRELOADER
window.onload = function(){
  let preloader = document.getElementById('preloader');
  preloader.classList.add('hide-preloader');
  setTimeout(function() {
      preloader.classList.add('preloader-hidden');
  },2000)
  }