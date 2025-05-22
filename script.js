// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Form Validation and localStorage
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Validation functions
const validateName = (name) => {
    if (name.trim() === '') {
        return 'Name is required';
    }
    if (name.length < 2) {
        return 'Name must be at least 2 characters long';
    }
    return '';
};

const validateEmail = (email) => {
    if (email.trim() === '') {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
};

const validateMessage = (message) => {
    if (message.trim() === '') {
        return 'Message is required';
    }
    if (message.length < 10) {
        return 'Message must be at least 10 characters long';
    }
    return '';
};

// Form submission handler
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate all fields
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const messageError = validateMessage(message);

    // Display errors if any
    document.getElementById('nameError').textContent = nameError;
    document.getElementById('emailError').textContent = emailError;
    document.getElementById('messageError').textContent = messageError;

    // If no errors, proceed with form submission
    if (!nameError && !emailError && !messageError) {
        // Create form data object
        const formData = {
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        };

        // Get existing submissions from localStorage
        let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];

        // Add new submission
        submissions.push(formData);

        // Save to localStorage
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

        // Show success message
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        successMessage.style.display = 'block';

        // Clear form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        }
    });
}); 