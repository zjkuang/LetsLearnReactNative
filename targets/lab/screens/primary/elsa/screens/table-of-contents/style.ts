import {StyleSheet} from 'react-native';
import {
  commonStyles,
  positioning,
  color,
} from '../../../../../../../common/components/style';

const styles = StyleSheet.create({
  baseView: {
    ...commonStyles.fullSize,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  listItem0: {
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 8,
    fontSize: 16,
    height: 40,
    backgroundColor: 'rgba(240,240,240,1.0)',
  },
  listItem1: {
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 8,
    fontSize: 16,
    height: 40,
    backgroundColor: 'rgba(232,232,232,1.0)',
  },
});

export {styles, commonStyles, positioning, color};
