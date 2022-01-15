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
  HooksDemoListScreen,
  HooksDemoScreenName,
  HookDemoScreenParamList,
} from './hooks/table-of-contents';
import {DemoUseStateScreen} from './hooks/useState';
import {DemoUseEffectScreen} from './hooks/useEffect';
import {DemoUseContextScreen} from './hooks/useContext';
import {DemoUseLayoutEffectScreen} from './hooks/useLayoutEffect';
import {DemoUseImperativeHandleScreen} from './hooks/useImperativeHandle';
import {
  ScreensDemoListScreen,
  ScreensDemoScreenName,
  ScreensDemoScreenParamList,
} from './screens/table-of-contents';
import {RootStackModalLauncherScreen} from './screens/root-stack-modal';
import {LocalReactNativeModalLauncherScreen} from './screens/react-native-modal';
import {TranslucentOverlayLauncherScreen} from './screens/translucent-overlay';
import {BannerMaskLauncherScreen} from './screens/banner-mask-demo';
import {TopTabDemoScreen} from './screens/top-tab-demo';
import {NativeModuleDemoScreen} from './screens/native-module-demo';
import {SplitViewDemoScreen} from './screens/split-view-demo';

//
//  EEEEE  L       SSSS    A
//  E      L      S       A A
//  EEEE   L       SSS   A   A
//  E      L          S  AAAAA
//  EEEEE  LLLLL  SSSS   A   A
//

// ElsaStackParamList
export type ElsaNavigationScreenName =
  | 'Elsa' // root
  | 'HooksDemoList' // immediate child
  | HooksDemoScreenName // grand children
  | 'ScreensDemoList' // immediate child
  | ScreensDemoScreenName; // grand children

export type ElsaNavigationParamList = {
  // ElsaStackScreenName
  Elsa: {}; // navigation root
  HooksDemoList: {};
  UseStateDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  UseEffectDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  UseContextDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  UseLayoutEffectDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  UseImperativeHandleDemo: HookDemoScreenParamList;
  ScreensDemoList: {};
  RootStackModalDemo: ScreensDemoScreenParamList; // one of ScreensDemoScreenName
  LocalReactNativeModalDemo: ScreensDemoScreenParamList; // one of ScreensDemoScreenName
  TranslucentOverlayDemo: ScreensDemoScreenParamList; // one of ScreensDemoScreenName
  BannerMaskDemo: {};
  TopTabDemo: {};
  NativeModuleDemo: {};
  SplitViewDemo: {};
  // more navigation children can be added here
};
export type ElsaNavigationProp = StackNavigationProp<ElsaNavigationParamList>;
const ElsaStack = createStackNavigator<ElsaNavigationParamList>();
export const ElsaNavigator = () => {
  return (
    <ElsaStack.Navigator>
      <ElsaStack.Screen name="Elsa" component={ElsaScreen} />

      <ElsaStack.Screen name="HooksDemoList" component={HooksDemoListScreen} />

      <ElsaStack.Screen name="UseStateDemo" component={DemoUseStateScreen} />
      <ElsaStack.Screen name="UseEffectDemo" component={DemoUseEffectScreen} />
      <ElsaStack.Screen
        name="UseContextDemo"
        component={DemoUseContextScreen}
      />
      <ElsaStack.Screen
        name="UseLayoutEffectDemo"
        component={DemoUseLayoutEffectScreen}
      />
      <ElsaStack.Screen
        name="UseImperativeHandleDemo"
        component={DemoUseImperativeHandleScreen}
      />

      <ElsaStack.Screen
        name="ScreensDemoList"
        component={ScreensDemoListScreen}
      />
      <ElsaStack.Screen
        name="RootStackModalDemo"
        component={RootStackModalLauncherScreen}
      />
      <ElsaStack.Screen
        name="LocalReactNativeModalDemo"
        component={LocalReactNativeModalLauncherScreen}
      />
      <ElsaStack.Screen
        name="TranslucentOverlayDemo"
        component={TranslucentOverlayLauncherScreen}
      />
      <ElsaStack.Screen
        name="BannerMaskDemo"
        component={BannerMaskLauncherScreen}
      />
      <ElsaStack.Screen name="TopTabDemo" component={TopTabDemoScreen} />

      <ElsaStack.Screen
        name="NativeModuleDemo"
        component={NativeModuleDemoScreen}
      />

      <ElsaStack.Screen name="SplitViewDemo" component={SplitViewDemoScreen} />
    </ElsaStack.Navigator>
  );
};

type ElsaListItem = {
  index: number;
  id: 'HooksDemo' | 'ScreensDemo' | 'NativeModuleDemo';
  navigationTargetName?:
    | 'HooksDemoList'
    | 'ScreensDemoList'
    | 'NativeModuleDemo'; // subset of ElsaStackScreenName
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
    id: 'ScreensDemo',
    navigationTargetName: 'ScreensDemoList',
    title: 'Screens',
  },
  {
    index: 2,
    id: 'NativeModuleDemo',
    navigationTargetName: 'NativeModuleDemo',
    title: 'Native Module',
  },
];

const ElsaScreen = () => {
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
                  item.id === 'HooksDemo' &&
                  item.navigationTargetName !== undefined
                ) {
                  navigation.navigate(item.navigationTargetName);
                } else if (
                  item.id === 'ScreensDemo' &&
                  item.navigationTargetName !== undefined
                ) {
                  navigation.navigate(item.navigationTargetName);
                } else if (
                  item.id === 'NativeModuleDemo' &&
                  item.navigationTargetName !== undefined
                ) {
                  navigation.navigate(item.navigationTargetName);
                }
              }}>
              <Text style={itemStyle}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};
