const makeQueryHandler = async (event) => {
    console.log(`triggered add comment form handler`)
    event.preventDefault();
    document.querySelector('#spark-text').value = "Communicating with Chatgpt. Response will appear here when completed";
  
    

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

    
    const response = await fetch('/api/sparks/generate/' + title, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        let responseData = await response.text();
        let reformatedResponse = responseData.replace("\n", "<br>");
        console.log (reformatedResponse, responseData); 
        document.querySelector('#spark-text').value = reformatedResponse
    } else {
        alert('Could not get data');
    }
    
};

document
    .querySelector('#gpt')
    .addEventListener('click', makeQueryHandler);