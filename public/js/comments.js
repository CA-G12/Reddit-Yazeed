const commentsDiv = document.querySelector('.comment-items');
const submitCommentBn = document.querySelector('.submit-comment-btn');
const commentSubmitInput = document.querySelector('.comment-submit-input');
const commentsHeading = document.querySelector('.comments h3');

const commentFunctions = {
  postComments(postId) {
    fetchFunctions().getData(`/api/v1/post/${postId}/comments`).then((res) => this.renderComments(res));
  },

  submitComment(content, postId) {
    fetchFunctions().getData('/check-auth').then((userResult) => {
      if (validateComment(content)) {
        fetchFunctions().postData('/api/v1/comment', { content, postId, userId: userResult.user.id })
          .then(() => {
            this.postComments(postId);
          }).catch(() => {
            openThisModal('login');
          });
      }
    }).catch(() => {
      openThisModal('login');
    });
  },

  renderComments(comments) {
    if (!comments) {
      commentsDiv.innerHTML = 'No comments found';
      return;
    }
    commentsDiv.innerHTML = '';

    commentsHeading.textContent = `Comments (${comments.length}):`;
    comments.forEach((comment) => {
      const commentItemDiv = commentsDiv.createAppend('div', {
        className: 'comment-item', id: comment.comment_id,
      });
      const metaDiv = commentItemDiv.createAppend('div', { className: 'meta' });

      // User image
      const userImgDiv = metaDiv.createAppend('div', { className: 'user-img' });
      const userImg = userImgDiv.createAppend('img', {
        alt: 'User Avatar Image',
        src: comment.avatar_url || '../../images/user_avatar.png',
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
        className: 'comment-date', textContent: timeSince(new Date(comment.created_at)),
      });

      commentItemDiv.createAppend('div', { className: 'comment-content', textContent: comment.content });
    });
  },
};

const split = window.location.href.split('/');
postFunctions.singlePost(split[split.length - 2]);
commentFunctions.postComments(split[split.length - 2]);

// const postSubmitInput = document.querySelector('.post-submit-input');

submitCommentBn.addEventListener('click', () => {
  commentFunctions.submitComment(commentSubmitInput.value, split[split.length - 2]);
});

function validateComment(comment) {
  if (comment.trim() !== '') {
    commentSubmitInput.value = '';
    commentSubmitInput.placeholder = 'Write your comment here ...';
    commentSubmitInput.classList.remove('invalid');
    return true;
  }
  commentSubmitInput.placeholder = 'You should write something';
  commentSubmitInput.classList.add('invalid');
  return false;
}

commentSubmitInput.addEventListener('input', (e) => {
  if (e.target.value.trim() !== '') {
    commentSubmitInput.classList.remove('invalid');
    commentSubmitInput.placeholder = 'Write your comment here ...';
  }
});
