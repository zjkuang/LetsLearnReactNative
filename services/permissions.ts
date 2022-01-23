import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export function requestUserPermission() {
  // No need to ask user permission on Android
  if (Platform.OS === 'ios') {
    messaging()
      .requestPermission()
      .then(authorizationStatus => {
        console.log(
          'messaging().requestPermission() status:',
          authorizationStatus,
        );
      })
      .catch(reason => {
        console.log(
          'messaging().requestPermission() failed. reason:',
          JSON.stringify(reason),
        );
      });
  }
}
