import {StyleSheet} from 'react-native';
import {
  commonStyles,
  positioning,
  color,
} from '../../../../common/components/style';

// To make the in-view overlay work properly, besides the translucentOverlay style definition, it must be the last one of the immediate child components of the base view in JSX

const styles = StyleSheet.create({
  translucentOverlay: {
    ...commonStyles.fullSize,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: '0%',
    right: '0%',
    marginTop: 8,
    marginRight: 8,
  },
});

export {styles, commonStyles, positioning, color};
