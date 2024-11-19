class Auth {
  constructor(formTitle, submitBtn, toggleText, confirmPasswordGroup, authForm) {
    this.formTitle = formTitle;
    this.submitBtn = submitBtn;
    this.toggleText = toggleText;
    this.confirmPasswordGroup = confirmPasswordGroup;
    this.authForm = authForm;
    this.isLogin = true;

    this.toggleForm = this.toggleForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.formTitle.textContent = this.isLogin ? 'Log In' : 'Sign Up';
    this.submitBtn.textContent = this.isLogin ? 'Log In' : 'Sign Up';
    this.toggleText.innerHTML = this.isLogin
      ? `Don't have an account? <a href="#" id="toggle-form">Sign up</a>`
      : `Already have an account? <a href="#" id="toggle-form">Log in</a>`;
    this.confirmPasswordGroup.style.display = this.isLogin ? 'none' : 'block';
    this.authForm.reset();
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    if (!this.validateForm(emailInput, passwordInput, confirmPasswordInput)) return;

    try {
      if (this.isLogin) {
        this.handleLogin(emailInput.value, passwordInput.value);
      } else {
        this.handleSignUp(emailInput.value, passwordInput.value);
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  }

  validateForm(emailInput, passwordInput, confirmPasswordInput) {
    if (!this.validateEmail(emailInput.value)) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (passwordInput.value.length < 8) {
      alert('Password must be at least 8 characters long.');
      return false;
    }

    if (!this.isLogin && confirmPasswordInput.value !== passwordInput.value) {
      alert('Passwords do not match.');
      return false;
    }

    return true;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  handleLogin(email, password) {
    // Allow login if email and password are valid
    alert(`Login successful!\nEmail: ${email}`);
    window.location.href = '/profile/index.html'; // Redirect to profile
  }

  handleSignUp(email, password) {
    // Simulate account creation and switch to login form
    alert(`Account created successfully!\nEmail: ${email}`);
    this.toggleForm(); // Switch to login form after successful registration
  }
}

// Usage example
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const toggleText = document.getElementById('toggle-text');
const confirmPasswordGroup = document.getElementById('confirm-password-group');
const authForm = document.getElementById('auth-form');

const auth = new Auth(formTitle, submitBtn, toggleText, confirmPasswordGroup, authForm);

document.getElementById('toggle-text').addEventListener('click', (e) => {
  e.preventDefault();
  auth.toggleForm();
});

authForm.addEventListener('submit', auth.handleFormSubmit);
