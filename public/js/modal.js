const modal = document.querySelector('.modal');
// const modalContent = document.querySelector('.modal .modal-content');
const closeBtn = document.querySelector('.modal .close');
const sideImage = document.querySelector('.modal .side-image');
// Forms
const loginForm = document.querySelector('.modal .forms .login');
const signupForm = document.querySelector('.modal .forms .signup');
const submitForm = document.querySelector('.modal .forms .submit');

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

const openThisModal = (formType) => {
  openModal();
  if (formType === 'login') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    submitForm.style.display = 'none';
    if (window.innerWidth >= 768) {
      sideImage.style.display = 'block';
    }
  } else if (formType === 'signup') {
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
    submitForm.style.display = 'none';
    if (window.innerWidth >= 768) {
      sideImage.style.display = 'block';
    }
  } else if (formType === 'submit') {
    submitForm.style.display = 'block';
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    sideImage.style.display = 'none';
  }
};

modal.style.display = 'none';
