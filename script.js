// ================= MOBILE MENU =================
document.getElementById('mobileMenu').addEventListener('click', function() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
    
    const icon = this.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking link
document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mainNav').classList.remove('active');
        document.querySelector('#mobileMenu i').classList.remove('fa-times');
        document.querySelector('#mobileMenu i').classList.add('fa-bars');
    });
});


// ================= TESTIMONIAL SLIDER =================
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showTestimonial(n) {
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
    });

    currentTestimonial = (n + totalTestimonials) % totalTestimonials;
    testimonials[currentTestimonial].style.display = 'flex';
}

setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 5000);

if (testimonials.length > 0) {
    showTestimonial(0);
}


// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));

        // Only prevent if target exists
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// ================= SMOOTH NAVBAR HIDE/SHOW =================
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Prevent negative scroll
    if (currentScroll < 0) return;

    // Threshold for smooth behavior
    if (Math.abs(currentScroll - lastScrollTop) > 10) {

        if (currentScroll > lastScrollTop && currentScroll > 100) {
            // Scroll Down → Hide
            header.classList.add("hide");
        } else {
            // Scroll Up → Show
            header.classList.remove("hide");
        }

        lastScrollTop = currentScroll;
    }

    // Shadow effect
    if (currentScroll > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
const counters = document.querySelectorAll('.counter');

const startCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;

        const duration = 2000; // total animation time
        const increment = target / (duration / 16);

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.floor(count).toLocaleString();
                requestAnimationFrame(updateCount);
            } else {
                // final value
                if (target >= 1000000) {
                    counter.innerText = "1M+";
                    } else if (target === 99) {
                    counter.innerText = target + "%";
                } else {
                    counter.innerText = target + "+";
                }
            }
        };

        updateCount();
    });
};

// Run when visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter();
            observer.disconnect();
        }
    });
});

const section = document.querySelector('.achievements');
if (section) observer.observe(section);