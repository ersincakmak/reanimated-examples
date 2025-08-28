import React from 'react';
import { SafeAreaView, SectionList } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from '../../../../unistyles/styles';
import HeaderComponent from './components/HeaderComponent';
import ListItem from './components/ListItem';
import SectionHeader from './components/SectionHeader';
import { DATA } from './data';

const AnimatedSectionList = Animated.createAnimatedComponent(
  SectionList,
) as new <TItem, TSection>() => SectionList<TItem, TSection>;

const StickyScroll = () => {
  const { styles } = useStyles(styleSheet);

  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedSectionList
        sections={DATA}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        ListHeaderComponent={<HeaderComponent scrollY={scrollY} />}
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
