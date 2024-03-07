import React from 'react';
import { ScrollView } from 'react-native';
import { createStyleSheet, useStyles } from '../../../../unistyles/styles';
import { UserCard } from './components/user-card';

const CardAnimation = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <ScrollView
      style={styles.scrollView}
      bounces={false}
      contentContainerStyle={styles.scrollViewContentContainer}>
      <UserCard />
    </ScrollView>
  );
};

const stylesheet = createStyleSheet(() => ({
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    padding: 16,
    gap: 16,
  },
}));

export default CardAnimation;
