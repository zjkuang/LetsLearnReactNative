import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {
  HooksDemoListView,
  HooksDemoScreenName,
  HookDemoScreenParamList,
} from '../demo/hooks/table-of-contents/index';
import {DemoUseStateView} from '../demo/hooks/useState/index';
import {DemoUseEffectView} from '../demo/hooks/useEffect/index';
import {DemoUseContextView} from '../demo/hooks/useContext/index';
import {DemoUseLayoutEffectView} from '../demo/hooks/useLayoutEffect/index';
import {DemoUseMemoView} from '../demo/hooks/useMemo/index';
import {
  LayoutDemoListView,
  LayoutDemoScreenName,
  LayoutDemoScreenParamList,
} from '../demo/layout/table-of-contents/index';
import {DemoAutoLayoutView} from '../demo/layout/auto-layout';

//
//  EEEEE  L       SSSS    A
//  E      L      S       A A
//  EEEE   L       SSS   A   A
//  E      L          S  AAAAA
//  EEEEE  LLLLL  SSSS   A   A
//

// ElsaStackParamList
export type ElsaStackScreenName =
  | 'Elsa' // root
  | 'HooksDemoList' // immediate child
  | HooksDemoScreenName // grand child
  | 'LayoutDemoList' // immediate child
  | LayoutDemoScreenName; // grand child
// Before all screens listed by HooksDemoScreenName are provided, use the shortened version ElsaStackNavigationScreenName for a while
export type ElsaStackNavigationScreenName =
  | 'Elsa'
  | 'HooksDemoList' // table-of-contents
  | 'UseStateDemo'
  | 'UseEffectDemo'
  | 'UseContextDemo'
  | 'UseLayoutEffectDemo'
  | 'UseMemoDemo'
  | 'LayoutDemoList' // table-of-contents
  | 'AutoLayoutDemo';

export type ElsaStackParamList = {
  // ElsaStackScreenName
  Elsa: {}; // navigation root
  // Hooks demo
  HooksDemoList: {};
  UseStateDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  UseEffectDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  UseContextDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  UseLayoutEffectDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  UseMemoDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  // Layout demo
  LayoutDemoList: {};
  AutoLayoutDemo: LayoutDemoScreenParamList;
  // more navigation children can be added here
};
export type ElsaStackNavigationProp = StackNavigationProp<ElsaStackParamList>;
const ElsaStack = createStackNavigator<ElsaStackParamList>();
export const ElsaNavigationView = () => {
  return (
    <ElsaStack.Navigator>
      <ElsaStack.Screen name="Elsa" component={ElsaView} />

      <ElsaStack.Screen name="HooksDemoList" component={HooksDemoListView} />

      <ElsaStack.Screen name="UseStateDemo" component={DemoUseStateView} />
      <ElsaStack.Screen name="UseEffectDemo" component={DemoUseEffectView} />
      <ElsaStack.Screen name="UseContextDemo" component={DemoUseContextView} />
      <ElsaStack.Screen
        name="UseLayoutEffectDemo"
        component={DemoUseLayoutEffectView}
      />
      <ElsaStack.Screen name="UseMemoDemo" component={DemoUseMemoView} />

      <ElsaStack.Screen name="LayoutDemoList" component={LayoutDemoListView} />

      <ElsaStack.Screen name="AutoLayoutDemo" component={DemoAutoLayoutView} />
    </ElsaStack.Navigator>
  );
};

type ElsaListItem = {
  index: number;
  id: 'HooksDemo' | 'LayoutDemo';
  navigationTargetName?: 'HooksDemoList' | 'LayoutDemoList'; // subset of ElsaStackScreenName
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
  {
    index: 1,
    id: 'LayoutDemo',
    navigationTargetName: 'LayoutDemoList',
    title: 'Layout',
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
                if (
                  ['HooksDemo', 'LayoutDemo'].includes(item.id) &&
                  item.navigationTargetName !== undefined
                ) {
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
