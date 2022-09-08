const commentsDiv = document.querySelector('.comment-items');

const commentFunctions = {
  postComments(postId) {
    fetchFunctions.fetchData(`/api/v1/post/${postId}/comments`, this.renderComments);
  },

  renderComments(comments) {
    if (!comments) {
      commentsDiv.innerHTML = 'No comments found';
      return;
    }
    commentsDiv.innerHTML = '';

    comments.forEach((comment) => {
      const commentItemDiv = commentsDiv.createAppend('div', {
        className: 'comment-item', id: comment['comment_id'],
      });
      const metaDiv = commentItemDiv.createAppend('div', { className: 'meta' });

      // User image
      const userImgDiv = metaDiv.createAppend('div', { className: 'user-img' });
      const userImg = userImgDiv.createAppend('img', { alt: 'User Avatar Image',
        src: comment.image_url || '../../images/user_avatar.png',
      });

      // Username
      const userDiv = metaDiv.createAppend('div', { className: 'user' });
      const userLink = userDiv.createAppend('a', { className: 'user-link', href: '#' });

      userLink.createAppend('i', { className: 'fa-solid fa-user' });
      userLink.createAppend('span', { className: 'username', textContent: comment.username });

      // Post Date
      const commentDateDiv = metaDiv.createAppend('div', { className: 'date' });

      commentDateDiv.createAppend('i', { className: 'fa-regular fa-calendar-days' });
      commentDateDiv.createAppend('span', {
        className: 'comment-date', textContent: formatDate(comment.created_at),
      });

      commentItemDiv.createAppend('div', { className: 'comment-content', textContent: comment.content });
    });
  },
};

const split = window.location.href.split('/');
postFunctions.singlePost(split[split.length - 2]);
commentFunctions.postComments(split[split.length - 2]);
