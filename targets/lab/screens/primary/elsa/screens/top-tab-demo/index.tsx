import React from 'react';
import {styles} from './style';
import {SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TopTabOneScreen} from './tab-one';
import {TopTabTwoScreen} from './tab-tow';
import {TopTabThreeScreen} from './tab-three';

const TopTab = createMaterialTopTabNavigator();

export const TopTabDemoScreen = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Top Tab',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  // Make style={{flex: 1}} for SafeAreaView otherwise the TopTabView will not show
  //   <SafeAreaView style={{flex: 1}}><TopTab.Navigator>...</TopTab.Navigator></SafeAreaView>
  return (
    <SafeAreaView style={styles.flexContainer}>
      <TopTab.Navigator initialRouteName="One">
        <TopTab.Screen
          name="One"
          component={TopTabOneScreen}
          options={{tabBarLabel: 'One'}}
        />
        <TopTab.Screen
          name="Two"
          component={TopTabTwoScreen}
          options={{tabBarLabel: 'Two'}}
        />
        <TopTab.Screen
          name="Three"
          component={TopTabThreeScreen}
          options={{tabBarLabel: 'Three'}}
        />
      </TopTab.Navigator>
    </SafeAreaView>
  );
};
