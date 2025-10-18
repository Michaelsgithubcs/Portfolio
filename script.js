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

// Animate skills progress bars by rows on scroll - simple animate once version
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
    fill.dataset.hasAnimated = 'false';
    
    console.log(`Bar ${index}: initialized at 0%, target ${percentage}%`);
  });

  // Group bars into rows of 4
  const rows = [];
  for (let i = 0; i < progressFills.length; i += 4) {
    const rowBars = Array.from(progressFills).slice(i, i + 4);
    if (rowBars.length > 0) {
      rows.push(rowBars);
    }
  }

  console.log(`Created ${rows.length} rows`);

  // Animate row once when visible
  function animateRow(rowBars, rowIndex) {
    // Check if all bars in row have been animated
    const alreadyAnimated = rowBars.every(fill => fill.dataset.hasAnimated === 'true');
    if (alreadyAnimated) {
      console.log(`Row ${rowIndex} already animated, maintaining state`);
      return;
    }
    
    console.log(`Animating row ${rowIndex}`);
    
    rowBars.forEach((fill, barIndex) => {
      if (fill.dataset.hasAnimated === 'false') {
        const percentage = fill.dataset.targetPercentage;
        
        setTimeout(() => {
          // Ensure no animations interfere
          fill.style.animation = 'none';
          fill.style.animationDelay = '0s';
          
          // Set the width
          fill.style.width = percentage + '%';
          fill.dataset.hasAnimated = 'true';
          
          console.log(`✓ Bar ${barIndex} in row ${rowIndex} animated to ${percentage}% (locked)`);
          
          // Lock the width after animation completes to prevent resets
          setTimeout(() => {
            fill.style.width = percentage + '%';
            console.log(`✓ Bar ${barIndex} width locked at ${percentage}%`);
          }, 1000);
        }, barIndex * 100);
      }
    });
  }

  // IntersectionObserver - only animates, no reset
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -20% 0px',
    threshold: 0.3
  };

  // Create observer for each row
  rows.forEach((rowBars, rowIndex) => {
    if (rowBars.length === 0) return;
    
    const triggerElement = rowBars[0].closest('div');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Only animate when becoming visible, ignore when leaving
        if (entry.isIntersecting) {
          animateRow(rowBars, rowIndex);
        }
      });
    }, observerOptions);

    if (triggerElement) {
      observer.observe(triggerElement);
      console.log(`Observer created for row ${rowIndex}`);
    }
  });
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
