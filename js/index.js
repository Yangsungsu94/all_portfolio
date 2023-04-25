// scroll top0

// window.onload=function(){
//   setTimeout(function(){
//     scrollTo(0,0);
//   },100);
// }

// end

// swiper
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
//end

// ainmation up down

// img rotate

$(function () {
  $(".swiper-slide").hover(function () {
    $(this).css("animation-play-state", "paused").siblings().css("animation", "motion 0.7s linear 0s infinite alternate");
    $(this).find(".slide_img_hover").css("opacity", "0");
    $(this).find(".slide_img_hover_p").css("display", "none");

  }, function () {
    $(this).css("animation", "motion 0.7s linear 0s infinite alternate");
    $(this).find(".slide_img_hover").css("opacity", "0.9");
    $(this).find(".slide_img_hover_p").css("display", "block");
  })
})

// end

var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 120; // width of images (unit: px)
var imgHeight = 170; // height of images (unit: px)


var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true;
/*
     NOTE:
       + imgWidth, imgHeight will work for video
       + if imgWidth, imgHeight too small, play/pause button in <video> will be hidden
       + Music link are taken from: https://hoangtran0410.github.io/Visualyze-design-your-own-/?theme=HauMaster&playlist=1&song=1&background=28
       + Custom from code in tiktok video  https://www.facebook.com/J2TEAM.ManhTuan/videos/1353367338135935/
*/

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

// add background music
if (bgMusicURL) {
  document.getElementById('music-container').innerHTML += `
<audio src="${bgMusicURL}" ${bgMusicControls ? 'controls' : ''} autoplay loop>    
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>
`;
}

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
      x: e.clientX -1150,
      y: e.clientY -400
  })
})
//end

// card
// gsap.registerPlugin(Flip);

// const activeClass = "is-active";
// const inactiveClass = "is-inactive";
// const cards = document.querySelectorAll(".card");

// cards.forEach((card, idx) => {
//   card.addEventListener("click", () => {
//     const state = Flip.getState(cards);
//     const isCardActive = card.classList.contains(activeClass);

//     cards.forEach((otherCard, otherIdx) => {
//       otherCard.classList.remove(activeClass);
//       otherCard.classList.remove(inactiveClass);
//       if (!isCardActive && idx !== otherIdx)
//         otherCard.classList.add(inactiveClass);
//     });

//     if (!isCardActive) {
//       card.classList.add(activeClass);
//     }

//     Flip.from(state, {
//       duration: 1,
//       ease: "expo.out",
//       absolute: true
//     });
//   });
// });

// end


// 내가 원하던거
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