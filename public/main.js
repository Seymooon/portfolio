const initPortfolio = () => {
  // 1. MOBILE MENU LOGIC
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    // Remove existing listeners to prevent duplicates on view transition swaps
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);

    newMenuToggle.addEventListener('click', () => {
      const isExpanded = newMenuToggle.classList.toggle('active');
      newMenuToggle.setAttribute('aria-expanded', isExpanded);
      mobileMenu.classList.toggle('open', isExpanded);
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        newMenuToggle.classList.remove('active');
        newMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. THEME TOGGLE LOGIC
const themeToggle = document.querySelector('#theme-toggle');

if (themeToggle) {

  themeToggle.addEventListener('click', () => {

    const isDark = document.documentElement.classList.toggle("dark");

    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );

  });

}

  // 3. REVEAL ANIMATIONS (Intersection Observer)
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

  // 4. RULER RENDERING
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
        tick.style.backgroundColor = 'var(--color-line, #e2e8f0)'; // Added fallback color
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

// INITIALIZATION
document.addEventListener('DOMContentLoaded', initPortfolio);
document.addEventListener('astro:after-swap', initPortfolio);