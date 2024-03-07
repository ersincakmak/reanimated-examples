import { ViewProps } from 'react-native';
import { ChildrenImageProps } from '../children-image/types';

export type ChildrenElementProps = ChildrenImageProps & {
  childrenImageContainerProps?: ViewProps;
};
