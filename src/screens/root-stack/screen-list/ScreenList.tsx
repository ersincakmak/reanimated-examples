import React, { useRef } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from '../../../unistyles/styles';
import ScreenListItem from './ScreenListItem';
import { ScreenListData } from './constants';

const ScreenList = () => {
  const { styles } = useStyles(styleSheet);
  const { top, bottom } = useSafeAreaInsets();

  const containerRef = useRef<View>(null);

  const scrollY = useSharedValue(0);

  const onScroll = ({
    nativeEvent: { contentOffset },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = withTiming(contentOffset.y, {
      easing: Easing.inOut(Easing.ease),
      duration: 175,
    });
  };

  return (
    <View style={styles.container} ref={containerRef}>
      <FlatList
        data={ScreenListData}
        keyExtractor={(_, index) => `screen-list-${index}`}
        renderItem={({ item }) => (
          <ScreenListItem {...{ scrollY, item, containerRef }} />
        )}
        onScroll={onScroll}
        contentContainerStyle={[
          styles.flatListContentContainer,
          {
            paddingTop: top + 12,
            paddingBottom: bottom + 12,
          },
        ]}
        scrollEventThrottle={10}
      />
    </View>
  );
};

const styleSheet = createStyleSheet({
  container: {
    flex: 1,
  },
  flatListContentContainer: {
    gap: 16,
    padding: 12,
  },
});

export default ScreenList;
