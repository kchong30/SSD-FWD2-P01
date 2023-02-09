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


$(document).ready(function() {
    $('.slider_inner').slick({
      infinite: true,
      arrows: true,
      nextArrow: '.arrow.nexty',
      prevArrow: '.arrow.prev',
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

  