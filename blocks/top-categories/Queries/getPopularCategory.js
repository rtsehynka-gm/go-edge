// eslint-disable-next-line import/prefer-default-export
export const GET_POPULAR_CATEGORY = `
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
