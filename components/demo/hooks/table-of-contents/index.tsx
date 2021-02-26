import React from 'react';
import {View, Text} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';

// https://reactjs.org/docs/hooks-reference.html

type HooksDemoItem = 'useState'
export type HooksDemoScreenName = 'UseStateDemo';

type HooksDemoListItem = {
  index: number;
  id: HooksDemoItem;
  navigationTargetName?: HooksDemoScreenName; // subset of ElsaStackScreenName
  title: string;
  subtitle?: string;
};

const hooksDemoList: HooksDemoListItem[] = [
  {
    index: 0,
    id: 'useState',
    navigationTargetName: 'UseStateDemo',
    title: 'use-State/Effect/LayoutEffect',
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
      <FlatList
        data={hooksDemoList}
        renderItem={({item}) => {
          const itemStyle =
            item.index % 2 ? styles.flatListItem1 : styles.flatListItem0;
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.navigationTargetName != undefined) {
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
