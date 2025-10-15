document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle
    const btnMode = document.querySelector('.btn-mode');
    btnMode.onclick = function () {
        document.body.classList.toggle('white-theme');
        btnMode.classList.toggle("fa-moon");
        btnMode.classList.toggle("fa-sun");
        
        // Update theme colors for alerts when theme changes
        initAlertTheme();
    };

    // Initialize alert theme based on current theme
    function initAlertTheme() {
        const isDark = !document.body.classList.contains('white-theme');
        
        Swal.mixin({
            background: isDark ? '#080e1c' : '#fff',
            color: isDark ? '#fff' : '#080e1c',
            confirmButtonColor: '#23a3fe',
            cancelButtonColor: '#1e293b',
            iconColor: '#23a3fe'
        });
    }

    // Set initial theme
    initAlertTheme();

    // Mobile Menu Toggle - Check if it already exists first
    if (!document.querySelector('.mobile-menu')) {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <div class="nav-links">
                <a href="#home" class="active">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#skills">Skills</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </div>
        `;
        document.body.appendChild(mobileMenu);

        hamburger.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight Active Nav Link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        const mobileLinks = document.querySelectorAll('.mobile-menu .nav-links a');
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Download CV Button
    document.getElementById("downloadCV")?.addEventListener("click", function (e) {
        e.preventDefault();

        Swal.fire({
            title: 'Preparing Download...',
            text: 'Your CV will be ready in a moment.',
            timer: 3000,
            didOpen: () => {
                Swal.showLoading();
            },
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                content: 'custom-swal-content'
            }
        }).then(() => {
            const link = document.createElement('a');
            link.href = 'CV.pdf';
            link.download = 'CV.pdf';
            link.click();

            Swal.fire({
                title: 'Thank You!',
                text: 'I appreciate you taking the time to view my CV. Feel free to reach out anytime!',
                icon: 'success',
                confirmButtonText: 'Got it!',
                customClass: {
                    popup: 'custom-swal-popup',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content'
                }
            });
        });
    });

    // Contact Form Submit
    document.querySelector('.contact-form')?.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();

        if (name === '' || email === '' || message === '') {
            Swal.fire({
                icon: 'error',
                title: 'Missing Fields',
                text: 'Please fill in all the required fields.',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'custom-swal-popup',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content'
                }
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'custom-swal-popup',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content'
                }
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: `Thank You, ${name}!`,
            text: 'Thanks for reaching out! I will get back to you as soon as possible.',
            confirmButtonText: 'Great!',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                content: 'custom-swal-content'
            }
        });

        this.reset();
    });






    



});