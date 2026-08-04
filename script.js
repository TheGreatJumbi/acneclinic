// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id], header[id]');
const navLinksList = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingNav = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksList.forEach(link => link.classList.remove('active'));
            if (correspondingNav) {
                correspondingNav.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// GSAP Animations - Inspired by madewithgsap.com
gsap.registerPlugin(ScrollTrigger);

// Hero animations on page load
const tl = gsap.timeline();

tl.from('.hero-title', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
})
.from('.hero-subtitle', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power3.out'
}, '-=0.6')
.from('.hero-buttons .btn', {
    duration: 0.6,
    y: 20,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
}, '-=0.4')
.from('.hero-bg-shape', {
    duration: 1.5,
    scale: 0.8,
    opacity: 0,
    ease: 'power2.out'
}, '-=1');

// Animate hero background shape on mouse move
const heroSection = document.querySelector('.hero');
const heroBgShape = document.querySelector('.hero-bg-shape');

if (heroSection && heroBgShape) {
    heroSection.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        gsap.to(heroBgShape, {
            duration: 0.5,
            x: xAxis,
            y: yAxis,
            ease: 'power2.out'
        });
    });
}

// Features section animation with ScrollTrigger
gsap.utils.toArray('.feature-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out'
    });
});

// Section headers animation
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// CTA section animation
gsap.from('.cta-content', {
    scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Navbar animation on scroll
const navbar = document.querySelector('.navbar');
gsap.to(navbar, {
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: '+=100',
        scrub: true
    },
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '0.5rem 0'
});

// Add parallax effect to hero section
gsap.to('.hero', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    backgroundPositionY: '50%'
});

console.log('The Acne Clinic website loaded successfully!');
console.log('GSAP animations enabled ✨');
