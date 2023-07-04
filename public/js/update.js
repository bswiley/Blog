const updatePostFormHandler = async () => {
    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();
    const id = document.querySelector('#hide').textContent.trim();

    try {
        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            throw new Error('Could not update post');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while updating the post');
    }
};

document.querySelector('#update').addEventListener('click', updatePostFormHandler);