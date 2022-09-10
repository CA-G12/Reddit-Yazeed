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
    if (category === 'all') {
      postFunctions.allPosts();
    } else {
      postFunctions.categoryPosts(category);
    }
  });
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    postFunctions.searchPostsByTitle(e.target.value.trim());
  }
});
