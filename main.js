document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    // Set initial theme based on user preference or saved preference
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('sun');
    } else {
        document.documentElement.removeAttribute('data-theme');
        updateThemeIcon('moon');
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('sun');
        }
    });

    // Update theme icon based on current theme
    function updateThemeIcon(icon) {
        const iconElement = themeToggle.querySelector('i');
        if (icon === 'sun') {
            iconElement.classList.remove('fa-moon');
            iconElement.classList.add('fa-sun');
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            iconElement.classList.remove('fa-sun');
            iconElement.classList.add('fa-moon');
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('no-scroll');
            }
            
            // Smooth scroll to section
            const targetId = item.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class for navbar background
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            // Scroll down
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            // Scroll up
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    };
    
    // Initial scroll check
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .work-item, .skill-category');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Initialize animations
    animateOnScroll();
    
    // Animate background shapes on mouse move
    const bgShapes = document.querySelectorAll('.bg-shape');
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate mouse position as percentage (0-1)
        const xPos = clientX / innerWidth;
        const yPos = clientY / innerHeight;
        
        // Animate each shape with different intensity and direction
        bgShapes.forEach((shape, index) => {
            const speed = [0.05, 0.03, 0.02][index]; // Different speeds for each shape
            const xOffset = (xPos - 0.5) * 100 * speed * (index % 2 ? 1 : -1);
            const yOffset = (yPos - 0.5) * 100 * speed * (index % 2 ? 1 : -1);
            
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = Math.round((window.innerWidth / 2 - clientX) / 20);
            const y = Math.round((window.innerHeight / 2 - clientY) / 20);
            hero.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
    
    // Add hover effect to work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item, index) => {
        // Add data attribute for animation delay
        item.style.setProperty('--delay', `${index * 0.1}s`);
        
        // Add hover effect
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.matches(':hover')) {
                item.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add hover effect to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        // Add data attribute for animation delay
        category.style.setProperty('--delay', `${index * 0.1}s`);
        
        // Add hover effect
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-10px)';
        });
        
        category.addEventListener('mouseleave', () => {
            if (!category.matches(':hover')) {
                category.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
});
