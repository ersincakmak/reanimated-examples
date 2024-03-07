import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import ArrowRight from '../../assets/arrow-right.svg';
import {
  dropDownItems,
  GAP,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  SPACING,
  SPRING_DAMPING,
} from './constants';

type Props = {
  title: string;
  isOpen: SharedValue<boolean>;
  index: number;
};

const DropDownItem = ({ title, isOpen, index }: Props) => {
  const animatedDropDownItemStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      isOpen.value
        ? 'hsl(0, 0%, 10%)'
        : interpolateColor(
            index + 1,
            [0, dropDownItems.length],
            ['hsl(0, 0%, 10%)', 'hsl(0, 0%, 25%)'],
          ),
    ),
    marginTop: withSpring(isOpen.value ? 0 : -(GAP + ITEM_HEIGHT + SPACING), {
      damping: SPRING_DAMPING,
    }),
    zIndex: 999 - (index + 1),
    width: withTiming(
      isOpen.value ? ITEM_WIDTH : ITEM_WIDTH - 2 * SPACING * (index + 1),
    ),
  }));

  return (
    <Animated.View style={[styles.container, animatedDropDownItemStyle]}>
      <Text style={styles.text}>{title}</Text>
      <ArrowRight fill={'white'} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    backgroundColor: 'hsl(0, 0%, 10%)',
    width: ITEM_WIDTH,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
});

export default DropDownItem;
