import { RefObject } from 'react';
import { ImageProps, MeasureLayoutOnSuccessCallback } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import { ChildrenType } from '../user-card/constants';
import { AnimatedNodes } from '../user-card/types';

export type ChildrenImageProps = {
  item: ChildrenType;
  imageProps?: Omit<ImageProps, 'source'>;
} & (
  | {
      onMeasure?: undefined;
      containerRef?: undefined;
    }
  | {
      onMeasure: MeasureLayoutOnSuccessCallback;
      containerRef: RefObject<Animated.View>;
    }
);

export type SharedChildrenImageProps = {
  animatedNodes: AnimatedNodes;
  index: number;
  isExpanded: boolean;
  item: ChildrenType;
  stackCenterX: SharedValue<number>;
  stackCenterY: SharedValue<number>;
};
