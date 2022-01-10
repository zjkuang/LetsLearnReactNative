import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  base: {flex: 1, flexDirection: 'row'},
  masterView: {flex: 1, maxWidth: 320},
  separatorView: {width: 0.5, height: '100%', backgroundColor: '#c0c0c0'},
  detailView: {
    flex: 1,
    overflow: 'hidden',
  },
});
