import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('hero');
  block.textContent = '';

  // load footer fragment
  const footerPath = footerMeta.footer || '/hero';
  const fragment = await loadFragment(footerPath);
console.log('footerPath', footerPath);
  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
