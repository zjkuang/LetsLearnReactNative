import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AnnaNavigationView} from '../components/primary/anna';
import {KristoffNavigationView} from '../components/primary/kristoff';
import {SvenNavigationView} from '../components/primary/sven';
import {OlafNavigationView} from '../components/primary/olaf';
import {ElsaNavigationView} from '../components/primary/elsa';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type MainTabParamList = {
  Anna: {};
  Kristoff: {};
  Sven: {};
  Olaf: {};
  Elsa: {};
};
const BottomTab = createBottomTabNavigator<MainTabParamList>();
export const MainTabView = () => {
  //
  // If we need to pass props to a screen component, instead of
  //   <SomeNavigator.Screen name='...' component={SomeView} />
  // we can
  //   <SomeNavigator.Screen name='...' children={() => [<SomeView key={...} propname={...}>]} />
  //
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          const dynamicSize = focused ? 20 : 16;
          if (route.name === 'Anna') {
            const iconName = 'filter-1';
            return (
              <MaterialIcons name={iconName} color={color} size={dynamicSize} />
            );
          } else if (route.name === 'Kristoff') {
            const iconName = 'filter-2';
            return (
              <MaterialIcons name={iconName} color={color} size={dynamicSize} />
            );
          } else if (route.name === 'Sven') {
            const iconName = 'filter-3';
            return (
              <MaterialIcons name={iconName} color={color} size={dynamicSize} />
            );
          } else if (route.name === 'Olaf') {
            const iconName = 'filter-4';
            return (
              <MaterialIcons name={iconName} color={color} size={dynamicSize} />
            );
          } else if (route.name === 'Elsa') {
            if (focused) {
              return (
                <Fontisto
                  name={'snowflake-8'}
                  color={color}
                  size={dynamicSize}
                />
              );
            } else {
              return <Feather name={'box'} color={color} size={dynamicSize} />;
            }
          }
        },
      })}>
      <BottomTab.Screen name="Anna" component={AnnaNavigationView} />
      <BottomTab.Screen name="Kristoff" component={KristoffNavigationView} />
      <BottomTab.Screen name="Sven" component={SvenNavigationView} />
      <BottomTab.Screen name="Olaf" component={OlafNavigationView} />
      <BottomTab.Screen name="Elsa" component={ElsaNavigationView} />
    </BottomTab.Navigator>
  );
};
