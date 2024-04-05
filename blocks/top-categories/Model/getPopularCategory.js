import { fetchQuery } from '../../../scripts/commerce-backend.js';
import { GET_POPULAR_CATEGORY } from '../Queries/getPopularCategory.js';

async function getPopularCategory() {

  const { data } = await fetchQuery(GET_POPULAR_CATEGORY, {});
  console.log(data);
  return {
    items: data && data.categories && data.categories.items[0] && data.categories.items[0].popular_category,
  };
}

export {
  getPopularCategory,
};
