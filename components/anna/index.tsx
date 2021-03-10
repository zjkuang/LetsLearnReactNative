import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {
  AnnaDetailsView,
  AnnaDetailsViewParamList,
} from '../demo/anna-stack/anna-details';
import {RootStackNavigationProp} from '../root/index';
import {ExampleContext} from '../../context/example-context';
import {QuickTestButton} from '../common/widgets';

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
  const [refresh, setRefresh] = React.useState(0);

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
          localStackNavigation.push('AnnaDetails', {generation: 1});
        }}
      />

      <QuickTestButton
        title={'Show Modal'}
        onPress={() => {
          rootNavigation.navigate('Modal', {context: 'anna'});
        }}
      />
    </View>
  );
};
