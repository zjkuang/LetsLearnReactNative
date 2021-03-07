/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text, View} from 'react-native';
import {QuickTestButton} from '../../../common/widgets';
import {styles, commonStyles} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaStackParamList} from '../../../elsa/index';
import {ExampleContext} from '../../../../context/example-context';
import {TouchableOpacity} from 'react-native-gesture-handler';

type ViewProps = StackScreenProps<ElsaStackParamList, 'UseContextDemo'>;
export const DemoUseContextView = ({navigation, route}: ViewProps) => {
  const {exampleContextValue, setExampleContextValue} = React.useContext(
    ExampleContext,
  );
  const [refresh, setRefresh] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.title}`,
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    console.log(
      `${route.params.name} componentDidMount -- this is true only when the dependencies is []`,
    );

    return () => {
      console.log(`${route.params.name} componentWillUnmount`);
    };
  }, []);

  const onPressPlus = () => {
    const newExampleContextValue = {
      ...exampleContextValue,
    };
    newExampleContextValue.count += 1;
    setExampleContextValue(newExampleContextValue);
  };

  const onPressMinus = () => {
    const newExampleContextValue = {
      ...exampleContextValue,
    };
    if (newExampleContextValue.count > 0) {
      newExampleContextValue.count -= 1;
    }
    setExampleContextValue(newExampleContextValue);
  };

  const onPressReset = () => {
    const newExampleContextValue = {
      ...exampleContextValue,
    };
    newExampleContextValue.count = 0;
    setExampleContextValue(newExampleContextValue);
  };

  const onPressSaveSwitch = () => {
    const newExampleContextValue = {
      ...exampleContextValue,
    };
    newExampleContextValue.persisted = !newExampleContextValue.persisted;
    setExampleContextValue(newExampleContextValue);
  };

  const magicNumber = 2013303608;

  return (
    <View style={styles.baseView}>
      <View style={styles.horizontalContainer}>
        <QuickTestButton title={'-'} onPress={onPressMinus} />
        <Text>{`ExampleContext.count: ${exampleContextValue.count}`}</Text>
        <QuickTestButton title={'+'} onPress={onPressPlus} />
      </View>

      <QuickTestButton title={'Reset'} onPress={onPressReset} />

      <QuickTestButton
        title={`Override ExampleContext.count with ${magicNumber}`}
        onPress={() => {
          exampleContextValue.count = magicNumber;
          setRefresh(refresh + 1);
        }}
      />

      <View style={styles.horizontalContainer}>
        <Text style={styles.horizontalChild}>Save</Text>

        <TouchableOpacity
          style={styles.horizontalChild}
          onPress={onPressSaveSwitch}>
          <Text style={commonStyles.textAs_iOS_Button}>
            {exampleContextValue.persisted === true ? 'ON' : 'OFF'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
