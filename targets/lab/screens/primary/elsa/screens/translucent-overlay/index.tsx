import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {QuickTestButton} from '../../../../../../../common/components/widgets';
import {useNavigation} from '@react-navigation/native';
import {TranslucentOverlay} from '../../../../../components/overlay';
import {RootStackNavigationProp} from '../../../../../root';

export const TranslucentOverlayLauncherScreen = () => {
  const navigation = useNavigation();
  const rootNavigation = useNavigation<RootStackNavigationProp>();
  const [showTranslucentOverlay, setShowTranslucentOverlay] =
    React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Translucent Overlay',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  const onShowFullScreenTranslucentOverlay = React.useCallback(() => {
    rootNavigation.navigate('Modal', {context: 'translucentOverlay'});
  }, [rootNavigation]);

  const onShowInViewTranslucentOverlay = React.useCallback(() => {
    setShowTranslucentOverlay(true);
  }, []);

  const onCloseInViewTranslucentOverlay = React.useCallback(() => {
    setShowTranslucentOverlay(false);
  }, []);

  // To make the in-view overlay (TranslucentOverlay) work properly, besides the translucentOverlay style definition, it must be the last one of the immediate child components of the base view in JSX
  return (
    <View style={styles.baseView}>
      <View style={styles.groupContainter}>
        <QuickTestButton
          title={'Full-safe-area'}
          onPress={onShowFullScreenTranslucentOverlay}
        />
      </View>

      <View style={styles.groupContainter}>
        <QuickTestButton
          title={'In-view'}
          onPress={onShowInViewTranslucentOverlay}
        />
      </View>
      {showTranslucentOverlay && (
        <TranslucentOverlay onClose={onCloseInViewTranslucentOverlay} />
      )}
    </View>
  );
};
