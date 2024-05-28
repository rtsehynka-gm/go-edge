import React from 'react';
import { createTestInstance } from '@magento/peregrine';
import PopularCategories from '../popularCategories';
import { usePopularCategory } from '../../Model/usePopularCategory';

jest.mock('@magento/venia-ui/lib/classify');
jest.mock('../../Model/usePopularCategory', () => ({
    usePopularCategory: jest.fn()
}));
jest.mock('react-intl', () => ({
    FormattedMessage: props => (
        <div componentName="Formatted Message Component" {...props} />
    )
}));
jest.mock('@magento/venia-ui/lib/components/Image', () => props => (
    <div componentName="Image" {...props} />
));
jest.mock('react-router-dom', () => ({
    Link: ({ children }) => children
}));
const talonProps = {
    items: [
        {
            name: 'test Category',
            url_key: '/testCategory.html',
            url_path:'/testCategory.html',
            popular_category_image: 'imageTest.png',
            show_popular_category: true
        },
        {
            name: 'test Category2',
            url_key: '/testCategory2.html',
            url_path:'/testCategory2.html',
            popular_category_image: 'imageTest2.png',
            show_popular_category: false
        },
        {
            name: 'test Category3',
            url_key: '/testCategory3.html',
            url_path:'/testCategory3.html',
            popular_category_image: 'imageTest3.png',
            show_popular_category: true
        }
    ]
};

test('renders without items', () => {
    const props = {
        data: {}
    }
    usePopularCategory.mockReturnValueOnce({items: null});
    const component = createTestInstance(<PopularCategories {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
});

test('renders with items', () => {
    const props = {
        data: {}
    }
    usePopularCategory.mockReturnValueOnce(talonProps);
    const component = createTestInstance(<PopularCategories {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
});

