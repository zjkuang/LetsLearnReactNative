import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {HooksDemoListView, HooksDemoScreenName} from '../demo/hooks/table-of-contents/index';
import {DemoUseStateView} from '../demo/hooks/useState/index';

//
//  EEEEE  L       SSSS    A
//  E      L      S       A A
//  EEEE   L       SSS   A   A
//  E      L          S  AAAAA
//  EEEEE  LLLLL  SSSS   A   A
//

// ElsaStackParamList
export type ElsaStackScreenName =
  'Elsa' | // root
  'HooksDemoList' | // immediate children
  HooksDemoScreenName; // grand children

type ElsaStackParamList = { // ElsaStackScreenName
  Elsa: {}; // navigation root
  HooksDemoList: {};
  UseStateDemo: {}; // one of HooksDemoScreenName
  // more navigation children can be added here
};
const ElsaStack = createStackNavigator<ElsaStackParamList>();
export const ElsaNavigationView = () => {
  const navigation = useNavigation();

  return (
    <ElsaStack.Navigator>
      <ElsaStack.Screen name="Elsa" component={ElsaView} />

      <ElsaStack.Screen name="HooksDemoList" component={HooksDemoListView} />

      <ElsaStack.Screen name="UseStateDemo" component={DemoUseStateView} />
    </ElsaStack.Navigator>
  );
};

type ElsaListItem = {
  index: number;
  id: 'HooksDemo';
  navigationTargetName?: 'HooksDemoList'; // subset of ElsaStackScreenName
  title: string;
  subtitle?: string;
};

const elsaList: ElsaListItem[] = [
  {
    index: 0,
    id: 'HooksDemo',
    navigationTargetName: 'HooksDemoList',
    title: 'Hooks',
  },
];

const ElsaView = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Elsa',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.baseView}>
      <FlatList
        data={elsaList}
        renderItem={({item}) => {
          const itemStyle =
            item.index % 2 ? styles.flatListItem1 : styles.flatListItem0;
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.id === 'HooksDemo' && item.navigationTargetName != undefined) {
                  navigation.navigate(item.navigationTargetName);
                }
              }}>
              <Text style={itemStyle}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};
