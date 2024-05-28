import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('blocks/top-categories');
  block.textContent = '';

  // load footer fragment
  const Path = footerMeta.footer || '/blocks/top-categories';
  const fragment = await loadFragment(Path);

  // decorate footer DOM
  const cat = document.createElement('div');
  while (fragment.firstElementChild) cat.append(fragment.firstElementChild);
  block.append(cat);
}
