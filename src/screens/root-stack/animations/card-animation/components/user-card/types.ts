export type AnimatedNode = {
  startX?: number;
  endX?: number;
  startY?: number;
  endY?: number;
  startWidth?: number;
  endWidth?: number;
  startHeight?: number;
  endHeight?: number;
};

export type AnimatedNodes = Record<string, AnimatedNode | undefined>;
