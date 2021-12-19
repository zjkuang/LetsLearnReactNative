import {StyleSheet} from 'react-native';
import {
  commonStyles,
  positioning,
  color,
} from '../../../../../common/components/style';

const styles = StyleSheet.create({
  baseView: {
    ...commonStyles.fullSize,
    ...commonStyles.contentAlignmentCenter,
  },
  greeting: {
    margin: 8,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailInputLabel: {
    margin: 4,
    color: '#808080',
  },
  emailInputBox: {
    width: 180,
    height: 30,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    margin: 4,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeInputLabel: {
    margin: 4,
    color: '#808080',
  },
  codeInputBox: {
    width: 90,
    height: 30,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    margin: 4,
  },
  signUpEntrance: {
    position: 'absolute',
    width: '100%',
    bottom: 30,
    flexDirection: 'row',
    margin: 8,
    ...commonStyles.contentAlignmentCenter,
  },
});

export {styles, commonStyles, positioning, color};
