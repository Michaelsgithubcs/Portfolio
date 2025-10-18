// Mouse Parallax Effect
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.parallax-element');
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 100;
    mouseY = (e.clientY / window.innerHeight) * 100;
  });

  // Smooth animation loop
  function animate() {
    // Smooth interpolation for fluid movement - increased speed
    currentX += (mouseX - currentX) * 0.25;
    currentY += (mouseY - currentY) * 0.25;

    parallaxElements.forEach((element, index) => {
      const speed = parseFloat(element.getAttribute('data-speed')) || 0.8;
      const xOffset = (currentX - 50) * speed;
      const yOffset = (currentY - 50) * speed;
      
      // Add some rotation for extra dynamism - increased sensitivity
      const rotation = (currentX - 50) * 0.15;
      
      element.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
      
      // Add breathing effect
      const breathe = Math.sin(Date.now() * 0.001 + index) * 0.1 + 1;
      element.style.opacity = 0.1 + (Math.abs(xOffset + yOffset) * 0.001);
    });

    requestAnimationFrame(animate);
  }

  // Start animation only if user prefers motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animate();
  }

  // Add random floating animation for elements when mouse is idle
  let idleTimer;
  document.addEventListener('mousemove', () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      parallaxElements.forEach((element, index) => {
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        element.style.transition = 'transform 3s ease-in-out';
        element.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        
        setTimeout(() => {
          element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 3000);
      });
    }, 2000); // Start floating after 2 seconds of no mouse movement
  });
}

// Initialize parallax effect when DOM is loaded
document.addEventListener('DOMContentLoaded', initParallaxEffect);

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
      setTimeout(type, 150); // Adjust speed here (150ms between characters)
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

// Animate skills progress bars - only visible rows animate
function animateSkillsProgress() {
  const skillsSection = document.querySelector('.skills-section') || document.querySelector('#skills');
  if (!skillsSection) return;
  
  const progressFills = skillsSection.querySelectorAll('.progress-fill');
  if (progressFills.length === 0) return;

  console.log(`Found ${progressFills.length} progress bars`);

  // Initialize all progress bars
  progressFills.forEach((fill, index) => {
    const percentage = fill.getAttribute('data-percentage') || '0';
    
    // Remove ALL inline styles and animations to prevent conflicts
    fill.removeAttribute('style');
    
    // Disable any CSS animations
    fill.style.animation = 'none';
    fill.style.animationDelay = '0s';
    
    // Set initial state with clean transition
    fill.style.width = '0%';
    fill.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    fill.dataset.targetPercentage = percentage;
    
    console.log(`Bar ${index}: initialized at 0%, target ${percentage}%`);
  });

  // Group bars into rows of 4 for individual observation
  const rows = [];
  for (let i = 0; i < progressFills.length; i += 4) {
    const rowBars = Array.from(progressFills).slice(i, i + 4);
    if (rowBars.length > 0) {
      rows.push(rowBars);
    }
  }

  console.log(`Created ${rows.length} rows`);

  // Track which rows are currently visible
  const rowVisibility = {};

  // Animate a specific row
  function animateRow(rowBars, rowIndex) {
    console.log(`🎬 Animating row ${rowIndex}`);
    
    rowBars.forEach((fill, barIndex) => {
      const percentage = fill.dataset.targetPercentage;
      
      setTimeout(() => {
        fill.style.width = percentage + '%';
        console.log(`  Bar ${barIndex}: ${percentage}%`);
      }, barIndex * 100);
    });
  }

  // Reset a specific row
  function resetRow(rowBars, rowIndex) {
    console.log(`🔄 Resetting row ${rowIndex}`);
    
    rowBars.forEach(fill => {
      fill.style.width = '0%';
    });
  }

  // Observer for the entire skills section to reset everything when fully scrolled past
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // Section completely out of view - reset all rows
        console.log('❌ Skills section out of view - resetting all');
        rows.forEach((rowBars, rowIndex) => {
          resetRow(rowBars, rowIndex);
          rowVisibility[rowIndex] = false;
        });
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0
  });

  // Observer for individual rows
  const rowObserverOptions = {
    root: null,
    rootMargin: '0px 0px -20% 0px',
    threshold: 0.3
  };

  // Create observer for each row
  rows.forEach((rowBars, rowIndex) => {
    if (rowBars.length === 0) return;
    
    rowVisibility[rowIndex] = false;
    const triggerElement = rowBars[0].closest('div');
    
    const rowObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !rowVisibility[rowIndex]) {
          // Row is visible - animate it
          console.log(`✅ Row ${rowIndex} visible`);
          rowVisibility[rowIndex] = true;
          animateRow(rowBars, rowIndex);
        }
      });
    }, rowObserverOptions);

    if (triggerElement) {
      rowObserver.observe(triggerElement);
      console.log(`👀 Observing row ${rowIndex}`);
    }
  });

  // Observe the entire skills section for reset
  const skillsCard = skillsSection.querySelector('.skills-card-container') || skillsSection;
  sectionObserver.observe(skillsCard);
  
  console.log('👀 Observing entire skills section for reset');
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
