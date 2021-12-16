import React from 'react';
import {View, Text} from 'react-native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../../root';
import {MockNavigationHeader} from '../../../../../common/components/widgets';
import {EdifProfileScreen} from './edit';
import {styles} from './style';
import {commonStyles} from '../style';

export type ProfileNavigationParamList = {
  ViewProfile?: {}; // navigation root
  EditProfile?: {};
  // more navigation children can be added here
};
export type ProfileNavitationProp =
  StackNavigationProp<ProfileNavigationParamList>;
const ProfileStack = createStackNavigator<ProfileNavigationParamList>();
export const ProfileNavigator = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onViewProfileClose = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ViewProfile"
        children={() => [
          <ViewProfileScreen key={0} onClose={onViewProfileClose} />,
        ]}
      />
      <ProfileStack.Screen name="EditProfile" component={EdifProfileScreen} />
    </ProfileStack.Navigator>
  );
};

type ViewProfileScreenProp = {
  onClose: () => void;
};
const ViewProfileScreen = (prop: ViewProfileScreenProp) => {
  const profileNavigation = useNavigation<ProfileNavitationProp>();
  React.useEffect(() => {
    profileNavigation.setOptions({
      headerShown: false,
    });
  }, [profileNavigation]);

  const onClose = React.useCallback(() => {
    prop.onClose();
  }, [prop]);

  const onEditProfile = React.useCallback(() => {
    profileNavigation.navigate('EditProfile');
  }, [profileNavigation]);

  return (
    <View style={styles.baseView}>
      <MockNavigationHeader
        title={'Profile'}
        leftItem={<Text style={commonStyles.iOSButton}>Close</Text>}
        rightItem={<Text style={commonStyles.iOSButton}>Edit</Text>}
        onPressLeftItem={onClose}
        onPressRightItem={onEditProfile}
      />
      <Text>To be implemented...</Text>
    </View>
  );
};
