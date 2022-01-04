import React from 'react';
import {View, Text, SectionList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  ListItem,
  SectionListSection,
} from '../../../../../../../common/components/types';
import {ElsaNavigationScreenName, ElsaNavigationProp} from '../..';
import {styles} from './style';

export type ScreensDemoScreenName =
  | 'RootStackModalDemo'
  | 'LocalReactNativeModalDemo'
  | 'TranslucentOverlayDemo'
  | 'BannerMaskDemo'
  | 'TopTabDemo'
  | 'SplitViewDemo';
type ScreensDemoItem =
  | 'rootStackModal'
  | 'localReactNativeModal'
  | 'translucentOverlay'
  | 'bannerMask'
  | 'topTab'
  | 'splitView';
type ScreensDemoItemExtra = {
  navigationTargetName: ScreensDemoScreenName;
  ready: boolean;
};

export type ScreensDemoScreenParamList = {
  name: ScreensDemoScreenName;
  title: string;
};

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

  const screensDemoList = React.useMemo(() => {
    const list: SectionListSection<
      ListItem<ScreensDemoItem, ScreensDemoItemExtra>
    >[] = [];
    list.push({
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
    });
    list.push({
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
    });
    list.push({
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
    });
    if (DeviceInfo.isTablet()) {
      list.push({
        title: 'SplitView',
        data: [
          {
            index: 0,
            id: 'splitView', // ScreensDemoItem
            title: 'Split View',
            extra: {
              navigationTargetName: 'SplitViewDemo', // ScreensDemoScreenName
              ready: true,
            },
          },
        ],
      });
    }
    return list;
  }, []);

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
