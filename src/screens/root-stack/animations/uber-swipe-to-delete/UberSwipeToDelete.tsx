import React, { useState } from 'react';
import { FlatList } from 'react-native';
import Item from './components/item';
import { data } from './data';

const UberSwipeToDelete = () => {
  const [items, setItems] = useState(data);

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <Item
          item={item}
          onRemove={removeAnimation => {
            removeAnimation(() => {
              setItems(ex => ex.filter(i => i.key !== item.key));
            });
          }}
        />
      )}
    />
  );
};

export default UberSwipeToDelete;
