const modal = document.querySelector('.modal');
const loginForm = document.querySelector('.modal .forms .login');
const signupForm = document.querySelector('.modal .forms .signup');
// const modalContent = document.querySelector('.modal .modal-content');

const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');

const closeBtn = document.querySelector('.modal .close');

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

const openModal = () => {
  modal.style.display = 'flex';
  modal.addEventListener('click', (e) => {
    if (e.target.className === 'modal') {
      modal.style.display = 'none';
    }
  });
};

const openLoginModal = (formType) => {
  openModal();
  if (formType === 'login') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
  } else if (formType === 'signup') {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  }
};

loginBtn.addEventListener('click', () => openLoginModal('login'));
signupBtn.addEventListener('click', () => openLoginModal('signup'));

modal.style.display = 'none';
