import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CardAnimationHeader from '../../components/CardAnimationHeader';
import CardAnimation from '../../screens/root-stack/animations/card-animation';
import DynamicFlatList from '../../screens/root-stack/animations/dynamic-flat-list';
import SmoothDropDown from '../../screens/root-stack/animations/smooth-drop-down';
import StickyScroll from '../../screens/root-stack/animations/sticky-scroll';
import Toast from '../../screens/root-stack/animations/toast';
import UberSwipeToDelete from '../../screens/root-stack/animations/uber-swipe-to-delete';
import ScreenList from '../../screens/root-stack/screen-list/ScreenList';
import { RootNavigationPaths } from './paths';

const RootStack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <RootStack.Navigator initialRouteName={RootNavigationPaths.ScreenList}>
      <RootStack.Screen
        name={RootNavigationPaths.DynamicFlatList}
        component={DynamicFlatList}
      />
      <RootStack.Screen
        name={RootNavigationPaths.StickyScroll}
        component={StickyScroll}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: { color: 'white' },
        }}
      />
      <RootStack.Screen
        name={RootNavigationPaths.UberSwipeToDelete}
        component={UberSwipeToDelete}
      />
      <RootStack.Screen
        name={RootNavigationPaths.CardAnimation}
        component={CardAnimation}
        options={{
          header: CardAnimationHeader,
        }}
      />
      <RootStack.Screen name={RootNavigationPaths.Toast} component={Toast} />
      <RootStack.Screen
        name={RootNavigationPaths.SmoothDropDown}
        component={SmoothDropDown}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: { color: 'white' },
        }}
      />
      <RootStack.Group
        navigationKey="headerlessScreens"
        screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name={RootNavigationPaths.ScreenList}
          component={ScreenList}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigation;
