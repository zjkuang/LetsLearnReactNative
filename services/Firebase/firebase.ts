import {Platform} from 'react-native';
import Firebase from '@react-native-firebase/app';

export const initializeFirebase = async () => {
  if (!Firebase.app()) {
    const appId =
      Platform.OS === 'android'
        ? '1:923869176293:android:239eb72d2b6a657def8f0c'
        : '1:923869176293:ios:c0db4c6788edeafaef8f0c';
    await Firebase.initializeApp({
      apiKey: 'AIzaSyDq68qBkJemZqtcVv0YuYECDLGkhPEHaug',
      appId,
      databaseURL: '',
      messagingSenderId: '923869176293',
      projectId: 'letslearnreactnative',
      storageBucket: '',
    });
  }
};
