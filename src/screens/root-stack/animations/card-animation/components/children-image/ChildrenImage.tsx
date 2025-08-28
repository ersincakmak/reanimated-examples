import React, { useRef } from 'react';
import { Image, LayoutChangeEvent, View, ViewProps } from 'react-native';
import {
  createStyleSheet,
  useStyles,
} from '../../../../../../unistyles/styles';
import { ChildrenImageProps } from './types';

const ChildrenImage = ({
  item,
  containerRef,
  onMeasure,
  imageProps,
  ...props
}: ChildrenImageProps & ViewProps) => {
  const { styles } = useStyles(styleSheet);

  const wrapperRef = useRef<View>(null);

  const onLayout = (event: LayoutChangeEvent) => {
    props.onLayout?.(event);
    if (containerRef?.current && wrapperRef.current && onMeasure) {
      wrapperRef.current?.measureLayout(containerRef.current, onMeasure);
    }
  };

  return (
    <View
      {...props}
      style={[styles.childrenWrapper, props.style]}
      ref={wrapperRef}
      onLayout={onLayout}>
      <Image {...imageProps} source={item.source} />
    </View>
  );
};
const styleSheet = createStyleSheet({
  childrenWrapper: {
    borderRadius: 999999,
    borderWidth: 1,
    borderColor: '#EAECF0',
    alignSelf: 'center',
    marginLeft: -12,
  },
});

export default ChildrenImage;
