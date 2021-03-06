import {StyleSheet} from 'react-native';
import {commonStyles, positioning, color} from '../../../common/style';

const styles = StyleSheet.create({
  baseView: {
    ...commonStyles.fullSize,
    ...commonStyles.contentAlignmentCenter,
  },
  horizontalContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalChild: {
    marginHorizontal: 4,
  },
});

export {styles, commonStyles, positioning, color};
