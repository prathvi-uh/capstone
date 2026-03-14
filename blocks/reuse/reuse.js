export default function decorate(block) {
  const slides = [...block.children];
  if (!slides.length) return;
  let currentSlide = 0;
  block.classList.add('reuse-carousel');
  const track = document.createElement('div');
  track.className = 'reuse-track';
  slides.forEach((slide) => {
    slide.classList.add('reuse-slide');
    track.appendChild(slide);
  });
  block.innerHTML = '';
  block.appendChild(track);
  const prevButton = document.createElement('button');
  prevButton.className = 'reuse-btn reuse-btn-prev';
  prevButton.setAttribute('aria-label', 'Previous slide');
  prevButton.innerHTML = '&#8249;';
  const nextButton = document.createElement('button');
  nextButton.className = 'reuse-btn reuse-btn-next';
  nextButton.setAttribute('aria-label', 'Next slide');
  nextButton.innerHTML = '&#8250;';
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'reuse-dots';
  function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    // eslint-disable-next-line no-use-before-define
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  const dots = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'reuse-dot';
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      currentSlide = index;
      // eslint-disable-next-line no-use-before-define
      updateCarousel();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });
  prevButton.addEventListener('click', () => {
    currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    updateCarousel();
  });
  nextButton.addEventListener('click', () => {
    currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    updateCarousel();
  });
  block.appendChild(prevButton);
  block.appendChild(nextButton);
  block.appendChild(dotsWrap);
  updateCarousel();
}
