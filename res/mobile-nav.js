(function () {
    var mobileQuery = window.matchMedia('(max-width: 1080px)');
    var mobileNavQuery = window.matchMedia('(max-width: 768px)');

    function normalizePathname(pathname) {
        return pathname.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
    }

    function centerActiveNavButton() {
        if (!mobileQuery.matches) {
            return;
        }

        var nav = document.querySelector('.navigation_bar');
        if (!nav) {
            return;
        }

        var active = nav.querySelector('.NavigationButtons.active');
        if (active && typeof active.scrollIntoView === 'function') {
            active.scrollIntoView({ block: 'nearest', inline: 'center' });
        }
    }

    function initMobileSidePanel() {
        var side = document.querySelector('.side');
        if (!side || document.getElementById('mobile-side-toggle')) {
            return;
        }

        side.id = side.id || 'mobile-side-panel';

        var phoneNode = document.querySelector('.site-phone');
        var telHref = phoneNode && phoneNode.getAttribute('href') ? phoneNode.getAttribute('href') : 'tel:+33660561277';
        var phoneLabel = '06 60 56 12 77';
        var faqNode = side.querySelector('.sidebar-faq-link');
        var faqHref = faqNode ? faqNode.getAttribute('href') : null;
        var faqUrl = faqHref ? new URL(faqHref, window.location.href) : null;
        var currentUrl = new URL(window.location.href);
        var showFaqButton = Boolean(
            faqUrl &&
            faqUrl.origin === currentUrl.origin &&
            normalizePathname(faqUrl.pathname) !== normalizePathname(currentUrl.pathname)
        );

        document.body.classList.toggle('has-mobile-faq', showFaqButton);

        var backdrop = document.createElement('button');
        backdrop.id = 'mobile-side-backdrop';
        backdrop.type = 'button';
        backdrop.setAttribute('aria-label', 'Fermer les informations');

        var toggle = document.createElement('button');
        toggle.id = 'mobile-side-toggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-controls', side.id);
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Infos praticienne';

        var call = document.createElement('a');
        call.id = 'mobile-call-fixed';
        call.href = telHref;
        call.textContent = 'Appeler le ' + phoneLabel;
        call.setAttribute('aria-label', 'Prendre rendez-vous par telephone au ' + phoneLabel);

        var faq = null;
        if (showFaqButton) {
            faq = document.createElement('a');
            faq.id = 'mobile-faq-fixed';
            faq.href = faqHref;
            faq.textContent = 'Voir la FAQ';
            faq.setAttribute('aria-label', 'Acceder a la foire aux questions');
        }

        function closePanel() {
            document.body.classList.remove('side-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = 'Infos praticienne';
        }

        function openPanel() {
            document.body.classList.add('side-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.textContent = 'Fermer infos';
        }

        function togglePanel() {
            if (document.body.classList.contains('side-open')) {
                closePanel();
            } else {
                openPanel();
            }
        }

        toggle.addEventListener('click', togglePanel);
        backdrop.addEventListener('click', closePanel);
        side.addEventListener('click', function (event) {
            var target = event.target;
            if (target && target.tagName === 'A') {
                closePanel();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closePanel();
            }
        });

        window.addEventListener('resize', function () {
            if (!mobileQuery.matches) {
                closePanel();
            }
        });

        document.body.appendChild(backdrop);
        document.body.appendChild(toggle);
        if (faq) {
            document.body.appendChild(faq);
        }
        document.body.appendChild(call);
    }

    function initMobileNavMenu() {
        var nav = document.querySelector('.navigation_bar');
        if (!nav || document.getElementById('mobile-nav-toggle')) {
            return;
        }

        nav.id = nav.id || 'site-navigation';

        var backdrop = document.createElement('button');
        backdrop.id = 'mobile-nav-backdrop';
        backdrop.type = 'button';
        backdrop.setAttribute('aria-label', 'Fermer le menu');

        var toggle = document.createElement('button');
        toggle.id = 'mobile-nav-toggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-controls', nav.id);
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
        toggle.innerHTML = '<span id="mobile-nav-toggle-label">Menu</span><span id="mobile-nav-toggle-icon" aria-hidden="true"><span></span></span>';

        function closeMenu() {
            document.body.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
        }

        function openMenu() {
            document.body.classList.add('nav-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Fermer le menu de navigation');
        }

        function toggleMenu() {
            if (document.body.classList.contains('nav-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        toggle.addEventListener('click', toggleMenu);
        backdrop.addEventListener('click', closeMenu);
        nav.addEventListener('click', function (event) {
            var target = event.target;
            if (target && target.tagName === 'A' && mobileNavQuery.matches) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        window.addEventListener('resize', function () {
            if (!mobileNavQuery.matches) {
                closeMenu();
            }
        });

        document.body.appendChild(backdrop);
        document.body.appendChild(toggle);
    }

    function init() {
        centerActiveNavButton();
        initMobileSidePanel();
        initMobileNavMenu();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
