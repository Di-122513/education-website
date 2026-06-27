/**
 * 启航教育 — 教育机构网站脚本
 */
document.addEventListener('DOMContentLoaded', () => {

    const header    = document.getElementById('header');
    const nav       = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    const backToTop = document.getElementById('backToTop');
    const navLinks  = document.querySelectorAll('.nav-link');
    const sections  = document.querySelectorAll('section[id]');
    const contactForm = document.getElementById('contactForm');

    // ========== 滚动效果 ==========
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        header.classList.toggle('scrolled', y > 50);
        backToTop.classList.toggle('visible', y > 500);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => highlightNav(y), 100);
    });

    function highlightNav(y) {
        let current = '';
        sections.forEach(s => {
            if (y >= s.offsetTop - 100) current = s.getAttribute('id');
        });
        navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
        });
    }

    // ========== 汉堡菜单 ==========
    hamburger.addEventListener('click', () => nav.classList.toggle('open'));
    navLinks.forEach(l => l.addEventListener('click', () => nav.classList.remove('open')));
    document.addEventListener('click', e => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) nav.classList.remove('open');
    });

    // ========== 回到顶部 ==========
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // ========== 报名表单 ==========
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const parentName = contactForm.querySelector('input[type="text"]:nth-of-type(2)')?.value?.trim() || '';
        const phone = contactForm.querySelector('input[type="tel"]').value.trim();
        if (!phone) {
            showToast('请填写手机号码', 'error');
            return;
        }
        const btn = contactForm.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = '提交中...';
        btn.disabled = true;
        setTimeout(() => {
            showToast('报名成功！课程顾问将在2小时内电话联系您。', 'success');
            contactForm.reset();
            btn.textContent = original;
            btn.disabled = false;
        }, 1200);
    });

    // ========== Toast ==========
    function showToast(msg, type = 'success') {
        const old = document.querySelector('.toast');
        if (old) old.remove();
        const t = document.createElement('div');
        t.className = `toast toast-${type}`;
        t.textContent = msg;
        document.body.appendChild(t);
        requestAnimationFrame(() => t.classList.add('show'));
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
    }

    // ========== 滚动渐入动画 ==========
    const animEls = document.querySelectorAll('.course-card, .teacher-card, .result-card, .t-card, .campus-item');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    animEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

});
