import { useNavigation } from '@react-navigation/native';
import React, { RefObject, useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowRightSVG from '../../../assets/chevron-right.svg';
import { RootNavigationPaths } from '../../../navigations/root-navigation/paths';
import { RootNavigation } from '../../../navigations/root-navigation/types';
import { createStyleSheet, useStyles } from '../../../unistyles/styles';
import { ScreenListDataType } from './types';

const { height: screenHeight } = Dimensions.get('window');

type Props = {
  item: ScreenListDataType;
  scrollY: SharedValue<number>;
  containerRef: RefObject<View>;
};

const ScreenListItem = ({ item, containerRef, scrollY }: Props) => {
  const { navigate } =
    useNavigation<RootNavigation<RootNavigationPaths.ScreenList>>();

  const { styles } = useStyles(styleSheet);

  const { top } = useSafeAreaInsets();

  const topGap = top + 12;

  const itemRef = useRef<Animated.View>(null);

  const yPosition = useSharedValue(0);
  const itemHeight = useSharedValue(0);

  const onLayout = () => {
    if (itemRef.current && containerRef.current) {
      itemRef.current.measureLayout(
        containerRef.current,
        (_leftOffset, topOffset, _width, height) => {
          yPosition.value = topOffset;
          itemHeight.value = height;
        },
      );
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollY.value + screenHeight + topGap,
          [
            yPosition.value - itemHeight.value * 8,
            yPosition.value - itemHeight.value * 4,
            yPosition.value - itemHeight.value,
          ],
          [0, 0.5, 1],
          Extrapolate.CLAMP,
        ),
      },
      {
        scale: interpolate(
          scrollY.value - topGap,
          [
            yPosition.value + itemHeight.value,
            yPosition.value + itemHeight.value * 4,
            yPosition.value + itemHeight.value * 8,
          ],
          [1, 0.5, 0],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  return (
    <Animated.View ref={itemRef} onLayout={onLayout} style={animatedStyle}>
      <TouchableOpacity onPress={() => navigate(item.path)} activeOpacity={0.5}>
        <View style={styles.button}>
          <Text style={styles.text}>{item.title}</Text>
          <ArrowRightSVG fill="#1f1f1f" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styleSheet = createStyleSheet(theme => ({
  button: {
    backgroundColor: theme.colors.background,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e2e3e4',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
}));

export default ScreenListItem;
