const uploadBtn = document.getElementById('upload-btn');
const uploadLine = document.getElementById('upload-line');
const uploadOptions = document.getElementById('upload-options');
const settingsBtn = document.getElementById('settings-btn');
const settingsPopup = document.getElementById('settings-popup');
const overlay = document.getElementById('overlay');
const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');

let isUploadActive = false;

uploadBtn.addEventListener('click', () => {
  isUploadActive = !isUploadActive;
  if (isUploadActive) {
    uploadLine.style.height = '5px';
    uploadOptions.classList.add('active');
  } else {
    uploadLine.style.height = '0';
    uploadOptions.classList.remove('active');
  }
});

settingsBtn.addEventListener('click', () => {
  settingsPopup.classList.toggle('active');
  overlay.style.display = 'block';
});

overlay.addEventListener('click', () => {
  settingsPopup.classList.remove('active');
  overlay.style.display = 'none';
});

searchIcon.addEventListener('click', () => {
  document.querySelector('.logo').style.display = 'none';
  settingsBtn.style.display = 'none';
  searchIcon.style.transition = 'all 0.5s ease';
  searchIcon.style.marginLeft = 'auto';
  searchBar.classList.add('active');
});

document.getElementById('change-lang').addEventListener('click', () => {
  window.location.href = 'https://translate.google.com/translate?hl=&sl=auto&tl=auto&u=' + window.location.href;
});
