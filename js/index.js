// 파티클
particlesJS("particles-js", {
  particles: {
    number: { value: 160, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 1,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0, sync: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 4, size_min: 0.3, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 600 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "bubble" },
      onclick: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 250, size: 1, duration: 2, opacity: 0.2, speed: 3 },
      repulse: { distance: 400, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});

// end

// 섹션이동
var menu = ['HOME', 'PORTFOLIO', 'SKILL', 'PROFILE']
var menu_in = menu.index;
var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  touchRatio: 0,
  slidesPerView: 1,
  spaceBetween: 30,
  mousewheel: true,
  speed: 900,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (menu[index]) + '</span>';
    },
  },

  on: {
    init: function () {
      $(".swiper-pagination-bullet-active").addClass("on");
    },

    slideChange: function () {
      $(".swiper-pagination-bullet").removeClass("on");
      $(".swiper-pagination-bullet-active").addClass("on");
    }
  }
});

// 프로젝트

// card animation
// $(function () {
//   $(".card__inner").hover(function () {
//     $(this).css("animation-play-state", "paused").siblings().css("animation", "motion 1.5s linear 0s infinite alternate").click(function(){

//     });
//   }, function () {
//     $(this).css("animation", "motion 1.5s linear 0s infinite alternate");
//   })
// });
//end

// $(function(){
//   $(".card__inner").mouseenter(function(){
//     $(this).css("animation-play-state", "paused").siblings().css("animation", "motion 1.5s linear 0s infinite alternate");
//     $(this).click(function(){
//       $(this).css("animation-play-state", "paused");
//     })
//   })
// });

// $(function(){
//   $(".card__inner").mouseleave(function(){
//     $(this).css("animation", "motion 1.5s linear 0s infinite alternate");
//     // $(this).click(function())
//   })
// });



//img 360rotate
var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 120; // width of images (unit: px)
var imgHeight = 170; // height of images (unit: px)
var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true;
// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes ? 'running' : 'paused');
}

var sX, sY, nX, nY, desX = 0,
  desY = 0,
  tX = 0,
  tY = 10;

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}
//end

// setup events
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
    sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
      nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };
  return false;
};

document.onmousewheel = function (e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};

// end

// drag mouse event
$(".info_list_inner li").hover(function () {

  $(".info_list_inner li").mousemove(function (event) {

    var liIdx = $(this).index();
    $(".popup").eq(liIdx).css("opacity", 1);

    var headerWidth = $("header").width();
    var popupWidth = $(".popup").eq(liIdx).width();
    var popupHeight = $(".popup").eq(liIdx).height();

    $(".popup").css("top", event.clientY - popupHeight - 50);
    $(".popup").css("left", event.clientX - headerWidth - popupWidth - 70);

    if ($(".info_list_inner").css("opacity") < 1) {
      $(".popup").css("opacity", 0);
    }
  });

}, function () {
  var liIdx = $(this).index();
  $(".popup").eq(liIdx).stop().css("opacity", 0);
});

// popup이 마우스를 따라 이동하는 효과
document.addEventListener("mousemove", e => {
  gsap.to(".popup", {
    x: e.clientX - 1250,
    y: e.clientY - 490
  })
})
//end

//portfolio slide
gsap.registerPlugin(Flip);

// Variables
const activeClass = "is-active";
const cards = document.querySelectorAll("[data-card]");

const updateCard = (card, idx, active) => {
  const cardInner = card.querySelector(".card__inner");
  const image = card.querySelector(".card__image");

  // Bail out if we're in the middle of a flip
  if (Flip.isFlipping(cardInner)) return;

  const cardState = Flip.getState(cardInner, {
    props: "box-shadow, border-radius"
  });
  const imageState = Flip.getState(image);
  card.classList.toggle(activeClass, active);

  const duration = active ? 0.7 : 0.5;
  const ease = "quint.out";

  const cardContent = document.querySelectorAll(".content__group")[idx];
  gsap.killTweensOf(cardContent);
  gsap.to(cardContent, {
    duration: active ? 1 : 0.2,
    ease: "expo.out",
    stagger: 0.1,
    alpha: active ? 1 : 0,
    width: active ? "50%" : 0,
    height: active ? "100%" : 0,
    y: active ? 0 : 20,
    delay: active ? 0.4 : 0
  });

  Flip.from(cardState, {
    duration: duration,
    ease: ease,
    absolute: true,
    zIndex: 1
  });

  Flip.from(imageState, {
    duration: duration,
    absolute: true,
    ease: ease,
    simple: true
  });
};

// Init
cards.forEach((card, idx) => {
  updateCard(card, idx, false);
  card.addEventListener("click", (evt) => {
    updateCard(card, idx, !card.classList.contains(activeClass));
  });
});

// end

// card click header none

$(function () {
  let count = 0;

  $(".card").off("click").on("click", function () {

    if (count == 0) {
      $(".header").hide();
      count++;

    } else {
      $(".header").show();
      count--;
    }
  })
});

$(".card__image").off("click").click(function () {
  $(this).find(".center").toggle();
});

