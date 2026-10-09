/* =============================================================
   js/script.js — Musenga Hope Sichula, ICT251 Activity 3
   All page behaviour lives in this file (loaded with defer).
   ============================================================= */

'use strict';

// Lets the CSS know JavaScript is running (used for progressive enhancement).
document.documentElement.classList.add('js');

/* -------------------------------------------------------------
   Decorative background
   Tech-style particle network drawn once as a still image (no
   animation, so nothing moves while the visitor reads). It is
   redrawn only when the window is resized or the theme changes.
   ------------------------------------------------------------- */
const background = {
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    particles: [],
    colour: '56, 189, 248',
    PARTICLE_COUNT: 70,
    LINK_DISTANCE: 130
};

// Reads the particle colour from the CSS custom property --particle-rgb.
function readParticleColour() {
    const value = getComputedStyle(document.documentElement).getPropertyValue('--particle-rgb').trim();
    if (value) {
        background.colour = value;
    }
}

// Matches the canvas size to the window.
function resizeCanvas() {
    background.width = background.canvas.width = window.innerWidth;
    background.height = background.canvas.height = window.innerHeight;
}

// Fills the particles array with randomly placed points.
function createParticles() {
    background.particles = [];
    for (let i = 0; i < background.PARTICLE_COUNT; i++) {
        background.particles.push({
            x: Math.random() * background.width,
            y: Math.random() * background.height
        });
    }
}

// Draws the still image: a dot for each particle, then lines between particles that are close together.
function drawBackground() {
    const { ctx, width, height, particles, colour, LINK_DISTANCE } = background;
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colour}, 0.8)`;
        ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);

            if (dist < LINK_DISTANCE) {
                const opacity = 1 - dist / LINK_DISTANCE;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(${colour}, ${opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

// Sets up the canvas, draws it once and redraws it when the window is resized.
function initBackground() {
    background.canvas = document.getElementById('bg-canvas');
    if (!background.canvas || !background.canvas.getContext) {
        return;
    }
    background.ctx = background.canvas.getContext('2d');

    readParticleColour();
    resizeCanvas();
    createParticles();

    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        resizeCanvas();
        // Only re-scatter particles when the width changes (not when a phone's address bar hides).
        if (window.innerWidth !== lastWidth) {
            lastWidth = window.innerWidth;
            createParticles();
        }
        drawBackground();
    });

    drawBackground();
}


/* -------------------------------------------------------------
   Sticky header offset
   Measures the header so in-page links stop just below it.
   ------------------------------------------------------------- */
function updateHeaderOffset() {
    const header = document.querySelector('.site-header');
    if (header) {
        document.documentElement.style.setProperty('--header-offset', `${header.offsetHeight + 12}px`);
    }
}


/* -------------------------------------------------------------
   Feature 1 (compulsory): contact form validation and preview
   Nothing is sent: the form is checked in the browser and the
   validated values are shown back on the page with textContent.
   ------------------------------------------------------------- */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// One rule per required field; each returns an error message, or '' when the value is valid.
const FIELD_RULES = [
    {
        id: 'name',
        validate: (value) => (value === '' ? 'Please enter your name (spaces on their own do not count).' : '')
    },
    {
        id: 'email',
        validate: (value) => {
            if (value === '') {
                return 'Please enter your email address.';
            }
            if (!EMAIL_PATTERN.test(value)) {
                return 'Please enter a valid email address, for example name@example.com.';
            }
            return '';
        }
    },
    {
        id: 'message',
        validate: (value) => (value === '' ? 'Please write a message (spaces on their own do not count).' : '')
    }
];

// Shows or clears the error message next to one field and sets aria-invalid.
function showFieldError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.textContent = message;
    if (message) {
        input.setAttribute('aria-invalid', 'true');
    } else {
        input.removeAttribute('aria-invalid');
    }
}

// Checks one field against its rule; returns true when it is valid.
function validateField(rule) {
    const input = document.getElementById(rule.id);
    const message = rule.validate(input.value.trim());
    showFieldError(input, message);
    return message === '';
}

// Writes the validated values into the preview box (textContent only — never innerHTML).
function showPreview(values) {
    document.getElementById('preview-name').textContent = values.name;
    document.getElementById('preview-email').textContent = values.email;
    document.getElementById('preview-topic').textContent = values.topic;
    document.getElementById('preview-message').textContent = values.message;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('preview-time').textContent = `Validated at ${time} — not sent.`;

    const preview = document.getElementById('form-preview');
    preview.hidden = false;
    preview.focus();
}

// Connects the submit and input events of the contact form.
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) {
        return;
    }
    const status = document.getElementById('form-status');
    const preview = document.getElementById('form-preview');

    // Our own messages replace the browser's pop-ups; the required attributes stay in the HTML.
    form.noValidate = true;

    form.addEventListener('submit', (event) => {
        event.preventDefault();   // keep everything on this page — nothing is submitted

        const results = FIELD_RULES.map(validateField);
        const firstInvalidIndex = results.indexOf(false);

        if (firstInvalidIndex !== -1) {
            const errorCount = results.filter((ok) => !ok).length;
            status.textContent = errorCount === 1
                ? 'Please fix the highlighted field.'
                : `Please fix the ${errorCount} highlighted fields.`;
            preview.hidden = true;
            document.getElementById(FIELD_RULES[firstInvalidIndex].id).focus();
            return;
        }

        status.textContent = '';
        const topicSelect = document.getElementById('topic');
        showPreview({
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            topic: topicSelect.options[topicSelect.selectedIndex].text,
            message: document.getElementById('message').value.trim()
        });
    });

    // Once a field has been marked invalid, re-check it as the visitor types.
    FIELD_RULES.forEach((rule) => {
        const input = document.getElementById(rule.id);
        input.addEventListener('input', () => {
            if (input.getAttribute('aria-invalid') === 'true') {
                validateField(rule);
                if (!form.querySelector('[aria-invalid="true"]')) {
                    status.textContent = '';
                }
            }
        });
    });
}


/* -------------------------------------------------------------
   Feature 2: mobile navigation
   On narrow screens a Menu button opens and closes the nav.
   ------------------------------------------------------------- */
const narrowScreenQuery = window.matchMedia('(max-width: 768px)');

// Opens or closes the menu and keeps the button's label and aria-expanded in sync.
function setMenuOpen(open) {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('primary-nav');
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.nav-toggle-label').textContent = open ? 'Close' : 'Menu';
    toggle.querySelector('.nav-toggle-icon').textContent = open ? '✕' : '☰';   // ✕ or ☰
}

// Returns true while the menu is open.
function isMenuOpen() {
    return document.getElementById('nav-toggle').getAttribute('aria-expanded') === 'true';
}

// Connects the Menu button, the nav links, Escape and outside clicks.
function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('primary-nav');
    const header = document.querySelector('.site-header');
    if (!toggle || !nav) {
        return;
    }

    toggle.addEventListener('click', () => setMenuOpen(!isMenuOpen()));

    // Close the menu after a link is chosen on a narrow screen.
    nav.addEventListener('click', (event) => {
        if (event.target.closest('a') && narrowScreenQuery.matches) {
            setMenuOpen(false);
        }
    });

    // Escape closes the menu and puts keyboard focus back on the button.
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isMenuOpen()) {
            setMenuOpen(false);
            toggle.focus();
        }
    });

    // A click anywhere outside the header closes the menu.
    document.addEventListener('click', (event) => {
        if (isMenuOpen() && !header.contains(event.target)) {
            setMenuOpen(false);
        }
    });

    // Reset when the screen becomes wide (the full nav is always shown there).
    narrowScreenQuery.addEventListener('change', () => {
        setMenuOpen(false);
        updateHeaderOffset();
    });
}


/* -------------------------------------------------------------
   Feature 3: project search and category filter
   Hides project cards that do not match the typed text and the
   chosen category (case-insensitive). Reset shows everything.
   ------------------------------------------------------------- */
const CATEGORY_NAMES = {
    all: 'all categories',
    data: 'Data & AI',
    programming: 'Programming',
    web: 'Web'
};

// Connects the search box, category buttons and Reset button to the project cards.
function initProjectFilter() {
    const filterForm = document.getElementById('project-filter');
    if (!filterForm) {
        return;
    }
    const searchInput = document.getElementById('project-search');
    const categoryButtons = Array.from(filterForm.querySelectorAll('[data-filter]'));
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const status = document.getElementById('project-status');
    const noResults = document.getElementById('no-projects');

    let activeCategory = 'all';

    // Shows only the cards that match both the search text and the active category.
    function applyProjectFilter() {
        const query = searchInput.value.trim().toLowerCase().replace(/\s+/g, ' ');

        const visibleCards = cards.filter((card) => {
            const inCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
            const text = card.textContent.toLowerCase().replace(/\s+/g, ' ');
            const matches = inCategory && text.includes(query);
            card.hidden = !matches;
            return matches;
        });

        if (visibleCards.length === 0) {
            const searchPart = query ? ` “${searchInput.value.trim()}”` : '';
            noResults.textContent =
                `No projects match${searchPart} in ${CATEGORY_NAMES[activeCategory]}. Try another word or press Reset.`;
            noResults.hidden = false;
            status.textContent = 'Showing 0 projects.';
        } else {
            noResults.hidden = true;
            status.textContent = visibleCards.length === cards.length
                ? `Showing all ${cards.length} projects.`
                : `Showing ${visibleCards.length} of ${cards.length} projects.`;
        }
    }

    // Marks one category button as pressed and filters by it.
    function setCategory(category) {
        activeCategory = category;
        categoryButtons.forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.filter === category));
        });
        applyProjectFilter();
    }

    searchInput.addEventListener('input', applyProjectFilter);

    categoryButtons.forEach((button) => {
        button.addEventListener('click', () => setCategory(button.dataset.filter));
    });

    // Pressing Enter in the search box should not reload the page.
    filterForm.addEventListener('submit', (event) => event.preventDefault());

    // Reset clears the text box (built-in form reset), then we show every card again.
    filterForm.addEventListener('reset', () => {
        setTimeout(() => {
            setCategory('all');
            searchInput.focus();
        }, 0);
    });
}


/* -------------------------------------------------------------
   Feature 4: light / dark theme switch
   Sets data-theme on <html>; css/styles.css swaps the colour
   tokens. The choice is remembered in localStorage when allowed.
   ------------------------------------------------------------- */
const THEME_STORAGE_KEY = 'musenga-theme';
const THEMES = ['dark', 'light'];

// Reads the saved theme; returns null if nothing is saved or storage is blocked.
function getSavedTheme() {
    try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        return THEMES.includes(saved) ? saved : null;
    } catch (error) {
        return null;
    }
}

// Saves the theme; quietly does nothing if storage is blocked (e.g. some private windows).
function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
        // The theme still changes for this visit; it just will not be remembered.
    }
}

// Applies a theme to the page and updates the button so it shows the current state.
function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        const isDark = theme === 'dark';
        toggle.querySelector('.theme-label').textContent = isDark ? 'Dark' : 'Light';
        toggle.querySelector('.theme-icon').textContent = isDark ? '☾' : '☀';   // ☾ or ☀
        toggle.title = isDark ? 'Switch to the light theme' : 'Switch to the dark theme';
    }

    // Recolour the background particles to suit the new theme.
    readParticleColour();
    if (background.ctx) {
        drawBackground();
    }
}

// Applies the saved theme (dark by default) and connects the theme button.
function initThemeSwitch() {
    applyTheme(getSavedTheme() || 'dark');

    const toggle = document.getElementById('theme-toggle');
    if (!toggle) {
        return;
    }
    toggle.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        saveTheme(nextTheme);
    });
}


/* -------------------------------------------------------------
   Feature 5: study hours calculator
   Multiplies planned hours per day by days per week and shows
   the weekly total. Blank, non-numeric and negative hours are
   rejected, and days must be a whole number from 1 to 7.
   ------------------------------------------------------------- */
const MAX_HOURS_PER_DAY = 24;

// Checks the hours value; returns an error message, or '' when it is valid.
function checkStudyHours(text) {
    if (text === '') {
        return 'Please enter your study hours per day.';
    }
    if (/^-\s*\.?\d/.test(text)) {
        return 'Hours cannot be negative.';
    }
    if (!/^(\d+(\.\d+)?|\.\d+)$/.test(text)) {
        return 'Please enter hours as a number, for example 2 or 1.5.';
    }
    const hours = Number(text);
    if (hours === 0) {
        return 'Please enter more than 0 hours.';
    }
    if (hours > MAX_HOURS_PER_DAY) {
        return `A day only has ${MAX_HOURS_PER_DAY} hours. Please enter ${MAX_HOURS_PER_DAY} or fewer.`;
    }
    return '';
}

// Checks the days value; returns an error message, or '' when it is valid.
function checkStudyDays(text) {
    if (text === '') {
        return 'Please enter the number of days per week.';
    }
    if (!/^-?\d+$/.test(text)) {
        return 'Please enter days as a whole number from 1 to 7.';
    }
    const days = Number(text);
    if (days < 1 || days > 7) {
        return 'Days per week must be from 1 to 7.';
    }
    return '';
}

// Connects the calculator's Calculate and Clear buttons.
function initStudyCalculator() {
    const form = document.getElementById('study-calculator');
    if (!form) {
        return;
    }
    const hoursInput = document.getElementById('study-hours');
    const daysInput = document.getElementById('study-days');
    const result = document.getElementById('calc-result');

    // Our own messages replace the browser's pop-ups; the required attributes stay in the HTML.
    form.noValidate = true;

    form.addEventListener('submit', (event) => {
        event.preventDefault();   // calculate on this page — no reload

        const hoursText = hoursInput.value.trim();
        const daysText = daysInput.value.trim();
        const hoursError = checkStudyHours(hoursText);
        const daysError = checkStudyDays(daysText);
        showFieldError(hoursInput, hoursError);
        showFieldError(daysInput, daysError);

        if (hoursError || daysError) {
            result.hidden = true;
            (hoursError ? hoursInput : daysInput).focus();
            return;
        }

        const hours = Number(hoursText);
        const days = Number(daysText);
        const total = Math.round(hours * days * 100) / 100;   // at most 2 decimal places
        const hourWord = (n) => (n === 1 ? 'hour' : 'hours');
        const dayWord = days === 1 ? 'day' : 'days';

        result.textContent =
            `${hours} ${hourWord(hours)} a day × ${days} ${dayWord} a week = ` +
            `${total} ${hourWord(total)} of study per week.`;
        result.hidden = false;
    });

    // Clear empties the fields (built-in form reset), then we remove the result and any errors.
    form.addEventListener('reset', () => {
        showFieldError(hoursInput, '');
        showFieldError(daysInput, '');
        result.hidden = true;
        result.textContent = '';
        hoursInput.focus();
    });
}


/* -------------------------------------------------------------
   Start everything (the script is deferred, so the DOM is ready)
   ------------------------------------------------------------- */
initThemeSwitch();
initBackground();
initMobileNav();
updateHeaderOffset();
window.addEventListener('resize', updateHeaderOffset);
initProjectFilter();
initContactForm();
initStudyCalculator();
