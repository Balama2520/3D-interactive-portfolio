// ============ IMPORT STYLES ============
import "./style.css";
import Experience from "./Experience/Experience";

// ============ INITIALIZE 3D EXPERIENCE ============
const experience = new Experience(document.querySelector(".experience-canvas"));

// ============ CUSTOM CURSOR ============
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 100);
  });

  document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.3)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

// ============ PARTICLES.JS ============
if (window.particlesJS) {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#667eea' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#667eea',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
}

// ============ SCROLL PROGRESS BAR ============
window.addEventListener('scroll', () => {
  const bar = document.querySelector('.scroll-progress-bar');
  if (!bar) return;

  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  bar.style.width = scrolled + '%';
});


// ============ MUSIC PLAYER (IMPROVED & SAFE) ============
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const volumeSlider = document.getElementById('volumeSlider');

let musicPlaying = localStorage.getItem('musicPlaying') === 'true';

if (bgMusic) {
  bgMusic.volume = 0.3;

  // Restore music state
  if (musicPlaying) {
    bgMusic.play().catch(() => {});
    musicToggle?.classList.add('playing');
  }
}

if (musicToggle && bgMusic) {
  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        musicToggle.classList.add('playing');
        localStorage.setItem('musicPlaying', 'true');
        showToast('🎵 Music On', 'fa-music');
      }).catch(() => {
        showToast('Click anywhere to enable music', 'fa-info-circle');
      });
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
      localStorage.setItem('musicPlaying', 'false');
      showToast('⏸ Music Off', 'fa-pause');
    }
  });
}

if (volumeSlider && bgMusic) {
  volumeSlider.value = 30;
  volumeSlider.addEventListener('input', (e) => {
    bgMusic.volume = e.target.value / 100;
  });
}
// 🔓 REQUIRED: Browser audio unlock on first interaction
const unlockAudio = () => {
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
  document.removeEventListener('click', unlockAudio);
};

document.addEventListener('click', unlockAudio);



// ============ THEME TOGGLE ============
const toggleButton = document.querySelector('.toggle-button');
const toggleCircle = document.querySelector('.toggle-circle');
const body = document.body;

if (toggleButton && toggleCircle) {
  toggleButton.addEventListener('click', () => {
    toggleCircle.classList.toggle('slide');
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
    
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    showToast(`${theme.charAt(0).toUpperCase() + theme.slice(1)} mode activated`, 'fa-adjust');
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    toggleCircle.classList.add('slide');
  }
}

// ============ BACK TO TOP ============
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Back to top!', 'fa-arrow-up');
  });
}

// ============ TOAST NOTIFICATION ============
function showToast(message, iconClass = 'fa-check-circle') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  const toastMessage = toast.querySelector('.toast-message');
  const toastIcon = toast.querySelector('i');
  
  toastMessage.textContent = message;
  toastIcon.className = `fas ${iconClass}`;
  
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ============ TYPEWRITER EFFECT ============
const typewriterText = document.querySelector('.typewriter');
if (typewriterText) {
  const text = typewriterText.textContent;
  typewriterText.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      typewriterText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 120);
    }
  };
  
  setTimeout(typeWriter, 500);
}

// ============ ROTATING ROLE TEXT ============
const roleText = document.querySelector('.role-text');
if (roleText) {
  const roles = [
    'Software Engineer',
    'AI/ML Engineer',
    'Data Analyst',
    'Full-Stack Developer',
    'Computer Vision Expert',
    'Data Scientist'
  ];
  
  let currentRole = 0;
  
  const rotateRole = () => {
    roleText.style.opacity = '0';
    
    setTimeout(() => {
      roleText.textContent = roles[currentRole];
      roleText.style.opacity = '1';
      currentRole = (currentRole + 1) % roles.length;
    }, 500);
  };
  
  roleText.textContent = roles[0];
  roleText.style.transition = 'opacity 0.5s ease';
  setInterval(rotateRole, 3000);
}

// ============ ANIMATED COUNTERS ============
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += step;
    if (current < target) {
      element.textContent = Math.floor(current) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  };
  
  updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      animateCounter(entry.target);
      entry.target.classList.add('counted');
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(counter => {
  counterObserver.observe(counter);
});

// ============ SKILL BARS ANIMATION ============
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillFills = entry.target.querySelectorAll('.skill-fill');
      skillFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
          fill.style.width = width;
        }, 100);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
  skillObserver.observe(category);
});

// ============ PROJECT CARD TILT ============
document.querySelectorAll('.project-card[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });
});

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
      showToast('Please fill all fields', 'fa-exclamation-triangle');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email', 'fa-exclamation-triangle');
      return;
    }
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      showToast('Message sent successfully!', 'fa-check-circle');
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      console.log('Form Data:', { name, email, message });
    }, 2000);
  });
}

// ============ SMOOTH SCROLL FOR ARROW ============
const arrowWrapper = document.querySelector('.arrow-svg-wrapper');
if (arrowWrapper) {
  arrowWrapper.addEventListener('click', () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });
}

// ============ FADE IN ON SCROLL ============
const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeInObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .timeline-item, .education-card, .cert-badge').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeInObserver.observe(el);
});

// ============ PRELOADER ============
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }
    
    const toggleBar = document.querySelector('.toggle-bar');
    if (toggleBar) {
      toggleBar.style.opacity = '1';
    }
    
    const arrow = document.querySelector('.arrow-svg-wrapper');
    if (arrow) {
      arrow.style.opacity = '1';
    }
    bgMusic?.pause(); // ensures no accidental autoplay

    
    showToast('🚀 Welcome to ABM  portfolio!', 'fa-rocket');
  }, 2000);
});

// ============ EASTER EGG - KONAMI CODE ============
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      showToast('🎮 Konami Code! You found the Easter Egg!', 'fa-gamepad');
      document.body.style.animation = 'rainbow-bg 5s linear infinite';
      konamiIndex = 0;
      
      setTimeout(() => {
        document.body.style.animation = '';
      }, 5000);
    }
  } else {
    konamiIndex = 0;
  }
});

// Rainbow animation for Easter egg
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow-bg {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const toast = document.getElementById('toast');
    if (toast && toast.classList.contains('show')) {
      toast.classList.remove('show');
    }
  }
  
  if (e.ctrlKey && e.key === '/') {
    showToast('🎹 Shortcuts: ↑ to top, ESC to close', 'fa-keyboard');
  }
});

// ============ LAZY LOAD IMAGES ============
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============ PERFORMANCE MONITORING ============
if (window.performance) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #667eea; font-size: 14px; font-weight: bold;');
  });
}

// ============ CONSOLE MESSAGES ============
console.log('%c👋 Hello there, fellow developer!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%c🎨 Love the rainbow colors? Check out the code!', 'font-size: 14px; color: #0072ff;');
console.log('%c💼 Looking to hire? Email: abalamaneesh@gmail.com', 'font-size: 12px; color: #38ef7d;');
console.log('%c🚀 Built with Three.js, GSAP, Particles.js, and passion!', 'font-size: 12px; color: #f5576c;');
console.log('%c⭐ Try the Konami Code for a surprise!', 'font-size: 12px; color: #eea849;');

// ============ EXPORT FOR TESTING ============
export { showToast, animateCounter };