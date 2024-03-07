import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from '../../../../unistyles/styles';
import DropDownItem from './DropDownItem';

import ChevronRight from '../../../../assets/chevron-right.svg';
import {
  dropDownItems,
  GAP,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  SPACING,
} from './constants';

const SmoothDropDown = () => {
  const { styles } = useStyles(styleSheet);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(ex => !ex);

  const animatedChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(isOpen ? '90deg' : '0deg') }],
  }));

  const animatedToggle = useAnimatedStyle(() => ({
    marginTop: withSpring(isOpen ? 0 : dropDownItems.length * SPACING, {
      damping: 13,
    }),
  }));

  return (
    <View style={styles.screen}>
      <Animated.View style={[animatedToggle, styles.animatedContainer]}>
        <TouchableOpacity
          style={styles.toggleContainer}
          activeOpacity={0.7}
          onPress={toggle}>
          <Text style={styles.text}>Header</Text>
          <Animated.View style={animatedChevronStyle}>
            <ChevronRight fill={'white'} width={24} height={24} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
      {dropDownItems.map((item, index) => (
        <DropDownItem title={item} index={index} key={item} isOpen={isOpen} />
      ))}
    </View>
  );
};

const styleSheet = createStyleSheet({
  screen: {
    flex: 1,
    backgroundColor: 'black',
    gap: GAP,
    paddingTop: 100,
  },
  animatedContainer: {
    backgroundColor: 'hsl(0, 0%, 10%)',
    zIndex: 999,
    width: ITEM_WIDTH,
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: 'hsl(0, 0%, 10%)',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
});

export default SmoothDropDown;
