import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {QuickTestButton} from '../../../../../common/components/widgets';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {SvenDetailsScreen} from './sven-details';
import {ExampleContext} from '../../../context/example-context';
import {useFocusCount} from '../test-hook';

type SvenNavigationParamList = {
  Sven?: {}; // navigation root
  SvenDetails?: {};
  // more navigation children can be added here
};
type SvenStackNavitationProp = StackNavigationProp<SvenNavigationParamList>;
const SvenStack = createStackNavigator<SvenNavigationParamList>();
export const SvenNavigator = () => {
  const test = true;
  return (
    <SvenStack.Navigator>
      {test ? (
        <SvenStack.Screen
          name="Sven"
          children={() => [<SvenScreen key={0} test={'test'} />]}
        />
      ) : (
        <SvenStack.Screen name="Sven" component={SvenScreen} />
      )}

      <SvenStack.Screen name="SvenDetails" component={SvenDetailsScreen} />
    </SvenStack.Navigator>
  );
};

type SvenScreenProp = {
  test?: string;
};
const SvenScreen = (props: SvenScreenProp) => {
  const navigation = useNavigation<SvenStackNavitationProp>();
  const generalNavigation = useNavigation();

  const {exampleContextValue} = React.useContext(ExampleContext);
  const [refresh, setRefresh] = React.useState(0);

  const title = 'Sven';

  const focusCount = useFocusCount();

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
      console.log('Sven focus:', focusCount);
    });
    const unsubscribeBlur = generalNavigation.addListener('blur', () => {
      console.log('Sven blur');
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [focusCount, generalNavigation]);

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
