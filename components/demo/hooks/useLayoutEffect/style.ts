import {StyleSheet} from 'react-native';
import {commonStyles, positioning, color} from '../../../common/style';

const styles = StyleSheet.create({
  baseView: {
    ...commonStyles.fullSize,
    ...commonStyles.contentAlignmentCenter,
  },
  navigationHeaderIcon: {
    width: 30,
    height: 30,
  },
});

export {styles, commonStyles, positioning, color};
