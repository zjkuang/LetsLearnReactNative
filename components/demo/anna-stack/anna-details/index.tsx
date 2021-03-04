import React from 'react';
import {Alert, Text, View} from 'react-native';
import {styles, color} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ExampleContext} from '../../../../model/example-context';
import {AnnaStackParamList} from '../../../anna/index';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

export type AnnaDetailsViewParamList = {
  generation?: number;
};
type AnnaDetailsViewProps = StackScreenProps<AnnaStackParamList, 'AnnaDetails'>; // import {StackScreenProps} from '@react-navigation/stack';
export const AnnaDetailsView = ({navigation, route}: AnnaDetailsViewProps) => {
  const navigationGeneral = useNavigation();
  const {exampleContextValue} = React.useContext(ExampleContext);

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
      Alert.alert(`${title}`, 'Unmounted');
    };
  }, [title]);

  return (
    <View style={styles.baseView}>
      <Text>{`Example Context: ${JSON.stringify(exampleContextValue)}`}</Text>

      <TouchableOpacity
        onPress={() => {
          navigationGeneral.navigate('Olaf');
        }}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>Go To Olaf</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>Go Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigationGeneral.navigate('Kristoff');
        }}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>
          Go To Kristoff
        </Text>
      </TouchableOpacity>

      {
        /* Depending on whether KristoffDetails is rendered, this may be safe or may cause a crash */
        <TouchableOpacity
          onPress={() => {
            navigationGeneral.navigate('KristoffDetails');
          }}>
          <Text style={{color: color.iOSButtonColorLightTheme}}>
            Go To Kristoff Details (May or may not crash)
          </Text>
        </TouchableOpacity>
      }

      <TouchableOpacity
        onPress={() => {
          if (route.params.generation !== undefined) {
            navigation.push('AnnaDetails', {
              generation: route.params.generation + 1,
            });
          } else {
            navigation.push('AnnaDetails', {});
          }
        }}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>
          Clone myself
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigationGeneral.navigate('Anna');
        }}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>
          Back to Anna immediately
        </Text>
      </TouchableOpacity>
    </View>
  );
};
