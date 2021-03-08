import React from 'react';
import {View, Text, SectionList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {ListItem, SectionListSection} from '../../../common/types';
import {
  ElsaStackNavigationScreenName,
  ElsaStackNavigationProp,
} from '../../../elsa/index';

// https://reactjs.org/docs/hooks-reference.html

export type LayoutDemoScreenName = 'AutoLayoutDemo';
type LayoutDemoItem = 'Auto-layout';
type LayoutDemoItemExtra = {
  navigationTargetName: LayoutDemoScreenName;
  ready: boolean;
};

export type LayoutDemoScreenParamList = {
  name: LayoutDemoScreenName;
  title: string;
};

const layoutDemoList: SectionListSection<
  ListItem<LayoutDemoItem, LayoutDemoItemExtra>
>[] = [
  {
    title: 'Basic',
    data: [
      {
        index: 0,
        id: 'Auto-layout',
        title: 'Auto-layout',
        extra: {
          navigationTargetName: 'AutoLayoutDemo',
          ready: true,
        },
      },
    ],
  },
];

export const LayoutDemoListView = () => {
  const navigation = useNavigation();
  const hooksDemoNavigation = useNavigation<ElsaStackNavigationProp>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Layout',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.baseView}>
      <SectionList
        sections={layoutDemoList}
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
                hooksDemoNavigation.push(navigationTargetName, {
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
