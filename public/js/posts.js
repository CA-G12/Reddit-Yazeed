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
      imageUrl: { check: (validateUrl(imageUrl) && validateImageUrl(imageUrl)) || imageUrl.trim() === '', message: 'image should be a valid url' },
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
    if (validateImageUrl(`${post.image_url}`)) {
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
    const userLink = userDiv.createAppend('a', { className: 'user-link', href: '#' });

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
  }).catch((err) => {
    console.log(err);
    openThisModal('login');
  });
});

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