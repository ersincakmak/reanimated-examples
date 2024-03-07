import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import {
  createStyleSheet,
  useStyles,
} from '../../../../../../unistyles/styles';
import { ChildrenImage } from '../children-image';
import { ChildrenElementProps } from './types';

const ChildrenElement = ({
  childrenImageContainerProps,
  ...props
}: ChildrenElementProps) => {
  const { styles } = useStyles(styleSheet);
  const item = props.item;

  return (
    <TouchableOpacity style={styles.touchable} key={item.label}>
      <ChildrenImage {...childrenImageContainerProps} {...props} />
      <Animated.Text
        entering={FadeInUp}
        exiting={FadeOutUp}
        style={styles.text}>
        {item.label}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const styleSheet = createStyleSheet({
  touchable: {
    gap: 10,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});

export default ChildrenElement;
