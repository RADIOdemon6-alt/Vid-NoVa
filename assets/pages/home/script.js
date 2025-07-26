const uploadBtn = document.getElementById('upload-btn');
const bubble = document.getElementById('bubble');
const uploadOptions = document.getElementById('upload-options');
const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');
const closeSearch = document.getElementById('close-search');
const settingsBtn = document.getElementById('settings-btn');
const settingsChain = document.getElementById('settings-chain');
const submenu = document.getElementById('submenu');
const sectionTitle = document.getElementById('section-title');
const developersBtn = document.getElementById('developers-btn');

let menuOpen = false;
let chainOpen = false;

const submenuData = {
  general: {
    title: 'General Settings',
    items: ['👤 My Account', '📺 My Channel', '🌐 Language', '🎨 Appearance'],
    note: '⚠️ More settings will be added soon.'
  },
  privacy: {
    title: 'Privacy',
    items: ['📄 Terms of Service', '🚫 Content Restriction', '🔧 Custom Settings', '👤 My Account'],
    note: ''
  },
  report: {
    title: 'Report',
    items: ['🐞 Report a Problem', '🚨 Report a User'],
    note: ''
  }
};

// Upload Button (+) Animation
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

// Search Bar Events
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

// Settings Chain Menu Animation
settingsBtn.addEventListener('click', () => {
  if (!chainOpen) {
    gsap.to(settingsBtn, { rotation: 720, duration: 1, ease: "power4.out" });
    gsap.to(settingsBtn, { y: 200, duration: 1, ease: "bounce.out", delay: 1 });
    gsap.to(uploadBtn, { y: 300, rotation: 720, opacity: 0, duration: 1, ease: "back.in" });
    gsap.to(searchIcon, { scale: 0, opacity: 0, duration: 0.6, ease: "power2.inOut" });
    gsap.to(settingsChain, { opacity: 1, pointerEvents: 'auto', duration: 0.5, delay: 1.5 });

    const items = settingsChain.querySelectorAll('.chain-item');
    items.forEach((item, i) => {
      gsap.to(item, { opacity: 1, y: 0, duration: 0.5, delay: 1.6 + i * 0.2, ease: "back.out(1.7)" });
    });
    chainOpen = true;
  } else {
    gsap.to(settingsBtn, { rotation: 0, y: 0, duration: 1, ease: "power4.out" });
    gsap.to(uploadBtn, { y: 0, rotation: 0, opacity: 1, duration: 1, ease: "back.out" });
    gsap.to(searchIcon, { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" });
    gsap.to(settingsChain, { opacity: 0, pointerEvents: 'none', duration: 0.5 });
    chainOpen = false;
  }
});

// Open Submenu Logic
function openSubmenu(section) {
  const chainItems = settingsChain.querySelectorAll('.chain-item');
  chainItems.forEach((item, i) => {
    gsap.to(item, { y: 50, opacity: 0, duration: 0.3, delay: i * 0.1 });
  });

  sectionTitle.textContent = submenuData[section].title;
  gsap.to(sectionTitle, { opacity: 1, duration: 0.5, delay: 0.5 });

  submenu.innerHTML = '';
  submenuData[section].items.forEach((itemText, i) => {
    const item = document.createElement('div');
    item.className = 'submenu-item';
    item.textContent = itemText;
    submenu.appendChild(item);
    gsap.to(item, { opacity: 1, y: 0, duration: 0.5, delay: 0.6 + i * 0.2, ease: "back.out(1.7)" });
  });

  if (submenuData[section].note) {
    const note = document.createElement('div');
    note.className = 'note';
    note.textContent = submenuData[section].note;
    submenu.appendChild(note);
    gsap.to(note, { opacity: 1, duration: 0.5, delay: 1 });
  }

  gsap.to(submenu, { opacity: 1, pointerEvents: 'auto', duration: 0.5, delay: 0.5 });
}

settingsChain.querySelectorAll('.chain-item').forEach(item => {
  item.addEventListener('click', () => {
    const section = item.getAttribute('data-section');
    if (section) openSubmenu(section);
  });
});

developersBtn.addEventListener('click', () => {
  window.location.href = '/developers.html';
});
