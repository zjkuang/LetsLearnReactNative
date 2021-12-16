import * as React from 'react';
import {View, Text} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {MainTabNavigator} from '../main';
import {styles} from './style';
import {FlatListItemSeparator} from '../../../../common/components/widgets';
import {IconClose} from '../../../../common/components/icons';
import {ListItem} from '../../../../common/components/types';
import {RootStackNavigationProp} from '../../root';

type DrawerListItemId = 'login' | 'profile' | 'logout' | 'about';
type DrawerListItem = ListItem<DrawerListItemId, undefined>;
const DrawerContent = (props: DrawerContentComponentProps) => {
  const rootNavigation = useNavigation<RootStackNavigationProp>();

  const drawerList = React.useMemo(() => {
    const list: DrawerListItem[] = [];
    list.push({
      index: 0,
      id: 'login',
      title: 'Log In',
    });
    list.push({
      index: 1,
      id: 'logout',
      title: 'Log Out',
    });
    list.push({
      index: 2,
      id: 'about',
      title: 'About',
    });
    return list;
  }, []);

  const onPress = React.useCallback(
    (item: DrawerListItem) => {
      if (item.id === 'login') {
        rootNavigation.navigate('SignIn');
      } else if (item.id === 'logout') {
        //
      } else if (item.id === 'about') {
        rootNavigation.navigate('Modal', {context: 'about'});
      }
    },
    [rootNavigation],
  );

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
          const drawerListItem = item as DrawerListItem;
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.dispatch(DrawerActions.closeDrawer());
                onPress(item);
              }}>
              <Text style={styles.flatListItem}>{drawerListItem.title}</Text>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={FlatListItemSeparator}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};

const Drawer = createDrawerNavigator();
export const DrawerScreen = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="MainTab" component={MainTabNavigator} />
    </Drawer.Navigator>
  );
};
