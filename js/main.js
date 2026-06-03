document.addEventListener('DOMContentLoaded', () => {
    /* ── ADD JS CLASS for animations ── */
    document.documentElement.classList.add('js-ready');

    /* ── CURSOR ── */
    const cur = document.getElementById('cur');
    const cr = document.getElementById('cur-r');
    if (cur && cr) {
        let mx = 0, my = 0, rx = 0, ry = 0;
        document.addEventListener('mousemove', e => { 
            mx = e.clientX; 
            my = e.clientY; 
            cur.style.left = mx + 'px'; 
            cur.style.top = my + 'px'; 
        });
        
        (function loop() { 
            rx += (mx - rx) * .1; 
            ry += (my - ry) * .1; 
            cr.style.left = rx + 'px'; 
            cr.style.top = ry + 'px'; 
            requestAnimationFrame(loop);
        })();

        // Event delegation for hover states
        document.addEventListener('mouseover', e => {
            const target = e.target.closest('a, button, .proj, .srv, .tc, .pill, .wy, .ws, .proc, .fval');
            if (target) {
                cur.style.width = '15px';
                cur.style.height = '15px';
                cur.style.background = 'rgba(79,142,247,.35)';
                cr.style.width = '48px';
                cr.style.height = '48px';
                cr.style.borderColor = 'rgba(79,142,247,.7)';
            }
        });

        document.addEventListener('mouseout', e => {
            const target = e.target.closest('a, button, .proj, .srv, .tc, .pill, .wy, .ws, .proc, .fval');
            if (target) {
                cur.style.width = '8px';
                cur.style.height = '8px';
                cur.style.background = 'var(--blue)';
                cr.style.width = '34px';
                cr.style.height = '34px';
                cr.style.borderColor = 'var(--b3)';
            }
        });
    }

    /* ── NAV SCROLL & ACTIVE PAGE HIGHLIGHT ── */
    const nav = document.getElementById('nav');
    const stopBtn = document.getElementById('stop');
    
    window.addEventListener('scroll', () => {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
        if (stopBtn) stopBtn.classList.toggle('show', window.scrollY > 400);
    });

    // Active page nav highlights
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index";
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        const isHome = (page === "index" || page === "") && (href === "/" || href === "index");
        if (href === page || isHome) {
            a.classList.add('on');
        } else {
            a.classList.remove('on');
        }
    });

    /* ── REVEAL ON SCROLL IntersectionObserver ── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.rev, .rev-l, .rev-r').forEach(el => {
        revealObserver.observe(el);
    });

    /* ── SKILL BARS IntersectionObserver ── */
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(e => { 
            if (e.isIntersecting) { 
                e.target.style.width = e.target.dataset.w + '%'; 
                skillObserver.unobserve(e.target);
            } 
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.sk-fill').forEach(el => skillObserver.observe(el));
});

/* ── MOBILE NAV ── */
function toggleNav() {
    const nl = document.getElementById('nl');
    if (!nl) return;
    const open = nl.dataset.open === '1';
    if (open) { 
        nl.style.cssText = ''; 
        nl.dataset.open = '0';
    } else { 
        Object.assign(nl.style, { 
            display: 'flex', 
            flexDirection: 'column', 
            position: 'fixed', 
            top: '70px', 
            left: '0', 
            right: '0', 
            background: 'rgba(5,8,16,.98)', 
            borderBottom: '1px solid rgba(79,142,247,.12)', 
            padding: '14px 20px', 
            zIndex: '601', 
            gap: '2px' 
        }); 
        nl.dataset.open = '1';
    }
}

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        const nl = document.getElementById('nl');
        if (nl && nl.dataset.open === '1') { 
            nl.style.cssText = ''; 
            nl.dataset.open = '0';
        }
    });
});

/* ── CONTACT FORM ── */
function handleForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-sub');
    if (!btn) return;
    btn.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
    btn.style.background = 'var(--green)';
    setTimeout(() => { 
        btn.innerHTML = '<i class="bi bi-send"></i> Send Message'; 
        btn.style.background = ''; 
        e.target.reset(); 
    }, 3500);
}
