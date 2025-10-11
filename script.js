// Typing effect for hero name
function createTypingEffect() {
  const text = "Mike Ndlovu";
  const typingElement = document.getElementById('typing-text');
  const cursor = document.getElementById('cursor');
  let index = 0;

  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100); // Adjust speed here (100ms between characters)
    } else {
      // Keep cursor blinking after typing is complete
      cursor.style.animation = 'blink 1s infinite';
    }
  }

  // Start typing effect when page loads
  setTimeout(() => {
    typingElement.textContent = '';
    type();
  }, 500); // Delay before starting
}

// Initialize typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', createTypingEffect);

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
      if (percentage) {
        fill.style.width = percentage + '%';
      }
    });
  }

  // Check if section is already visible on page load
  function checkIfVisible() {
    const rect = skillsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    return isVisible;
  }

  // Try IntersectionObserver first
  if ('IntersectionObserver' in window) {
    let animated = false;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          // Small delay to ensure DOM is ready
          setTimeout(animate, 100);
          animated = true;
          obs.disconnect();
        }
      });
    }, { 
      threshold: 0.1, // Lower threshold for better mobile detection
      rootMargin: '0px 0px -50px 0px' // Trigger slightly earlier
    });
    observer.observe(skillsSection);
    
    // Fallback: if not triggered within 2 seconds, force animate
    setTimeout(() => {
      if (!animated) {
        animate();
        animated = true;
        observer.disconnect();
      }
    }, 2000);
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
    
    // Check immediately on load
    if (checkIfVisible()) {
      setTimeout(animate, 100);
    } else {
      onScroll();
    }
  }
}

// Ensure animation runs when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  animateSkillsProgress();
  
  // Additional fallback: run animation after a delay to ensure everything is loaded
  setTimeout(animateSkillsProgress, 1000);
});

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
