import React, { useRef } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Action from '../Action';
import ItemLayout from '../ItemLayout';
import { ItemProps } from './types';

const Item = ({
  item,
  deleteWidth = 160,
  swipeThreshold = 36,
  onRemove: onRemoveCB,
}: ItemProps) => {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const itemLayout = useSharedValue({ width: 0, height: 0 });
  const containerHeight = useSharedValue<number | undefined>(undefined);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate(({ translationX }) => {
      translateX.value = interpolate(
        Math.min(translationX + startX.value, 0),
        [0, -deleteWidth, -(deleteWidth * 4)],
        [0, -deleteWidth, -(deleteWidth * 1.3)],
        Extrapolate.IDENTITY,
      );
    })
    .onEnd(() => {
      if (startX.value - translateX.value >= swipeThreshold) {
        translateX.value = withTiming(-deleteWidth);
      } else if (translateX.value - startX.value >= swipeThreshold) {
        translateX.value = withTiming(0);
      } else if (translateX.value < -deleteWidth * 0.5) {
        translateX.value = withTiming(-deleteWidth);
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedItemStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scaleY: 1 }],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: containerHeight.value,
  }));

  const onRemove = () => {
    translateX.value = withTiming(-itemLayout.value.width);
    onRemoveCB(onAnimationComplete => {
      containerHeight.value = withTiming(0, undefined, isFinished => {
        if (isFinished) {
          runOnJS(onAnimationComplete)();
        }
      });
    });
  };

  const isFirstTime = useRef(false);

  return (
    <Animated.View
      style={animatedContainerStyle}
      onLayout={({ nativeEvent: { layout } }) => {
        itemLayout.value = layout;
        if (!isFirstTime.current) {
          containerHeight.value = layout.height;
          isFirstTime.current = true;
        }
      }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedItemStyle}>
          <ItemLayout item={item} />
        </Animated.View>
      </GestureDetector>
      <Action {...{ itemLayout, deleteWidth, translateX, onRemove }} />
    </Animated.View>
  );
};

export default Item;
