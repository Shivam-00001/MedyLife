// ================= MOBILE MENU =================
document.getElementById('mobileMenu').addEventListener('click', function () {
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
        const nav = document.getElementById('mainNav');
        nav.classList.remove('active');

        const icon = document.querySelector('#mobileMenu i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
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

if (testimonials.length > 0) {
    showTestimonial(0);
    setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);
}


// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// ================= NAVBAR HIDE/SHOW =================
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll < 0) return;

    if (Math.abs(currentScroll - lastScrollTop) > 10) {
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            header.classList.add("hide"); // hide
        } else {
            header.classList.remove("hide"); // show
        }
        lastScrollTop = currentScroll;
    }

    // shadow
    if (currentScroll > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// ================= COUNTER (ACHIEVEMENTS) =================
const counters = document.querySelectorAll('.counter');

const startCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;

        const duration = 2000;
        const increment = target / (duration / 16);

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.floor(count).toLocaleString();
                requestAnimationFrame(updateCount);
            } else {
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

// Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter();
            observer.disconnect();
        }
    });
});

// 🔥 IMPORTANT FIX
const section = document.querySelector('.achievements');
if (section) {
    observer.observe(section);
}


// ================= WHATSAPP FORM =================
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.querySelector("input[name='name']").value;
    let phone = document.querySelector("input[name='phone']").value;
    let message = document.querySelector("textarea[name='message']").value;

    let text = `Hello Medilife Pathology,%0A
Name: ${name}%0A
Phone: ${phone}%0A
Message: ${message}`;

    // Open WhatsApp
    window.open(`https://wa.me/919119625967?text=${text}`, "_blank");

    // Reset form
    document.getElementById("contactForm").reset();
});