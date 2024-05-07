      // Initialize Swiper
      var mySwiper = new Swiper('#headscroll', {
        // Your Swiper configuration options here
    });

    // Function to auto slide every 5 seconds
    function autoSlide() {
        setInterval(function () {
            mySwiper.slideNext();
        }, 5000); // Change slide every 5 seconds (5000 milliseconds)
    }

    // Call the autoSlide function
    autoSlide();