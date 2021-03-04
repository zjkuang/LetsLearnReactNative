import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {styles, color} from './style';
import {useNavigation} from '@react-navigation/native';
import {
  AnnaDetailsView,
  AnnaDetailsViewParamList,
} from '../demo/anna-stack/anna-details';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackNavigationProp} from '../root/index';
import {ExampleContext} from '../../model/example-context';

export type AnnaStackParamList = {
  Anna: {}; // navigation root
  AnnaDetails: AnnaDetailsViewParamList;
  // more navigation children can be added here
};
export type AnnaStackNavitationProp = StackNavigationProp<AnnaStackParamList>;
const AnnaStack = createStackNavigator<AnnaStackParamList>();
export const AnnaNavigationView = () => {
  const test = true;
  return (
    <AnnaStack.Navigator>
      {test ? (
        <AnnaStack.Screen
          name="Anna"
          children={() => [<AnnaView key={0} test={'test'} />]}
        />
      ) : (
        <AnnaStack.Screen name="Anna" component={AnnaView} />
      )}

      <AnnaStack.Screen name="AnnaDetails" component={AnnaDetailsView} />
    </AnnaStack.Navigator>
  );
};

type AnnaViewProp = {
  test?: string;
};
const AnnaView = (props: AnnaViewProp) => {
  const navigation = useNavigation<AnnaStackNavitationProp>();
  const rootNavigation = useNavigation<RootStackNavigationProp>();
  const localStackNavigation = useNavigation<AnnaStackNavitationProp>();

  const {exampleContextValue} = React.useContext(ExampleContext);

  const title = 'Anna';

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

  return (
    <View style={styles.baseView}>
      <Text>{`Example Context: ${JSON.stringify(exampleContextValue)}`}</Text>

      <TouchableOpacity
        onPress={() => {
          localStackNavigation.push('AnnaDetails', {generation: 1});
        }}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>
          Show Details
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          rootNavigation.navigate('Modal', {context: 'anna'});
        }}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>Show Modal</Text>
      </TouchableOpacity>
    </View>
  );
};
