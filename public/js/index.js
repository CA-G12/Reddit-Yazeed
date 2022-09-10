const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const logoutbtn = document.querySelector('.logout-btn');
// User control buttons

const postSubmitInput = document.querySelector('.post-submit-input');
const submitPostImage = document.querySelector('.submit-post img');
const submitCommentImage = document.querySelector('.submit-comment img');

const profileImgDiv = document.querySelector('.profile-img');
const profileImg = profileImgDiv.querySelector('img');

logoutbtn.addEventListener('click', () => {
  fetchFunctions().getData('/logout');
});

loginBtn.addEventListener('click', () => openThisModal('login'));
signupBtn.addEventListener('click', () => openThisModal('signup'));
if (postSubmitInput) {
  postSubmitInput.addEventListener('focus', () => {
    window.setTimeout(() => openThisModal('submit'), 500);
  });
}

function changeUsername(user) {
  const profileUsername = document.querySelector('.profile-username');
  if (user) {
    profileUsername.textContent = user.username;
    document.querySelector('.login-btn').style.display = 'none';
    document.querySelector('.signup-btn').style.display = 'none';
    document.querySelector('.logout-btn').style.display = 'block';
    const avatarUrl = user.avatar_url || user.avatarUrl;
    if (validateUrl(avatarUrl)) {
      submitPostImage.src = avatarUrl;
      if (submitCommentImage) {
        submitCommentImage.src = avatarUrl;
      }
    }
    profileImg.src = avatarUrl;
  } else {
    profileUsername.textContent = '';
    document.querySelector('.login-btn').style.display = 'block';
    document.querySelector('.signup-btn').style.display = 'block';
    document.querySelector('.logout-btn').style.display = 'none';
    submitPostImage.src = '../../images/user_avatar.png';
    if (submitCommentImage) {
      submitCommentImage.src = '../../images/user_avatar.png';
    }

    profileImg.src = '../../images/user_avatar.png';
  }
}
