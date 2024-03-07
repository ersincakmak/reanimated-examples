import React from 'react';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {
  createStyleSheet,
  useStyles,
} from '../../../../../../unistyles/styles';
import CarouselItem from './components/CarouselItem';
import { data } from './data';
import { LayoutChangeEvent } from 'react-native';

type Props = {
  scrollY: SharedValue<number>;
  carouselHeight: SharedValue<number>;
};

const Carousel = ({ scrollY, carouselHeight }: Props) => {
  const { styles } = useStyles(styleSheet);

  const rotateX = useDerivedValue(() =>
    interpolate(
      Math.min(scrollY.value, carouselHeight.value),
      [0, carouselHeight.value - 36],
      [0, 90],
      Extrapolate.CLAMP,
    ),
  );

  const skewX = useDerivedValue(() =>
    interpolate(
      Math.min(scrollY.value, carouselHeight.value),
      [0, carouselHeight.value],
      [0, -8],
      Extrapolate.CLAMP,
    ),
  );

  const translateY = useDerivedValue(() =>
    interpolate(
      Math.min(scrollY.value, carouselHeight.value),
      [0, carouselHeight.value],
      [0, -carouselHeight.value / 2],
      Extrapolate.CLAMP,
    ),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotateX: `${rotateX.value}deg` },
      { skewX: `${skewX.value}deg` },
    ],
  }));

  const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    carouselHeight.value = nativeEvent.layout.height;
  };

  return (
    <Animated.View style={styles.carouselContainer} onLayout={onLayout}>
      <Animated.FlatList
        horizontal
        data={data}
        renderItem={({ item }) => <CarouselItem {...item} />}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        style={animatedStyle}
      />
    </Animated.View>
  );
};

const styleSheet = createStyleSheet({
  carouselContainer: {
    paddingBottom: 12,
    paddingTop: 24,
  },
  contentContainer: {
    gap: 12,
    paddingHorizontal: 12,
  },
});

export default Carousel;
