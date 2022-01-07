import * as React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {MainScreenParamList, MainScreen} from './main';
import {SettingsScreenParamList, SettingsScreen} from './settings';

export type MasterNavigationScreenName = 'Main' | 'Settings';

export type MasterNavigationParamList = {
  Main: MainScreenParamList; // navigation root
  Setting: SettingsScreenParamList;
};
const MasterStack = createStackNavigator<MasterNavigationParamList>();
export type MasterNavigationProp =
  StackNavigationProp<MasterNavigationParamList>; // for useNavigation
export const MasterStackComponent = () => {
  const initialRouteName: MasterNavigationScreenName = 'Main';
  return (
    <MasterStack.Navigator initialRouteName={initialRouteName}>
      <MasterStack.Screen name="Main" component={MainScreen} />
      <MasterStack.Screen name="Setting" component={SettingsScreen} />
    </MasterStack.Navigator>
  );
};
