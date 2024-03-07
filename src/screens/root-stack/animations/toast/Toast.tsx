import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from '../../../../unistyles/styles';
import { toastItems } from './constants';
import ToastItem from './ToastItem';
import { ToastItemType } from './types';

const Toast = () => {
  const { styles } = useStyles(styleSheet);

  const [toasts, setToasts] = useState<ToastItemType[]>([]);

  const addToast = () => {
    setToasts(ex => [
      ...ex,
      { ...toastItems[ex.length % toastItems.length], id: Date.now() },
    ]);
  };

  const deleteToast = (id: number) => {
    setToasts(ex => ex.filter(item => item.id !== id));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.button}>
        <Button title="Toast" onPress={addToast} />
        <Text style={styles.text}>{toasts.length}</Text>
      </View>

      <View style={styles.toastContainer} pointerEvents="box-none">
        {toasts.map((item, index) => (
          <ToastItem
            key={item.id}
            item={item}
            index={index}
            length={toasts.length}
            onDelete={() => deleteToast(item.id)}
          />
        ))}
      </View>
    </View>
  );
};

const styleSheet = createStyleSheet({
  screen: {
    flex: 1,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  text: {
    textAlign: 'center',
  },
  toastContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
});

export default Toast;
