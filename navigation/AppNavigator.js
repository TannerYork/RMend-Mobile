import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import ReportInfoScreen from '../screens/HomeScreens/ReportInfoScreen';
import LoadingScreen from '../screens/LoadingScreen';
import MainHomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';

const MainAppNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  // Change to Auth when authentication is from profile screen
  SignIn: AuthNavigator,
  Home: MainHomeNavigator,
  ReportInfo: ReportInfoScreen,
});

export default createAppContainer(MainAppNavigator);
