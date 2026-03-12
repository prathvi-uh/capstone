export default function decorate(block) {
  const cols = [...block.children[0]?.children || []];
  if (cols.length < 2) return;
  const parentText = cols[0].textContent.trim();
  const currentText = cols[1].textContent.trim();
  const wrapper = document.createElement('div');
  wrapper.className = 'breadcrumb-wrapper';
  const parent = document.createElement('span');
  parent.className = 'breadcrumb-parent';
  parent.textContent = parentText;
  const separator = document.createElement('span');
  separator.className = 'breadcrumb-separator';
  separator.textContent = '▶';
  const current = document.createElement('span');
  current.className = 'breadcrumb-current';
  current.textContent = currentText;
  wrapper.append(parent, separator, current);
  block.textContent = '';
  block.append(wrapper);
}