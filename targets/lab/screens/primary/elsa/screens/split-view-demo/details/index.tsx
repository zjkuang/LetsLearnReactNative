import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {setDetailsNavigator} from '../../../../../../navigation/details-navigator';
import {withSystemBackFix} from '../../../../../../navigation/withSystemBackFix';
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
    <NavigationContainer independent ref={setDetailsNavigator}>
      <DetailsStack.Navigator initialRouteName={initialRouteName}>
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
  );
};
