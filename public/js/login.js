document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent form submission

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  try {
    // Make an asynchronous fetch request to the server
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    });

    if (response.ok) {
      // Successful login
      alert('Login successful!');
    } else {
      // Failed login
      alert('Login failed!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
