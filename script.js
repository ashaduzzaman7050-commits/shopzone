// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentSlide = 0;
let slideInterval;

// DOM Elements
const elements = {
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    cartBtn: document.getElementById('cartBtn'),
    cartCount: document.getElementById('cartCount'),
    cartModal: document.getElementById('cartModal'),
    closeCart: document.getElementById('closeCart'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    mobileToggle: document.getElementById('mobileToggle'),
    mobileMenu: document.getElementById('mobileMenu'),
    closeMobile: document.getElementById('closeMobile'),
    slider: document.getElementById('slider'),
    flashProducts: document.getElementById('flashProducts'),
    popularProducts: document.getElementById('popularProducts'),
    scrollTop: document.getElementById('scrollTop'),
    tabBtns: document.querySelectorAll('.tab-btn')
};

// Product Data
const flashSaleProducts = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        image: "https://images.unsplash.com/photo-1695906325575-78831c7d35b3?w=300&h=300&fit=crop",
        price: 999,
        originalPrice: 1299,
        discount: 23,
        rating: 4.9
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        image: "https://images.unsplash.com/photo-1701176947214-eb75d7a75b80?w=300&h=300&fit=crop",
        price: 899,
        originalPrice: 1199,
        discount: 25,
        rating: 4.8
    },
    {
        id: 3,
        name: "AirPods Pro 2",
        image: "https://images.unsplash.com/photo-1588423771079-1a3925909b0c?w=300&h=300&fit=crop",
        price: 249,
        originalPrice: 299,
        discount: 17,
        rating: 4.7
    },
    {
        id: 4,
        name: "MacBook Air M2",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop",
        price: 1199,
        originalPrice: 1499,
        discount: 20,
        rating: 4.9
    }
];

const popularProducts = [
    {
        id: 5,
        name: "Sony WH-1000XM5 Headphones",
        image: "https://images.unsplash.com/photo-1613644716504-208b8d6592ad?w=300&h=300&fit=crop",
        price: 399,
        originalPrice: 499,
        discount: 20,
        rating: 4.8,
        category: 'electronics'
    },
    {
        id: 6,
        name: "Nike Air Max 270",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
        price: 149,
        originalPrice: 179,
        discount: 17,
        rating: 4.6,
        category: 'fashion'
    },
    {
        id: 7,
        name: "Dyson V15 Vacuum",
        image: "https://images.unsplash.com/photo-1583340740270-66c3362ef6cd?w=300&h=300&fit=crop",
        price: 699,
        originalPrice: 799,
        discount: 13,
        rating: 4.7,
        category: 'home'
    },
    {
        id: 8,
        name: "Apple Watch Series 9",
        image: "https://images.unsplash.com/photo-1567581935881-1e46e69a3f07?w=300&h=300&fit=crop",
        price: 429,
        originalPrice: 499,
        discount: 14,
        rating: 4.8,
        category: 'electronics'
    },
    {
        id: 9,
        name: "Levi's 501 Jeans",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
        price: 89,
        originalPrice: 119,
        discount: 25,
        rating: 4.5,
        category: 'fashion'
    },
    {
        id: 10,
        name: "IKEA Coffee Table",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=300&fit=crop",
        price: 199,
        originalPrice: 249,
        discount: 20,
        rating: 4.6,
        category: 'home'
    },
    {
        id: 11,
        name: "PS5 Console",
        image: "https://images.unsplash.com/photo-1606144042614-7cd4a3f3e7e7?w=300&h=300&fit=crop",
        price: 549,
        originalPrice: 599,
        discount: 8,
        rating: 4.9,
        category: 'electronics'
    },
    {
        id: 12,
        name: "Adidas Ultraboost",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
        price: 179,
        originalPrice: 199,
        discount: 10,
        rating: 4.7,
        category: 'fashion'
    },
    {
        id: 13,
        name: "Smart TV 55 inch",
        image: "https://images.unsplash.com/photo-1593920730781-7f95f68e7f1b?w=300&h=300&fit=crop",
        price: 599,
        originalPrice: 749,
        discount: 20,
        rating: 4.6,
        category: 'electronics'
    },
    {
        id: 14,
        name: "Bedding Set",
        image: "https://images.unsplash.com/photo-1577692084717-1b722909eaf3?w=300&h=300&fit=crop",
        price: 89,
        originalPrice: 129,
        discount: 31,
        rating: 4.5,
        category: 'home'
    },
    {
        id: 15,
        name: "Gaming Mouse",
        image: "https://images.unsplash.com/photo-1527864550418-09d69f84e522?w=300&h=300&fit=crop",
        price: 79,
        originalPrice: 99,
        discount: 20,
        rating: 4.8,
        category: 'electronics'
    },
    {
        id: 16,
        name: "Designer Handbag",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
        price: 249,
        originalPrice: 349,
        discount: 29,
        rating: 4.7,
        category: 'fashion'
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    renderFlashProducts();
    renderPopularProducts('all');
    updateCart();
    initEventListeners();
    initTimer();
    initScrollTop();
});

// Event Listeners
function initEventListeners() {
    // Search functionality
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSearch();
    });

    // Cart modal
    elements.cartBtn.addEventListener('click', () => elements.cartModal.classList.add('active'));
    elements.closeCart.addEventListener('click', closeCartModal);
    elements.cartModal.addEventListener('click', function(e) {
        if (e.target === this) closeCartModal();
    });

    // Mobile menu
    elements.mobileToggle.addEventListener('click', toggleMobileMenu);
    elements.closeMobile.addEventListener('click', toggleMobileMenu);

    // Tabs
    elements.tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            setActiveTab(this);
            renderPopularProducts(tab);
        });
    });
}

function handleSearch() {
    const query = elements.searchInput.value.trim();
    if (query) {
        alert(`Searching for: "${query}"`);
        // Implement actual search functionality here
    }
}

function closeCartModal() {
    elements.cartModal.classList.remove('active');
}

function toggleMobileMenu() {
    elements.mobileMenu.classList.toggle('active');
}

// Slider Functions
function initSlider() {
    const slides = elements.slider.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto slide
    slideInterval = setInterval(nextSlide, 5000);
}

function setActiveTab(activeBtn) {
    elements.tabBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Product Rendering
function renderFlashProducts() {
    elements.flashProducts.innerHTML = flashSaleProducts.map(product => createProductCard(product, true)).join('');
    addCartListeners();
}

function renderPopularProducts(category = 'all') {
    const filteredProducts = category === 'all' 
        ? popularProducts 
        : popularProducts.filter(p => p.category === category);
    
    elements.popularProducts.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    addCartListeners();
}

function createProductCard(product, isFlash = false) {
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${isFlash ? '<div class="badge">FLASH SALE</div>' : ''}
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="price-section">
                    <span class="current-price">$${product.price}</span>
                    <span class="original-price">$${product.originalPrice}</span>
                    <span class="discount">${product.discount}% OFF</span>
                </div>
                <div class="rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-text">(${product.rating})</span>
                </div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
}

function addCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            addToCart(productId);
        });
    });
}

// Cart Functions
function addToCart(productId) {
    const product = [...flashSaleProducts, ...popularProducts].find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showNotification('Product added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    renderCart();
}

function updateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = count;
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
    if (cart.length === 0) {
        elements.cartItems.innerHTML = '<p style="text-align: center; color: var(--text-light);">Your cart is empty</p>';
        elements.cartTotal.textContent = '0';
        return;
    }

    elements.cartItems.innerHTML = cart.map(item => `
        <div style="display: flex; gap: 15px; padding: 15px 0; border-bottom: 1px solid var(--gray);">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
                <h4 style="margin: 0 0 10px 0; font-size: 16px;">${item.name}</h4>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-weight: bold; color: var(--primary-color);">$${item.price}</span>
                    <div style="display: flex; align-items: center; gap: 5px; background: var(--gray-light); padding: 5px 10px; border-radius: 20px;">
                        <button onclick="changeQuantity(${item.id}, -1)" style="background: none; border: none; font-size: 20px; cursor: pointer;">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)" style="background: none; border: none; font-size: 20px; cursor: pointer;">+</button>
                    </div>
                    <button onclick="removeFromCart(${item.id})" style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px;">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    elements.cartTotal.textContent = updateCartTotal().toFixed(2);
}

function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    updateCartCount();
    updateCartTotal();
    renderCart();
}

// Utility Functions
function showNotification(message) {
    // Simple notification (can be enhanced with toast)
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 4000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

function initTimer() {
    let timeLeft = 17940; // 4:59:30 in seconds

    function updateTimer() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (timeLeft > 0) {
            timeLeft--;
        } else {
            timeLeft = 17940; // Reset timer
        }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

function initScrollTop() {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            elements.scrollTop.classList.add('show');
        } else {
            elements.scrollTop.classList.remove('show');
        }
    });

    elements.scrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
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

// Expose functions to global scope for dynamic HTML
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;