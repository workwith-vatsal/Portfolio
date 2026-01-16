document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dark Mode Toggle ---
    const toggleSwitch = document.querySelector('#theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    const body = document.body;

    // Check for saved user preference
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            toggleSwitch.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // Toggle Logic
    toggleSwitch.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update Icon
        if (body.classList.contains('dark-mode')) {
            toggleSwitch.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            toggleSwitch.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light-mode');
        }
    });


    // --- 2. Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change hamburger icon
        const icon = hamburger.querySelector('i');
        if(navLinks.classList.contains('active')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });


    // --- 3. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select all elements with the 'hidden' class
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));


    // --- 4. Certificate Modal Logic ---
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("imgModal");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];

    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('.cert-img');
            const title = card.querySelector('h3').innerText;
            if(img) {
                modal.style.display = "block";
                modalImg.src = img.src;
                captionText.innerHTML = title;
            }
        });
    });

    closeBtn.onclick = () => { modal.style.display = "none"; }
    window.onclick = (event) => { if (event.target == modal) { modal.style.display = "none"; } }
});
