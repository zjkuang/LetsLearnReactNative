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
        // Error: [messaging/unknown] java.io.IOException: java.util.concurrent.ExecutionException: java.io.IOException: FIS_AUTH_ERROR
        //  - Solution: https://stackoverflow.com/a/68237809/7455975
        console.log(
          'messaging().getToken() failed. reason:',
          JSON.stringify(reason),
        );
        reject(reason);
      });
  });
}