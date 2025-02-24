document.addEventListener("DOMContentLoaded", function () {
    // Typewriter effect for the hero section
    const textElement = document.querySelector(".typewriter");
    const texts = ["creative agency.", "media agency."]; // Words to type
    const colors = ["#ff5733", "#33ff57"]; // Colors for each text
    let currentTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = texts[currentTextIndex];
        const speed = isDeleting ? 10 : 40; // Typing speed (slower) & deleting speed (faster)

        // Update text content
        textElement.textContent = currentText.substring(0, charIndex);
        textElement.style.color = colors[currentTextIndex]; // Apply color

        // Increment or decrement character index
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        // When full text is typed, pause and start deleting
        if (!isDeleting && charIndex === currentText.length + 1) {
            isDeleting = true;
            setTimeout(typeEffect, 1000); // Pause before deleting
        }
        // When text is fully deleted, switch to the next text and start typing again
        else if (isDeleting && charIndex === -1) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % texts.length; // Switch to the next word
            setTimeout(typeEffect, 500); // Pause before retyping
        }
        // Continue typing or deleting
        else {
            setTimeout(typeEffect, speed);
        }
    }

    typeEffect(); // Start typewriter animation

    // Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll(".counter");
        counters.forEach(counter => {
            let target = parseInt(counter.getAttribute("data-target"));
            let count = 0;
            let speed = Math.ceil(target / 100); // Adjust speed based on value

            function updateCount() {
                if (count < target) {
                    count += speed;
                    counter.textContent = count + "+";
                    setTimeout(updateCount, 20);
                } else {
                    counter.textContent = target + "+"; // Ensure exact number
                }
            }
            updateCount();
        });
    }

    // Trigger animation when section comes into view
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animateCounters();
        }
    }, { threshold: 0.5 });

    observer.observe(document.querySelector(".number-section"));
});




gsap.registerPlugin(ScrollTrigger);

/*
// Animate the logo moving across sections
gsap.timeline({
    scrollTrigger: {
        trigger: "body", // The whole page triggers the movement
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrolling effect
        pin: ".logo", // Keeps the logo pinned while animating
        markers: true
    }
})

    .to(".logo", {
        top: "80%",
        left: "80%",
        scale: 1,
        rotate: 0,
        duration: 1
    });

    */

// ------------------      ----------------------------------------------------------------------------------------

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Select all scrollable sections
const scrollSections = document.querySelectorAll(".scroll-section");

scrollSections.forEach((section) => {
    const items = section.querySelectorAll(".section"); // Select each section
    initScroll(section, items);
});

function initScroll(section, items) {
    // Initial states - Hide all except the first
    items.forEach((item, index) => {
        if (index !== 0 && index !== items.length - 1) {
            gsap.set(item, { yPercent: 100, opacity: 0, position: "absolute", width: "100%" });
        }
    });

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            pin: section,
            start: "top top",
            end: () => `+=${items.length * 100}%`,
            scrub: 1,
            invalidateOnRefresh: true,
            markers: false, // Set to true for debugging
        },
        defaults: { ease: "none" },
    });

    items.forEach((item, index) => {
        if (index > 0 && index !== items.length - 1) {
            timeline.to(items[index - 1], { opacity: 0, yPercent: -100 }, "<"); // Fully hide previous
        }
        timeline.to(item, { opacity: 1, yPercent: 0 }, "<"); // Show current
    });
}


// ---------------------------------- video start -------------------------------------------


// Select all sections and their videos
const sections = document.querySelectorAll(".section");

sections.forEach((section, index) => {
    const video = section.querySelector("video");

    // Initial state: Pause and reset video
    if (video) {
        video.pause();
        video.currentTime = 0;
    }

    // Create ScrollTrigger animation
    ScrollTrigger.create({
        trigger: section,
        start: "top center", // When the section reaches center of viewport
        end: "bottom top", // When the section leaves the viewport
        onEnter: () => {
            if (video) {
                video.play(); // Play video when section is in 
            }
        },
        onLeave: () => {
            if (video) {
                video.pause();
                video.currentTime = 0; // Reset video when leaving
            }
        },
        onEnterBack: () => {
            if (video) {
                video.play(); // Play again when scrolling back
            }
        },
        onLeaveBack: () => {
            if (video) {
                video.pause();
                video.currentTime = 0; // Reset again when scrolling back out
            }
        },
    });
});



document.addEventListener("DOMContentLoaded", function () {
    // Clone the logos for a seamless loop
    const carouselTrack = document.querySelector(".carousel-track");
    const logos = Array.from(carouselTrack.children);

    // Duplicate logos to ensure smooth looping
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        carouselTrack.appendChild(clone);
    });

    // GSAP animation for infinite scrolling
    gsap.to(".carousel-track", {
        x: "-50%", // Moves halfway since we cloned items
        duration: 10,
        repeat: -1,
        ease: "linear"
    });
});


// --------------------------------------------   VM Logo  ----------------------------------------------------------

var t1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".number-section",
        start: "top 45%",
        end: "bottom right",
        scrub: 2,  // Increase scrub value for a smoother, slower effect
        pin: ".vm_logo_image",
        // markers: true,
    }
})

t1.to(".vm_logo_founder_img", {
    x: 605,
    y: 195,
    scale: 1,
    rotate: 360,
    duration: 3, // Increase duration for a slower transition
    ease: "power1.out" // Slower easing effect
});


// gsap.registerPlugin(ScrollTrigger);

let t2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".founder-info", 
        start: "top 30%",
        end: "bottom center",
        scrub: 3,
        markers: true,
    }
});

t2.to(".vm_logo_founder_img", {
    x: 110,
    y: 560,
    scale: 1,
    rotate: 360,
    duration: 2,
    ease: "power1.out",
});

