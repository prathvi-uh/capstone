export default function decorate(block) {
  const cols = [...block.children[0]?.children || []];
  if (cols.length < 2) return;
  const parentCell = cols[0];
  const currentCell = cols[1];
  const parentText = parentCell.textContent.trim();
  const currentText = currentCell.textContent.trim();
  const parentLink = parentCell.querySelector('a');
  const parentHref = parentLink ? parentLink.href : '#';
  const wrapper = document.createElement('div');
  wrapper.className = 'breadcrumb-wrapper';
  const parent = document.createElement('a');
  parent.className = 'breadcrumb-parent';
  parent.textContent = parentText;
  parent.href = parentHref;
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
