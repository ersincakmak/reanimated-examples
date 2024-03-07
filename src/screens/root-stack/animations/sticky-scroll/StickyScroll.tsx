import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  SectionList,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from '../../../../unistyles/styles';
import HeaderComponent from './components/HeaderComponent';
import ListItem from './components/ListItem';
import SectionHeader from './components/SectionHeader';
import { DATA } from './data';

const StickyScroll = () => {
  const { styles } = useStyles(styleSheet);

  const scrollY = useSharedValue(0);

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = nativeEvent.contentOffset.y;
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListHeaderComponent={() => <HeaderComponent scrollY={scrollY} />}
        renderItem={({ item }) => <ListItem {...item} />}
        renderSectionHeader={({ section }) => <SectionHeader {...section} />}
        scrollEventThrottle={12}
      />
    </SafeAreaView>
  );
};

const styleSheet = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});

export default StickyScroll;
