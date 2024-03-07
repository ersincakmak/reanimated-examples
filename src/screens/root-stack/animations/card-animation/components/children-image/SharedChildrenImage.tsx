import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  createStyleSheet,
  useStyles,
} from '../../../../../../unistyles/styles';
import { CHILDREN_DATA } from '../user-card/constants';
import ChildrenImage from './ChildrenImage';
import { SharedChildrenImageProps } from './types';

const SharedChildrenImage = ({
  animatedNodes,
  isExpanded,
  item,
  stackCenterX,
  stackCenterY,
  index,
}: SharedChildrenImageProps) => {
  const { styles } = useStyles(styleSheet);

  const element = animatedNodes[item.label];

  const isAnimationRunOnce = useSharedValue(false);
  const initialExpandValue = useSharedValue(isExpanded);

  const delay =
    (isExpanded ? index : 5 - index) * ((isExpanded ? 300 : 150) / 10);

  useDerivedValue(() => {
    if (!isAnimationRunOnce.value && initialExpandValue.value !== isExpanded) {
      isAnimationRunOnce.value = true;
    }
  });

  const top = useDerivedValue(() => {
    if (!isAnimationRunOnce.value || !element?.endY) {
      return element?.startY ?? stackCenterY.value;
    }

    return withDelay(
      delay,
      withTiming(
        !isExpanded
          ? element?.startY || stackCenterY.value
          : element?.endY || 0,
      ),
    );
  });

  const left = useDerivedValue(() => {
    if (!isAnimationRunOnce.value || !element?.endX) {
      return element?.startX || stackCenterX.value;
    }

    return withDelay(
      delay,
      withTiming(
        !isExpanded
          ? element?.startX || stackCenterX.value
          : element?.endX || 0,
      ),
    );
  });

  const width = useDerivedValue(() => {
    if (!isAnimationRunOnce.value) {
      return element?.startWidth || 0;
    }

    return withDelay(
      delay,
      withTiming(
        !isExpanded ? element?.startWidth || 0 : element?.endWidth || 0,
      ),
    );
  });

  const height = useDerivedValue(() => {
    if (!isAnimationRunOnce.value) {
      return element?.startHeight || 0;
    }

    return withDelay(
      delay,
      withTiming(
        !isExpanded ? element?.startHeight || 0 : element?.endHeight || 0,
      ),
    );
  });

  const opacity = useDerivedValue(() => {
    if (element?.startX) {
      return 1;
    }

    return !isAnimationRunOnce.value
      ? 0
      : interpolate(
          top.value,
          [
            stackCenterY.value,
            (element?.endY || 0) -
              ((element?.endY || 0) - stackCenterY.value) * 0.6,
            element?.endY || 0,
          ],
          [0, 0, 1],
        );
  });

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    opacity: opacity.value,
    top: top.value,
    left: left.value,
    width: width.value,
    height: height.value,
    zIndex: 2 + (index < 3 ? CHILDREN_DATA.length - 3 + index : index - 3),
  }));

  return (
    <Animated.View style={style} pointerEvents="none">
      <ChildrenImage
        item={item}
        style={styles.fullSize}
        imageProps={{ style: styles.fullSize }}
      />
    </Animated.View>
  );
};

const styleSheet = createStyleSheet({
  fullSize: {
    width: '100%',
    height: '100%',
  },
});

export default SharedChildrenImage;
