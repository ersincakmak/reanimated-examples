import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from '../unistyles/styles';

export const UniStylesTrial = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Button title="Toggle" />
      <Text>Unistyles example</Text>
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
}));
