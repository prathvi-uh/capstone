export default function decorate(block) {
  const image = block.querySelector('picture');
  const content = block.querySelectorAll('div > p, div > h2, div > h3, div > a');
  block.innerHTML = '';
  const heroWrapper = document.createElement('div');
  heroWrapper.className = 'hero-card-inner';
  if (image) {
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'hero-image';
    imgWrapper.appendChild(image);
    heroWrapper.appendChild(imgWrapper);
  }
  const bodyWrapper = document.createElement('div');
  bodyWrapper.className = 'hero-body';
  content.forEach((el) => {
    bodyWrapper.appendChild(el);
  });
  heroWrapper.appendChild(bodyWrapper);
  block.appendChild(heroWrapper);
}
