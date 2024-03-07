import React, { useEffect } from 'react';
import { Dimensions, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  AnimationCallback,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from '../../../../unistyles/styles';
import { ToastItemType } from './types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HORIZONTAL_SPACING = 16;
const SPACING = 8;
const ITEM_HEIGHT = 64;
const DELETE_THRESHOLD = SCREEN_WIDTH * 0.3;

type Props = {
  item: ToastItemType;
  index: number;
  length: number;
  onDelete: () => void;
};

const ToastItemWrapper = (props: Props) => {
  if (props.length - props.index - 1 > 10) {
    return null;
  }
  return <ToastItem {...props} />;
};

const ToastItem = ({ item, index, length, onDelete }: Props) => {
  const { styles } = useStyles(styleSheet);
  const { bottom } = useSafeAreaInsets();

  const position = length - index - 1;

  const bottomOffset = useSharedValue(-ITEM_HEIGHT);

  useEffect(() => {
    bottomOffset.value = withSpring(bottom + 24, { damping: 13 });
  }, [bottom, bottomOffset]);

  // Pan Gesture ------->

  const startX = useSharedValue(0);
  const translateX = useSharedValue(0);

  const deleteAnimationCallBack: AnimationCallback = isFinished => {
    'worklet';
    if (isFinished) {
      runOnJS(onDelete)();
    }
  };

  const PanGesture = Gesture.Pan()
    .enabled(position === 0)
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate(({ translationX }) => {
      translateX.value = translationX;
    })
    .onEnd(() => {
      const isSwipingRight = translateX.value > startX.value;
      const isSwipingLeft = translateX.value < startX.value;

      if (isSwipingRight && translateX.value >= DELETE_THRESHOLD) {
        translateX.value = withTiming(
          SCREEN_WIDTH - HORIZONTAL_SPACING,
          undefined,
          deleteAnimationCallBack,
        );
      } else if (isSwipingLeft && translateX.value <= -DELETE_THRESHOLD) {
        translateX.value = withTiming(
          -SCREEN_WIDTH + HORIZONTAL_SPACING,
          undefined,
          deleteAnimationCallBack,
        );
      } else {
        translateX.value = withTiming(0);
      }
    });

  // <------- Pan Gesture

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(Math.min(position, 3) * -SPACING * 2, {
          easing: Easing.linear,
        }),
      },
      {
        translateX: position === 0 ? translateX.value : 0,
      },
    ],
    left: withTiming(Math.min(position, 3) * SPACING + HORIZONTAL_SPACING),
    right: withTiming(Math.min(position, 3) * SPACING + HORIZONTAL_SPACING),
    opacity: withTiming(position < 4 ? 1 : 0),
    bottom: bottomOffset.value,
  }));

  return (
    <GestureDetector gesture={PanGesture}>
      <Animated.View style={[styles.toast, animatedStyle]}>
        <Text style={styles.title}>{item.title}</Text>
        {item.subTitle && <Text style={styles.subTitle}>{item.subTitle}</Text>}
      </Animated.View>
    </GestureDetector>
  );
};

const styleSheet = createStyleSheet({
  toast: {
    position: 'absolute',
    paddingHorizontal: 24,
    gap: 2,
    height: ITEM_HEIGHT,
    backgroundColor: 'white',
    left: HORIZONTAL_SPACING,
    right: HORIZONTAL_SPACING,
    justifyContent: 'center',
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgb(60, 60, 60)',
  },
});

export default ToastItemWrapper;
