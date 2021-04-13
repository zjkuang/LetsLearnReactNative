import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import {SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopTabOneView} from './tab-one';
import {TopTabTwoView} from './tab-tow';
import {TopTabThreeView} from './tab-three';

const TopTab = createMaterialTopTabNavigator();

export const TopTabDemoView = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Top Tab',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  // To make the in-view overlay (TranslucentOverlay) work properly, besides the translucentOverlay style definition, it must be the last one of the immediate child components of the base view in JSX
  return (
    <SafeAreaView>
      {/* <TopTab.Navigator initialRouteName="One">
        <TopTab.Screen
          name="One"
          component={TopTabOneView}
          options={{tabBarLabel: 'One'}}
        />
        <TopTab.Screen
          name="Two"
          component={TopTabTwoView}
          options={{tabBarLabel: 'Two'}}
        />
        <TopTab.Screen
          name="Three"
          component={TopTabThreeView}
          options={{tabBarLabel: 'Three'}}
        />
      </TopTab.Navigator> */}
    </SafeAreaView>
  );
};
