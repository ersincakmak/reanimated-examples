import React from 'react';
import { LayoutChangeEvent, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from '../../../../../unistyles/styles';
import Carousel from './carousel/Carousel';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {
  scrollY: SharedValue<number>;
};

const HeaderComponent = ({ scrollY }: Props) => {
  const { styles } = useStyles(styleSheet);

  const carouselHeight = useSharedValue(0);
  const headerTextsHeight = useSharedValue(0);

  const progress = useDerivedValue(() =>
    interpolate(
      scrollY.value,
      [0, carouselHeight.value],
      [0, carouselHeight.value],
      Extrapolate.CLAMP,
    ),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value }],
  }));

  const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    headerTextsHeight.value = nativeEvent.layout.height;
  };

  return (
    <Animated.View style={animatedStyle}>
      <View style={styles.balanceContainer} onLayout={onLayout}>
        <Text style={styles.balance}>$2063</Text>
        <Text style={styles.totalBalance}>Total Balance</Text>
      </View>
      <Carousel scrollY={scrollY} carouselHeight={carouselHeight} />
    </Animated.View>
  );
};
const styleSheet = createStyleSheet({
  balance: {
    color: 'white',
    fontSize: 40,
  },
  totalBalance: {
    color: '#ababab',
  },
  balanceContainer: {
    paddingLeft: 16,
  },
});

export default HeaderComponent;
