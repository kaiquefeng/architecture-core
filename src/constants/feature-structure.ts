export const FEATURE_STRUCTURE_FOLDERS = [
  `/layouts/feature-container`,
  `/hooks/use-feature-name`,
  `/constants`,
  '/adapters/get-feature',
  '/contexts',
  '/services',
  '/components',
];

export const FEATURE_STRUCTURE_FILES = [
  {
    name: 'layouts',
    files: ['feature-container.tsx', 'index.ts', 'feature-container.types.ts'],
  },
  {
    name: 'hooks',
    files: ['use-feature-name.tsx', 'index.ts', 'use-feature-name.types.ts'],
  },
  {
    name: 'constants',
    files: ['feature-constant.ts'],
  },
  {
    name: 'adapters',
    files: ['get-feature.ts', 'get-feature.types.ts', 'index.ts'],
  },
  {
    name: 'services',
    files: ['api-feature.ts'],
  },
];
