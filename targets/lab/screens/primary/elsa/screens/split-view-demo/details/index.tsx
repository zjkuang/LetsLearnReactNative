import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {ExampleSplitViewContext} from '../../../../../../context/example-split-view-context';
import {setDetailsNavigator} from '../../../../../../navigation/details-navigator';
import {withSystemBackFix} from '../../../../../../navigation/withSystemBackFix';
import {ProfileScreenParamList, ProfileScreen} from './profile';
import {AvatarScreenParamList, AvatarScreen} from './avatar';
import {SettingsScreenParamList, SettingsScreen} from './settings';

export type DetailsNavigationScreenName = 'Profile' | 'Avatar' | 'Settings';

export type DetailsNavigationParamList = {
  Profile: ProfileScreenParamList; // navigation root
  Avatar: AvatarScreenParamList;
  Settings: SettingsScreenParamList;
};
export type DetailsNavigationProp =
  StackNavigationProp<DetailsNavigationParamList>; // for useNavigation
export const DetailsStackComponent = () => {
  const {exampleSplitViewContextValue} = React.useContext(
    ExampleSplitViewContext,
  );
  const initialRouteName =
    exampleSplitViewContextValue.selectedItemInMain === 'Settings'
      ? 'Settings'
      : 'Profile';

  const DetailsStack = createStackNavigator<DetailsNavigationParamList>();

  return initialRouteName === 'Profile' ? (
    <NavigationContainer independent ref={setDetailsNavigator}>
      <DetailsStack.Navigator>
        <DetailsStack.Screen
          name="Profile"
          component={withSystemBackFix(ProfileScreen)}
          options={{headerLeft: _props => null}}
        />
        <DetailsStack.Screen
          name="Avatar"
          component={withSystemBackFix(AvatarScreen)}
        />
      </DetailsStack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer independent ref={setDetailsNavigator}>
      <DetailsStack.Navigator>
        <DetailsStack.Screen
          name="Settings"
          component={withSystemBackFix(SettingsScreen)}
          options={{headerLeft: _props => null}}
        />
      </DetailsStack.Navigator>
    </NavigationContainer>
  );
};
