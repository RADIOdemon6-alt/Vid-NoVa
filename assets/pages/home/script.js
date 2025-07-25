const uploadBtn = document.getElementById('upload-btn');
const uploadOptions = document.getElementById('upload-options');
const settingsBtn = document.getElementById('settings-btn');
const settingsPopup = document.getElementById('settings-popup');
const overlay = document.getElementById('overlay');
const changeLang = document.getElementById('change-lang');

uploadBtn.addEventListener('click', () => {
  uploadOptions.style.display = uploadOptions.style.display === 'block' ? 'none' : 'block';
  uploadOptions.classList.toggle('active');
});

settingsBtn.addEventListener('click', () => {
  settingsPopup.classList.toggle('active');
  overlay.style.display = 'block';
});

overlay.addEventListener('click', () => {
  settingsPopup.classList.remove('active');
  overlay.style.display = 'none';
});

changeLang.addEventListener('click', () => {
  window.location.href = 'https://translate.google.com/translate?hl=&sl=auto&tl=auto&u=' + window.location.href;
});
