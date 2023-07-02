// need to have listeners for "update","delete", and maybe "add" functions.  
//Actually, these will be user routes so maybe not. 
buttonSets.forEach((buttonSet) => {
    const updateButton = buttonSet.querySelector('.update');
    const deleteButton = buttonSet.querySelector('.delete');
  
    
  
    updateButton.addEventListener('click', () => {
      // Retrieve information from the card associated with the clicked button
      const cardTitle = buttonSet.querySelector('.card-title').textContent;
      const cardUser = buttonSet.querySelector('.card-user').textContent;
      const cardBody = buttonSet.querySelector('.card-body').textContent;
      const cardId = buttonSet.querySelector('.card-id').textContent;
  
      // Perform a POST API request with the retrieved information
      fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: cardId,
        }),
      })
        .then((response) => {
          // Handle the response from the POST API request
          // Add your desired functionality here
        })
        .catch((error) => {
          // Handle any errors that occur during the API request
        });
    });
  
    deleteButton.addEventListener('click', () => {
      // Retrieve information from the card associated with the clicked button
      const cardTitle = buttonSet.querySelector('.card-title').textContent;
      const cardUser = buttonSet.querySelector('.card-user').textContent;
      const cardBody = buttonSet.querySelector('.card-body').textContent;
  
      // Perform a DELETE API request with the retrieved information
      fetch('your-delete-api-endpoint', {
        method: 'DELETE',
        // Include any necessary headers or request parameters
      })
        .then((response) => {
          // Handle the response from the DELETE API request
          // Add your desired functionality here
        })
        .catch((error) => {
          // Handle any errors that occur during the API request
        });
    });
  });