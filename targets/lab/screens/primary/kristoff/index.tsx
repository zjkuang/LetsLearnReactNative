import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {QuickTestButton} from '../../../../../common/components/widgets';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {KristoffDetailsScreen} from './kristoff-details';
import {ExampleContext} from '../../../context/example-context';

type KristoffNavigationParamList = {
  Kristoff?: {}; // navigation root
  KristoffDetails?: {};
  // more navigation children can be added here
};
type KristoffStackNavitationProp =
  StackNavigationProp<KristoffNavigationParamList>;
const KristoffStack = createStackNavigator<KristoffNavigationParamList>();
export const KristoffNavigator = () => {
  const test = true;
  return (
    <KristoffStack.Navigator>
      {test ? (
        <KristoffStack.Screen
          name="Kristoff"
          children={() => [<KristoffScreen key={0} test={'test'} />]}
        />
      ) : (
        <KristoffStack.Screen name="Kristoff" component={KristoffScreen} />
      )}

      <KristoffStack.Screen
        name="KristoffDetails"
        component={KristoffDetailsScreen}
      />
    </KristoffStack.Navigator>
  );
};

type KristoffScreenProp = {
  test?: string;
};
const KristoffScreen = (props: KristoffScreenProp) => {
  const navigation = useNavigation<KristoffStackNavitationProp>();
  const generalNavigation = useNavigation();

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

  React.useEffect(() => {
    const unsubscribeFocus = generalNavigation.addListener('focus', () => {
      console.log('Kristoff focus');
    });
    const unsubscribeBlur = generalNavigation.addListener('blur', () => {
      console.log('Kristoff blur');
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
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
          navigation.push('KristoffDetails');
        }}
      />
    </View>
  );
};
