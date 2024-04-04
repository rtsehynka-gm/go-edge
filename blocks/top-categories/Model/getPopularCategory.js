import { fetchGetQuery } from '../../../scripts/aem.js';
import { GET_POPULAR_CATEGORY } from '../Queries/getPopularCategory.js';

async function getPopularCategory() {
  const { data } = await fetchGetQuery(GET_POPULAR_CATEGORY);

  return {
    items: data && data.categories && data.categories.items[0] && data.categories.items[0].popular_category,
  };
}

export {
  getPopularCategory,
};
