const loginFormHandler = async (event) => {
    event.preventDefault();

  
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const semail = document.querySelector('#email-signup').value.trim();
  const spassword = document.querySelector('#password-signup').value.trim();

  if (email && password) {
    
    const response = await fetch('/api/users/login', {
      method: 'PUT',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
