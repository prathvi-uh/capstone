import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const isMagazine = block.classList.contains('magazine');
  const isTabs = block.classList.contains('tabs');
  const ul = document.createElement('ul');
  const items = [...block.children];
  items.forEach((row) => {
    const li = document.createElement('li');
    let category = '';
    if (isTabs && row.children[2]) {
      category = row.children[2].textContent.trim().toLowerCase();
      li.dataset.category = category;
    }
    while (row.firstElementChild) li.append(row.firstElementChild);
    let cardLink = null;
    [...li.children].forEach((div, index) => {
      if (isTabs && index === 2) {
        div.remove();
        return;
      }
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
        const link = div.querySelector('a[href]');
        if (link && !cardLink) {
          cardLink = link.href;
        }
        const title = div.querySelector('h1, h2, h3, h4, h5, h6, a');
        if (title && title.tagName !== 'H3') {
          const h3 = document.createElement('h3');
          h3.innerHTML = title.innerHTML;
          title.replaceWith(h3);
        }
        div.querySelectorAll('a[href]').forEach((anchor) => {
          const text = anchor.textContent.trim();
          if (!text || text === anchor.href || text.toLowerCase() === 'read more') {
            anchor.remove();
          }
        });
      }
    });
    if (isMagazine) {
      const body = li.querySelector('.cards-card-body');
      const image = li.querySelector('.cards-card-image');
      if (body) {
        const badge = document.createElement('div');
        badge.className = 'magazine-badge';
        badge.innerHTML = '<span>🔒</span>';
        body.prepend(badge);
        if (image) li.appendChild(image);
      }
    }
    if (cardLink) {
      li.style.cursor = 'pointer';
      li.setAttribute('role', 'link');
      li.setAttribute('tabindex', '0');
      li.addEventListener('click', (e) => {
        const clickedAnchor = e.target.closest('a');
        if (clickedAnchor) return;
        window.location.href = cardLink;
      });
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = cardLink;
        }
      });
    }
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(
        img.src,
        img.alt,
        false,
        [{ width: '750' }],
      ),
    );
  });
  block.replaceChildren(ul);
}
