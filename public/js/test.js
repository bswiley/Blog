const addCommentFormHandler = async (event) => {
    console.log(`triggered add comment form handler`)
    event.preventDefault();
  
    const title = document.querySelector('#newComment').value.trim();
    const text = document.querySelector('#newComment').value.trim();
    const public = document.querySelector('#newComment').value.trim();
    const outsideLink = document.querySelector('#newComment').value.trim();
    const ChatLink = document.querySelector('#newComment').value.trim();
    const categories = document.querySelector('#newComment').value.trim();
    const views = document.querySelector('#newComment').value.trim();
    console.log(newComment);

    if (newComment.length > 0) {
        const response = await fetch('/api/spark/comment/' + concept.id, {
            method: 'POST',
            body: `{"comment": "${newComment}"})`,
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response)
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Could not post data');
        }
    }
};
document
    .querySelector('.new-comment')
    .addEventListener('submit', addCommentFormHandler);