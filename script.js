document.addEventListener('DOMContentLoaded', () => {

    // ========================================================
    // REQUIREMENT 1: DYNAMIC NAVBAR (Scroll Effect & Active Link Highlight)
    // ========================================================
    const header = document.querySelector('header'); 
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // 1. Change background color/style on scroll
        if (window.scrollY > 50) {
            header?.classList.add('nav-scrolled');
        } else {
            header?.classList.remove('nav-scrolled');
        }

        // 2. Highlight active menu item based on current scroll section
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-nav-link');
            if (currentSectionId && link.getAttribute('href')?.includes(currentSectionId)) {
                link.classList.add('active-nav-link');
            }
        });
    });

    // ========================================================
    // REQUIREMENT 2: CONTACT FORM VALIDATION
    // ========================================================
    const contactForm = document.querySelector('.premium-contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            let isValid = true;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Clear previous error messages
            clearInlineErrors();

            // 1. Validate Name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name.');
                isValid = false;
            }

            // 2. Validate Email
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email.');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            // 3. Validate Subject
            if (!subjectInput.value.trim()) {
                showError(subjectInput, 'Please enter a subject.');
                isValid = false;
            }

            // 4. Validate Message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message.');
                isValid = false;
            }

            // Prevent Web3Forms submission if validation fails
            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    // Helper: Display custom inline error message below input
    function showError(inputElement, message) {
        inputElement.style.borderColor = '#ff4d4d';

        const errorMsg = document.createElement('span');
        errorMsg.className = 'js-error-msg';
        errorMsg.innerText = message;
        errorMsg.style.color = '#ff4d4d';
        errorMsg.style.fontSize = '12px';
        errorMsg.style.marginTop = '4px';
        errorMsg.style.display = 'block';

        inputElement.parentElement.appendChild(errorMsg);
    }

    // Helper: Clear all active inline errors
    function clearInlineErrors() {
        document.querySelectorAll('.js-error-msg').forEach(el => el.remove());
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.style.borderColor = '';
        });
    }

    // ========================================================
    // REQUIREMENT 3: DARK / LIGHT MODE TOGGLE (LocalStorage)
    // ========================================================
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Restore saved user theme preference on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');

            // Save preference to LocalStorage
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

});