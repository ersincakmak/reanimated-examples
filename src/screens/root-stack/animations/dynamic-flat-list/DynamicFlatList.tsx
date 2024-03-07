import React, { useRef } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  View,
  ViewStyle,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Item from './components/Item';
import { items } from './data';

const DynamicFlatList = () => {
  const scrollY = useSharedValue(0);
  const containerRef = useRef<View>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = e.nativeEvent.contentOffset.y;
  };

  return (
    <SafeAreaView style={flex1}>
      <View style={flex1} ref={containerRef}>
        <FlatList
          style={flex1}
          contentContainerStyle={flatListContentStyle}
          data={items}
          onScroll={onScroll}
          keyExtractor={(_, index) => `${index}-dfl`}
          scrollEventThrottle={10}
          renderItem={({ item, index }) => (
            <Item {...{ item, index, scrollY, containerRef }} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const flatListContentStyle: ViewStyle = {
  paddingHorizontal: 10,
  gap: 10,
};

const flex1: ViewStyle = { flex: 1 };

export default DynamicFlatList;
