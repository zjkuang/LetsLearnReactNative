import {StyleSheet} from 'react-native';
import {
  commonStyles,
  positioning,
  color,
} from '../../../../../../../common/components/style';

const styles = StyleSheet.create({
  baseView: {
    ...commonStyles.fullSize,
    ...commonStyles.contentAlignmentCenter,
  },
  sectionList: {
    ...commonStyles.fullSize,
  },
  sectionHeader: {
    width: '100%',
    height: 30,
    backgroundColor: '#808080',
    justifyContent: 'center',
  },
  sectionHeaderTitle: {
    color: 'white',
    fontSize: 24,
    marginHorizontal: 8,
  },
  listItem: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 8,
  },
});

export {styles, commonStyles, positioning, color};
