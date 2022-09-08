const postsDiv = document.querySelector('.posts');
const hotLink = document.querySelector('.posts-order .hot');
const newLink = document.querySelector('.posts-order .new');
const categoryList = document.querySelectorAll('.sidebar-wrapper ul a');
const searchInput = document.querySelector('.search');

function fetchPosts(url, successCb) {
  fetchUrl('GET', url)
    .then((res) => {
      if (res.status === 400) alert(res.message);
      else if (res.status === 500) window.location.href = '../html/500.html';
      else if (res.message === 'No data found') {
        successCb();
      } else {
        successCb(res.result);
      }
    });
}

const postFunctions = {
  allPosts() {
    fetchPosts('/api/v1/posts', this.renderPosts);
  },
  allPostsOrderedByVote() {
    fetchPosts('/api/v1/posts/hot', this.renderPosts);
  },
  allPostsOrderedByDate() {
    fetchPosts('/api/v1/posts/new', this.renderPosts);
  },
  searchPostsByTitle(title) {
    fetchPosts(`/api/v1/posts/search?title=${title}`, this.renderPosts);
  },
  categoryPosts(category) {
    fetchPosts(`/api/v1/posts/category/${category}`, this.renderPosts);
  },

  renderPosts(posts) {
    if (!posts) {
      postsDiv.innerHTML = 'No data found';
      return;
    }
    postsDiv.innerHTML = '';

    posts.forEach((post) => {
      const postItemDiv = postsDiv.createAppend('div', { className: 'post-item' });

      // Votes
      const postVotesDiv = postItemDiv.createAppend('div', { className: 'post-votes' });
      const upVoteLink = postVotesDiv.createAppend('a', { href: '#', className: 'upvote' });

      upVoteLink.createAppend('i', { className: 'fas fa-angle-up' });
      const voteNumberSpan = postVotesDiv
        .createAppend('span', { className: 'vote-number', textContent: post.votes });

      const downVoteLink = postVotesDiv.createAppend('a', { href: '#', className: 'downvote' });
      downVoteLink.createAppend('i', { className: 'fas fa-angle-down' });

      const postDetails = postItemDiv.createAppend('div', { className: 'post-details' });

      const titleHeading = postDetails
        .createAppend('h3', { className: 'title' });
      titleHeading.createAppend('a', { href: '#', textContent: post.title });

      if (post.type === 'link') {
        if (validateUrl (post.content)) {
          postDetails.createAppend('a', {
            className: 'content', textContent: post.content, href: post.content, target: '_blank',
          });
        }
      } else {
        postDetails.createAppend('p', { className: 'content', textContent: post.content });
      }

      const postImgDiv = postDetails.createAppend('div', { className: 'post-img' });
      postImgDiv.createAppend('img', { src: post.image_url, alt: post.title });

      const metaDiv = postDetails.createAppend('div', { className: 'meta' });

      // Comments
      const commentsDiv = metaDiv.createAppend('div', { className: 'comments' });
      const commentsLink = commentsDiv.createAppend('a', {
        className: 'comments-link', href: '#',
      });

      commentsLink.createAppend('i', { className: 'fa-regular fa-comment' });
      commentsLink.createAppend('span', { className: 'comments-number', textContent: post.comments });

      // Username
      const userDiv = metaDiv.createAppend('div', { className: 'user' });
      const userLink = userDiv.createAppend('a', { className: 'user-link', href: '#' });

      userLink.createAppend('i', { className: 'fa-solid fa-user' });
      userLink.createAppend('span', { className: 'username', textContent: post.username });

      // Post Date
      const postDateDiv = metaDiv.createAppend('div', { className: 'date' });

      postDateDiv.createAppend('i', { className: 'fa-regular fa-calendar-days' });
      postDateDiv.createAppend('span', {
        className: 'post-date', textContent: formatDate(post.created_at),
      });
    });
  },
};

// Render posts on widnow load
postFunctions.allPosts();

hotLink.addEventListener('click', () => {
  postFunctions.allPostsOrderedByVote();
});
newLink.addEventListener('click', () => {
  postFunctions.allPostsOrderedByDate();
});

categoryList.forEach((categoryLink) => {
  categoryLink.addEventListener('click', (e) => {
    const category = e.target.dataset.cat;
    postFunctions.categoryPosts(category);
  });
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    postFunctions.searchPostsByTitle(e.target.value.trim());
  }
});
