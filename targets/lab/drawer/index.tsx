import * as React from 'react';
import {View, Text} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {MainTabView} from '../main/index';
import {styles} from './style';
import {DrawerActions} from '@react-navigation/routers';

type DrawerListItem = {
  index: number;
  id: string;
  navigationTargetName?: string; // subset of ElsaStackScreenName
  title: string;
  subtitle?: string;
};
const drawerList: DrawerListItem[] = [
  {
    index: 0,
    id: 'feedback',
    title: 'Feedback',
  },
  {
    index: 1,
    id: 'about',
    title: 'About',
  },
  {
    index: 2,
    id: 'closeDrawer',
    title: 'Close Drawer',
  },
];
const DrawerContentList = (props: DrawerContentComponentProps) => {
  return (
    <View style={styles.baseView}>
      <FlatList
        data={drawerList}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log(`${item.navigationTargetName} tapped.`);
                if (item.id === 'closeDrawer') {
                  props.navigation.dispatch(DrawerActions.closeDrawer);
                }
              }}>
              <Text style={styles.flatListItem0}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

const Drawer = createDrawerNavigator();
export const DrawerView = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContentList {...props} />}>
      <Drawer.Screen name="MainTab" component={MainTabView} />
    </Drawer.Navigator>
  );
};
