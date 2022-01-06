import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  base: {flex: 1, flexDirection: 'row'},
  masterView: {flex: 1, maxWidth: 400, borderWidth: 1, borderColor: 'red'},
  detailView: {
    flex: 1,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'blue',
  },
});
