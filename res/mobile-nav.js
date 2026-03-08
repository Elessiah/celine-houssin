(function () {
    var mobileQuery = window.matchMedia('(max-width: 1080px)');

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
        call.textContent = 'Prendre rendez-vous';
        call.setAttribute('aria-label', 'Prendre rendez-vous par téléphone');

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
        document.body.appendChild(call);
    }

    function init() {
        centerActiveNavButton();
        initMobileSidePanel();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
