 // Function to rotate the testimonials in a loop
 function rotateTestimonials() {
    let testimonials = document.querySelectorAll('.testimonial-cont');
    let currentIndex = 0;
  
    function showTestimonial(index) {
      testimonials[currentIndex].style.display = 'none';
      testimonials[index].style.display = 'block';
      currentIndex = index;
    }
  
    function nextTestimonial() {
      let nextIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(nextIndex);
    }
  
    setInterval(nextTestimonial, 3000); // Rotate every 3 seconds (3000 milliseconds)
  }
  
  // Call the function to start the slideshow
  window.onload = rotateTestimonials;