// ===== Preloader =====
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  setTimeout(() => preloader.classList.add("hide"), 400);
});

// ===== Navbar scroll + Scroll-to-top =====
const navbar = document.querySelector(".navbar");
const scrollBtn = document.querySelector(".scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");

  if (window.scrollY > 300) scrollBtn.classList.add("visible");
  else scrollBtn.classList.remove("visible");

  setActiveLink();
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Active nav link =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-item");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

function setActiveLink() {
  let current = "";
  sections.forEach((sec) => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) current = sec.getAttribute("id");
  });
 navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) a.classList.add("active");
  });

  // Also update mobile nav items
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  mobileNavItems.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) a.classList.add("active");
  });
}
// ===== Theme switch (Light/Dark) =====
const themeBtn = document.getElementById("theme-switch");
const dayIcon = document.getElementById("day");
const nightIcon = document.getElementById("night");

function applyTheme(isLight) {
  document.body.classList.toggle("day-theme", isLight);
  dayIcon.style.display = isLight ? "none" : "block";
  nightIcon.style.display = isLight ? "block" : "none";
  localStorage.setItem("theme", isLight ? "light" : "dark");
  
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    if (isLight) {
      themeToggle.classList.add('light');
    } else {
      themeToggle.classList.remove('light');
    }
  }
}

const saved = localStorage.getItem("theme");
applyTheme(saved === "light");

themeBtn.addEventListener("click", () => {
  const isLight = !document.body.classList.contains("day-theme");
  applyTheme(isLight);
});

// ===== Experience slider =====
const wrapper = document.querySelector(".cards-wrapper");
const cards = document.querySelectorAll(".experience-card");
const leftBtn = document.querySelector(".arrow.left");
const rightBtn = document.querySelector(".arrow.right");
const radios = document.querySelectorAll('.radio-buttons input[type="radio"]');

let cardIndex = 0;

function updateCards() {
  if (wrapper) wrapper.style.transform = `translateX(-${cardIndex * 100}%)`;
  if (radios[cardIndex]) radios[cardIndex].checked = true;
}

if (leftBtn) {
  leftBtn.addEventListener("click", () => {
    cardIndex = (cardIndex - 1 + cards.length) % cards.length;
    updateCards();
  });
}

if (rightBtn) {
  rightBtn.addEventListener("click", () => {
    cardIndex = (cardIndex + 1) % cards.length;
    updateCards();
  });
}

if (radios) {
  radios.forEach((r, i) => {
    r.addEventListener("change", () => {
      cardIndex = i;
      updateCards();
    });
  });
}

// ===== Modern Mobile Menu =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenuPanel = document.querySelector('.mobile-menu-panel');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    if (!hamburgerBtn || !mobileMenuPanel) return;

    function toggleMobileMenu() {
        mobileMenuPanel.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        if (mobileMenuPanel.classList.contains('active')) {
            hamburgerBtn.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
            hamburgerBtn.setAttribute('aria-label', 'Close menu');
        } else {
            hamburgerBtn.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
            hamburgerBtn.setAttribute('aria-label', 'Open menu');
        }
    }

    function closeMobileMenu() {
        mobileMenuPanel.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        hamburgerBtn.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
        hamburgerBtn.setAttribute('aria-label', 'Open menu');
    }

    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    mobileNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            mobileNavItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            closeMobileMenu();
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            themeBtn.click();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuPanel.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuPanel.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});

// Initialize
setActiveLink();
// ===== Modern Mobile Menu =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileNavPanel = document.querySelector('.mobile-nav-panel');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const mobileThemeSwitch = document.getElementById('mobile-theme-switch');
    const body = document.body;

    if (!hamburgerBtn || !mobileNavPanel) return;

    function openMobileMenu() {
        mobileNavPanel.classList.add('active');
        mobileNavOverlay.classList.add('active');
        hamburgerBtn.classList.add('active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        body.classList.add('menu-open');
    }

    function closeMobileMenu() {
        mobileNavPanel.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
    }

    function toggleMobileMenu() {
        if (mobileNavPanel.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // Event Listeners
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
    mobileNavOverlay.addEventListener('click', closeMobileMenu);

    // Mobile navigation items click
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Remove active class from all items
            mobileNavItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            closeMobileMenu();
            
            // Smooth scroll to target
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sync mobile theme switch with main theme switch
    if (mobileThemeSwitch) {
        mobileThemeSwitch.addEventListener('click', () => {
            document.getElementById('theme-switch').click();
        });
    }

    // Sync theme icons
    function syncThemeIcons() {
        const isLight = document.body.classList.contains('day-theme');
        const mobileDayIcon = document.getElementById('mobile-day');
        const mobileNightIcon = document.getElementById('mobile-night');
        
        if (mobileDayIcon && mobileNightIcon) {
            mobileDayIcon.style.display = isLight ? 'none' : 'block';
            mobileNightIcon.style.display = isLight ? 'block' : 'none';
        }
    }

    // Listen for theme changes
    const themeBtn = document.getElementById('theme-switch');
    if (themeBtn) {
        themeBtn.addEventListener('click', syncThemeIcons);
    }

    // Initialize theme icons
    syncThemeIcons();

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavPanel.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu on window resize (if resized to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNavPanel.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});