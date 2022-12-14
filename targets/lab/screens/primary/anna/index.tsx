import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {useNavigation, DrawerActions, useIsFocused} from '@react-navigation/native';
import {AnnaDetailsScreen, AnnaDetailsScreenParamList} from './anna-details';
import {ExampleContext} from '../../../context/example-context';
import {QuickTestButton} from '../../../../../common/components/widgets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconTableOfContents} from '../../../../../common/components/icons';
import {styles} from './style';

export type AnnaNavigationParamList = {
  Anna: {}; // navigation root
  AnnaDetails: AnnaDetailsScreenParamList;
  // more navigation children can be added here
};
export type AnnaNavitationProp = StackNavigationProp<AnnaNavigationParamList>;
const AnnaStack = createStackNavigator<AnnaNavigationParamList>();
export const AnnaNavigator = () => {
  const test = true;
  return (
    <AnnaStack.Navigator>
      {test ? (
        <AnnaStack.Screen
          name="Anna"
          children={() => [<AnnaScreen key={0} test={'test'} />]}
        />
      ) : (
        <AnnaStack.Screen name="Anna" component={AnnaScreen} />
      )}

      <AnnaStack.Screen name="AnnaDetails" component={AnnaDetailsScreen} />
    </AnnaStack.Navigator>
  );
};

type AnnaScreenProp = {
  test?: string;
};
const AnnaScreen = (props: AnnaScreenProp) => {
  const navigation = useNavigation<AnnaNavitationProp>();
  const localStackNavigation = useNavigation<AnnaNavitationProp>();
  const generalNavigation = useNavigation();

  const {exampleContextValue} = React.useContext(ExampleContext);
  const [refresh, setRefresh] = React.useState(0);

  const title = 'Anna';

  React.useEffect(() => {
    console.log(`${title} props.test=${props.test}`);
  }, [props]);

  React.useEffect(() => {
    const unsubscribeFocus = generalNavigation.addListener('focus', () => {
      console.log('Anna focus');
    });
    const unsubscribeBlur = generalNavigation.addListener('blur', () => {
      console.log('Anna blur');
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [generalNavigation]);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    console.log(`useIsFocused() returns ${isFocused}`);
  }, [isFocused]);

  const onOpenDrawer = React.useCallback(() => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.navigationHeaderLeft}
          onPress={() => {
            onOpenDrawer();
          }}>
          <IconTableOfContents />
        </TouchableOpacity>
      ),
      title: title,
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation, onOpenDrawer]);

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
    </View>
  );
};
