// Write your JavaScript here...
$(document).ready(function(){
    $('.news-carousel-container').slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
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

$(window).resize(function () {
    $('.news-carousel-container').not('.slick-initialized').slick('resize');
});

$(window).on('orientationchange', function () {
    $('.news-carousel-container').not('.slick-initialized').slick('resize');
});