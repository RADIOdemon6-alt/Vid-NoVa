const settingsBtn = document.getElementById('settings-btn');
const sidebar = document.getElementById('settings-sidebar');
const sections = document.querySelectorAll('.settings-section');
const sidebarItems = document.querySelectorAll('.sidebar-item');

// Theme Switcher
const themeRadios = document.querySelectorAll('input[name="theme"]');

// Sidebar Open/Close Toggle
let sidebarOpen = false;

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

// Sidebar Item Click Events
sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    const targetSection = item.getAttribute('data-section');

    // Hide All Sections
    sections.forEach(section => {
      if (section.id === `${targetSection}-section`) {
        gsap.fromTo(section, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, display: 'block' });
      } else {
        gsap.to(section, { opacity: 0, duration: 0.3, onComplete: () => { section.style.display = 'none'; } });
      }
    });

    // Special Case: Developers -> Redirect
    if (targetSection === 'developers') {
      setTimeout(() => {
        window.location.href = '/developers.html'; // ضع هنا لينك صفحة المطورين
      }, 500);
    }
  });
});

// Theme Switching Logic
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

// Default Sidebar Hidden Position
gsap.set(sidebar, { x: -250 });
