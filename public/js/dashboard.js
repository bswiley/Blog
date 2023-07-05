// need to have listeners for "update","delete", and maybe "add" functions.  
//Actually, these will be user routes so maybe not. 
const deleteButtons = document.querySelectorAll('.delete');

deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const buttonSet = deleteButton.closest('.blogpost-div');
    const title = buttonSet.querySelector('.card-title').textContent;
    const id = buttonSet.querySelector('.card-id').textContent;
    const text = buttonSet.querySelector('.card-text').textContent;

    try {
      const response = await fetch(`/api/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        throw new Error('Could not delete post');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting the post');
    }
  });
});