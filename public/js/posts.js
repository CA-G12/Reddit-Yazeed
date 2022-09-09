/* eslint-disable no-undef */
const postsDiv = document.querySelector('.posts');

const postFunctions = {
  allPosts() {
    fetchFunctions.getData('/api/v1/posts', this.renderPosts);
  },
  allPostsOrderedByVote() {
    fetchFunctions.getData('/api/v1/posts/hot', this.renderPosts);
  },
  allPostsOrderedByDate() {
    fetchFunctions.getData('/api/v1/posts/new', this.renderPosts);
  },
  searchPostsByTitle(title) {
    fetchFunctions.getData(`/api/v1/posts/search?title=${title}`, this.renderPosts);
  },
  categoryPosts(category) {
    fetchFunctions.getData(`/api/v1/posts/category/${category}`, this.renderPosts);
  },
  singlePost(postId) {
    fetchFunctions.getData(`/api/v1/posts/${postId}`, this.renderPosts);
  },

  renderPosts(posts) {
    if (!posts) {
      postsDiv.innerHTML = 'No data found';
      return;
    }
    postsDiv.innerHTML = '';

    if (!Array.isArray(posts)) {
      posts = [].concat(posts);
    }

    posts.forEach((post) => {
      const postItemDiv = postsDiv.createAppend('div', { className: 'post-item', id: post.id });

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
      titleHeading.createAppend('a', { href: `/post/${post.id}/comments`, textContent: post.title });

      if (post.type === 'link') {
        if (validateUrl(post.content)) {
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
        className: 'comments-link', href: `/post/${post.id}/comments`,
      });

      commentsLink.createAppend('i', { className: 'fa-regular fa-comment' });
      commentsLink.createAppend('span', { className: 'comments-number', textContent: `${post.comments} Comments` });

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
