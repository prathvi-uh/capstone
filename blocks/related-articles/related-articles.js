export default function decorate(block) {
  const rows = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.className = 'related-articles-wrapper';
  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length < 2) return;
    const item = document.createElement('div');
    item.className = 'related-articles-item';
    const title = document.createElement('p');
    title.className = 'related-articles-title';
    title.textContent = cols[0].textContent.trim();
    const date = document.createElement('p');
    date.className = 'related-articles-date';
    date.textContent = cols[1].textContent.trim();
    item.append(title, date);
    wrapper.append(item);
  });
  block.replaceChildren(wrapper);
}

