/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text, View} from 'react-native';
import {styles, color} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaStackParamList} from '../../../elsa/index';
import {ExampleContext} from '../../../../context/example-context';
import {TouchableOpacity} from 'react-native-gesture-handler';

type ViewProps = StackScreenProps<ElsaStackParamList, 'UseContextDemo'>;
export const DemoUseContextView = ({navigation, route}: ViewProps) => {
  const {exampleContextValue, setExampleContextValue} = React.useContext(
    ExampleContext,
  );

  React.useLayoutEffect(() => {
    console.log(`${route.params.name} useLayoutEffect`);

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

  return (
    <View style={styles.baseView}>
      <Text>ExampleContext.count</Text>

      <TouchableOpacity onPress={onPressPlus}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>+</Text>
      </TouchableOpacity>

      <Text>{exampleContextValue.count}</Text>

      <TouchableOpacity onPress={onPressMinus}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>-</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressReset}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>Reset</Text>
      </TouchableOpacity>

      <View style={styles.horizontalContainer}>
        <Text style={styles.horizontalChild}>Save</Text>

        <TouchableOpacity
          style={styles.horizontalChild}
          onPress={onPressSaveSwitch}>
          <Text style={{color: color.iOSButtonColorLightTheme}}>
            {exampleContextValue.persisted ? 'ON' : 'OFF'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
