import React, { useRef, useState } from 'react';
import {
  MeasureLayoutOnSuccessCallback,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  Layout,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BackgroundImage from '../../../../../../assets/DebitCard.png';
import BJKLogoSvg from '../../../../../../assets/bjk-logo.svg';
import ChevronRightSvg from '../../../../../../assets/chevron-right.svg';
import { ChildrenElement } from '../children-element';
import { ChildrenImage, SharedChildrenImage } from '../children-image';
import { CHILDREN_DATA } from './constants';
import { AnimatedNodes } from './types';
import {
  createStyleSheet,
  useStyles,
} from '../../../../../../unistyles/styles';

const UserCard = () => {
  const { styles } = useStyles(styleSheet);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);
  const [nodes, setNodes] = useState<AnimatedNodes>({});

  const containerRef = useRef<Animated.View>(null);
  const stackRef = useRef<View>(null);

  const stackCenterX = useSharedValue(0);
  const stackCenterY = useSharedValue(0);

  const calculateStackCenter = () => {
    if (stackRef.current && containerRef.current) {
      stackRef.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          stackCenterX.value = x + width / 2;
          stackCenterY.value = y + height / 2;
        },
      );
    }
  };

  const toggleExpand = () => {
    if (!isAnimationRunning) {
      setIsExpanded(ex => !ex);
    }

    setIsAnimationRunning(true);
  };

  const animatedArrowStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(
          isExpanded ? '-90deg' : '0deg',
          { easing: Easing.linear },
          isFinished => {
            if (isFinished) {
              runOnJS(setIsAnimationRunning)(false);
            }
          },
        ),
      },
    ],
  }));

  const onStartElementMeasure = (
    params: Parameters<MeasureLayoutOnSuccessCallback>,
    label: string,
  ) => {
    setNodes(ex => ({
      ...ex,
      [label]: {
        ...ex[label],
        startX: params[0],
        startY: params[1],
        startWidth: params[2],
        startHeight: params[3],
      },
    }));
  };

  const onEndElementMeasure = (
    params: Parameters<MeasureLayoutOnSuccessCallback>,
    label: string,
  ) => {
    const element = nodes[label] ?? {};

    const newElement = {
      ...element,
      endX: params[0],
      endY: params[1],
      endWidth: params[2],
      endHeight: params[3],
    };

    if (JSON.stringify(element) !== JSON.stringify(newElement)) {
      setNodes(ex => ({
        ...ex,
        [label]: {
          ...ex[label],
          endX: params[0],
          endY: params[1],
          endWidth: params[2],
          endHeight: params[3],
        },
      }));
    }
  };

  return (
    <Animated.View ref={containerRef} layout={Layout} style={styles.card}>
      <Animated.View
        layout={Layout}
        style={[StyleSheet.absoluteFill, styles.backgroundImageContainer]}>
        <Animated.Image
          layout={Layout}
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.fullSize}
        />
      </Animated.View>
      <View style={styles.cardHeader}>
        <BJKLogoSvg width={38} height={63} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Premium Aile</Text>
        </View>
      </View>
      <View style={styles.cardBottom}>
        <View style={styles.bottomTextsContainer}>
          <Text style={styles.userNameText}>Can Yılmaz</Text>
          <Text style={styles.subscriptionDateText}>Üyelik: 2023</Text>
        </View>

        <View style={styles.cardBottomRight}>
          <View
            ref={stackRef}
            onLayout={calculateStackCenter}
            style={styles.childrenStack}>
            {CHILDREN_DATA.slice(0, 3).map(item => (
              <ChildrenImage
                item={item}
                key={item.label}
                containerRef={containerRef}
                onMeasure={(...params) =>
                  onStartElementMeasure(params, item.label)
                }
              />
            ))}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleExpand}
            hitSlop={12}>
            <Animated.View style={animatedArrowStyle}>
              <ChevronRightSvg fill={'white'} />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View layout={Layout}>
        {isExpanded && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.expandedChildrenContainer}>
            {CHILDREN_DATA.map(item => (
              <ChildrenElement
                key={item.label}
                item={item}
                childrenImageContainerProps={{ style: { opacity: 0 } }}
                imageProps={{ style: styles.expandedChildrenImage }}
                containerRef={containerRef}
                onMeasure={(...params) =>
                  onEndElementMeasure(params, item.label)
                }
              />
            ))}
          </Animated.View>
        )}
      </Animated.View>
      {CHILDREN_DATA.map((item, index) => (
        <SharedChildrenImage
          index={index}
          key={`asd-${item.label}`}
          animatedNodes={nodes}
          isExpanded={isExpanded}
          item={item}
          stackCenterX={stackCenterX}
          stackCenterY={stackCenterY}
        />
      ))}
    </Animated.View>
  );
};

const styleSheet = createStyleSheet({
  card: {
    backgroundColor: 'black',
    padding: 24,
    borderRadius: 4,
    overflow: 'hidden',
  },
  backgroundImageContainer: { borderRadius: 4, overflow: 'hidden' },
  fullSize: { width: '100%', height: '100%' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'flex-start',
    borderRadius: 4,
  },
  badgeText: {
    color: 'white',
    fontWeight: '500',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  bottomTextsContainer: {
    gap: 4,
  },
  userNameText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  subscriptionDateText: { fontSize: 14, color: 'rgb(142,142,142)' },
  cardBottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    flex: 1,
  },
  childrenStack: {
    flexDirection: 'row',
    gap: -16,
    alignSelf: 'stretch',
    opacity: 0,
  },
  expandedChildrenContainer: {
    flexDirection: 'row',
    gap: 30,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  expandedChildrenImage: { width: 60, height: 60 },
});

export default UserCard;
