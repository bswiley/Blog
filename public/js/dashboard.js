// need to have listeners for "update","delete", and maybe "add" functions.  
//Actually, these will be user routes so maybe not. 
buttonSets.forEach((buttonSet) => {
  const deleteButton = buttonSet.querySelector('.delete');

  deleteButton.addEventListener('click', async () => {
      // Retrieve information from the card associated with the clicked button
      const title = buttonSet.querySelector('.card-title').textContent;
      const user_id = buttonSet.querySelector('.card-id').textContent;
      const text = buttonSet.querySelector('.card-text').textContent;

      try {
          const response = await fetch(`/api/delete/${id}`, {
              method: 'DELETE',
              body: JSON.stringify({ id, title, text }),
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