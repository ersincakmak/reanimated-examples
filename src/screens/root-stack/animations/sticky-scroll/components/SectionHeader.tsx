import React from 'react';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from '../../../../../unistyles/styles';
import { SectionItem } from '../types';

const SectionHeader = ({ title }: SectionItem) => {
  const { styles } = useStyles(styleSheet);
  return <Text style={styles.sectionTitle}>{title}</Text>;
};
const styleSheet = createStyleSheet({
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});

export default SectionHeader;
