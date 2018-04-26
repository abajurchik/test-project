$(document).ready(function(){

    //carousel

    $('#analog-products__slider').owlCarousel({
        items:5,
        loop:true,
        autoplayTimeout:2000,
        nav:true,
        pagination : false
    });
   $('#analog-products__slider3').owlCarousel({
        items:5,
        loop:true,
        autoplayTimeout:2000,
        nav:true,
        margin: 2,
        pagination : false
    });

    //end carousel

    //mix

    $('#filter-project').mixItUp({
        load: {
            filter: '.characteristic-filter'
        }
    });

    //end mix

    // FancyBox - galery
    $(".fancybox").fancybox({
        // Default - with fix from scroll to top
        helpers: {
            overlay: {
                locked: false
            }
        }
    });
    // End of FancyBox - galery





});