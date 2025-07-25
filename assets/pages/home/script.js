const uploadBtn = document.getElementById('upload-btn');
const bubble = document.getElementById('bubble');
const uploadOptions = document.getElementById('upload-options');
const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');
const closeSearch = document.getElementById('close-search');
const settingsBtn = document.getElementById('settings-btn');
const settingsChain = document.getElementById('settings-chain');
const chainItems = settingsChain.querySelectorAll('.chain-item');
const chainLinks = settingsChain.querySelectorAll('.chain-link-img');

let menuOpen = false;
let chainOpen = false;

// Upload Button Animation
uploadBtn.addEventListener('click', () => {
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
    gsap.to(uploadOptions.children[0], { x: 0, duration: 0.4 });
    gsap.to(uploadOptions.children[1], { x: 0, duration: 0.4 });
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

// Search Bar
searchIcon.addEventListener('click', () => {
  searchBar.classList.add('active');
  gsap.to(searchIcon, { x: -window.innerWidth + 60, duration: 0.5 });
  gsap.to('.logo, .settings-btn', { opacity: 0, duration: 0.3 });
});

closeSearch.addEventListener('click', () => {
  searchBar.classList.remove('active');
  gsap.to(searchIcon, { x: 0, duration: 0.5 });
  gsap.to('.logo, .settings-btn', { opacity: 1, duration: 0.3 });
});

// Settings Chain
settingsBtn.addEventListener('click', () => {
  if (!chainOpen) {
    gsap.to(settingsBtn, { rotation: 720, duration: 1, ease: "power4.out" });
    gsap.to(settingsBtn, { y: window.innerHeight, duration: 1, ease: "power4.in", delay: 1, onComplete: () => {
      settingsBtn.style.display = 'none';
    }});
    gsap.to(settingsChain, { opacity: 1, pointerEvents: 'auto', duration: 0.5, delay: 1.5 });

    chainLinks.forEach((link, i) => {
      gsap.to(link, { opacity: 1, scaleY: 1, duration: 0.3, delay: 1.6 + i * 0.1 });
    });

    chainItems.forEach((item, i) => {
      gsap.to(item, { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 2 + i * 0.2 });
    });

    chainOpen = true;
  } else {
    settingsBtn.style.display = 'block';
    gsap.to(settingsBtn, { rotation: 0, y: 0, duration: 1 });
    gsap.to(settingsChain, { opacity: 0, pointerEvents: 'none', duration: 0.5 });

    chainOpen = false;
  }
});
