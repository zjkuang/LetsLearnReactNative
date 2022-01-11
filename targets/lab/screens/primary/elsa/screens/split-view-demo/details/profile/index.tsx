import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ExampleSplitViewContext} from '../../../../../../../context/example-split-view-context';
import {QuickTestButton} from '../../../../../../../../../common/components/widgets';
import {DetailsNavigationProp} from '..';
import {styles} from './style';

export type ProfileScreenParamList = {
  //
};
export const ProfileScreen = () => {
  const detailsNavigation = useNavigation<DetailsNavigationProp>();
  const {exampleSplitViewContextValue} = React.useContext(
    ExampleSplitViewContext,
  );

  React.useLayoutEffect(() => {
    detailsNavigation.setOptions({
      title: exampleSplitViewContextValue.selectedItemInMain,
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [detailsNavigation, exampleSplitViewContextValue.selectedItemInMain]);

  const intro = React.useMemo(() => {
    const value: Record<string, string> = {
      Anna: "Anna of Arendelle is a fictional character who appears in Walt Disney Animation Studios' 53rd animated film Frozen and its sequel and 58th animated film Frozen II. She is voiced by Kristen Bell as an adult.",
      Kristoff:
        "Kristoff Bjorgman is a fictional character in Walt Disney Animation Studios' Frozen franchise. He appeared in the animated features Frozen and Frozen II, and the animated short films Frozen Fever and Olaf's Frozen Adventure. He is voiced primarily by Jonathan Groff.",
      Olaf: "Olaf is a fictional character from Disney's Frozen franchise, produced by Walt Disney Animation Studios. Olaf is first presented in the 53rd animated film Frozen as an inanimate snowman created by Elsa and Anna in their childhood.",
      Sven: 'Sven is a fictional character who most prominently appears in the 53rd animated film Frozen and its sequel and 58th animated film Frozen II, produced by Walt Disney Animation Studios. He is a reindeer that lives together with his companion, Kristoff.',
    };
    return value;
  }, []);

  return (
    <View style={styles.baseView}>
      <Text style={styles.intro}>
        {intro[exampleSplitViewContextValue.selectedItemInMain || ''] || ''}
      </Text>
      <QuickTestButton
        title={'Avatar'}
        onPress={() => {
          detailsNavigation.push('Avatar', {});
        }}
      />
    </View>
  );
};
