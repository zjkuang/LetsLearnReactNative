import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {ExampleSplitViewContext} from '../../../../../../../context/example-split-view-context';
import {ListItem} from '../../../../../../../../../common/components/types';
import {FlatListItemSeparator} from '../../../../../../../../../common/components/widgets';
import {MasterNavigationProp} from '..';
import {styles} from './style';

export type MainScreenParamList = {
  //
};

export const MainScreen = () => {
  const masterNavigation = useNavigation<MasterNavigationProp>();
  const {exampleSplitViewContextValue, setExampleSplitViewContextValue} =
    React.useContext(ExampleSplitViewContext);

  React.useLayoutEffect(() => {
    masterNavigation.setOptions({
      title: 'Main',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [masterNavigation]);

  const select = React.useCallback(
    (item: string) => {
      const newContext = {...exampleSplitViewContextValue};
      newContext.selectedItemInMain = item;
      setExampleSplitViewContextValue(newContext);

      if (item === 'Settings') {
        masterNavigation.push('Setting', {});
        return;
      }
    },
    [
      exampleSplitViewContextValue,
      masterNavigation,
      setExampleSplitViewContextValue,
    ],
  );

  React.useEffect(() => {
    if (exampleSplitViewContextValue.selectedItemInMain === undefined) {
      select('Anna');
    }
  }, [exampleSplitViewContextValue.selectedItemInMain, select]);

  const list = React.useMemo(() => {
    const l: ListItem<number, string>[] = [
      {
        index: 0,
        id: 0,
        title: 'Anna',
        extra: '<navigation-screen-name>',
      },
      {
        index: 1,
        id: 1,
        title: 'Kristoff',
        extra: '<navigation-screen-name>',
      },
      {
        index: 2,
        id: 2,
        title: 'Olaf',
        extra: '<navigation-screen-name>',
      },
      {
        index: 3,
        id: 3,
        title: 'Sven',
        extra: '<navigation-screen-name>',
      },
      {
        index: 4,
        id: 4,
        title: 'Settings',
        extra: '<navigation-screen-name>',
      },
    ];
    return l;
  }, []);

  return (
    <View style={styles.baseView}>
      <FlatList
        data={list}
        renderItem={({item}) => {
          const itemStyle =
            item.title === exampleSplitViewContextValue.selectedItemInMain
              ? {color: 'red'}
              : {};
          return (
            <TouchableOpacity
              onPress={() => {
                select(item.title);
              }}>
              <Text style={[styles.flatListItem, itemStyle]}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={FlatListItemSeparator}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};
