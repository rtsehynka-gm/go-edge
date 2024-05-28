import { chunk } from 'react-chunk';

export const useAllWidgetsDependencies = () => {
  const Components = [];
  Components['top-categories'] = chunk(() => import('@gomage/plugin-popular-category/'));
  return Components;
};
