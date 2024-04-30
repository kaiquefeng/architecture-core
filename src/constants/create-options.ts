import { OptionTerminalSelect } from '@/@types/create.types.js';
import { blue, green, yellow } from 'kolorist';

export const CREATE_OPTIONS: OptionTerminalSelect[] = [
  {
    name: 'feature',
    display: 'Feature',
    color: yellow,
    variants: [
      {
        name: 'feature-ts',
        display: 'TypeScript',
        color: blue,
      },
      {
        name: 'feature',
        display: 'JavaScript',
        color: yellow,
      },
    ],
  },
  {
    name: 'component',
    display: 'Component',
    color: green,
    variants: [
      {
        name: 'component-ts',
        display: 'TypeScript',
        color: blue,
      },
      {
        name: 'component',
        display: 'JavaScript',
        color: yellow,
      },
    ],
  },
];
