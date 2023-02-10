// Write your JavaScript here...
$(document).ready(function(){
    $('.news-carousel-container').slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: true,
        prevArrow:'.arrow.p',
        nextArrow:'.arrow.n',
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
            },
            {
            breakpoint: 500,
            settings: 'unslick'
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object

        ]
    });
  });

//Script for showcase-slideshow - Kevin
$(document).ready(function() {
    $('.slider_inner').slick({
      infinite: true,
      arrows: true,
      nextArrow: '.arrow.next-showcase',
      prevArrow: '.arrow.prev-showcase',
      fade: true,
      dots: true
    })
  });
  

$(window).resize(function () {
    $('.news-carousel-container').not('.slick-initialized').slick('resize');
});

$(window).on('orientationchange', function () {
    $('.news-carousel-container').not('.slick-initialized').slick('resize');
});
$(document).ready(function () {
    $(".slick-slideshow").slick({
      dots: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: ".arrow.next",
      prevArrow: ".arrow.previous",

      //  variableWidth: true,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        ,
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 450,
          // setting the settings property
          // to 'unslick' to destroy the slideshow
          settings: "unslick",
        },

        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });
  $(window).resize(function () {
    $(".slick-slideshow").not(".slick-initialized").slick("resize");
  });

  $(window).on("orientationchange", function () {
    $(".slick-slideshow").not(".slick-initialized").slick("resize");
  });


//script for navbar - dropdown menu; - Kevin
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".dropdown-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("show-menu");
})

document.querySelectorAll(".nav-menu ul li").forEach(n => n.addEventListener("click", () =>{
  hamburger.classList.remove("active");
  navMenu.classList.remove("show-menu");}))


  //script for video window - Erik + Kevin

const modWrapper = document.getElementById("vid-modal-wrapper");
const playBtn = document.querySelector(".play-btn");
const modalBackdrop = document.querySelector(".modalBackdrop");


function showModal() {
  modWrapper.classList.add("show");
  playBtn.style.display = "none";
  modalBackdrop.classList.add("show");
};

function hideModal() {
  modWrapper.classList.remove("show");
  playBtn.style.display = "flex";
  modalBackdrop.classList.remove("show");

};
