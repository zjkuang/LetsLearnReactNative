import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {QuickTestButton} from '../../../../../../common/components/widgets';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../../../root/index';

export const RootStackModalLauncherView = () => {
  const navigation = useNavigation();
  const rootNavigation = useNavigation<RootStackNavigationProp>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'RootStack Modal',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.baseView}>
      <QuickTestButton
        title={'Show RootStack Modal'}
        onPress={() => {
          rootNavigation.navigate('Modal', {context: 'rootStackModalDemo'});
        }}
      />
    </View>
  );
};
