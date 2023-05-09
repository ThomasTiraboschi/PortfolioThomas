class Webpage {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('load', () => {
      this.navbarLinksActiveOnScroll();
      this.scrollToElementWithOffset();
      this.backToTopButton();
      this.mobileNavToggle();
      this.scrollToOnPageLoad();
      this.removePreloader();
      this.heroTypeEffect();
      this.skillsAnimation();
      this.portfolioIsotopeAndFilter();
      this.initiatePortfolioLightbox();
      this.initiatePortfolioDetailsLightbox();
      this.portfolioDetailsSlider();
      this.testimonialsSlider();
      this.animationOnScroll();
      this.initiatePureCounter();
    });
  }

  select(el, all = false) {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  }

  on(type, el, listener, all = false) {
    const selectEl = this.select(el, all);
    if (!selectEl) return;
    if (all) selectEl.forEach(e => e.addEventListener(type, listener));
    else selectEl.addEventListener(type, listener);
  }

  onScroll(el, listener) {
    el.addEventListener('scroll', listener);
  }

  navbarLinksActiveOnScroll() {
    const navbarlinks = this.select('#navbar .scrollto', true);
    const setActiveClass = () => {
      const position = window.scrollY + 200;
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return;
        let section = this.select(navbarlink.hash);
        if (!section) return;
        navbarlink.classList.toggle('active', position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight));
      });
    };
    this.onScroll(document, setActiveClass);
  }

  scrollToElementWithOffset() {
    this.on('click', '.scrollto', e => {
      if (this.select(e.currentTarget.hash)) {
        e.preventDefault();
        this.toggleMobileNavActive();
        this.scrollto(e.currentTarget.hash);
      }
    }, true);
  }

  backToTopButton() {
    const backtotop = this.select('.back-to-top');
    if (!backtotop) return;
    const toggleBacktotop = () => backtotop.classList.toggle('active', window.scrollY > 100);
    this.onScroll(document, toggleBacktotop);
  }

  mobileNavToggle() {
    this.on('click', '.mobile-nav-toggle', e => {
      this.select('body').classList.toggle('mobile-nav-active');
      e.currentTarget.classList.toggle('bi-list');
      e.currentTarget.classList.toggle('bi-x');
    });
  }

  scrollToOnPageLoad() {
    if (window.location.hash && this.select(window.location.hash)) {
      this.scrollto(window.location.hash);
    }
  }

  removePreloader() {
    const preloader = this.select('#preloader');
    if (preloader) preloader.remove();
  }

  heroTypeEffect() {
    const typed = this.select('.typed');
    if (!typed) return;
    const typed_strings = typed.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 2000
    });
  }

  skillsAnimation() {
    const skilsContent = this.select('.skills-content');
    if (!skilsContent) return;
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: () => this.select('.progress .progress-bar', true).forEach(el => el.style.width = el.getAttribute('aria-valuenow')
      + '%')
    });
  }

  portfolioIsotopeAndFilter() {
    const portfolioContainer = this.select('.portfolio-container');
    if (!portfolioContainer) return;
    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
    });
    const portfolioFilters = this.select('#portfolio-flters li', true);
    this.on('click', '#portfolio-flters li', e => {
      e.preventDefault();
      portfolioFilters.forEach(el => el.classList.remove('filter-active'));
      e.currentTarget.classList.add('filter-active');
      portfolioIsotope.arrange({
        filter: e.currentTarget.getAttribute('data-filter'),
      });
      portfolioIsotope.on('arrangeComplete', () => AOS.refresh());
    }, true);
  }

  initiatePortfolioLightbox() {
    new GLightbox({
      selector: '.portfolio-lightbox',
    });
  }

  initiatePortfolioDetailsLightbox() {
    new GLightbox({
      selector: '.portfolio-details-lightbox',
      width: '90%',
      height: '90vh',
    });
  }

  portfolioDetailsSlider() {
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  }

  testimonialsSlider() {
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  }

  animationOnScroll() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }

  initiatePureCounter() {
    new PureCounter();
  }

  scrollto(el) {
    const elementPos = this.select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth',
    });
  }

  toggleMobileNavActive() {
    const body = this.select('body');
    if (!body.classList.contains('mobile-nav-active')) return;
    body.classList.remove('mobile-nav-active');
    const navbarToggle = this.select('.mobile-nav-toggle');
    navbarToggle.classList.toggle('bi-list');
    navbarToggle.classList.toggle('bi-x');
  }
}

new Webpage();
