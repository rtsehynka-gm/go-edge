import { gql } from '@apollo/client';

export const GET_POPULAR_CATEGORY = gql`
    query getPopularCategory {
        categories {
            items {
                uid
                popular_category {
                    name
                    url_key
                    url_path
                    popular_category_image
                    show_popular_category
                }
            }
        }
    }
`;
