// Navbar scroll effect
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  navbar.classList.toggle('menu-open');
  // When menu opens, force navbar to look scrolled for white bg
  if (!navbar.classList.contains('scrolled') && navbar.classList.contains('menu-open')) {
    navbar.classList.add('scrolled');
  } else if (window.pageYOffset <= 50 && !navbar.classList.contains('menu-open')) {
    navbar.classList.remove('scrolled');
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('menu-open');
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Counter animation for stats
      if (entry.target.classList.contains('stat-item')) {
        const numElement = entry.target.querySelector('.stat-num');
        if (numElement && !numElement.classList.contains('counted')) {
          animateValue(numElement, 0, parseInt(numElement.getAttribute('data-val')), 2000);
          numElement.classList.add('counted');
        }
      }
      
      // Stop observing once animated
      if (!entry.target.classList.contains('stat-item')) {
         observer.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Number counter animation function
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Ease out quad
    const easeProgress = progress * (2 - progress);
    obj.innerHTML = Math.floor(easeProgress * (end - start) + start) + (end > 20 ? '+' : '');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});
