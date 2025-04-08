// Typing Animation Effect
const typingElement = document.querySelector('.typing');
const words = ['Web Developer', 'Designer', 'Problem Solver', 'Tech Enthusiast'];
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  const currentText = currentWord.substring(0, letterIndex);

  typingElement.textContent = currentText;

  if (!isDeleting && letterIndex < currentWord.length) {
    letterIndex++;
    setTimeout(typeEffect, 150);  // Typing speed
  } else if (isDeleting && letterIndex > 0) {
    letterIndex--;
    setTimeout(typeEffect, 100);  // Deleting speed
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 1000); // Pause before typing next word
  }
}

document.addEventListener('DOMContentLoaded', typeEffect);

// Smooth Scrolling for Navbar Links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 70,  // Adjust for navbar height
      behavior: 'smooth'
    });
  });
});

// Active Navbar Highlight on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;  // Adjust for navbar height
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active');
    }
  });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
}

// Scroll to Top Button
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '⬆️';
scrollTopButton.classList.add('btn', 'btn-primary', 'position-fixed');
scrollTopButton.style.bottom = '20px';
scrollTopButton.style.right = '20px';
scrollTopButton.style.display = 'none';
scrollTopButton.style.zIndex = '1000';
document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopButton.style.display = 'block';
  } else {
    scrollTopButton.style.display = 'none';
  }
});

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Animate Skills Progress Bars on Scroll
const skillSection = document.querySelector('#skills');
const progressBars = document.querySelectorAll('.progress-bar');

window.addEventListener('scroll', () => {
  const sectionPosition = skillSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (sectionPosition < screenPosition) {
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
      bar.style.transition = 'width 1.5s ease-in-out';
    });
  }
});

// Contact Form Validation
// const contactForm = document.querySelector('#contactForm');

// if (contactForm) {
//   contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const name = document.querySelector('#name').value.trim();
//     const email = document.querySelector('#email').value.trim();
//     const message = document.querySelector('#message').value.trim();

//     if (!name || !email || !message) {
//       alert('Please fill out all fields.');
//     } else if (!validateEmail(email)) {
//       alert('Please enter a valid email address.');
//     } else {
//       alert('Thank you for reaching out!');
//       contactForm.reset();
//     }
//   });
// }

// function validateEmail(email) {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(String(email).toLowerCase());
// }

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[data-src]');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('fade-in');
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '0px 0px 50px 0px',
  threshold: 0.01
});

lazyImages.forEach(img => {
  observer.observe(img);
});