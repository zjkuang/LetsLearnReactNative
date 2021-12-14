import React from 'react';
import {View, Text} from 'react-native';
import {styles, commonStyles} from './style';
import {QuickTestButton} from '../../../../../../../common/components/widgets';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  BannerMaskSpec,
  BannerMaskPosition,
} from '../../../../../components/banner-mask';
import {EventRegister} from 'react-native-event-listeners';
import {GlobalEvents} from '../../../../../global/global-events';

export const BannerMaskLauncherScreen = () => {
  const navigation = useNavigation();
  const [position, setPosition] = React.useState<BannerMaskPosition>('bottom');
  const [showBannerMask, setShowBannerMask] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Banner Mask',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  const toggleBannerMask = React.useCallback(() => {
    setShowBannerMask(!showBannerMask);
  }, [showBannerMask]);

  const onPressTogglePosition = React.useCallback(() => {
    if (position === 'bottom') {
      setPosition('top');
    } else if (position === 'top') {
      setPosition('bottom');
    }
  }, [position]);

  React.useEffect(() => {
    let spec: BannerMaskSpec = {
      show: showBannerMask,
      text: 'Demo Banner',
      position: position,
    };
    EventRegister.emit(GlobalEvents.ShowBannerMask, spec);
  }, [position, showBannerMask]);

  return (
    <View style={styles.baseView}>
      <View style={styles.horizontalContainer}>
        <Text style={styles.horizontalChild}>{`Position: ${position}`}</Text>

        <TouchableOpacity
          style={styles.horizontalChild}
          onPress={onPressTogglePosition}>
          <Text style={commonStyles.textAs_iOS_Button}>Switch</Text>
        </TouchableOpacity>
      </View>

      <QuickTestButton
        title={'Toggle Banner Mask'}
        onPress={() => {
          toggleBannerMask();
        }}
      />
    </View>
  );
};
