// ===== Navbar: scroll effect & mobile toggle ===== 
const navbar = document.querySelector('.navbar'); 
const navToggle = document.getElementById('navToggle'); 
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => { 
    if (window.scrollY > 50) { 
        navbar.classList.add('scrolled'); 
    } else { 
        navbar.classList.remove('scrolled'); 
    } 
    updateActiveNav(); 
    toggleScrollTop(); 
});

navToggle.addEventListener('click', () => { 
    const isOpen = navLinks.classList.toggle('open'); 
    navToggle.classList.toggle('open'); 
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false'); 
});

// Close mobile nav when a link is clicked 
navLinks.querySelectorAll('a').forEach(link => { 
    link.addEventListener('click', () => { 
        navToggle.classList.remove('open'); 
        navLinks.classList.remove('open'); 
        navToggle.setAttribute('aria-expanded', 'false'); 
    }); 
});

// ===== Active nav link on scroll (optimised) ===== 
// Cache sections and links once; clear actives once per scroll tick 
const sections = Array.from(document.querySelectorAll('section[id]')); 
const allNavLinks = Array.from(navLinks.querySelectorAll('a'));

function updateActiveNav() { 
    const scrollPos = window.scrollY + 80; 
    let activeLinkFound = false;

    for (let i = sections.length - 1; i >= 0; i--) { 
        if (scrollPos >= sections[i].offsetTop) { 
            const id = sections[i].getAttribute('id'); 
            // Fixed the template literal syntax error below:
            const link = allNavLinks.find(l => l.getAttribute('href') === `#${id}`); 
            if (link) { 
                allNavLinks.forEach(l => l.classList.remove('active')); 
                link.classList.add('active'); 
                activeLinkFound = true; 
            } 
            break; 
        } 
    }

    if (!activeLinkFound) { 
        allNavLinks.forEach(l => l.classList.remove('active')); 
    } 
}

// ===== Typed text effect ===== 
const typedTexts = [ 
    'Legal Researcher', 
    'Litigation Support Specialist', 
    'Legal Document Specialist', 
    'Paralegal Student' 
]; 
let typedIndex = 0; 
let charIndex = 0; 
let isDeleting = false; 
const typedEl = document.querySelector('.typed');

function typeEffect() { 
    if (!typedEl) return; 
    const current = typedTexts[typedIndex]; 
    if (isDeleting) { 
        typedEl.textContent = current.substring(0, charIndex - 1); 
        charIndex--; 
    } else { 
        typedEl.textContent = current.substring(0, charIndex + 1); 
        charIndex++; 
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) { 
        speed = 1800; 
        isDeleting = true; 
    } else if (isDeleting && charIndex === 0) { 
        isDeleting = false; 
        typedIndex = (typedIndex + 1) % typedTexts.length; 
        speed = 400; 
    }

    setTimeout(typeEffect, speed); 
}

if (typedEl) typeEffect();

// ===== Fade-in on scroll ===== 
const fadeEls = document.querySelectorAll('.fade-in'); 
const observer = new IntersectionObserver(entries => { 
    entries.forEach(entry => { 
        if (entry.isIntersecting) { 
            entry.target.classList.add('visible'); 
            observer.unobserve(entry.target); 
        } 
    }); 
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ===== Scroll to top button ===== 
const scrollTopBtn = document.getElementById('scrollTop');

function toggleScrollTop() { 
    if (window.scrollY > 400) { 
        scrollTopBtn.classList.add('show'); 
    } else { 
        scrollTopBtn.classList.remove('show'); 
    } 
}

scrollTopBtn.addEventListener('click', () => { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
});

// ===== Profile photo fallback ===== 
// Shows an emoji placeholder if images/profile.jpg has not been uploaded yet. 
const profilePhoto = document.getElementById('profilePhoto'); 
const profileEmoji = document.getElementById('profileEmoji');

if (profilePhoto) { 
    profilePhoto.addEventListener('error', () => { 
        profilePhoto.style.display = 'none'; 
        if (profileEmoji) profileEmoji.style.display = 'flex'; 
    }); 
}

// ===== Contact form ===== 
const contactForm = document.getElementById('contactForm'); 
const formSuccess = document.getElementById('formSuccess');

if (contactForm) { 
    contactForm.addEventListener('submit', (e) => { 
        e.preventDefault(); 
        const btn = contactForm.querySelector('.form-submit'); 
        btn.textContent = 'Sending...'; 
        btn.disabled = true;
        
        // Simulating the submit logic being finished
        setTimeout(() => {
            btn.textContent = 'Send Request';
            btn.disabled = false;
            contactForm.reset();
            if (formSuccess) {
                formSuccess.style.display = 'block';
                // Hide the success message after 4 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 4000);
            }
        }, 1200);
    }); 
}
