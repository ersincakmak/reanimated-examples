import { View, Text } from 'react-native';
import React from 'react';
import { LisItemType } from '../types';
import { createStyleSheet, useStyles } from '../../../../../unistyles/styles';

const ListItem = ({ title, icon, category, price }: LisItemType) => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.textsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

const styleSheet = createStyleSheet({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#1e181c',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  textsContainer: {
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  category: {
    color: '#ababab',
  },
  price: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 'auto',
  },
});

export default ListItem;
