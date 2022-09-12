/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const postsDiv = document.querySelector('.posts');
// Add post inputs
const titleInput = document.querySelector('#title');
const categoryInput = document.querySelector('#category');
const typeInput = document.querySelector('#type');
const imageUrlInput = document.querySelector('#image-url');
const contentInput = document.querySelector('#content');
const submitPostBtn1 = document.querySelector('#submit-btn');

const postFunctions = {
  allPosts() {
    fetchFunctions().getData('/api/v1/posts').then((res) => renderPosts(res));
  },
  allPostsOrderedByVote() {
    fetchFunctions().getData('/api/v1/posts/hot').then((res) => renderPosts(res));
  },
  allPostsOrderedByDate() {
    fetchFunctions().getData('/api/v1/posts/new').then((res) => renderPosts(res));
  },
  searchPostsByTitle(title) {
    fetchFunctions().getData(`/api/v1/posts/search?title=${title}`).then((res) => renderPosts(res));
  },
  categoryPosts(category) {
    fetchFunctions().getData(`/api/v1/posts/category/${category}`).then((res) => renderPosts(res));
  },
  singlePost(postId) {
    fetchFunctions().getData(`/api/v1/posts/${postId}`).then((res) => renderPosts(res));
  },
  addPost(postObj) {
    return fetchFunctions().postData('/api/v1/post', postObj);
  },
  addUpvote({ postId, userId, type }) {
    return fetchFunctions().postData('/api/v1/vote', { postId, userId, type });
  },
  validatePost({
    title, content, type, category, imageUrl, userId,
  }) {
    const schema = {
      title: { check: title.length > 3, message: 'title should have length at least 3 letters' },
      content: { check: (type === 'link') ? validateUrl(content) : true, message: 'content should be valid url' },
      type: { check: type === 'text' || type === 'link', message: 'type shouldn\'t by empty' },
      category: {
        check: ['all', 'programming', 'music', 'movies', 'memes', 'politics', 'news', 'food', 'videos']
          .includes(category),
        message: 'category should not be empty',
      },
      imageUrl: { check: validateUrl(imageUrl) || imageUrl.trim() === '', message: 'image should be a valid url' },
      userId: { check: typeof userId === 'number', message: '' },
    };

    const rules = Object.keys(schema);
    const errorMessages = {};
    for (let i = 0; i < rules.length; i += 1) {
      if (!schema[rules[i]].check) {
        errorMessages[rules[i]] = schema[rules[i]].message;
      }
    }
    if (Object.keys(errorMessages).length === 0) return true;
    return errorMessages;
  },
};

function renderPosts(posts) {
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
    const upVoteLink = postVotesDiv.createAppend('a', { className: 'upvote' });

    upVoteLink.createAppend('i', { className: 'fas fa-angle-up' });
    upVoteLink.addEventListener('click', () => sendVote(post.id, 1));
    const votesNumber = post.votes;
    postVotesDiv.createAppend('span', { className: 'vote-number', textContent: votesNumber < 0 ? 0 : votesNumber });

    if (votesNumber > 0) {
      upVoteLink.style.color = '#0079d3';
    }

    const downVoteLink = postVotesDiv.createAppend('a', { className: 'downvote' });
    downVoteLink.addEventListener('click', () => sendVote(post.id, -1));

    downVoteLink.createAppend('i', { className: 'fas fa-angle-down' });

    if (votesNumber < 0) {
      downVoteLink.style.color = 'red';
    }
    const postDetails = postItemDiv.createAppend('div', { className: 'post-details' });

    const titleHeading = postDetails
      .createAppend('h3', { className: 'title' });
    titleHeading.createAppend('a', { href: `/post/${post.id}/comments`, innerHTML: post.title });

    if (post.type === 'link') {
      if (validateUrl(post.content)) {
        postDetails.createAppend('a', {
          className: 'content', innerHTML: post.content, href: post.content, target: '_blank',
        });
      }
    } else {
      postDetails.createAppend('p', { className: 'content', textContent: post.content });
    }
    if (validateUrl(`${post.image_url}`)) {
      const postImgDiv = postDetails.createAppend('div', { className: 'post-img' });
      postImgDiv.createAppend('img', { src: post.image_url, alt: post.title });
    }

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
    const userLink = userDiv.createAppend('a', { className: 'user-link' });

    userLink.createAppend('i', { className: 'fa-solid fa-user' });
    userLink.createAppend('span', { className: 'username', textContent: post.username });

    // Post Date
    const postDateDiv = metaDiv.createAppend('div', { className: 'date' });

    postDateDiv.createAppend('i', { className: 'fa-regular fa-calendar-days' });
    postDateDiv.createAppend('span', {
      className: 'post-date', textContent: timeSince(new Date(post.created_at)),
    });
  });
}

submitPostBtn1.addEventListener('click', (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const category = categoryInput.value.toLowerCase();
  const type = typeInput.value.toLowerCase();
  const imageUrl = imageUrlInput.value;
  const content = contentInput.value;

  fetchFunctions().getData('/check-auth').then((userResult) => {
    const userId = (userResult.user) ? userResult.user.id : null;
    const valid = postFunctions.validatePost({
      title, category, type, imageUrl, content, userId,
    });
    if (valid === true) {
      postFunctions.addPost({
        title, category, type, imageUrl, content,
      })
        .then(() => { window.location.reload(); })
        .catch((err) => {
          displayPostErrors(JSON.parse(err).errors);
        });
    } else {
      displayPostErrors(valid);
    }
  }).catch(() => {
    openThisModal('login');
  });
});

function sendVote(postId, type) {
  fetchFunctions().getData('/check-auth').then((userResult) => {
    const userId = (userResult.user) ? userResult.user.id : null;
    postFunctions.addUpvote({ userId, postId, type })
      .then(() => fetchFunctions().getData(`/api/v1/posts/${postId}`))
      .then((post) => {
        const currentPost = document.getElementById(postId);
        const voteNumber = currentPost.querySelector('.vote-number');
        if (post.votes < 0) {
          voteNumber.textContent = 0;
        } else {
          voteNumber.textContent = post.votes;
        }
        if (post.votes > 0) {
          currentPost.querySelector('.upvote').style.color = '#0079d3';
          currentPost.querySelector('.downvote').style.color = 'black';
        } else if (post.votes < 0) {
          currentPost.querySelector('.downvote').style.color = 'red';
          currentPost.querySelector('.upvote').style.color = 'black';
        }
      });
  }).catch(() => {
    openThisModal('login');
  });
}

function displayPostErrors(errors) {
  const removeQuotes = (str) => str.replaceAll('"', '');
  const titleError = titleInput.parentElement.querySelector('.error');
  const categoryError = categoryInput.parentElement.querySelector('.error');
  const typeError = typeInput.parentElement.querySelector('.error');
  const contentError = contentInput.parentElement.querySelector('.error');
  const imageUrlError = imageUrlInput.parentElement.querySelector('.error');

  if (errors.title) {
    showError(titleInput, titleError, removeQuotes(errors.title));
  } else {
    hideError(titleInput, titleError, 'valid');
  }

  if (errors.category) {
    showError(categoryInput, categoryError, removeQuotes(errors.category));
  } else {
    hideError(categoryInput, categoryError, 'valid');
  }

  if (errors.type) {
    showError(typeInput, typeError, removeQuotes(errors.type));
  } else {
    hideError(typeInput, typeError, 'valid');
  }

  if (errors.content) {
    showError(contentInput, contentError, removeQuotes(errors.content));
  } else {
    hideError(contentInput, contentError, 'valid');
  }

  if (errors.imageUrl) {
    showError(imageUrlInput, imageUrlError, removeQuotes(errors.imageUrl));
  } else {
    hideError(imageUrlInput, imageUrlError, 'valid');
  }
}
