import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {QuickTestButton} from '../../../../../../common/components/widgets';
import {useNavigation} from '@react-navigation/native';
import {TranslucentOverlay} from './overlay/index';

export const TranslucentOverlayLauncherView = () => {
  const navigation = useNavigation();
  const [showTranslucentOverlay, setShowTranslucentOverlay] = React.useState(
    false,
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Translucent Overlay',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  const onShowTranslucentOverlay = React.useCallback(() => {
    setShowTranslucentOverlay(true);
  }, []);

  const onCloseTranslucentOverlay = React.useCallback(() => {
    setShowTranslucentOverlay(false);
  }, []);

  return (
    <View style={styles.baseView}>
      <QuickTestButton
        title={'Show Translucent Overlay'}
        onPress={onShowTranslucentOverlay}
      />

      {showTranslucentOverlay && (
        <TranslucentOverlay onClose={onCloseTranslucentOverlay} />
      )}
    </View>
  );
};
