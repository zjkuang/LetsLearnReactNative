import React from 'react';
import {View, Text, SectionList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {ListItem, SectionListSection} from '../../../common/types';

// https://reactjs.org/docs/hooks-reference.html

export type HooksDemoScreenName =
  'UseStateDemo' | 'UseEffectDemo' | 'UseContextDemo' |
  'UseLayoutEffectDemo' | 'UseCallbackDemo' | 'UseRefDemo' | 'UseMemoDemo' | 'UseReducerDemo' | 'UseImperativeHandleDemo' | 'UseDebugValueDemo';
type HooksDemoItem =
  'useState' | 'useEffect' | 'useContext' |
  'useLayoutEffect' | 'useCallback' | 'useRef' | 'useMemo' | 'useReducer' | 'useImperativeHandle' | 'useDebugValue';
type HooksDemoItemExtra = {
  navigationTargetName: HooksDemoScreenName;
  ready: boolean;
};

const hooksDemoList: SectionListSection<ListItem<HooksDemoItem, HooksDemoItemExtra>>[] = [
  {
    title: 'Basic',
    data: [
      {
        index: 0,
        id: 'useState', // HooksDemoItem
        title: 'useState',
        extra: {
          navigationTargetName: 'UseStateDemo', // HooksDemoScreenName
          ready: true,
        },
      },
      {
        index: 1,
        id: 'useEffect', // HooksDemoItem
        title: 'useEffect',
        extra: {
          navigationTargetName: 'UseEffectDemo', // HooksDemoScreenName
          ready: false,
        },
      },
      {
        index: 2,
        id: 'useContext', // HooksDemoItem
        title: 'useContext',
        extra: {
          navigationTargetName: 'UseContextDemo', // HooksDemoScreenName
          ready: false,
        },
      },
    ],
  },
  {
    title: 'Additional',
    data: [
      {
        index: 0,
        id: 'useLayoutEffect', // HooksDemoItem
        title: 'useLayoutEffect',
        extra: {
          navigationTargetName: 'UseLayoutEffectDemo', // HooksDemoScreenName
          ready: false,
        },
      },
      {
        index: 1,
        id: 'useCallback', // HooksDemoItem
        title: 'useCallback',
        extra: {
          navigationTargetName: 'UseCallbackDemo', // HooksDemoScreenName
          ready: false,
        },
      },
      {
        index: 2,
        id: 'useRef', // HooksDemoItem
        title: 'useRef',
        extra: {
          navigationTargetName: 'UseRefDemo', // HooksDemoScreenName
          ready: false,
        },
      },
      {
        index: 3,
        id: 'useMemo', // HooksDemoItem
        title: 'useMemo',
        extra: {
          navigationTargetName: 'UseMemoDemo', // HooksDemoScreenName
          ready: false,
        },
      },
      {
        index: 4,
        id: 'useReducer', // HooksDemoItem
        title: 'useReducer',
        extra: {
          navigationTargetName: 'UseReducerDemo', // HooksDemoScreenName
          ready: false,
        },
      },
      {
        index: 5,
        id: 'useImperativeHandle', // HooksDemoItem
        title: 'useImperativeHandle',
        extra: {
          navigationTargetName: 'UseImperativeHandleDemo', // HooksDemoScreenName
          ready: false,
        },
      },
      {
        index: 6,
        id: 'useDebugValue', // HooksDemoItem
        title: 'useDebugValue',
        extra: {
          navigationTargetName: 'UseDebugValueDemo', // HooksDemoScreenName
          ready: false,
        },
      },
    ],
  },
];

export const HooksDemoListView = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Hooks',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.baseView}>
      <SectionList
        sections={hooksDemoList}
        renderItem={({item}) => {
          const itemStyle = item.index % 2 ? styles.listItem1 : styles.listItem0;
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.extra?.navigationTargetName && item.extra?.ready) {
                  navigation.navigate(item.extra.navigationTargetName);
                }
              }}>
              <Text style={itemStyle}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({section}) => {
          return (<Text style={styles.sectionHeader}>{section.title}</Text>);
        }}
        keyExtractor={(item, index) => {
          return `${index}`;
        }}
      />
    </View>
  );
};
