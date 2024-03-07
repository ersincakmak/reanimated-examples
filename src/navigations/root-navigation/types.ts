import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { RootNavigationPaths } from './paths';
import { NavigatorID } from '../constants';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  [RootNavigationPaths.ScreenList]: undefined;
  [RootNavigationPaths.DynamicFlatList]: undefined;
  [RootNavigationPaths.StickyScroll]: undefined;
  [RootNavigationPaths.UberSwipeToDelete]: undefined;
  [RootNavigationPaths.CardAnimation]: undefined;
  [RootNavigationPaths.Toast]: undefined;
  [RootNavigationPaths.SmoothDropDown]: undefined;
};

export type RootNavigation<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T, NavigatorID.RootNavigation>;

export type RootRoute<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
