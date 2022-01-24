import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

export function requestUserPermission(): Promise<
  [boolean, FirebaseMessagingTypes.AuthorizationStatus]
> {
  return new Promise((resolve, reject) => {
    messaging()
      .requestPermission()
      .then(authorizationStatus => {
        console.log(
          'messaging().requestPermission() status:',
          authorizationStatus,
        );
        resolve([
          authorizationStatus ===
            FirebaseMessagingTypes.AuthorizationStatus.AUTHORIZED,
          authorizationStatus,
        ]);
      })
      .catch(reason => {
        console.log(
          'messaging().requestPermission() failed. reason:',
          JSON.stringify(reason),
        );
        reject(reason);
      });
  });
}

export function getCloudMessagingToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    messaging()
      .getToken()
      .then(token => {
        console.log('messaging().getToken()', token);
        resolve(token);
      })
      .catch(reason => {
        console.log(
          'messaging().getToken() failed. reason:',
          JSON.stringify(reason),
        );
        reject(reason);
      });
  });
}
