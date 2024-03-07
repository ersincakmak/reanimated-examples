import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from '../../../../../unistyles/styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ActionProps = {
  translateX: SharedValue<number>;
  itemLayout: SharedValue<{ width: number; height: number }>;
  deleteWidth: number;
  onRemove: () => void;
};

const Action = ({
  translateX,
  itemLayout,
  deleteWidth,
  onRemove,
}: ActionProps) => {
  const { styles } = useStyles(styleSheet);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    width: -translateX.value,
    height: itemLayout.value.height,
  }));

  const animatedCircleStyle = useAnimatedStyle(() => ({
    width: interpolate(
      -translateX.value,
      [16, deleteWidth * 0.75, deleteWidth],
      [0, itemLayout.value.height, deleteWidth],
    ),
    borderRadius: interpolate(
      -translateX.value,
      [deleteWidth * 0.9, deleteWidth],
      [itemLayout.value.height, 0],
    ),
  }));

  const animatedMinusStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      -translateX.value,
      [16, deleteWidth * 0.45, deleteWidth * 0.75, deleteWidth],
      [0, 1, 1, 0],
    ),
  }));

  const animatedTextContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      -translateX.value,
      [deleteWidth * 0.75, deleteWidth],
      [0, 1],
    ),
  }));

  return (
    <Animated.View style={[animatedContainerStyle, styles.container]}>
      <Animated.View style={[animatedCircleStyle, styles.circle]} />
      <Animated.View style={[animatedMinusStyle, styles.minus]} />
      <AnimatedPressable
        style={[animatedTextContainerStyle, styles.textContainer]}
        onPress={onRemove}>
        <Text style={styles.text}>REMOVE ITEM</Text>
      </AnimatedPressable>
    </Animated.View>
  );
};

const styleSheet = createStyleSheet({
  container: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circle: {
    backgroundColor: '#D93F12',
    position: 'absolute',
    aspectRatio: 1,
  },
  minus: {
    width: 10,
    height: 2,
    backgroundColor: 'white',
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Action;
