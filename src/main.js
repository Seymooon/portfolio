const initPortfolio = () => {
  // Mobile Full Screen Menu Framework Trigger
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    // Strip old hanging click event handlers if any
    menuToggle.onclick = null;
    
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      mobileMenu.classList.toggle('open', isExpanded);
      
      // Freeze scrolling background behind full screen menu
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    // Close screen menu immediately when user clicks individual panel links
    const overlayLinks = mobileMenu.querySelectorAll('nav a');
    overlayLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Intersection Observer for scroll visibility elements
  const revealElements = document.querySelectorAll('.reveal, .reveal-group > *');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observerOptions = { root: null, threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // Auto layout timeline tick rendering tracker
  const rulers = document.querySelectorAll('.ruler.static');
  rulers.forEach(ruler => {
    ruler.innerHTML = '';
    const width = ruler.offsetWidth;
    const tickCount = Math.floor(width / 10);
    for (let i = 0; i < tickCount; i++) {
      const tick = document.createElement('div');
      tick.style.position = 'absolute';
      tick.style.left = `${i * 10}px`;
      tick.style.width = '1px';
      if (i % 10 === 0) {
        tick.style.height = '100%';
        tick.style.backgroundColor = 'var(--color-line)';
      } else if (i % 5 === 0) {
        tick.style.height = '60%';
        tick.style.backgroundColor = 'rgba(42, 46, 56, 0.7)';
      } else {
        tick.style.height = '30%';
        tick.style.backgroundColor = 'rgba(42, 46, 56, 0.4)';
      }
      ruler.appendChild(tick);
    }
  });
};

document.addEventListener('DOMContentLoaded', initPortfolio);
document.addEventListener('astro:after-swap', initPortfolio);