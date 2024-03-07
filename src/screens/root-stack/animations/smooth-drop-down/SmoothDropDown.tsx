import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownItem from './DropDownItem';

import ChevronRight from '../../assets/chevron-right.svg';
import {
  dropDownItems,
  GAP,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  SPACING,
  SPRING_DAMPING,
} from './constants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const SmoothDropDown = () => {
  const isOpen = useSharedValue(false);
  const toggle = () => (isOpen.value = !isOpen.value);

  const animatedChevronContainerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(isOpen.value ? '90deg' : '0deg') }],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    paddingVertical: withSpring(
      isOpen.value ? 0 : SPACING * dropDownItems.length,
      { damping: SPRING_DAMPING },
    ),
  }));

  return (
    <Animated.View style={[styles.dropDownContainer, animatedContainerStyle]}>
      <View style={[styles.toggleContainer]}>
        <TouchableOpacity
          style={styles.toggleTouchable}
          activeOpacity={0.7}
          onPress={toggle}>
          <Text style={styles.text}>Header</Text>
          <Animated.View style={animatedChevronContainerStyle}>
            <ChevronRight fill={'white'} width={24} height={24} />
          </Animated.View>
        </TouchableOpacity>
      </View>
      {dropDownItems.map((item, index) => (
        <DropDownItem title={item} key={item} index={index} isOpen={isOpen} />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    backgroundColor: 'black',
    gap: GAP,
  },
  toggleContainer: {
    backgroundColor: 'hsl(0, 0%, 10%)',
    zIndex: 999,
    width: ITEM_WIDTH,
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleTouchable: {
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
