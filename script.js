document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ========== //
    
    // Click Counter
    const clickButton = document.getElementById('click-button');
    const clickCounter = document.getElementById('click-counter');
    let clickCount = 0;
    
    clickButton.addEventListener('click', function() {
        clickCount++;
        clickCounter.textContent = `Clicked ${clickCount} times`;
        
        // Add animation for fun
        clickButton.classList.add('fade-in');
        setTimeout(() => clickButton.classList.remove('fade-in'), 500);
    });
    
    // Keypress Detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You typed: ${e.target.value}`;
    });
    
    // Secret Action (Double click or long press)
    const secretBox = document.querySelector('.secret-box');
    const secretMessage = document.querySelector('.secret-message');
    let pressTimer;
    
    secretBox.addEventListener('dblclick', showSecret);
    
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(showSecret, 1000); // 1 second long press
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    function showSecret() {
        secretMessage.classList.remove('hidden');
        setTimeout(() => secretMessage.classList.add('hidden'), 2000);
    }
    
    // ========== Interactive Elements ========== //
    
    // Color Changing Button
    const colorButton = document.getElementById('color-button');
    
    colorButton.addEventListener('click', function() {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        colorButton.style.backgroundColor = randomColor;
        colorButton.textContent = `Color: ${randomColor}`;
    });
    
    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery img');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach((img, i) => {
            img.classList.toggle('hidden', i !== index);
        });
    }
    
    prevButton.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextButton.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== Form Validation ========== //
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            document.querySelector('.password-strength .strength-bar').style.width = '0%';
            document.querySelector('.password-strength .strength-text').textContent = '';
        }
    });
    
    function validateName() {
        const errorElement = nameInput.nextElementSibling;
        if (nameInput.value.trim() === '') {
            errorElement.classList.remove('hidden');
            return false;
        } else {
            errorElement.classList.add('hidden');
            return true;
        }
    }
    
    function validateEmail() {
        const errorElement = emailInput.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            errorElement.classList.remove('hidden');
            return false;
        } else {
            errorElement.classList.add('hidden');
            return true;
        }
    }
    
    function validatePassword() {
        const errorElement = passwordInput.nextElementSibling;
        const strengthBar = document.querySelector('.password-strength .strength-bar');
        const strengthText = document.querySelector('.password-strength .strength-text');
        
        if (passwordInput.value.length < 8 && passwordInput.value.length > 0) {
            errorElement.classList.remove('hidden');
            return false;
        } else if (passwordInput.value.length === 0) {
            errorElement.classList.add('hidden');
            strengthBar.style.width = '0%';
            strengthText.textContent = '';
            return false;
        } else {
            errorElement.classList.add('hidden');
            
            // Calculate password strength
            let strength = 0;
            if (passwordInput.value.length >= 8) strength += 30;
            if (passwordInput.value.length >= 12) strength += 20;
            if (/[A-Z]/.test(passwordInput.value)) strength += 20;
            if (/[0-9]/.test(passwordInput.value)) strength += 20;
            if (/[^A-Za-z0-9]/.test(passwordInput.value)) strength += 10;
            
            strength = Math.min(strength, 100);
            strengthBar.style.width = `${strength}%`;
            
            if (strength < 40) {
                strengthBar.style.backgroundColor = '#e74c3c';
                strengthText.textContent = 'Weak';
            } else if (strength < 70) {
                strengthBar.style.backgroundColor = '#f39c12';
                strengthText.textContent = 'Medium';
            } else {
                strengthBar.style.backgroundColor = '#2ecc71';
                strengthText.textContent = 'Strong';
            }
            
            return true;
        }
    }
});