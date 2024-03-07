import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from '../../../../../unistyles/styles';

const currency = new Intl.NumberFormat('usd', {
  style: 'currency',
  currency: 'USD',
});

export interface ItemModel {
  key: string;
  title: string;
  price: number;
  quantity: number;
}

interface ItemLayoutProps {
  item: ItemModel;
}

const ItemLayout = ({ item: { price, quantity, title } }: ItemLayoutProps) => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={styles.content}>
      <View style={styles.info}>
        <View style={styles.quantity}>
          <Text>{quantity}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.price}>{currency.format(price)}</Text>
    </View>
  );
};

const styleSheet = createStyleSheet({
  content: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e2e3e4',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    backgroundColor: '#e2e3e4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    fontSize: 16,
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default ItemLayout;
