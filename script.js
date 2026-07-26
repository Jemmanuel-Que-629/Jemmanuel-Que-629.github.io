document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll-driven timeline animations (Slower & Staggered)
    const animatedItems = document.querySelectorAll(".timeline-item");

    if (animatedItems.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.15, // Trigger slightly earlier for smoother entry
            rootMargin: "0px 0px -50px 0px"
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Optional slight stagger delay for consecutive items
                    setTimeout(() => {
                        entry.target.classList.add("active");
                    }, 100);

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedItems.forEach(item => scrollObserver.observe(item));
    }

    // 2. Active Header Navigation Link Highlighting on Scroll
    const sections = document.querySelectorAll("section[id], footer[id]");
    const navLinks = document.querySelectorAll(".site-nav .nav-link");

    const sectionObserverOptions = {
        root: null,
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${currentId}`
                    );
                });
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // 3. Header Shadow Effect on Scroll
    const header = document.getElementById("site-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
});

const roles = [
    "Full-Stack Developer",
    "AWS EC2 Deployment Specialist",
    "Software Engineer",
    "Manual QA & Tester",
    "Civil Service Professional Passer",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    // Faster speeds: 35ms per keypress, 20ms per deletion
    let typeSpeed = isDeleting ? 20 : 35;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 1200; // Shorter pause once title finishes typing
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // Loop back around
        typeSpeed = 300; // Brief pause before starting the next title
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start animation
if (typewriterElement) {
    typeEffect();
}