import * as React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {ProfileScreenParamList, ProfileScreen} from './profile';
import {AvatarScreenParamList, AvatarScreen} from './avatar';

export type DetailsNavigationScreenName = 'Profile' | 'Avatar';

export type DetailsNavigationParamList = {
  Profile: ProfileScreenParamList; // navigation root
  Avatar: AvatarScreenParamList;
};
const DetailsStack = createStackNavigator<DetailsNavigationParamList>();
export type DetailsNavigationProp =
  StackNavigationProp<DetailsNavigationParamList>; // for useNavigation
export const DetailsStackComponent = () => {
  const initialRouteName: DetailsNavigationScreenName = 'Profile';
  return (
    <DetailsStack.Navigator initialRouteName={initialRouteName}>
      <DetailsStack.Screen name="Profile" component={ProfileScreen} />
      <DetailsStack.Screen name="Avatar" component={AvatarScreen} />
    </DetailsStack.Navigator>
  );
};
