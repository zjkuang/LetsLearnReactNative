import * as React from 'react';
import {View, Text} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {MainTabView} from '../main/index';
import {styles} from './style';
import {FlatListItemSeparator} from '../../../common/components/widgets';
import {IconClose} from '../../../common/components/icons';
import {ListItem} from '../../../common/components/types';
import {RootStackNavigationProp} from '../root/index';

const drawerList: ListItem<string, undefined>[] = [
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
];
const DrawerContent = (props: DrawerContentComponentProps) => {
  const rootNavigation = useNavigation<RootStackNavigationProp>();
  return (
    <View style={styles.baseView}>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            props.navigation.dispatch(DrawerActions.closeDrawer);
          }}>
          <IconClose />
        </TouchableOpacity>
      </View>

      <FlatList
        data={drawerList}
        ListHeaderComponent={FlatListItemSeparator}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.id === 'about') {
                  props.navigation.dispatch(DrawerActions.closeDrawer());
                  rootNavigation.navigate('Modal', {context: 'about'});
                }
              }}>
              <Text style={styles.flatListItem}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={FlatListItemSeparator}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

const Drawer = createDrawerNavigator();
export const DrawerView = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="MainTab" component={MainTabView} />
    </Drawer.Navigator>
  );
};
