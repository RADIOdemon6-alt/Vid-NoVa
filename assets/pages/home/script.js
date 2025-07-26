// عناصر DOM
const settingsBtn = document.getElementById('settings-btn');
const sidebar = document.getElementById('settings-sidebar');
const sections = document.querySelectorAll('.settings-section');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const themeRadios = document.querySelectorAll('input[name="theme"]');
const uploadBtn = document.getElementById('upload-btn');
const bubble = document.getElementById('bubble');
const uploadOptions = document.getElementById('upload-options');
const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');
const closeSearch = document.getElementById('close-search');

// حالات
let sidebarOpen = false;
let menuOpen = false;

// -------------------
// زر الترس (فتح/غلق القائمة الجانبية)
settingsBtn.addEventListener('click', () => {
  // ترس يدور في مكانه
  gsap.to(settingsBtn, { rotation: '+=360', duration: 1, ease: "power2.out" });

  if (!sidebarOpen) {
    gsap.to(sidebar, { x: 0, duration: 0.5, ease: "power2.out" });
    sidebarOpen = true;
  } else {
    gsap.to(sidebar, { x: -250, duration: 0.5, ease: "power2.in" });
    sections.forEach(section => section.style.display = 'none');
    sidebarOpen = false;
  }
});

// -------------------
// التحكم في الأقسام (General, Privacy, Reports, Developers)
sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    const targetSection = item.getAttribute('data-section');

    // إخفاء كل الأقسام
    sections.forEach(section => {
      if (section.id === `${targetSection}-section`) {
        gsap.fromTo(section, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, display: 'block' });
      } else {
        gsap.to(section, { opacity: 0, duration: 0.3, onComplete: () => { section.style.display = 'none'; } });
      }
    });

    // تحويل المطورين لصفحة جديدة
    if (targetSection === 'developers') {
      setTimeout(() => {
        window.location.href = '/developers.html';
      }, 500);
    }
  });
});

// -------------------
// التحكم في الثيمات (Light, Dark, Default)
themeRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'light') {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else if (radio.value === 'dark') {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('light-theme', 'dark-theme');
    }
  });
});

// -------------------
// زر + (Upload Menu)
uploadBtn.addEventListener('click', () => {
  if (sidebarOpen) return; // لو القائمة الجانبية مفتوحة لا تفتح +
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
    // إغلاق المنيو
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

// -------------------
// البحث (Search Icon)
searchIcon.addEventListener('click', () => {
  if (sidebarOpen) return; // لو القائمة الجانبية مفتوحة لا تفتح البحث
  searchBar.classList.add('active');
  gsap.to(searchIcon, { x: -window.innerWidth + 60, duration: 0.5 });
  gsap.to('.logo, .settings-btn', { opacity: 0, duration: 0.3 });
});

// -------------------
// إغلاق البحث
closeSearch.addEventListener('click', () => {
  searchBar.classList.remove('active');
  gsap.to(searchIcon, { x: 0, duration: 0.5 });
  gsap.to('.logo, .settings-btn', { opacity: 1, duration: 0.3 });
});

// -------------------
// إخفاء Sidebar في البداية
gsap.set(sidebar, { x: -250 });
