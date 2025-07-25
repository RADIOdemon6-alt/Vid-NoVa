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

// Upload Button (+) Animation
uploadBtn.addEventListener('click', () => {
  if (chainOpen) return; // لو قائمة السلسلة مفتوحة لا تفتح ال+

  if (!menuOpen) {
    // فتح المنيو
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
    // اغلاق المنيو
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

// Search Bar Events
searchIcon.addEventListener('click', () => {
  if (chainOpen) return; // لو السلسلة مفتوحة لا تفتح البحث
  searchBar.classList.add('active');
  gsap.to(searchIcon, { x: -window.innerWidth + 60, duration: 0.5 });
  gsap.to('.logo, .settings-btn', { opacity: 0, duration: 0.3 });
});

closeSearch.addEventListener('click', () => {
  searchBar.classList.remove('active');
  gsap.to(searchIcon, { x: 0, duration: 0.5 });
  gsap.to('.logo, .settings-btn', { opacity: 1, duration: 0.3 });
});

// Settings Button (Gear + Chain Menu)
settingsBtn.addEventListener('click', () => {
  if (!chainOpen) {
    // Spin & Drop Gear
    gsap.to(settingsBtn, { rotation: 720, duration: 1, ease: "power4.out" });
    gsap.to(settingsBtn, { y: 200, duration: 1, ease: "bounce.out", delay: 1 });

    // Hide + Button (fall)
    gsap.to(uploadBtn, { y: 300, rotation: 720, opacity: 0, duration: 1, ease: "back.in" });

    // Hide Search Icon (smooth)
    gsap.to(searchIcon, { scale: 0, opacity: 0, duration: 0.6, ease: "power2.inOut" });

    // Show Chain Menu
    gsap.to(settingsChain, { opacity: 1, pointerEvents: 'auto', duration: 0.5, delay: 1.5 });

    // Animate Chain Items
    const items = settingsChain.querySelectorAll('.chain-item');
    const links = settingsChain.querySelectorAll('.chain-link');

    items.forEach((item, i) => {
      gsap.to(item, { opacity: 1, y: 0, duration: 0.5, delay: 1.6 + i * 0.2, ease: "back.out(1.7)" });
      if (links[i]) {
        gsap.to(links[i], { opacity: 1, duration: 0.3, delay: 1.6 + i * 0.2 });
      }
    });

    chainOpen = true;
  } else {
    // Reset All
    gsap.to(settingsBtn, { rotation: 0, y: 0, duration: 1, ease: "power4.out" });
    gsap.to(uploadBtn, { y: 0, rotation: 0, opacity: 1, duration: 1, ease: "back.out" });
    gsap.to(searchIcon, { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" });
    gsap.to(settingsChain, { opacity: 0, pointerEvents: 'none', duration: 0.5 });

    chainOpen = false;
  }
});
