onst makePostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();
    const user_id = document.querySelector('.hide').textContent.trim();
  
    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({ title, text, user_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Could not post data');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };
  
  document.querySelector('#create').addEventListener('click', makePostFormHandler);