import React from 'react';
import {View, Text, SectionList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {
  ListItem,
  SectionListSection,
} from '../../../../../../../common/components/types';
import {ElsaNavigationScreenName, ElsaNavigationProp} from '../..';

export type ScreensDemoScreenName =
  | 'RootStackModalDemo'
  | 'LocalReactNativeModalDemo'
  | 'TranslucentOverlayDemo'
  | 'BannerMaskDemo'
  | 'TopTabDemo';
type ScreensDemoItem =
  | 'rootStackModal'
  | 'localReactNativeModal'
  | 'translucentOverlay'
  | 'bannerMask'
  | 'topTab';
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
      {
        index: 1,
        id: 'bannerMask', // ScreensDemoItem
        title: 'Banner Mask',
        extra: {
          navigationTargetName: 'BannerMaskDemo', // ScreensDemoScreenName
          ready: true,
        },
      },
    ],
  },
  {
    title: 'TopTab',
    data: [
      {
        index: 0,
        id: 'topTab', // ScreensDemoItem
        title: 'Top Tab',
        extra: {
          navigationTargetName: 'TopTabDemo', // ScreensDemoScreenName
          ready: true,
        },
      },
    ],
  },
];

export const ScreensDemoListScreen = () => {
  const navigation = useNavigation();
  const elsaNavigation = useNavigation<ElsaNavigationProp>();

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
                  ?.navigationTargetName as ElsaNavigationScreenName;
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
