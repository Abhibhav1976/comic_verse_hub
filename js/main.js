// ComicVerse Hub - Homepage JavaScript
// Handles carousel, cart badge, and homepage content

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

// ===== Hero Carousel =====
class Carousel {
  constructor(element) {
    this.carousel = element;
    this.inner = element.querySelector('.carousel-inner');
    this.prevBtn = element.querySelector('.carousel-control.prev');
    this.nextBtn = element.querySelector('.carousel-control.next');
    this.indicatorsContainer = element.querySelector('.carousel-indicators');
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.isPaused = false;
    this.featuredComics = this.getFeaturedComics();
    
    this.init();
  }
  
  getFeaturedComics() {
    // Get 4 featured comics for the carousel
    return comics.slice(0, 4);
  }
  
  init() {
    this.render();
    this.attachEventListeners();
    this.startAutoplay();
  }
  
  render() {
    // Render carousel items
    this.inner.innerHTML = this.featuredComics.map((comic, index) => `
      <div class="carousel-item" role="group" aria-roledescription="slide" aria-label="Slide ${index + 1} of ${this.featuredComics.length}" data-testid="carousel-item-${index}">
        <div class="carousel-content">
          <div class="carousel-text">
            <h2>${comic.title}</h2>
            <p>${comic.synopsis}</p>
            <a href="./comic-detail.html?id=${comic.id}" class="btn btn-primary" data-testid="carousel-view-btn-${comic.id}">
              <i class="fas fa-eye" aria-hidden="true"></i>
              View Details
            </a>
          </div>
          <div class="carousel-image">
            <img src="${comic.cover}" alt="${comic.title} cover" />
          </div>
        </div>
      </div>
    `).join('');
    
    // Render indicators
    this.indicatorsContainer.innerHTML = this.featuredComics.map((_, index) => `
      <button 
        class="carousel-indicator ${index === 0 ? 'active' : ''}" 
        data-index="${index}"
        role="tab"
        aria-label="Go to slide ${index + 1}"
        aria-selected="${index === 0}"
        data-testid="carousel-indicator-${index}"
      ></button>
    `).join('');
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    const offset = -index * 100;
    this.inner.style.transform = `translateX(${offset}%)`;
    
    // Update indicators
    const indicators = this.indicatorsContainer.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
      indicator.setAttribute('aria-selected', i === index);
    });
    
    // Update ARIA live region
    this.carousel.setAttribute('aria-label', `Showing slide ${index + 1} of ${this.featuredComics.length}`);
  }
  
  next() {
    const nextIndex = (this.currentIndex + 1) % this.featuredComics.length;
    this.goToSlide(nextIndex);
  }
  
  prev() {
    const prevIndex = (this.currentIndex - 1 + this.featuredComics.length) % this.featuredComics.length;
    this.goToSlide(prevIndex);
  }
  
  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, 5000);
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
  
  attachEventListeners() {
    // Next/Prev buttons
    this.nextBtn.addEventListener('click', () => {
      this.next();
      this.startAutoplay();
    });
    
    this.prevBtn.addEventListener('click', () => {
      this.prev();
      this.startAutoplay();
    });
    
    // Indicators
    this.indicatorsContainer.addEventListener('click', (e) => {
      const indicator = e.target.closest('.carousel-indicator');
      if (indicator) {
        const index = parseInt(indicator.dataset.index);
        this.goToSlide(index);
        this.startAutoplay();
      }
    });
    
    // Pause on hover
    this.carousel.addEventListener('mouseenter', () => {
      this.isPaused = true;
    });
    
    this.carousel.addEventListener('mouseleave', () => {
      this.isPaused = false;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prev();
        this.startAutoplay();
      } else if (e.key === 'ArrowRight') {
        this.next();
        this.startAutoplay();
      }
    });
  }
}

// ===== Render Comic Card =====
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

// ===== Render Sections =====
const renderNewReleases = () => {
  const grid = document.getElementById('newReleasesGrid');
  if (!grid) return;
  
  // Sort by release date (newest first) and get top 4
  const newReleases = [...comics]
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    .slice(0, 4);
  
  const fragment = document.createDocumentFragment();
  newReleases.forEach(comic => {
    fragment.appendChild(createComicCard(comic));
  });
  
  grid.appendChild(fragment);
};

const renderPopularSeries = () => {
  const grid = document.getElementById('popularSeriesGrid');
  if (!grid) return;
  
  // Get 4 comics with highest prices (simulating popularity)
  const popular = [...comics]
    .sort((a, b) => b.price - a.price)
    .slice(0, 4);
  
  const fragment = document.createDocumentFragment();
  popular.forEach(comic => {
    fragment.appendChild(createComicCard(comic));
  });
  
  grid.appendChild(fragment);
};

const renderPublisherSpotlights = () => {
  const grid = document.getElementById('publisherGrid');
  if (!grid) return;
  
  // Get unique publishers
  const publishers = [...new Set(comics.map(c => c.publisher))];
  
  const fragment = document.createDocumentFragment();
  publishers.forEach(publisher => {
    const count = comics.filter(c => c.publisher === publisher).length;
    const card = document.createElement('div');
    card.className = 'publisher-card';
    card.setAttribute('data-testid', `publisher-${publisher.toLowerCase().replace(/\s+/g, '-')}`);
    card.innerHTML = `
      <h3>${publisher}</h3>
      <p>${count} ${count === 1 ? 'Comic' : 'Comics'} Available</p>
    `;
    fragment.appendChild(card);
  });
  
  grid.appendChild(fragment);
};

// ===== Initialize =====
const init = () => {
  // Initialize navigation
  initNavigation();
  
  // Update cart badge
  updateCartBadge();
  
  // Initialize carousel
  const carouselElement = document.getElementById('heroCarousel');
  if (carouselElement) {
    new Carousel(carouselElement);
  }
  
  // Render sections
  renderNewReleases();
  renderPopularSeries();
  renderPublisherSpotlights();
};

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
