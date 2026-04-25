document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hidden'), 800);

    // Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile Menu
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const bars = navToggle.querySelectorAll('.bar');
        navLinks.classList.contains('active') 
            ? bars.forEach((b, i) => b.style.transform = i === 1 ? 'scaleX(0)' : `rotate(${i === 0 ? 45 : -45}deg) translateY(${i === 0 ? 7 : -7}px)`)
            : bars.forEach(b => b.style.transform = 'none');
    });

    // Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => revealObserver.observe(el));

    // Animated Counters
    const counters = document.querySelectorAll('.stat-num');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.dataset.target);
                const isFloat = target % 1 !== 0;
                const duration = 2000;
                const start = performance.now();
                
                const update = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = eased * target;
                    entry.target.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString();
                    if (progress < 1) requestAnimationFrame(update);
                    else entry.target.textContent = isFloat ? target.toFixed(1) : target.toLocaleString() + (target > 100 ? '+' : '');
                };
                requestAnimationFrame(update);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // Before/After Slider
    const container = document.getElementById('comparisonContainer');
    const after = document.getElementById('comparisonAfter');
    const handle = document.getElementById('comparisonHandle');
    let isDragging = false;

    const updateSlider = (x) => {
        const rect = container.getBoundingClientRect();
        let pos = ((x - rect.left) / rect.width) * 100;
        pos = Math.max(0, Math.min(100, pos));
        after.style.width = `${pos}%`;
        handle.style.left = `${pos}%`;
    };

    handle.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mousemove', (e) => isDragging && updateSlider(e.clientX));
    document.addEventListener('mouseup', () => isDragging = false);
    container.addEventListener('touchstart', () => isDragging = true, {passive: true});
    document.addEventListener('touchmove', (e) => isDragging && updateSlider(e.touches[0].clientX), {passive: true});
    document.addEventListener('touchend', () => isDragging = false);

    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // Testimonial Slider
    const track = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.slider-dot');
    let current = 0;
    const total = dots.length;

    const goTo = (i) => {
        current = i;
        track.style.transform = `translateX(-${i * 100}%)`;
        dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    };
    dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.index))));
    setInterval(() => goTo((current + 1) % total), 5000);

    // FAQ Accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Contact Form
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.classList.add('form-submitting');
        setTimeout(() => {
            alert('Thank you! Your request has been sent. We will contact you shortly via WhatsApp.');
            form.reset();
            form.classList.remove('form-submitting');
        }, 1500);
    });
});
