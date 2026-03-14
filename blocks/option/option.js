export default function decorate(block) {
  const rows = [...block.children];
  const tabs = [];
  const panels = [];

  rows.forEach((row, index) => {
    const cols = [...row.children];
    if (cols.length < 2) return;

    const title = cols[0].textContent.trim();

    const content = cols
      .slice(1)
      .map((col) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'option-col';
        wrapper.innerHTML = col.innerHTML;
        return wrapper.outerHTML;
      })
      .join('');

    tabs.push(`
      <button
        class="option-tab ${index === 0 ? 'active' : ''}"
        type="button"
        aria-selected="${index === 0 ? 'true' : 'false'}">
        ${title}
      </button>
    `);

    panels.push(`
      <div class="option-panel ${index === 0 ? 'active' : ''}">
        <div class="option-panel-inner cols-${cols.length - 1}">
          ${content}
        </div>
      </div>
    `);
  });

  block.innerHTML = `
    <div class="option-nav">
      ${tabs.join('')}
    </div>
    <div class="option-content">
      ${panels.join('')}
    </div>
  `;

  const buttons = [...block.querySelectorAll('.option-tab')];
  const panelEls = [...block.querySelectorAll('.option-panel')];

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });

      panelEls.forEach((panel) => {
        panel.classList.remove('active');
      });

      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      panelEls[index].classList.add('active');
    });
  });

  // move option beside menu without changing da.live
  const menuBlock = document.querySelector('.menu');
  if (!menuBlock) return;

  if (block.closest('.adventure-layout')) return;

  const layout = document.createElement('div');
  layout.className = 'adventure-layout';

  const menuWrap = document.createElement('div');
  menuWrap.className = 'adventure-menu';

  const optionWrap = document.createElement('div');
  optionWrap.className = 'adventure-option';

  const parent = menuBlock.parentNode;
  parent.insertBefore(layout, menuBlock);

  menuWrap.append(menuBlock);
  optionWrap.append(block);
  layout.append(menuWrap, optionWrap);
}
