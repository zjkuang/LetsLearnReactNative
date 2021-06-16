import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {QuickTestButton} from '../../../../../common/components/widgets';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {SvenDetailsView} from '../../children/navigation/stack/details/sven-details';
import {ExampleContext} from '../../../context/example-context';

type SvenStackParamList = {
  Sven?: {}; // navigation root
  SvenDetails?: {};
  // more navigation children can be added here
};
type SvenStackNavitationProp = StackNavigationProp<SvenStackParamList>;
const SvenStack = createStackNavigator<SvenStackParamList>();
export const SvenNavigationView = () => {
  const test = true;
  return (
    <SvenStack.Navigator>
      {test ? (
        <SvenStack.Screen
          name="Sven"
          children={() => [<SvenView key={0} test={'test'} />]}
        />
      ) : (
        <SvenStack.Screen name="Sven" component={SvenView} />
      )}

      <SvenStack.Screen name="SvenDetails" component={SvenDetailsView} />
    </SvenStack.Navigator>
  );
};

type SvenViewProp = {
  test?: string;
};
const SvenView = (props: SvenViewProp) => {
  const navigation = useNavigation<SvenStackNavitationProp>();
  const generalNavigation = useNavigation();

  const {exampleContextValue} = React.useContext(ExampleContext);
  const [refresh, setRefresh] = React.useState(0);

  const title = 'Sven';

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
      console.log('Sven focus');
    });
    const unsubscribeBlur = generalNavigation.addListener('blur', () => {
      console.log('Sven blur');
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
          navigation.push('SvenDetails');
        }}
      />
    </View>
  );
};
