import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {QuickTestButton} from '../../../../../../../../../../common/components/widgets';
import {InModalNavitationProp} from '..';
import {styles} from './style';

type MainScreenProps = {
  test?: string;
};
export const MainScreen = (props: MainScreenProps) => {
  const navigation = useNavigation<InModalNavitationProp>();

  const title = 'Main';

  React.useEffect(() => {
    console.log(`${title} props.test=${props.test}`);
  }, [props]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.baseView}>
      {props.test && <Text>{props.test}</Text>}
      <QuickTestButton
        title={'Show Details'}
        onPress={() => {
          navigation.push('Details', {generation: 1});
        }}
      />
    </View>
  );
};
