import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UnistylesTheme } from 'react-native-unistyles';
import { theme } from './src/unistyles/theme';
import { RootNavigation } from './src/navigations/root-navigation';

const App = () => {
  return (
    <GestureHandlerRootView style={containerStyle}>
      <BottomSheetModalProvider>
        <UnistylesTheme theme={theme}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </UnistylesTheme>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const containerStyle: ViewStyle = {
  flex: 1,
};

export default App;
