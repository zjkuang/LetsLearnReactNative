import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {QuickTestButton} from '../../../common/components/widgets';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {KristoffDetailsView} from '../demo/kristoff-stack/kristoff-details';
import {ExampleContext} from '../context/example-context';

type KristoffStackParamList = {
  Kristoff?: {}; // navigation root
  KristoffDetails?: {};
  // more navigation children can be added here
};
type KristoffStackNavitationProp = StackNavigationProp<KristoffStackParamList>;
const KristoffStack = createStackNavigator<KristoffStackParamList>();
export const KristoffNavigationView = () => {
  const test = true;
  return (
    <KristoffStack.Navigator>
      {test ? (
        <KristoffStack.Screen
          name="Kristoff"
          children={() => [<KristoffView key={0} test={'test'} />]}
        />
      ) : (
        <KristoffStack.Screen name="Kristoff" component={KristoffView} />
      )}

      <KristoffStack.Screen
        name="KristoffDetails"
        component={KristoffDetailsView}
      />
    </KristoffStack.Navigator>
  );
};

type KristoffViewProp = {
  test?: string;
};
const KristoffView = (props: KristoffViewProp) => {
  const navigation = useNavigation<KristoffStackNavitationProp>();

  const {exampleContextValue} = React.useContext(ExampleContext);
  const [refresh, setRefresh] = React.useState(0);

  const title = 'Kristoff';

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
          navigation.push('KristoffDetails');
        }}
      />
    </View>
  );
};
