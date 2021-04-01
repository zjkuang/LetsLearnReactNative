import React from 'react';
import {View, Text, SectionList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {
  ListItem,
  SectionListSection,
} from '../../../../../../common/components/types';
import {
  ElsaStackNavigationScreenName,
  ElsaStackNavigationProp,
} from '../../../primary/elsa/index';

export type ScreensDemoScreenName =
  | 'RootStackModalDemo'
  | 'LocalReactNativeModalDemo'
  | 'TranslucentOverlayDemo';
type ScreensDemoItem =
  | 'rootStackModal'
  | 'localReactNativeModal'
  | 'translucentOverlay';
type ScreensDemoItemExtra = {
  navigationTargetName: ScreensDemoScreenName;
  ready: boolean;
};

export type ScreensDemoScreenParamList = {
  name: ScreensDemoScreenName;
  title: string;
};

const screensDemoList: SectionListSection<
  ListItem<ScreensDemoItem, ScreensDemoItemExtra>
>[] = [
  {
    title: 'Modal',
    data: [
      {
        index: 0,
        id: 'rootStackModal', // ScreensDemoItem
        title: 'RootStack Modal',
        extra: {
          navigationTargetName: 'RootStackModalDemo', // ScreensDemoScreenName
          ready: true,
        },
      },
      {
        index: 1,
        id: 'localReactNativeModal', // ScreensDemoItem
        title: 'React Native Modal',
        extra: {
          navigationTargetName: 'LocalReactNativeModalDemo', // ScreensDemoScreenName
          ready: true,
        },
      },
    ],
  },
  {
    title: 'Overlay',
    data: [
      {
        index: 0,
        id: 'translucentOverlay', // ScreensDemoItem
        title: 'Translucent Overlay',
        extra: {
          navigationTargetName: 'TranslucentOverlayDemo', // ScreensDemoScreenName
          ready: true,
        },
      },
    ],
  },
];

export const ScreensDemoListView = () => {
  const navigation = useNavigation();
  const elsaNavigation = useNavigation<ElsaStackNavigationProp>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Screens',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.baseView}>
      <SectionList
        sections={screensDemoList}
        renderItem={({item}) => {
          const itemStyle =
            item.index % 2 ? styles.listItem1 : styles.listItem0;
          return (
            <TouchableOpacity
              onPress={() => {
                let navigationTargetName = item.extra
                  ?.navigationTargetName as ElsaStackNavigationScreenName;
                if (!navigationTargetName || !item.extra?.ready) {
                  return;
                }
                elsaNavigation.push(navigationTargetName, {
                  name: navigationTargetName,
                  title: item.title,
                });
              }}>
              <Text style={itemStyle}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({section}) => {
          return <Text style={styles.sectionHeader}>{section.title}</Text>;
        }}
        keyExtractor={(item, index) => {
          return `${index}`;
        }}
      />
    </View>
  );
};
