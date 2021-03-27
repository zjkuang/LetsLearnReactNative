import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {styles} from './style';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {
  AnnaDetailsView,
  AnnaDetailsViewParamList,
} from '../../children/anna-stack/anna-details';
import {RootStackNavigationProp} from '../../../root/index';
import {ExampleContext} from '../../../context/example-context';
import {QuickTestButton} from '../../../../../common/components/widgets';
import {AnnaLocalModalView} from './local-modal/index';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconTableOfContents} from '../../../../../common/components/icons';

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

  const [localModalVisible, setLocalModalVisible] = React.useState(false);

  const title = 'Anna';

  React.useEffect(() => {
    console.log(`${title} props.test=${props.test}`);
  }, [props]);

  const onShowModalReactNavigation = React.useCallback(() => {
    rootNavigation.navigate('Modal', {context: 'anna'}); // components/demo/modal-views/anna-modal
  }, [rootNavigation]);

  const onShowModalReactNative = React.useCallback(() => {
    setLocalModalVisible(true); // components/anna/local-modal
  }, []);

  const onLocalModalClose = React.useCallback(() => {
    console.log(`${title} setLocalModalVisible(false)`);
    setLocalModalVisible(false); // components/anna/local-modal
  }, []);

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

      <QuickTestButton
        title={'Show RootStack Modal (react-navigation)'}
        onPress={onShowModalReactNavigation}
      />

      <QuickTestButton
        title={'Show Local Modal (React Native)'}
        onPress={onShowModalReactNative}
      />

      {localModalVisible && (
        <AnnaLocalModalView
          visible={localModalVisible}
          onClose={onLocalModalClose}
        />
      )}
    </View>
  );
};
