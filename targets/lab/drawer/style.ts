import {StyleSheet} from 'react-native';
import {
  commonStyles,
  positioning,
  color,
} from '../../../common/components/style';

const styles = StyleSheet.create({
  baseView: {
    ...commonStyles.fullSize,
  },
  flatListItem: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 8,
    fontSize: 16,
    height: 40,
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
  },
  closeButton: {
    right: 8,
  },
});

export {styles, commonStyles, positioning, color};
