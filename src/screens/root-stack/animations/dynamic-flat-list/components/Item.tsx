import React, { RefObject, useRef } from 'react';
import { Text, View, ViewStyle } from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { DynamicFlatListItemType } from '../types';

type Props = {
  scrollY: SharedValue<number>;
  index: number;
  item: DynamicFlatListItemType;
  containerRef: RefObject<View>;
};

const Item = ({ item, containerRef, scrollY }: Props) => {
  const itemRef = useRef<Animated.View>(null);
  const yPosition = useSharedValue(0);
  const itemHeight = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [
        yPosition.value - itemHeight.value,
        yPosition.value,
        yPosition.value + itemHeight.value,
      ],
      [1, 1, 0],
    ),
    transform: [
      {
        scale: interpolate(
          scrollY.value,
          [
            yPosition.value - itemHeight.value,
            yPosition.value,
            yPosition.value + itemHeight.value,
          ],
          [1, 1, 0.5],
        ),
      },
      {
        translateY: interpolate(
          scrollY.value,
          [
            yPosition.value - itemHeight.value,
            yPosition.value,
            yPosition.value + itemHeight.value,
          ],
          [0, 0, itemHeight.value],
        ),
      },
    ],
  }));

  const onLayout = () => {
    if (containerRef.current && itemRef.current) {
      itemRef.current?.measureLayout(
        containerRef.current,
        (_x, y, _width, height) => {
          yPosition.value = y;
          itemHeight.value = height;
        },
      );
    }
  };

  return (
    <Animated.View
      ref={itemRef}
      onLayout={onLayout}
      style={[
        {
          backgroundColor: item.color,
          height: item.height,
        },
        itemContainerStyle,
        style,
      ]}>
      <Text>{item.color}</Text>
    </Animated.View>
  );
};

const itemContainerStyle: ViewStyle = {
  borderRadius: 6,
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  padding: 4,
};

export default Item;
