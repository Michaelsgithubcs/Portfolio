// Mouse Parallax Effect
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.parallax-element');
  const parallaxContainer = document.querySelector('.parallax-container');
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  
  // Add variety to existing elements (#1, #2, #3)
  const colors = ['color-blue', 'color-purple', 'color-green', 'color-orange', 'color-pink', 'color-cyan', 'color-red', 'color-yellow'];
  const sizes = ['size-small', 'size-medium', 'size-large'];
  
  parallaxElements.forEach((element, index) => {
    // Add random color
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    element.classList.add(randomColor);
    
    // Add random size
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    element.classList.add(randomSize);
    
    // Add pulse animation to 30% of elements (#5)
    if (Math.random() > 0.7) {
      element.classList.add('pulse');
    }
    
    // Add float animation to 40% of elements (#6)
    if (Math.random() > 0.6) {
      element.classList.add('float');
    }
    
    // Click/Tap effect (#7)
    element.style.pointerEvents = 'auto';
    element.addEventListener('click', function(e) {
      const originalTransform = this.style.transform;
      const originalOpacity = this.style.opacity;
      
      this.style.transform = 'scale(1.5) rotate(360deg)';
      this.style.opacity = '0.6';
      this.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      
      setTimeout(() => {
        this.style.transform = originalTransform;
        this.style.opacity = originalOpacity;
      }, 500);
    });
  });

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

// Mobile: Device Tilt Effect (#14)
if (window.DeviceOrientationEvent && /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)) {
  window.addEventListener('deviceorientation', (e) => {
    const tiltX = e.gamma || 0; // Left-right tilt (-90 to 90)
    const tiltY = e.beta || 0;  // Front-back tilt (-180 to 180)
    
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-speed')) || 0.8;
      const moveX = tiltX * speed * 2;
      const moveY = tiltY * speed * 2;
      
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
}

// Mobile: Touch Drag Elements (#15)
if ('ontouchstart' in window) {
  document.addEventListener('DOMContentLoaded', () => {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
      element.style.pointerEvents = 'auto';
      
      let startX, startY, initialX, initialY;
      
      element.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        
        const transform = element.style.transform;
        const match = transform.match(/translate\((.+?)px, (.+?)px\)/);
        initialX = match ? parseFloat(match[1]) : 0;
        initialY = match ? parseFloat(match[2]) : 0;
        
        element.style.opacity = '0.6';
        element.style.transition = 'none';
      });
      
      element.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        
        element.style.transform = `translate(${initialX + deltaX}px, ${initialY + deltaY}px)`;
      });
      
      element.addEventListener('touchend', () => {
        element.style.opacity = '';
        element.style.transition = '';
      });
    });
  });
}

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

  // Track which rows are currently visible and scroll position
  const rowVisibility = {};
  let lastScrollY = window.scrollY;
  let isScrollingUp = false;

  // Track scroll direction
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    isScrollingUp = currentScrollY < lastScrollY;
    lastScrollY = currentScrollY;
  }, { passive: true });

  // Animate a specific row (with direction awareness)
  function animateRow(rowBars, rowIndex, scrollingUp = false) {
    console.log(`🎬 Animating row ${rowIndex} (${scrollingUp ? '⬆️ scrolling up' : '⬇️ scrolling down'})`);
    
    // If scrolling up, reverse the animation order within the row
    const barsToAnimate = scrollingUp ? [...rowBars].reverse() : rowBars;
    
    barsToAnimate.forEach((fill, barIndex) => {
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
          animateRow(rowBars, rowIndex, isScrollingUp);
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

// Hamburger menu toggle with icon switching and drag-to-close
const hamburger = document.getElementById('hamburger-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.getElementById('menu-overlay');

let isMenuOpen = false;
const icon1 = 'assets/hamburger.png';
const icon2 = 'assets/hamburger2.png';

// Drag to close variables
let startY = 0;
let currentY = 0;
let isDragging = false;
let initialTransform = 0;

if (hamburger && navLinks && hamburgerIcon && menuOverlay) {
  hamburger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    menuOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    
    // Smooth icon transition
    hamburgerIcon.style.opacity = '0';
    hamburgerIcon.style.transform = 'rotate(90deg) scale(0.8)';
    
    setTimeout(() => {
      hamburgerIcon.src = isMenuOpen ? icon2 : icon1;
      hamburgerIcon.style.opacity = '1';
      hamburgerIcon.style.transform = 'rotate(0deg) scale(1)';
    }, 150);
  });
  
  // Touch events for drag-to-close
  navLinks.addEventListener('touchstart', (e) => {
    if (!navLinks.classList.contains('open')) return;
    
    // Only start drag from the top area (drag handle)
    const touch = e.touches[0];
    const rect = navLinks.getBoundingClientRect();
    const touchY = touch.clientY - rect.top;
    
    if (touchY < 60) { // Top 60px is drag area
      isDragging = true;
      startY = touch.clientY;
      currentY = touch.clientY;
      navLinks.classList.add('dragging');
      navLinks.style.transition = 'none';
    }
  }, { passive: true });
  
  navLinks.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;
    
    // Only allow dragging down
    if (deltaY > 0) {
      navLinks.style.transform = `translateY(${deltaY}px)`;
    }
  }, { passive: true });
  
  navLinks.addEventListener('touchend', () => {
    if (!isDragging) return;
    
    isDragging = false;
    navLinks.classList.remove('dragging');
    navLinks.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    
    const deltaY = currentY - startY;
    
    // Close if dragged more than 100px down
    if (deltaY > 100) {
      closeMenu();
    } else {
      // Snap back
      navLinks.style.transform = 'translateY(0)';
    }
  });
  
  // Close menu when clicking overlay
  menuOverlay.addEventListener('click', closeMenu);
  
  // Close menu on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  function closeMenu() {
    isMenuOpen = false;
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
    navLinks.style.transform = '';
    
    // Reset icon
    hamburgerIcon.style.opacity = '0';
    hamburgerIcon.style.transform = 'rotate(90deg) scale(0.8)';
    
    setTimeout(() => {
      hamburgerIcon.src = icon1;
      hamburgerIcon.style.opacity = '1';
      hamburgerIcon.style.transform = 'rotate(0deg) scale(1)';
    }, 150);
  }
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

// See More Projects Functionality
document.addEventListener('DOMContentLoaded', function() {
  const seeMoreBtn = document.getElementById('see-more-btn');
  const hiddenProject = document.querySelector('.hidden-project');
  
  if (seeMoreBtn && hiddenProject) {
    seeMoreBtn.addEventListener('click', function() {
      if (hiddenProject.style.display === 'none' || hiddenProject.style.display === '') {
        hiddenProject.style.display = 'block';
        seeMoreBtn.textContent = 'See Less Projects';
      } else {
        hiddenProject.style.display = 'none';
        seeMoreBtn.textContent = 'See More Projects';
      }
    });
  }
});
