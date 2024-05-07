const subMenu = document.querySelector('.menu-with-scroll');
  
      subMenu.addEventListener('mouseenter', () => {
          subMenu.style.overflowY = 'auto';
      });
  
      subMenu.addEventListener('mouseleave', () => {
          subMenu.style.overflowY = 'hidden';
      });