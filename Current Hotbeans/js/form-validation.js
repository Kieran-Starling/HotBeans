document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateForm()) {
                // Simulate form submission
                submitForm();
            }
        });
        
        // Add input event listeners for real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                validateInput(this);
            });
            
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
    }
    
    // Validate entire form
    function validateForm() {
        let isValid = true;
        const requiredInputs = contactForm.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        // Validate email format if entered
        const emailInput = document.getElementById('email');
        if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone format if entered
        const phoneInput = document.getElementById('phone');
        if (phoneInput.value.trim() !== '' && !isValidPhone(phoneInput.value.trim())) {
            showError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Validate individual input
    function validateInput(input) {
        // Skip validation for non-required empty fields
        if (!input.hasAttribute('required') && input.value.trim() === '') {
            clearError(input);
            return true;
        }
        
        // Required field validation
        if (input.hasAttribute('required') && input.value.trim() === '') {
            showError(input, `Please enter your ${input.name}`);
            return false;
        }
        
        // Email validation
        if (input.type === 'email' && !isValidEmail(input.value.trim())) {
            showError(input, 'Please enter a valid email address');
            return false;
        }
        
        // Phone validation (if entered)
        if (input.id === 'phone' && input.value.trim() !== '' && !isValidPhone(input.value.trim())) {
            showError(input, 'Please enter a valid phone number');
            return false;
        }
        
        // Checkbox validation
        if (input.type === 'checkbox' && input.hasAttribute('required') && !input.checked) {
            showError(input, 'You must agree to our privacy policy');
            return false;
        }
        
        clearError(input);
        return true;
    }
    
    // Show error message
    function showError(input, message) {
        input.classList.add('is-invalid');
        const feedback = input.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = message;
        }
    }
    
    // Clear error message
    function clearError(input) {
        input.classList.remove('is-invalid');
    }
    
    // Email validation regex
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation regex (simple format check)
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
        return phoneRegex.test(phone);
    }
    
    // Submit form via AJAX
    function submitForm() {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Simulate AJAX request with setTimeout
        setTimeout(function() {
            // Simulating successful submission
            showFormMessage('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
            contactForm.reset();
            
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // this is obvs fake rn but in a real implementation, use Fetch API:
            /*
            fetch('sendmail.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showFormMessage('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
                    contactForm.reset();
                } else {
                    showFormMessage('danger', data.message || 'Something went wrong. Please try again later.');
                }
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            })
            .catch(error => {
                showFormMessage('danger', 'An error occurred. Please try again later.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
            */
        }, 1500);
    }
    
    // Display form submission message
    function showFormMessage(type, message) {
        formMessage.classList.remove('d-none', 'alert-success', 'alert-danger');
        formMessage.classList.add(`alert-${type}`);
        formMessage.textContent = message;
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(function() {
                formMessage.classList.add('d-none');
            }, 5000);
        }
    }
});