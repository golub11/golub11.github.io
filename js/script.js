document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('post-content');
    const postLinks = document.querySelectorAll('.post-link');

    // Function to load a post and apply syntax highlighting
    function loadPost(postId) {
        fetch(`posts/${postId}.html`)
            .then(response => {
                if (!response.ok) throw new Error('Post not found');
                return response.text();
            })
            .then(data => {
                contentDiv.innerHTML = data;
                // Reapply Prism highlighting after content is loaded
                Prism.highlightAll();
                // Update URL without reloading
                window.history.pushState({ post: postId }, '', `?post=${postId}`);
            })
            .catch(error => {
                contentDiv.innerHTML = '<div class="col-md-10"><h2>Error</h2><p>Could not load the post.</p></div>';
                console.error(error);
            });
    }

    // Handle post link clicks
    postLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const postId = link.getAttribute('data-post');
            loadPost(postId);
        });
    });

    // Load post from URL parameter on page load
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    if (postId) {
        loadPost(postId);
    }

    // Handle browser back/forward navigation
    window.addEventListener('popstate', (event) => {
        const postId = event.state?.post;
        if (postId) {
            loadPost(postId);
        } else {
            contentDiv.innerHTML = `
                <div class="col-md-10 text-center">
                    <h2>Welcome to My Tech Blog</h2>
                    <p>Select a post from the "Posts" menu to get started!</p>
                </div>`;
        }
    });
});