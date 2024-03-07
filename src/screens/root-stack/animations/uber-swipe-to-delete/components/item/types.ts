import { ItemModel } from '../ItemLayout';

type OnRemoveCB = (
  removeAnimation: (onAnimationComplete: () => void) => void,
) => void;

export type ItemProps = {
  item: ItemModel;
  deleteWidth?: number;
  swipeThreshold?: number;
  onRemove: OnRemoveCB;
};
