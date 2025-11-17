// ComicVerse Hub - Browse Page JavaScript
// Handles filtering, sorting, and search functionality

// ===== State Management =====
let allComics = [];
let filteredComics = [];
let currentFilters = {
  search: '',
  publisher: '',
  genre: ''
};
let currentSort = 'title-asc';
let searchTimeout = null;

// ===== Utilities =====
const getCartItems = () => {
  try {
    return JSON.parse(localStorage.getItem('comicverse_cart')) || [];
  } catch (e) {
    return [];
  }
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

// ===== Filter & Sort Logic =====
const applyFilters = () => {
  filteredComics = allComics.filter(comic => {
    // Search filter
    if (currentFilters.search) {
      const searchTerm = currentFilters.search.toLowerCase();
      const matchesSearch = 
        comic.title.toLowerCase().includes(searchTerm) ||
        comic.characters.some(char => char.toLowerCase().includes(searchTerm)) ||
        comic.creators.writer.toLowerCase().includes(searchTerm) ||
        comic.creators.artist.toLowerCase().includes(searchTerm) ||
        comic.synopsis.toLowerCase().includes(searchTerm);
      
      if (!matchesSearch) return false;
    }
    
    // Publisher filter
    if (currentFilters.publisher && comic.publisher !== currentFilters.publisher) {
      return false;
    }
    
    // Genre filter
    if (currentFilters.genre && comic.genre !== currentFilters.genre) {
      return false;
    }
    
    return true;
  });
  
  applySort();
  renderComics();
  updateResultsCount();
};

const applySort = () => {
  switch (currentSort) {
    case 'title-asc':
      filteredComics.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      filteredComics.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'price-asc':
      filteredComics.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredComics.sort((a, b) => b.price - a.price);
      break;
    case 'date-desc':
      filteredComics.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      break;
    case 'date-asc':
      filteredComics.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
      break;
  }
};

// ===== Render Functions =====
const createComicCard = (comic) => {
  const card = document.createElement('article');
  card.className = 'comic-card';
  card.setAttribute('role', 'listitem');
  card.setAttribute('data-testid', `comic-card-${comic.id}`);
  
  card.innerHTML = `
    <a href="./comic-detail.html?id=${comic.id}" aria-label="View details for ${comic.title}">
      <img src="${comic.cover}" alt="${comic.title} cover" class="comic-cover" />
      <div class="comic-info">
        <h3 class="comic-title">${comic.title}</h3>
        <p class="comic-publisher">${comic.publisher}</p>
        <p class="comic-genre">${comic.genre}</p>
        <p class="comic-price">$${comic.price.toFixed(2)}</p>
      </div>
    </a>
  `;
  
  return card;
};

const renderComics = () => {
  const grid = document.getElementById('comicsGrid');
  const noResults = document.getElementById('noResults');
  
  if (!grid) return;
  
  // Clear grid
  grid.innerHTML = '';
  
  if (filteredComics.length === 0) {
    grid.style.display = 'none';
    noResults.style.display = 'block';
    return;
  }
  
  grid.style.display = 'grid';
  noResults.style.display = 'none';
  
  // Use document fragment for performance
  const fragment = document.createDocumentFragment();
  filteredComics.forEach(comic => {
    fragment.appendChild(createComicCard(comic));
  });
  
  grid.appendChild(fragment);
};

const updateResultsCount = () => {
  const resultsCount = document.getElementById('resultsCount');
  if (resultsCount) {
    const count = filteredComics.length;
    resultsCount.textContent = `Showing ${count} ${count === 1 ? 'comic' : 'comics'}`;
  }
};

// ===== Populate Filter Options =====
const populateFilters = () => {
  // Populate publisher filter
  const publisherFilter = document.getElementById('publisherFilter');
  if (publisherFilter) {
    const publishers = [...new Set(allComics.map(c => c.publisher))].sort();
    publishers.forEach(publisher => {
      const option = document.createElement('option');
      option.value = publisher;
      option.textContent = publisher;
      publisherFilter.appendChild(option);
    });
  }
  
  // Populate genre filter
  const genreFilter = document.getElementById('genreFilter');
  if (genreFilter) {
    const genres = [...new Set(allComics.map(c => c.genre))].sort();
    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre;
      option.textContent = genre;
      genreFilter.appendChild(option);
    });
  }
};

// ===== Event Listeners =====
const initEventListeners = () => {
  // Search input with debounce
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentFilters.search = e.target.value.trim();
        applyFilters();
      }, 300);
    });
  }
  
  // Publisher filter
  const publisherFilter = document.getElementById('publisherFilter');
  if (publisherFilter) {
    publisherFilter.addEventListener('change', (e) => {
      currentFilters.publisher = e.target.value;
      applyFilters();
    });
  }
  
  // Genre filter
  const genreFilter = document.getElementById('genreFilter');
  if (genreFilter) {
    genreFilter.addEventListener('change', (e) => {
      currentFilters.genre = e.target.value;
      applyFilters();
    });
  }
  
  // Sort control
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applySort();
      renderComics();
    });
  }
};

// ===== Initialize =====
const init = () => {
  // Initialize navigation
  initNavigation();
  
  // Update cart badge
  updateCartBadge();
  
  // Load comics data
  allComics = [...comics];
  filteredComics = [...comics];
  
  // Populate filters
  populateFilters();
  
  // Apply initial sort and render
  applySort();
  renderComics();
  updateResultsCount();
  
  // Attach event listeners
  initEventListeners();
};

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
