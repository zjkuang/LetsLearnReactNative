import React from 'react';
import {View, Text} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import {GlobalEvents} from '../../global/global-events';
import {styles} from './style';

export type BannerMaskPosition = 'bottom' | 'top';
export type BannerMaskSpec = {
  show: boolean;
  text: string;
  position?: BannerMaskPosition;
  backgroundColor?: string;
  textColor?: string;
};

export const BannerMask = () => {
  const [spec, setSpec] = React.useState<BannerMaskSpec>({
    show: false,
    text: '',
  });
  const [refresh, setRefresh] = React.useState(0);

  React.useEffect(() => {
    const listener = EventRegister.addEventListener(
      GlobalEvents.ShowBannerMask,
      (customSpec: BannerMaskSpec) => {
        setSpec(customSpec);
        setRefresh(refresh + 1);
      },
    );
    return () => {
      EventRegister.removeEventListener(listener as string);
    };
  }, [refresh]);

  if (!spec.show) {
    return <></>;
  }

  const getCustomStyles = () => {
    let customStyles;
    if (spec.position === 'bottom') {
      customStyles = {
        view: {...styles.bottomMaskView},
        text: {...styles.bottomMaskText},
      };
    } else if (spec.position === 'top') {
      customStyles = {
        view: {...styles.topMaskView},
        text: {...styles.topMaskText},
      };
    }
    if (!customStyles) {
      return {
        view: {...styles.bottomMaskView},
        text: {...styles.bottomMaskText},
      };
    }
    if (spec.backgroundColor) {
      customStyles.view.backgroundColor = spec.backgroundColor;
    }
    if (spec.textColor) {
      customStyles.text.color = spec.textColor;
    }
    return customStyles;
  };
  return (
    <View style={getCustomStyles().view}>
      <Text style={getCustomStyles().text}>{spec.text}</Text>
    </View>
  );
};
