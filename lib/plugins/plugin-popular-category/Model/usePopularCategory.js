import { useQuery } from "../../../../scripts/commerce-backend.js";
import { GET_POPULAR_CATEGORY } from '../Queries/getPopularCategory.gql';

/**
 *
 * @returns {{items: *}}
 */
export const usePopularCategory = async () => {
  const { data } = await useQuery(GET_POPULAR_CATEGORY);
  return { items: data?.categories?.items[0]?.popular_category };
};
