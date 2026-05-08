document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       AOS Initialization
       ========================================= */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true, // whether animation should happen only once - while scrolling down
            offset: 100, // offset (in px) from the original trigger point
            duration: 800, // values from 0 to 3000, with step 50ms
        });
    }

    /* =========================================
       Dark Mode Toggle
       ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const currentTheme = localStorage.getItem('theme');

    // Check saved theme or prefer dark mode
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    /* =========================================
       Sticky Navigation
       ========================================= */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    /* =========================================
       Mobile Menu Toggle
       ========================================= */
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileMenuIcon && navLinks) {
        mobileMenuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            // Change icon and header background
            const icon = mobileMenuIcon.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('show')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                    header.classList.add('menu-open');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                    header.classList.remove('menu-open');
                }
            }
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('show');
                const icon = mobileMenuIcon.querySelector('i');
                if (icon) icon.classList.replace('fa-times', 'fa-bars');
                header.classList.remove('menu-open');
            });
        });
    }

    /* =========================================
       Portfolio Filtering
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(button => button.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                // First, remove fade-in animation class to restart it later
                item.classList.remove('fade-in');

                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                    
                    // Add a slight delay for the animation to apply smoothly
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, 50);

                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    /* =========================================
       Lightbox Modal
       ========================================= */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const portfolioImages = document.querySelectorAll('.portfolio-item img');

    // Open Lightbox
    portfolioImages.forEach(img => {
        // Change cursor to pointer for images to indicate they are clickable
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', () => {
            lightbox.classList.add('show');
            lightboxImg.src = img.src;
            // Find the caption (h3) inside the overlay
            const overlay = img.nextElementSibling;
            if (overlay && overlay.querySelector('h3')) {
                lightboxCaption.textContent = overlay.querySelector('h3').textContent;
            } else {
                lightboxCaption.textContent = img.alt;
            }
        });
    });

    // Close Lightbox on X click
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('show');
    });

    // Close Lightbox on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
        }
    });

    /* =========================================
       WhatsApp Form Submission
       ========================================= */
    const contactForm = document.getElementById('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Sayfanın yenilenmesini engelle
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const productType = document.getElementById('product_type').value;
            const materialType = document.getElementById('material_type').value;
            const message = document.getElementById('message').value;
            
            const emailText = email ? email : "Belirtilmedi";
            const phoneNumber = "905323837241";
            
            // WhatsApp mesaj şablonu
            const whatsappMessage = `Merhaba WooD Mobilya, ben ${name}.\nYeni bir proje için fiyat teklifi almak istiyorum.\n\n🛠 Ürün Tipi: ${productType}\n🪵 Malzeme: ${materialType}\n✉️ E-posta: ${emailText}\n📞 Telefon: ${phone}\n\n📝 Detaylar ve Ölçüler:\n${message}`;
            
            // Metni URL formatına uygun hale getir
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp Web veya uygulamasına yönlendir
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
            
            // Formu temizle
            contactForm.reset();
        });
    }

    /* =========================================
       Typing Effect (Hero)
       ========================================= */
    const typedTextSpan = document.getElementById('typed-text');
    if (typedTextSpan) {
        const textArray = ["Mobilya", "Mutfak", "Yatak Odası", "TV Ünitesi", "Tasarım"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 500);
            }
        }

        setTimeout(type, newTextDelay + 500);
    }

    /* =========================================
       Material Catalog Logic
       ========================================= */
    const swatches = document.querySelectorAll('.swatch-item');
    const previewColorBox = document.getElementById('preview-color-box');
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');

    if (swatches.length > 0) {
        swatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                swatches.forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                
                previewColorBox.style.backgroundColor = swatch.getAttribute('data-color');
                previewTitle.innerText = swatch.getAttribute('data-title');
                previewDesc.innerText = swatch.getAttribute('data-desc');
            });
        });
    }

    /* =========================================
       Calculator Logic
       ========================================= */
    const calcProduct = document.getElementById('calc-product');
    const calcMaterial = document.getElementById('calc-material');
    const calcSize = document.getElementById('calc-size');
    const calcTotal = document.getElementById('calc-total');

    const calculatePrice = () => {
        if (!calcProduct || !calcMaterial || !calcSize || !calcTotal) return;
        
        const basePrice = parseInt(calcProduct.value);
        const multiplier = parseFloat(calcMaterial.value);
        const size = parseFloat(calcSize.value) || 1;
        
        const rawTotal = basePrice * multiplier * size;
        
        const minPrice = rawTotal * 0.9; // Alt sınır
        const maxPrice = rawTotal * 1.1; // Üst sınır
        
        const formatCurrency = (num) => {
            return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(num);
        };
        
        calcTotal.innerText = `${formatCurrency(minPrice)} TL - ${formatCurrency(maxPrice)} TL`;
    };

    if (calcProduct) {
        calcProduct.addEventListener('change', calculatePrice);
        calcMaterial.addEventListener('change', calculatePrice);
        calcSize.addEventListener('input', calculatePrice);
        calculatePrice(); // Sayfa yüklendiğinde ilk hesaplamayı yap
    }

    // Hesaplayıcıdan iletişim formuna veri aktarma
    window.prefillContact = function() {
        const productSelect = document.getElementById('product_type');
        const materialSelect = document.getElementById('material_type');
        const messageBox = document.getElementById('message');
        
        if (productSelect && materialSelect && messageBox) {
            const prodText = calcProduct.options[calcProduct.selectedIndex].text.split(' (')[0];
            for (let i = 0; i < productSelect.options.length; i++) {
                if (productSelect.options[i].text === prodText) {
                    productSelect.selectedIndex = i;
                    break;
                }
            }
            
            const matText = calcMaterial.options[calcMaterial.selectedIndex].text;
            if (matText.includes('Suntalam')) materialSelect.value = 'Suntalam';
            else if (matText.includes('MDF')) materialSelect.value = '1. Sınıf MDF';
            else if (matText.includes('Ahşap')) materialSelect.value = 'Masif Ahşap';
            
            const size = calcSize.value;
            messageBox.value = `Ön fiyat hesaplama aracınızdan geliyorum. Yaklaşık ${size} ölçüsünde ${prodText} için net fiyat teklifi almak istiyorum.`;
        }
    };

    /* =========================================
       Animated Counters (Stats)
       ========================================= */
    const counters = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const countUp = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 saniye
            const increment = target / (duration / 16); // Yaklaşık 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                countUp();
                hasCounted = true;
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    /* =========================================
       Scroll to Top Button
       ========================================= */
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
