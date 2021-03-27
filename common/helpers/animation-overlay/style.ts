import {StyleSheet} from 'react-native';
import {commonStyles, positioning, color} from '../../components/style';

const styles = StyleSheet.create({
  baseView: {
    ...commonStyles.fullSize,
    ...commonStyles.contentAlignmentCenter,
  },

  // According to https://stackoverflow.com/a/37819474/7455975, to make it a transparent overlay,
  //   this shall be the LAST IMMEDIATE CHILD of the parent view
  transparentOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  translucentOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  coordinateReferenceView: {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
  },
  animatedViewContainer: {
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center',
  },
  animatedView: {
    width: '100%',
    height: '100%',
  },
});

export {styles, commonStyles, positioning, color};
