// Render posts on widnow load
/* eslint-disable no-undef */
const hotLink = document.querySelector('.posts-order .hot');
const newLink = document.querySelector('.posts-order .new');
const categoryList = document.querySelectorAll('.sidebar-wrapper ul a');
const searchInput = document.querySelector('.search');

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
    categoryList.forEach((element) => element.classList.remove('active'));
    e.target.classList.add('active');
    postFunctions.categoryPosts(category);
  });
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    postFunctions.searchPostsByTitle(e.target.value.trim());
  }
});

const titleInput = document.querySelector('#title');
const categoryInput = document.querySelector('#category');
const typeInput = document.querySelector('#type');
const imageUrlInput = document.querySelector('#image-url');
const contentInput = document.querySelector('#content');
const submitPostBtn = document.querySelector('#submit-btn');

submitPostBtn.addEventListener('click', (e) => {
  console.log('hello');
  e.preventDefault();
  const post = {
    title: titleInput.value,
    category: categoryInput.value.toLowerCase(),
    type: typeInput.value.toLowerCase(),
    imageUrl: imageUrlInput.value,
    content: contentInput.value,
    userId: 1,
  };

  const valid = postFunctions.validatePost(post);
  if (valid === true) {
    postFunctions.addPost(post)
      .then(() => { window.location.reload(); })
      .catch((err) => displayErrors(JSON.parse(err).errors));
  } else {
    displayErrors(valid);
  }
});

function displayErrors(errors) {
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

const showError = (checkedInput, messageElement, errorMessage) => {
  messageElement.classList.remove('hidden');
  checkedInput.classList.add('invalid');
  messageElement.textContent = errorMessage;
};

const hideError = (checkedInput, messageElement, validMessage) => {
  messageElement.classList.add('hidden');
  checkedInput.classList.remove('invalid');
  messageElement.textContent = validMessage;
};


