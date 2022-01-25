import {Platform} from 'react-native';
import Firebase from '@react-native-firebase/app';

export const initializeFirebase = async () => {
  const config = require('../../secrets.json').Firebase;
  // secrets.json is located in the root folder of this app and is added to .gitignore
  // When the repo is cloned to a new machine, create secrets.json locally and, to resume the Firebase configuration:
  // (Go to Firebase console, open project LetsLearnReactNative, click on the android/ios app and then the gear icon for settings,)
  //  - apiKey:
  //      https://firebase.google.com/docs/projects/api-keys
  //      for ios, GoogleService-Info.plist, API_KEY field
  //      for android, google-services.json, current_key field
  //  - appId:
  //      Firebase console, App ID
  //      for ios, something like "1:************:ios:**********************"
  //      for android, something like "1:************:android:**********************"
  //  - messagingSenderId:
  //      Firebase console, Project number, a 12-digit number
  //  - projectId:
  //      irebase console, Project ID, "letslearnreactnative"
  // In secret.json,
  // {
  //   "Firebase": {
  //     "apiKey": {
  //       "android": "<android-api-key>",
  //       "ios": "<ios-api-key>"
  //     },
  //     "appId": {
  //       "android": "<android-app-id>",
  //       "ios": "<ios-app-id>"
  //     },
  //     "messagingSenderId": "<messagingSenderId>",
  //     "projectId": "letslearnreactnative"
  //   }
  // }
  //
  // IMPORTANT! Also, since API key is contained in GoogleService-Info.plist (ios) and google-service.json (android),
  // these 2 files are also added to .gitignore, to retrieve them, download them from Firebase console and put
  //  - GoogleService-Info.plist in ios/LetsLearnReactNative/
  //  - google-service.json in android/app/
  //
  if (!Firebase.app()) {
    const apiKey =
      Platform.OS === 'android' ? config.apiKey.android : config.apiKey.ios;
    const appId =
      Platform.OS === 'android' ? config.appId.android : config.appId.ios;
    await Firebase.initializeApp({
      apiKey,
      appId,
      databaseURL: '',
      messagingSenderId: config.messagingSenderId,
      projectId: config.projectId,
      storageBucket: '',
    });
  }
};
