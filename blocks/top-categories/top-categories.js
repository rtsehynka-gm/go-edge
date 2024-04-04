import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { getPopularCategory } from './Model/getPopularCategory.js';

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
  const { items } = await getPopularCategory();

  console.log(items);
  if (!items) return null;

  // eslint-disable-next-line camelcase
  const top_cat = `<div className={classes.root}>
      <h2 className={classes.title}>
        <FormattedMessage
          id={'popularCategories.title'}
          defaultMessage={"Popular Categories"}
        />
      </h2>
      <div className={classes.items}>
        {items.map(item =>
          item.popular_category_image && item.show_popular_category &&
          <div className={classes.item} data-cy="PopularCategory-root">
            <Link to={item.url_path} className={classes.link}>
                            <span className={classes.linkTitle}>
                                <FormattedMessage
                                  id={'popularCategories.link'}
                                  defaultMessage={"view more"}
                                />
                            </span>
            </Link>
            <Image
              alt={item.name}
              height={200}
              width={300}
              src={item.popular_category_image}
              classes={{root: classes.container}}
            />
            <p className={classes.itemName}>
              {item.name}
            </p>
          </div>
        )}
      </div>
    </div>`;

  block.append(cat);
}
