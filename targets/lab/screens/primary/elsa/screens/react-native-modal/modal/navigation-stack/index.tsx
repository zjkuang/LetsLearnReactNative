import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {MainScreen} from './main';
import {DetailsScreen, DetailsScreenParamList} from './details';

export type InModalNavigationParamList = {
  Main: {} | undefined; // navigation root
  Details: DetailsScreenParamList | undefined;
  // more navigation children can be added here
};
export type InModalNavitationProp =
  StackNavigationProp<InModalNavigationParamList>;
const InModalStack = createStackNavigator<InModalNavigationParamList>();
export const InModalNavigator = () => {
  return (
    <InModalStack.Navigator>
      <InModalStack.Screen
        name="Main"
        children={() => [<MainScreen key={0} test={'Initial props'} />]}
      />
      <InModalStack.Screen name="Details" component={DetailsScreen} />
    </InModalStack.Navigator>
  );
};
