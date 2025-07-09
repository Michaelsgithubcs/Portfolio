function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Animate skills progress bars on scroll
function animateSkillsProgress() {
  const skillsSection = document.querySelector('.skills-section');
  if (!skillsSection) return;
  const progressFills = skillsSection.querySelectorAll('.progress-fill');

  // Set all bars to 0 width initially
  progressFills.forEach(fill => {
    fill.style.width = '0';
  });

  function animate() {
    progressFills.forEach(fill => {
      const percentage = fill.getAttribute('data-percentage');
      fill.style.width = percentage + '%';
    });
  }

  if ('IntersectionObserver' in window) {
    let animated = false;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animate();
          animated = true;
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(skillsSection);
  } else {
    // Fallback for older browsers
    function onScroll() {
      const rect = skillsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        animate();
        window.removeEventListener('scroll', onScroll);
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
  }
}

document.addEventListener('DOMContentLoaded', animateSkillsProgress);

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Close menu on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// Header background on scroll
const mainHeader = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    mainHeader.classList.add('scrolled');
  } else {
    mainHeader.classList.remove('scrolled');
  }
});

// Smooth scroll for nav links
const navLinksAll = document.querySelectorAll('.nav-links a');
navLinksAll.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 64,
          behavior: 'smooth'
        });
      }
    }
  });
});
