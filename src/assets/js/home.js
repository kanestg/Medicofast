$(document).ready(function(){
          
    var options = {
        url: "js/countries.json",
        getValue: "name",
        template: {
            type: "description",
            fields: {
                description: "email"
            }
        },
        list: {
            match: {
                enabled: true
            }
        },
    
    };
    
    $("#form-autocomplete").easyAutocomplete(options);
    
              $(".Modern-Slider").slick({
                autoplay:true,
                pauseOnHover: true,
                pauseOnFocus: true,
                focusOnSelect: true,
                accessibility: false,
                infinite:true,
                autoplaySpeed:5000,
                speed:600,
                slidesToShow:1,
                slidesToScroll:1,
                dots:true,
                cssEase:'linear',
               // fade:true,
               // draggable:false,
                prevArrow:'<button class="PrevArrow"></button>',
                nextArrow:'<button class="NextArrow"></button>', 
              });
              
             })
              
             $('#product-slider').slick({
             dots: false,
             infinite: false,
             speed: 300,
             slidesToShow: 6,
             slidesToScroll: 4,
             nextArrow: '<div class="slick-next slick-arrow waves-effect fa fa-angle-right"></div>',
             prevArrow: '<div class="slick-prev slick-arrow waves-effect fa fa-angle-left"></div>',
             
             responsive: [
             {
             breakpoint: 1024,
             settings: {
             slidesToShow: 3,
             slidesToScroll: 3,
             infinite: true,
             dots: true
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
             breakpoint: 480,
             settings: {
             slidesToShow: 1,
             slidesToScroll: 1
             }
             }
             // You can unslick at a given breakpoint now by adding:
             // settings: "unslick"
             // instead of a settings object
             ]
             });
             
             $('#product-slider2').slick({
             dots: false,
             infinite: false,
             speed: 300,
             slidesToShow: 5,
             slidesToScroll: 4,
             nextArrow: '<div class="slick-next slick-arrow waves-effect fa fa-angle-right"></div>',
             prevArrow: '<div class="slick-prev slick-arrow waves-effect fa fa-angle-left"></div>',
             
             
             responsive: [
             {
             breakpoint: 1024,
             settings: {
             slidesToShow: 3,
             slidesToScroll: 3,
             infinite: true,
             dots: true
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
             breakpoint: 480,
             settings: {
             slidesToShow: 1,
             slidesToScroll: 1
             }
             }
             // You can unslick at a given breakpoint now by adding:
             // settings: "unslick"
             // instead of a settings object
             ]
             });