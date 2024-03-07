import React from 'react';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from '../../../../unistyles/styles';

import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import ArrowRight from '../../../../assets/arrow-right.svg';
import {
  dropDownItems,
  GAP,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  SPACING,
} from './constants';

type Props = {
  title: string;
  index: number;
  isOpen: boolean;
};

const DropDownItem = ({ title, index, isOpen }: Props) => {
  const { styles } = useStyles(styleSheet);

  const colorInterpolationNumber = useDerivedValue(() =>
    withTiming(isOpen ? 1 : 0),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    marginTop: withSpring(isOpen ? 0 : -(GAP + ITEM_HEIGHT + SPACING), {
      damping: 13,
    }),
    zIndex: 999 - (index + 1),
    width: withTiming(
      isOpen ? ITEM_WIDTH : ITEM_WIDTH - 2 * SPACING * (index + 1),
      {
        easing: Easing.linear,
      },
    ),
    backgroundColor: interpolateColor(
      colorInterpolationNumber.value,
      [1, 0],
      [
        'hsl(0, 0%, 10%)',
        `hsl(0, 0%, ${(15 / dropDownItems.length) * (index + 1) + 10}%)`,
      ],
    ),
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.text}>{title}</Text>
      <ArrowRight fill={'white'} />
    </Animated.View>
  );
};

const styleSheet = createStyleSheet({
  container: {
    height: ITEM_HEIGHT,
    backgroundColor: 'hsl(0, 0%, 10%)',
    width: 300,
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
