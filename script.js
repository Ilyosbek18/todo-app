// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.menu-toggle') && !event.target.closest('nav')) {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });

    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get tab to show
            const tabToShow = this.getAttribute('data-tab');

            // Hide all tab panes
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Show selected tab pane
            document.getElementById(tabToShow).classList.add('active');
        });
    });

    // 3D Car Showcase
    const carModel = document.getElementById('car-model');
    const carImage = document.getElementById('car-image');
    const rotateLeft = document.getElementById('rotate-left');
    const rotateRight = document.getElementById('rotate-right');
    const colorBtns = document.querySelectorAll('.color-btn');
    const carName = document.getElementById('car-name');

    if (carModel && carImage) {
        // Car images for different colors
        const carImages = {
            'red': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'blue': 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'black': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'white': 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        };

        // Car names for different colors
        const carNames = {
            'red': 'Porsche 911 Carrera - Qizil',
            'blue': 'Porsche 911 Carrera - Ko\'k',
            'black': 'Porsche 911 Carrera - Qora',
            'white': 'Porsche 911 Carrera - Oq'
        };

        // Set initial values
        let currentColor = 'red';
        let currentRotation = 0;

        // Color selection
        colorBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                colorBtns.forEach(b => b.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Update current color
                currentColor = this.getAttribute('data-color');

                // Update car image
                carImage.src = carImages[currentColor];

                // Update car name
                if (carName) {
                    carName.textContent = carNames[currentColor];
                }
            });
        });

        // Rotation controls
        if (rotateLeft) {
            rotateLeft.addEventListener('click', function() {
                currentRotation -= 90;
                carImage.style.transform = `rotateY(${currentRotation}deg)`;
            });
        }

        if (rotateRight) {
            rotateRight.addEventListener('click', function() {
                currentRotation += 90;
                carImage.style.transform = `rotateY(${currentRotation}deg)`;
            });
        }

        // 3D effect on mouse move
        carModel.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            carImage.style.transform = `
                rotateY(${x * 20 + currentRotation}deg)
                rotateX(${y * -10}deg)
                scale(1.05)
            `;
        });

        carModel.addEventListener('mouseleave', function() {
            carImage.style.transform = `rotateY(${currentRotation}deg)`;
        });
    }

    // Gallery Filter
    const filterBtns = document.querySelectorAll('.gallery .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gallery Modal
    const galleryLinks = document.querySelectorAll('.gallery-link');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.querySelector('.close-modal');

    if (galleryLinks.length > 0 && modal && modalImage && modalTitle) {
        galleryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                // Get image source and title
                const imgSrc = this.closest('.gallery-item').querySelector('img').src;
                const imgTitle = this.closest('.gallery-item').querySelector('h3').textContent;

                // Set modal content
                modalImage.src = imgSrc;
                modalTitle.textContent = imgTitle;

                // Show modal
                modal.classList.add('active');
            });
        });

        // Close modal
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
        });

        // Close modal on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (name && email && message) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Yuborilmoqda...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
                    contactForm.reset();
                    submitBtn.textContent = 'Yuborish';
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                alert('Iltimos, barcha majburiy maydonlarni to\'ldiring.');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Add 3D hover effect to model cards
    const modelCards = document.querySelectorAll('.model-card');

    modelCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            this.style.transform = `
                translateY(-10px)
                rotateY(${x * 10}deg)
                rotateX(${y * -10}deg)
            `;

            const image = this.querySelector('.model-image img');
            if (image) {
                image.style.transform = `
                    scale(1.1)
                    translateX(${x * -20}px)
                    translateY(${y * -20}px)
                `;
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0) rotateX(0)';

            const image = this.querySelector('.model-image img');
            if (image) {
                image.style.transform = 'scale(1) translateX(0) translateY(0)';
            }
        });
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.feature-card, .model-card, .gallery-item, .testimonial-card');

    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    function highlightNavItem() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavItem);
    highlightNavItem();
});