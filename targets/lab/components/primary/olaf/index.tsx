import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {QuickTestButton} from '../../../../../common/components/widgets';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {OlafDetailsView} from '../../children/navigation/stack/details/olaf-details';
import {ExampleContext} from '../../../context/example-context';

type OlafStackParamList = {
  Olaf?: {}; // navigation root
  OlafDetails?: {};
  // more navigation children can be added here
};
type OlafStackNavitationProp = StackNavigationProp<OlafStackParamList>;
const OlafStack = createStackNavigator<OlafStackParamList>();
export const OlafNavigationView = () => {
  const test = true;
  return (
    <OlafStack.Navigator>
      {test ? (
        <OlafStack.Screen
          name="Olaf"
          children={() => [<OlafView key={0} test={'test'} />]}
        />
      ) : (
        <OlafStack.Screen name="Olaf" component={OlafView} />
      )}

      <OlafStack.Screen name="OlafDetails" component={OlafDetailsView} />
    </OlafStack.Navigator>
  );
};

type OlafViewProp = {
  test?: string;
};
const OlafView = (props: OlafViewProp) => {
  const navigation = useNavigation<OlafStackNavitationProp>();
  const generalNavigation = useNavigation();

  const {exampleContextValue} = React.useContext(ExampleContext);
  const [refresh, setRefresh] = React.useState(0);

  const title = 'Olaf';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    console.log(`${title} props.test=${props.test}`);
  }, [props]);

  React.useEffect(() => {
    const unsubscribe = generalNavigation.addListener('focus', () => {
      console.log('Olaf focus');
    });

    return unsubscribe;
  }, [generalNavigation]);

  React.useEffect(() => {
    const unsubscribe = generalNavigation.addListener('blur', () => {
      console.log('Olaf blur');
    });

    return unsubscribe;
  }, [generalNavigation]);

  return (
    <View
      style={[
        styles.baseView,
        {backgroundColor: exampleContextValue.backgroundColor},
      ]}>
      <Text>{`ExampleContext.count: ${exampleContextValue.count}`}</Text>

      <QuickTestButton
        title={'Refresh'}
        onPress={() => {
          setRefresh(refresh + 1);
        }}
      />

      <QuickTestButton
        title={'Show Details'}
        onPress={() => {
          navigation.push('OlafDetails');
        }}
      />
    </View>
  );
};
