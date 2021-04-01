import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {QuickTestButton} from '../../../../../../common/components/widgets';
import {useNavigation} from '@react-navigation/native';
import {ReactNativeModalView} from './modal/index';

export const LocalReactNativeModalLauncherView = () => {
  const navigation = useNavigation();
  const [localModalVisible, setLocalModalVisible] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'React Native Modal',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  const onLocalModalClose = React.useCallback(() => {
    setLocalModalVisible(false);
  }, []);

  return (
    <View style={styles.baseView}>
      <QuickTestButton
        title={'Show React Native Modal'}
        onPress={() => {
          setLocalModalVisible(true);
        }}
      />

      {localModalVisible && (
        <ReactNativeModalView
          visible={localModalVisible}
          onClose={onLocalModalClose}
        />
      )}
    </View>
  );
};
