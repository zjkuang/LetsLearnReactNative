import React from 'react';
import {View} from 'react-native';
import {QuickTestButton} from '../../../../../../common/components/widgets';
import {styles} from './style';
import {AnnaStackParamList} from '../../../primary/anna/index';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

export type AnnaDetailsViewParamList = {
  generation?: number;
};
type AnnaDetailsViewProps = StackScreenProps<AnnaStackParamList, 'AnnaDetails'>; // import {StackScreenProps} from '@react-navigation/stack';
export const AnnaDetailsView = ({navigation, route}: AnnaDetailsViewProps) => {
  const navigationGeneral = useNavigation();
  const [showTranslucentOverlay, setShowTranslucentOverlay] = React.useState(
    false,
  );

  let title = 'Details';
  if (route.params.generation !== undefined) {
    title = `Details(${route.params.generation})`;
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation, title]);

  React.useEffect(() => {
    console.log(`${title} mounted`);

    return () => {
      console.log(`${title} unmounted`);
    };
  }, [title]);

  return (
    <View style={styles.baseView}>
      <QuickTestButton
        title={'Go To Olaf'}
        onPress={() => {
          navigationGeneral.navigate('Olaf');
        }}
      />

      <QuickTestButton
        title={'Go Back'}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <QuickTestButton
        title={'Go To Kristoff'}
        onPress={() => {
          navigationGeneral.navigate('Kristoff');
        }}
      />

      {
        /* Depending on whether KristoffDetails is rendered, this may be safe or may cause a crash */
        <QuickTestButton
          title={'Go To Kristoff Details (May or may not crash)'}
          onPress={() => {
            navigationGeneral.navigate('KristoffDetails');
          }}
        />
      }

      <QuickTestButton
        title={'Clone myself'}
        onPress={() => {
          if (route.params.generation !== undefined) {
            navigation.push('AnnaDetails', {
              generation: route.params.generation + 1,
            });
          } else {
            navigation.push('AnnaDetails', {});
          }
        }}
      />

      <QuickTestButton
        title={'Back to Anna immediately'}
        onPress={() => {
          navigationGeneral.navigate('Anna');
        }}
      />

      <QuickTestButton
        title={'Show Translucent Overlay'}
        onPress={() => {
          setShowTranslucentOverlay(true);
          setTimeout(() => {
            setShowTranslucentOverlay(false);
          }, 1500);
        }}
      />

      {showTranslucentOverlay && <View style={styles.translucentOverlay} />}
    </View>
  );
};