import { Text, View } from 'react-native';
import React from 'react';
import { CarouselItemType } from '../types';
import {
  createStyleSheet,
  useStyles,
} from '../../../../../../../unistyles/styles';

const CarouselItem = ({
  category,
  icon,
  price,
  isActive,
}: CarouselItemType) => {
  const { styles } = useStyles(styleSheet);
  return (
    <View style={styles.container(isActive)}>
      <Text style={styles.icon}>{icon}</Text>
      <View>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
    </View>
  );
};

const styleSheet = createStyleSheet({
  container: (isActive: boolean) => ({
    backgroundColor: isActive ? '#282528' : '#141115',
    padding: 16,
    paddingRight: isActive ? 64 : 24,
    borderRadius: 12,
  }),
  icon: {
    fontSize: 24,
    marginBottom: 32,
  },
  price: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
  },
  category: {
    color: '#ababab',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CarouselItem;
