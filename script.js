document.addEventListener('DOMContentLoaded', () => {
    // Render Content
    renderContent();

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe elements after rendering
    setTimeout(() => {
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));
    }, 100);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

function renderContent() {
    if (typeof siteContent === 'undefined') {
        console.error('siteContent is not defined. Make sure data.js is loaded.');
        return;
    }

    // Hero
    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
        heroContent.innerHTML = `
            <h1>${siteContent.hero.title}</h1>
            <p class="subtitle">${siteContent.hero.subtitle}</p>
            <a href="${siteContent.hero.ctaLink}" class="cta-button">${siteContent.hero.ctaText}</a>
        `;
    }

    // About
    const aboutContent = document.getElementById('about-content');
    if (aboutContent) {
        aboutContent.innerHTML = `
            <div class="text-block reveal">
                <h2>${siteContent.about.title}</h2>
                <p>${siteContent.about.description}</p>
            </div>
            <div class="text-block reveal">
                <h3>${siteContent.about.missionTitle}</h3>
                <p>${siteContent.about.missionDescription}</p>
            </div>
        `;
    }

    // Timeline
    const timelineHeader = document.getElementById('timeline-header');
    if (timelineHeader) {
        timelineHeader.innerHTML = `<h2>发展历程</h2>`;
    }

    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
        // Keep the line
        let html = '<div class="timeline-line"></div>';

        siteContent.timeline.forEach((item, index) => {
            const isRight = index % 2 !== 0;
            const delayClass = index > 0 ? `delay-${index}` : '';

            html += `
                <div class="timeline-item reveal ${delayClass}">
                    <div class="timeline-content left">
                        ${!isRight ? `<div class="timeline-img placeholder-img" style="background: ${item.image}"></div>` : `
                            <h3>${item.title}</h3>
                            <span class="timeline-date">${item.year}</span>
                            <p>${item.description}</p>
                        `}
                    </div>
                    <div class="timeline-dot"></div>
                    <div class="timeline-content right">
                        ${isRight ? `<div class="timeline-img placeholder-img" style="background: ${item.image}"></div>` : `
                            <h3>${item.title}</h3>
                            <span class="timeline-date">${item.year}</span>
                            <p>${item.description}</p>
                        `}
                    </div>
                </div>
            `;
        });
        timelineContainer.innerHTML = html;
    }

    // Events
    const eventsHeader = document.getElementById('events-header');
    if (eventsHeader) {
        eventsHeader.innerHTML = `
            <h2>${siteContent.events.title}</h2>
            <p>${siteContent.events.subtitle}</p>
        `;
    }

    const eventsGrid = document.getElementById('events-grid');
    if (eventsGrid) {
        let html = '';
        siteContent.events.cards.forEach((card, index) => {
            html += `
                <div class="card reveal delay-${index + 1}">
                    <div class="card-content">
                        <h3>${card.title}</h3>
                        <p>${card.description}</p>
                    </div>
                </div>
            `;
        });
        eventsGrid.innerHTML = html;
    }

    // Gallery
    const galleryTitle = document.getElementById('gallery-title');
    if (galleryTitle) {
        galleryTitle.innerText = siteContent.gallery.title;
    }

    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        let html = '';
        siteContent.gallery.images.forEach((img, index) => {
            html += `
                <div class="gallery-item reveal delay-${index}">
                    <div class="placeholder-img" style="background: ${img.bg}"></div>
                    <div class="caption">${img.caption}</div>
                </div>
            `;
        });
        galleryGrid.innerHTML = html;
    }

    // Contact
    const contactContent = document.getElementById('contact-content');
    if (contactContent) {
        contactContent.innerHTML = `
            <h2>${siteContent.contact.title}</h2>
            <p>${siteContent.contact.description}</p>
            <a href="${siteContent.contact.facebookLink}" target="_blank" rel="noopener noreferrer" class="social-link">
                Facebook 专页
            </a>
        `;
    }

    const footerBottom = document.getElementById('footer-bottom');
    if (footerBottom) {
        footerBottom.innerHTML = `<p>${siteContent.contact.copyright}</p>`;
    }
}
