function togglePassword() {
    const passwordInput = document.querySelector('.password');
    const toggleButton = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'Show';
    }
}

function showSignup() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'block';
}

function showLogin() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('signup-section').style.display = 'none';
}

function checkPasswordMatch() {
    const passwordInputs = document.querySelectorAll('.password');
    const passwordInput = passwordInputs[1];
    const confirmPasswordInput = document.querySelector('.confirm-password');
    const confirmIcon = document.querySelector('.confirm-icon');
    const xIcon = document.querySelector('.x-icon');

   
    if (passwordInput.value === confirmPasswordInput.value && passwordInput.value.length > 0) {
        confirmIcon.style.display = 'inline-block';
        xIcon.style.display = 'none';
    } else {
        confirmIcon.style.display = 'none';
        xIcon.style.display = 'inline-block';
    }
}

document.querySelector('.password').addEventListener('input', checkPasswordMatch);
document.querySelector('.confirm-password').addEventListener('input', checkPasswordMatch);
