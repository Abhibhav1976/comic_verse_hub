// ComicVerse Hub - Shopping Cart Page JavaScript
// Handles cart display, quantity updates, and checkout

// ===== Utilities =====
const getCartItems = () => {
  try {
    return JSON.parse(localStorage.getItem('comicverse_cart')) || [];
  } catch (e) {
    return [];
  }
};

const saveCartItems = (items) => {
  localStorage.setItem('comicverse_cart', JSON.stringify(items));
};

const clearCart = () => {
  localStorage.removeItem('comicverse_cart');
};

const updateCartBadge = () => {
  const cart = getCartItems();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  }
};

const showToast = (message) => {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  if (toast && toastMessage) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
};

// ===== Navigation Toggle (Mobile) =====
const initNavigation = () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
    });
  }
};

// ===== Cart Calculations =====
const calculateTotals = (cart) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;
  
  return { subtotal, tax, total };
};

// ===== Update Cart Item Quantity =====
const updateQuantity = (itemId, change) => {
  const cart = getCartItems();
  const item = cart.find(i => i.id === itemId);
  
  if (item) {
    item.quantity += change;
    
    if (item.quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    saveCartItems(cart);
    updateCartBadge();
    renderCart();
  }
};

// ===== Remove Item from Cart =====
const removeItem = (itemId) => {
  let cart = getCartItems();
  cart = cart.filter(item => item.id !== itemId);
  saveCartItems(cart);
  updateCartBadge();
  renderCart();
  showToast('Item removed from cart');
};

// ===== Render Cart Item =====
const createCartItemElement = (item) => {
  const itemElement = document.createElement('div');
  itemElement.className = 'cart-item';
  itemElement.setAttribute('data-testid', `cart-item-${item.id}`);
  
  const itemTotal = item.price * item.quantity;
  
  itemElement.innerHTML = `
    <img 
      src="${item.cover}" 
      alt="${item.title} cover" 
      class="cart-item-image"
      data-testid="cart-item-image-${item.id}"
    />
    <div class="cart-item-info">
      <h3 data-testid="cart-item-title-${item.id}">${item.title}</h3>
      <p class="cart-item-publisher" data-testid="cart-item-publisher-${item.id}">${item.publisher}</p>
      <p class="cart-item-price" data-testid="cart-item-price-${item.id}">$${item.price.toFixed(2)} each</p>
      <div class="cart-item-controls">
        <div class="qty-control">
          <button 
            class="qty-btn" 
            data-action="decrease" 
            data-id="${item.id}"
            aria-label="Decrease quantity"
            data-testid="qty-decrease-${item.id}"
          >
            <i class="fas fa-minus" aria-hidden="true"></i>
          </button>
          <span class="qty-value" data-testid="qty-value-${item.id}">${item.quantity}</span>
          <button 
            class="qty-btn" 
            data-action="increase" 
            data-id="${item.id}"
            aria-label="Increase quantity"
            data-testid="qty-increase-${item.id}"
          >
            <i class="fas fa-plus" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="cart-item-actions">
      <span class="cart-item-total" data-testid="cart-item-total-${item.id}">$${itemTotal.toFixed(2)}</span>
      <button 
        class="remove-btn" 
        data-action="remove" 
        data-id="${item.id}"
        aria-label="Remove ${item.title} from cart"
        data-testid="remove-btn-${item.id}"
      >
        <i class="fas fa-trash" aria-hidden="true"></i>
        Remove
      </button>
    </div>
  `;
  
  // Attach event listeners
  const decreaseBtn = itemElement.querySelector('[data-action="decrease"]');
  const increaseBtn = itemElement.querySelector('[data-action="increase"]');
  const removeBtn = itemElement.querySelector('[data-action="remove"]');
  
  if (decreaseBtn) {
    decreaseBtn.addEventListener('click', () => updateQuantity(item.id, -1));
  }
  
  if (increaseBtn) {
    increaseBtn.addEventListener('click', () => updateQuantity(item.id, 1));
  }
  
  if (removeBtn) {
    removeBtn.addEventListener('click', () => removeItem(item.id));
  }
  
  return itemElement;
};

// ===== Render Cart =====
const renderCart = () => {
  const cart = getCartItems();
  const cartItems = document.getElementById('cartItems');
  const cartSummary = document.getElementById('cartSummary');
  const emptyCart = document.getElementById('emptyCart');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  if (cart.length === 0) {
    // Show empty cart state
    cartItems.style.display = 'none';
    cartSummary.style.display = 'none';
    emptyCart.style.display = 'block';
    return;
  }
  
  // Show cart items
  cartItems.style.display = 'flex';
  cartSummary.style.display = 'block';
  emptyCart.style.display = 'none';
  
  // Clear and render items
  cartItems.innerHTML = '';
  const fragment = document.createDocumentFragment();
  cart.forEach(item => {
    fragment.appendChild(createCartItemElement(item));
  });
  cartItems.appendChild(fragment);
  
  // Update totals
  const { subtotal, tax, total } = calculateTotals(cart);
  
  document.getElementById('subtotalAmount').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('taxAmount').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
  
  // Enable checkout button
  if (checkoutBtn) {
    checkoutBtn.disabled = false;
  }
};

// ===== Checkout Modal =====
const showCheckoutModal = () => {
  const cart = getCartItems();
  const { total } = calculateTotals(cart);
  
  const modal = document.getElementById('checkoutModal');
  const orderTotal = document.getElementById('orderTotal');
  
  if (modal && orderTotal) {
    orderTotal.textContent = `$${total.toFixed(2)}`;
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
    
    // Clear cart
    clearCart();
    updateCartBadge();
    
    // Trap focus in modal
    const focusableElements = modal.querySelectorAll('button, a');
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }
};

const hideCheckoutModal = () => {
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
      // Redirect to browse page
      window.location.href = './browse.html';
    }, 300);
  }
};

const initCheckoutModal = () => {
  const modal = document.getElementById('checkoutModal');
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', showCheckoutModal);
  }
  
  if (checkoutOverlay) {
    checkoutOverlay.addEventListener('click', hideCheckoutModal);
  }
  
  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      hideCheckoutModal();
    }
  });
};

// ===== Initialize =====
const init = () => {
  // Initialize navigation
  initNavigation();
  
  // Update cart badge
  updateCartBadge();
  
  // Render cart
  renderCart();
  
  // Initialize checkout modal
  initCheckoutModal();
};

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
