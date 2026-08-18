const toggleEye = document.getElementById('toggleEye');
const password = document.getElementById('password');
const eyeIcon = document.getElementById('eyeIcon');

toggleEye.addEventListener('click', () => {
  const isPassword = password.type === 'password';
  password.type = isPassword ? 'text' : 'password';
  toggleEye.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  eyeIcon.innerHTML = isPassword
    ? '<path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a21.8 21.8 0 015.06-6.06M9.9 4.24A10.94 10.94 0 0112 4c7 0 11 8 11 8a21.8 21.8 0 01-2.16 3.19M14.12 14.12a3 3 0 11-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>'
    : '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path><circle cx="12" cy="12" r="3"></circle>';
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // wire this up to your auth endpoint
  console.log('Signup submitted:', {
    email: document.getElementById('email').value
  });
});
