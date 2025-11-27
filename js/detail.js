// ComicVerse Hub - Comic Detail Page JavaScript
// Handles displaying comic details and adding to cart

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

// ===== Get Comic ID from URL =====
const getComicIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  return id ? parseInt(id) : null;
};

// ===== Find Comic by ID =====
const findComicById = (id) => {
  return comics.find(comic => comic.id === id);
};

// ===== Modal Functions =====
const showModal = (message) => {
  const modal = document.getElementById('successModal');
  const modalMessage = document.getElementById('modalMessage');
  
  if (modal && modalMessage) {
    modalMessage.textContent = message;
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
    
    // Trap focus in modal
    const focusableElements = modal.querySelectorAll('button, a');
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }
};

const hideModal = () => {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
};

const initModal = () => {
  const modal = document.getElementById('successModal');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');
  const continueShopping = document.getElementById('continueShopping');
  
  if (modalClose) {
    modalClose.addEventListener('click', hideModal);
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', hideModal);
  }
  
  if (continueShopping) {
    continueShopping.addEventListener('click', hideModal);
  }
  
  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      hideModal();
    }
  });
};

// ===== Add to Cart Function =====
const addToCart = (comic) => {
  const cart = getCartItems();
  const existingItem = cart.find(item => item.id === comic.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: comic.id,
      title: comic.title,
      publisher: comic.publisher,
      price: comic.price,
      cover: comic.cover,
      quantity: 1
    });
  }
  
  saveCartItems(cart);
  updateCartBadge();
  showModal('Comic added to cart successfully!');
};

// ===== Render Comic Details =====
const renderComicDetails = (comic) => {
  const detailContent = document.getElementById('detailContent');
  if (!detailContent) return;
  
  const releaseDate = new Date(comic.releaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  detailContent.innerHTML = `
    <div class="detail-image-container">
      <img 
        src="${comic.cover}" 
        alt="${comic.title} cover" 
        class="detail-cover"
        data-testid="comic-cover"
      />
    </div>
    
    <div class="detail-info">
      <h1 data-testid="comic-title">${comic.title}</h1>
      
      <div class="detail-meta">
        <div class="meta-item">
          <span class="meta-label">Publisher</span>
          <span class="meta-value" data-testid="comic-publisher">${comic.publisher}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Genre</span>
          <span class="meta-value" data-testid="comic-genre">${comic.genre}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Release Date</span>
          <span class="meta-value" data-testid="comic-release-date">${releaseDate}</span>
        </div>
      </div>
      
      <div class="detail-synopsis">
        <h3>Synopsis</h3>
        <p data-testid="comic-synopsis">${comic.synopsis}</p>
      </div>
      
      ${comic.characters && comic.characters.length > 0 ? `
        <div class="detail-synopsis">
          <h3>Main Characters</h3>
          <p data-testid="comic-characters">${comic.characters.join(', ')}</p>
        </div>
      ` : ''}
      
      <div class="detail-creators">
        <h3>Creative Team</h3>
        <div class="creators-list">
          <div class="creator-item">
            <span class="creator-role">Writer</span>
            <span class="creator-name" data-testid="comic-writer">${comic.creators.writer}</span>
          </div>
          <div class="creator-item">
            <span class="creator-role">Artist</span>
            <span class="creator-name" data-testid="comic-artist">${comic.creators.artist}</span>
          </div>
          <div class="creator-item">
            <span class="creator-role">Colorist</span>
            <span class="creator-name" data-testid="comic-colorist">${comic.creators.colorist}</span>
          </div>
        </div>
      </div>
      
      <div class="detail-actions">
        <span class="detail-price" data-testid="comic-price">$${comic.price.toFixed(2)}</span>
        <button 
          class="btn btn-primary" 
          id="addToCartBtn"
          data-testid="add-to-cart-btn"
          aria-label="Add ${comic.title} to cart"
        >
          <i class="fas fa-cart-plus" aria-hidden="true"></i>
          Add to Cart
        </button>
      </div>
    </div>
  `;
  
  // Attach add to cart event listener
  const addToCartBtn = document.getElementById('addToCartBtn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      addToCart(comic);
    });
  }
};

// ===== Initialize =====
const init = () => {
  // Initialize navigation
  initNavigation();
  
  // Update cart badge
  updateCartBadge();
  
  // Initialize modal
  initModal();
  
  // Get comic ID from URL
  const comicId = getComicIdFromUrl();
  
  if (!comicId) {
    // Redirect to browse page if no ID provided
    window.location.href = './browse.html';
    return;
  }
  
  // Find comic by ID
  const comic = findComicById(comicId);
  
  if (!comic) {
    // Redirect to browse page if comic not found
    showToast('Comic not found');
    setTimeout(() => {
      window.location.href = './browse.html';
    }, 2000);
    return;
  }
  
  // Render comic details
  renderComicDetails(comic);
};

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
