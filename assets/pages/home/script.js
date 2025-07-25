const uploadBtn = document.getElementById('upload-btn');
const bubble = document.getElementById('bubble');
const uploadOptions = document.getElementById('upload-options');
const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');
const closeSearch = document.getElementById('close-search');

uploadBtn.addEventListener('click', () => {
  gsap.to(bubble, {scale: 1, duration: 0.3, ease: "power2.out", onComplete: () => {
    gsap.to(uploadOptions, {opacity: 1, pointerEvents: 'auto', duration: 0.3});
    gsap.to(uploadOptions.children[0], {x: -80, duration: 0.3});
    gsap.to(uploadOptions.children[1], {x: 80, duration: 0.3});
  }});
});

searchIcon.addEventListener('click', () => {
  searchBar.classList.add('active');
  gsap.to(searchIcon, {x: -window.innerWidth + 60, duration: 0.5});
  gsap.to('.logo, .settings-btn', {opacity: 0, duration: 0.3});
});

closeSearch.addEventListener('click', () => {
  searchBar.classList.remove('active');
  gsap.to(searchIcon, {x: 0, duration: 0.5});
  gsap.to('.logo, .settings-btn', {opacity: 1, duration: 0.3});
});
