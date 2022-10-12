import React from 'react';
import {SectionList, View, Text} from 'react-native';
import {FlatListItemSeparator} from '../../../../../../../common/components/widgets';
import {
  ListItem,
  SectionListSection,
} from '../../../../../../../common/components/types';
import {styles} from './style';

type ListItemType = ListItem<string, undefined>;
type SectionType = SectionListSection<ListItemType>;

export const ExperimentalSectionList = () => {
  const sections = React.useMemo(() => {
    const list: SectionType[] = [];
    [...'ABCDEFG'].forEach((c, si) => {
      const data: ListItemType[] = [];
      for (let i = 0; i < 5; i++) {
        data.push({
          index: i,
          id: `${si}-${i}`,
          title: `${c}-${i}`,
        });
      }
      list.push({
        title: c,
        data,
      });
    });
    return list;
  }, []);

  return (
    <SectionList
      style={styles.sectionList}
      sections={sections}
      renderItem={({item}) => {
        return (
          <View style={styles.listItem}>
            <Text>{item.title}</Text>
          </View>
        );
      }}
      renderSectionHeader={({section}) => {
        return (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderTitle}>{section.title}</Text>
          </View>
        );
      }}
      ItemSeparatorComponent={FlatListItemSeparator}
      keyExtractor={(item, index) => {
        return `${index}-${item.id}`;
      }}
      onViewableItemsChanged={({viewableItems}) => {
        // console.log('*** *** viewableItems.length:', viewableItems.length);
        console.log('*** viewableItems', JSON.stringify(viewableItems));
        // Section headers also appear in viewableItems with index=null
        // filter out those (viewableItem.index === null)
        // const filteredViewableItems = viewableItems.filter(
        //   item => item.index !== null,
        // );
        // console.log(
        //   '*** filteredViewableItems:',
        //   JSON.stringify(filteredViewableItems),
        // );
      }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 95,
      }}
    />
  );
};
