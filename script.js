// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        // 向下滚动
        nav.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        // 向上滚动
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// 添加页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});

// 添加throttle函数
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// 优化scroll事件监听
window.addEventListener('scroll', throttle(() => {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}, 200));

// 优化createMobileMenu函数
const createMobileMenu = (() => {
    let menuCreated = false;
    return () => {
        if (menuCreated) return;
        const nav = document.querySelector('.nav-container');
        const navLinks = document.querySelector('.nav-links');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-button';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        nav.insertBefore(menuButton, navLinks);
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        menuCreated = true;
    };
})();

// 在移动端创建菜单
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// 窗口大小改变时重新创建菜单
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 页面加载时的淡入效果
    gsap.from('.hero-content h1', {duration: 1, y: -50, opacity: 0, ease: 'power2.out'});
    gsap.from('.hero-content p', {duration: 1, y: -30, opacity: 0, delay: 0.2, ease: 'power2.out'});
    gsap.from('.cta-buttons', {duration: 1, y: -20, opacity: 0, delay: 0.4, ease: 'power2.out'});

    // 按钮悬停动画
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {duration: 0.3, y: -3, boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)'});
        });
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {duration: 0.3, y: 0, boxShadow: 'none'});
        });
    });
}); 