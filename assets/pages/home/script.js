const uploadBtn = document.getElementById('upload-btn');
const bubble = document.getElementById('bubble');
const uploadOptions = document.getElementById('upload-options');
const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');
const closeSearch = document.getElementById('close-search');
const settingsBtn = document.getElementById('settings-btn');
const settingsChain = document.getElementById('settings-chain');

let menuOpen = false;
let chainOpen = false;

uploadBtn.addEventListener('click', () => {
  if (chainOpen) return;

  if (!menuOpen) {
    gsap.to(bubble, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(bubble, { opacity: 0, duration: 0.2 });
        gsap.to(uploadOptions, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
        gsap.to(uploadOptions.children[0], { x: -80, duration: 0.4, ease: "back.out(1.7)" });
        gsap.to(uploadOptions.children[1], { x: 80, duration: 0.4, ease: "back.out(1.7)" });
      }
    });
    menuOpen = true;
  } else {
    gsap.to(uploadOptions.children[0], { x: 0, duration: 0.4, ease: "power3.inOut" });
    gsap.to(uploadOptions.children[1], { x: 0, duration: 0.4, ease: "power3.inOut" });
    gsap.to(uploadOptions, {
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.3,
      onComplete: () => {
        gsap.to(bubble, { opacity: 1, scale: 0, duration: 0.3 });
      }
    });
    menuOpen = false;
  }
});

searchIcon.addEventListener('click', () => {
  if (chainOpen) return;
  searchBar.classList.add('active');
  gsap.to(searchIcon, { x: -window.innerWidth + 60, duration: 0.5 });
  gsap.to('.logo, .settings-btn', { opacity: 0, duration: 0.3 });
});

closeSearch.addEventListener('click', () => {
  searchBar.classList.remove('active');
  gsap.to(searchIcon, { x: 0, duration: 0.5 });
  gsap.to('.logo, .settings-btn', { opacity: 1, duration: 0.3 });
});

settingsBtn.addEventListener('click', () => {
  if (!chainOpen) {
    gsap.to(settingsBtn, { rotation: 1080, y: window.innerHeight, duration: 1.5, ease: "power4.inOut" });
    gsap.to(uploadBtn, { y: window.innerHeight, opacity: 0, duration: 1.2, ease: "back.inOut" });
    gsap.to(searchIcon, { scale: 0, opacity: 0, duration: 0.8 });

    gsap.to(settingsChain, { opacity: 1, pointerEvents: 'auto', duration: 0.5, delay: 1.5 });

    const items = settingsChain.querySelectorAll('.chain-item');
    const links = settingsChain.querySelectorAll('.chain-link');

    items.forEach((item, i) => {
      gsap.to(item, { opacity: 1, y: 0, duration: 0.5, delay: 1.6 + i * 0.2, ease: "back.out(2)" });
      if (links[i]) {
        gsap.to(links[i], { opacity: 1, duration: 0.3, delay: 1.6 + i * 0.2 });
      }
    });
    chainOpen = true;
  } else {
    gsap.to(settingsBtn, { rotation: 0, y: 0, duration: 1, ease: "power4.out" });
    gsap.to(uploadBtn, { y: 0, opacity: 1, duration: 1, ease: "back.out" });
    gsap.to(searchIcon, { scale: 1, opacity: 1, duration: 0.6 });
    gsap.to(settingsChain, { opacity: 0, pointerEvents: 'none', duration: 0.5 });
    chainOpen = false;
  }
});
