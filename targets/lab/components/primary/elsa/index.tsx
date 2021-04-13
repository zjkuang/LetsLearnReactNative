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
} from '../../children/hooks/table-of-contents';
import {DemoUseStateView} from '../../children/hooks/useState';
import {DemoUseEffectView} from '../../children/hooks/useEffect';
import {DemoUseContextView} from '../../children/hooks/useContext';
import {DemoUseLayoutEffectView} from '../../children/hooks/useLayoutEffect';
import {
  ScreensDemoListView,
  ScreensDemoScreenName,
  ScreensDemoScreenParamList,
} from '../../children/screens/table-of-contents';
import {RootStackModalLauncherView} from '../../children/screens/root-stack-modal';
import {LocalReactNativeModalLauncherView} from '../../children/screens/react-native-modal';
import {TranslucentOverlayLauncherView} from '../../children/screens/translucent-overlay';
import {BannerMaskLauncherView} from '../../children/screens/banner-mask-demo';
import {TopTabDemoView} from '../../children/screens/top-tab-demo';

//
//  EEEEE  L       SSSS    A
//  E      L      S       A A
//  EEEE   L       SSS   A   A
//  E      L          S  AAAAA
//  EEEEE  LLLLL  SSSS   A   A
//

// ElsaStackParamList
export type ElsaStackNavigationScreenName =
  | 'Elsa' // root
  | 'HooksDemoList' // immediate child
  | HooksDemoScreenName // grand children
  | 'ScreensDemoList' // immediate child
  | ScreensDemoScreenName; // grand children

export type ElsaStackParamList = {
  // ElsaStackScreenName
  Elsa: {}; // navigation root
  HooksDemoList: {};
  UseStateDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  UseEffectDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  UseContextDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  UseLayoutEffectDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  UseCallbackDemo: HookDemoScreenParamList; // one of HooksDemoScreenName
  ScreensDemoList: {};
  RootStackModalDemo: ScreensDemoScreenParamList; // one of ScreensDemoScreenName
  LocalReactNativeModalDemo: ScreensDemoScreenParamList; // one of ScreensDemoScreenName
  TranslucentOverlayDemo: ScreensDemoScreenParamList; // one of ScreensDemoScreenName
  BannerMaskDemo: {};
  TopTabDemo: {};
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

      <ElsaStack.Screen
        name="ScreensDemoList"
        component={ScreensDemoListView}
      />
      <ElsaStack.Screen
        name="RootStackModalDemo"
        component={RootStackModalLauncherView}
      />
      <ElsaStack.Screen
        name="LocalReactNativeModalDemo"
        component={LocalReactNativeModalLauncherView}
      />
      <ElsaStack.Screen
        name="TranslucentOverlayDemo"
        component={TranslucentOverlayLauncherView}
      />
      <ElsaStack.Screen
        name="BannerMaskDemo"
        component={BannerMaskLauncherView}
      />
      <ElsaStack.Screen name="TopTabDemo" component={TopTabDemoView} />
    </ElsaStack.Navigator>
  );
};

type ElsaListItem = {
  index: number;
  id: 'HooksDemo' | 'ScreensDemo';
  navigationTargetName?: 'HooksDemoList' | 'ScreensDemoList'; // subset of ElsaStackScreenName
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
                  item.id === 'HooksDemo' &&
                  item.navigationTargetName !== undefined
                ) {
                  navigation.navigate(item.navigationTargetName);
                } else if (
                  item.id === 'ScreensDemo' &&
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
