const userSearchOption = async (event) => {
    event.preventDefault();
  
    const searchUsername = document.querySelector('#searchUsername').value;
    console.log(searchUsername);

    if (searchUsername.length > 0) {
        document.location.replace('./user/' + searchUsername); 
    }
};
document
    .querySelector('#search-users')
    .addEventListener('click', userSearchOption);