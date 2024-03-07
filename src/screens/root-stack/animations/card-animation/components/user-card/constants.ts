import Children1Image from '../../../../../../assets/Image.png';
import Children2Image from '../../../../../../assets/Image-1.png';
import Children3Image from '../../../../../../assets/Image-2.png';
import { ImageSourcePropType } from 'react-native';

export type ChildrenType = { source: ImageSourcePropType; label: string };

export const CHILDREN_DATA: ChildrenType[] = [
  {
    source: Children1Image,
    label: 'Children 1',
  },
  {
    source: Children2Image,
    label: 'Children 2',
  },
  {
    source: Children3Image,
    label: 'Children 3',
  },

  {
    source: Children1Image,
    label: 'Children 4',
  },
  {
    source: Children2Image,
    label: 'Children 5',
  },
  {
    source: Children3Image,
    label: 'Children 6',
  },
];
