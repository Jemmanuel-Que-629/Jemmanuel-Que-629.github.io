document.addEventListener("DOMContentLoaded", () => {
    const galleries = {
        ojt: {
            title: "OJT - E-Enrollment System",
            images: [
                { src: "ojt_student.png", caption: "Student Enrollment Module" },
                { src: "ojt_presentation1.png", caption: "From Left to Right [Payong, Dr. Dela Torre(supervisor), Me, Opeña]. Presentation of overall progress to our suprevisor. Febuary 27, 2026." },
                { src: "ojt_presentation2.png", caption: "December 11, 2025. System Presentation, Flowchart Presentation and Discussion with Dean and Professors." }
            ]
        },
        hris: {
            title: "HRIS with Facial Recognition & GPS",
            images: [
                { src: "hris_facial_recog.png", caption: "Facial Recognition Attendance" },
                { src: "hris_employee_masterlist.png", caption: "Employee Masterlist" },
                { src: "hris_payroll.png", caption: "Payroll Processing" },
                { src: "hris_leave_request.png", caption: "Leave Request Module" },
                { src: "hris_performance_eval.png", caption: "Performance Evaluation" },
                { src: "hris_client_eval.png", caption: "Client Evaluation" },
                { src: "hris_panel.png", caption: "Left to right [Dr. Dela Torre, Banal(panel) ,Dr. Almonte(lead panel), Dr. Elomina(panel), Lanuza(guest panel), Me, Palafox, Rosario, Escaño" },
                { src: "hris_adviser.png", caption: "With our thesis adviser Professor Llanderal." },
                { src: "hris_turnover.png", caption: "System Turnover" }
            ]
        },
        inventory: {
            title: "Inventory Management System",
            images: [
                { src: "inventory_dashboard.png", caption: "Inventory Dashboard" },
                { src: "inventory_livestocks.png", caption: "Livestock Inventory" },
                { src: "inventory_consumable_nonconsumable.png", caption: "Consumable and Non-Consumable Items" },
                { src: "inventory_client_consultation.png", caption: "Client Consultation Tracking" }
            ]
        }
    };

    const galleryModal = document.getElementById("gallery-modal");
    const galleryImage = document.getElementById("gallery-image");
    const galleryTitle = document.getElementById("gallery-title");
    const galleryCaption = document.getElementById("gallery-caption");
    const galleryCount = document.getElementById("gallery-count");
    const galleryPrev = document.getElementById("gallery-prev");
    const galleryNext = document.getElementById("gallery-next");

    let activeGallery = null;
    let activeIndex = 0;

    const updateGalleryView = () => {
        if (!activeGallery || !galleryImage) {
            return;
        }

        const gallery = galleries[activeGallery];
        const item = gallery.images[activeIndex];

        galleryImage.src = item.src;
        galleryImage.alt = `${gallery.title} - ${item.caption}`;
        if (galleryTitle) {
            galleryTitle.textContent = gallery.title;
        }
        if (galleryCaption) {
            galleryCaption.textContent = item.caption;
        }
        if (galleryCount) {
            galleryCount.textContent = `${activeIndex + 1} / ${gallery.images.length}`;
        }
    };

    const openGallery = projectKey => {
        if (!galleries[projectKey] || !galleryModal) {
            return;
        }

        activeGallery = projectKey;
        activeIndex = 0;
        updateGalleryView();

        galleryModal.classList.add("open");
        galleryModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    const closeGallery = () => {
        if (!galleryModal) {
            return;
        }

        galleryModal.classList.remove("open");
        galleryModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        activeGallery = null;
    };

    const moveGallery = direction => {
        if (!activeGallery) {
            return;
        }

        const imageCount = galleries[activeGallery].images.length;
        activeIndex = (activeIndex + direction + imageCount) % imageCount;
        updateGalleryView();
    };

    document.querySelectorAll(".project-card[data-gallery-open]").forEach(card => {
        card.addEventListener("click", () => {
            const projectKey = card.getAttribute("data-gallery-open");
            openGallery(projectKey);
        });

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                const projectKey = card.getAttribute("data-gallery-open");
                openGallery(projectKey);
            }
        });
    });

    document.querySelectorAll("[data-gallery-close]").forEach(closeTarget => {
        closeTarget.addEventListener("click", closeGallery);
    });

    if (galleryPrev) {
        galleryPrev.addEventListener("click", () => moveGallery(-1));
    }
    if (galleryNext) {
        galleryNext.addEventListener("click", () => moveGallery(1));
    }

    const menuToggle = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("primary-navigation");

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mobileNav.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));

            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        });

        mobileNav.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                mobileNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");

                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            });
        });

        document.addEventListener("click", event => {
            if (!mobileNav.classList.contains("open") || window.innerWidth > 768) {
                return;
            }

            const clickedInsideNav = mobileNav.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideNav && !clickedToggle) {
                mobileNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");

                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && activeGallery) {
                closeGallery();
                return;
            }

            if (event.key === "Escape" && mobileNav.classList.contains("open")) {
                mobileNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");

                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            }

            if (activeGallery && event.key === "ArrowLeft") {
                moveGallery(-1);
            }

            if (activeGallery && event.key === "ArrowRight") {
                moveGallery(1);
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                mobileNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");

                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            }
        });
    }

    // 1. Left-right reveal animation for cards while scrolling
    const revealItems = document.querySelectorAll(".project-card, .skill-card");
    const isDesktop = window.matchMedia("(min-width: 769px)").matches;

    if (revealItems.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.2,
            rootMargin: "0px 0px -60px 0px"
        });

        revealItems.forEach((item, index) => {
            item.classList.add("reveal-on-scroll");
            item.classList.add(index % 2 === 0 ? "reveal-left" : "reveal-right");

            if (isDesktop && item.parentElement) {
                const siblingSelector = item.classList.contains("project-card") ? ".project-card" : ".skill-card";
                const siblingItems = Array.from(item.parentElement.querySelectorAll(siblingSelector));
                const staggerIndex = siblingItems.indexOf(item);
                item.style.transitionDelay = `${Math.max(0, staggerIndex) * 110}ms`;
            } else {
                item.style.transitionDelay = "0ms";
            }

            revealObserver.observe(item);
        });
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