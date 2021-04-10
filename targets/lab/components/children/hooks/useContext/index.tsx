/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text, View} from 'react-native';
import {QuickTestButton} from '../../../../../../common/components/widgets';
import {styles, commonStyles} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaStackParamList} from '../../../primary/elsa/index';
import {
  ExampleContext,
  exampleContextGetNextColorForBackground,
} from '../../../../context/example-context';
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

  const onPressSwitchBackgroundColor = () => {
    const newExampleContextValue = {
      ...exampleContextValue,
    };
    newExampleContextValue.backgroundColor = exampleContextGetNextColorForBackground(
      exampleContextValue.backgroundColor,
    );
    setExampleContextValue(newExampleContextValue);
  };

  const onPressToggleBottomMask = () => {
    const newExampleContextValue = {
      ...exampleContextValue,
    };
    let bottomMask = exampleContextValue.bannerMask ?? {
      show: false,
    };
    bottomMask.text = 'Toggle off from Elsa/Hooks/useContext';
    bottomMask.backgroundColor = 'rgba(255, 255, 0, 0.5)';
    bottomMask.textColor = 'red';
    bottomMask.show = !bottomMask.show;
    newExampleContextValue.bannerMask = bottomMask;
    setExampleContextValue(newExampleContextValue);
  };

  const onPressSaveSwitch = () => {
    const newExampleContextValue = {
      ...exampleContextValue,
    };
    newExampleContextValue.persisted = !newExampleContextValue.persisted;
    setExampleContextValue(newExampleContextValue);
  };

  const magicNumber = 2021;

  return (
    <View
      style={[
        styles.baseView,
        {backgroundColor: exampleContextValue.backgroundColor},
      ]}>
      <View style={styles.groupContainter}>
        <View style={styles.horizontalContainer}>
          <QuickTestButton title={'-'} onPress={onPressMinus} />
          <Text>{`ExampleContext.count: ${exampleContextValue.count}`}</Text>
          <QuickTestButton title={'+'} onPress={onPressPlus} />
          <QuickTestButton title={'Reset'} onPress={onPressReset} />
        </View>

        <QuickTestButton
          title={`ExampleContext.count = ${magicNumber}`}
          onPress={() => {
            exampleContextValue.count = magicNumber;
          }}
        />
      </View>

      <View style={styles.groupContainter}>
        <View style={styles.horizontalContainer}>
          <Text style={styles.horizontalChild}>
            {`Background Color: ${exampleContextValue.backgroundColor}`}
          </Text>

          <TouchableOpacity
            style={styles.horizontalChild}
            onPress={onPressSwitchBackgroundColor}>
            <Text style={commonStyles.textAs_iOS_Button}>Switch</Text>
          </TouchableOpacity>
        </View>

        <QuickTestButton
          title={"ExampleContext.backgroundColor = 'transparent'"}
          onPress={() => {
            exampleContextValue.backgroundColor = 'transparent';
          }}
        />

        <QuickTestButton
          title={"ExampleContext.backgroundColor = 'cyan'"}
          onPress={() => {
            exampleContextValue.backgroundColor = 'cyan';
          }}
        />

        <QuickTestButton
          title={"ExampleContext.backgroundColor = 'pink'"}
          onPress={() => {
            exampleContextValue.backgroundColor = 'pink';
          }}
        />
      </View>

      <View style={styles.groupContainter}>
        <QuickTestButton
          title={'Refresh'}
          onPress={() => {
            setRefresh(refresh + 1);
          }}
        />
      </View>

      <View style={styles.groupContainter}>
        <QuickTestButton
          title={'Toggle Bottom Mask'}
          onPress={() => {
            onPressToggleBottomMask();
          }}
        />
      </View>

      <View style={styles.groupContainter}>
        <View style={styles.horizontalContainer}>
          <Text style={styles.horizontalChild}>{`Save: ${
            exampleContextValue.persisted === true ? 'ON' : 'OFF'
          }`}</Text>

          <TouchableOpacity
            style={styles.horizontalChild}
            onPress={onPressSaveSwitch}>
            <Text style={commonStyles.textAs_iOS_Button}>Switch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
