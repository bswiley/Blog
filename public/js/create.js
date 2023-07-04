const makePostFormHandler = async (event) => {
    console.log(`triggered add comment form handler`)
    event.preventDefault();
  
    

    const title = document.querySelector('#spark-title').value.trim();
    const text = document.querySelector('#spark-text').value.trim();
    var public;
    /*if(document.querySelector('#myCheckbox').value == 1){
        public = true;
    }
    else {
        public = false;
    } */
    public = true;
    const outsideLink = document.querySelector('#link').value.trim();
    const ChatLink = document.querySelector('#Chat').value.trim();
    const categories = document.querySelector('#categories').value;
    console.log("make new spark");

    
    const response = await fetch('/api/sparks/concept', {
        method: 'POST',
        body: JSON.stringify({ title, text, public, outsideLink, ChatLink, categories}),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Could not post data');
    }
    
};
document
    .querySelector('#create')
    .addEventListener('click', makePostFormHandler);