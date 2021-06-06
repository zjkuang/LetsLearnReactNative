import {NativeModules, Platform} from 'react-native';

interface NativeModuleDemoIos {
  test: (input: string, justReject: boolean) => Promise<string>;
  setTimer: (milliSeconds: number, async: boolean) => Promise<number>;
}

interface NativeModuleDemoAndroid {
  test: (input: string, justReject: boolean) => Promise<string>;
  setTimer: (milliSeconds: number, async: boolean) => Promise<number>;
}

const BaseIosModule: NativeModuleDemoIos = NativeModules.NativeDemo;
const BaseAndroidModule: NativeModuleDemoAndroid = NativeModules.NativeDemo;

interface NativeModuleDemo {
  test: (input: string, justReject: boolean) => Promise<string>;
  setTimer: (milliSeconds: number, async: boolean) => Promise<number>;
}

export const NativeModuleDemo: NativeModuleDemo = {
  test: async (input: string, justReject: boolean) => {
    if (Platform.OS === 'ios') {
      return BaseIosModule.test(input, justReject);
    } else if (Platform.OS === 'android') {
      return BaseAndroidModule.test(input, justReject);
    } else {
      return Promise.reject(`Unsupported platform: ${Platform.OS}`);
    }
  },
  setTimer: async (milliSeconds: number, async: boolean) => {
    if (Platform.OS === 'ios') {
      return BaseIosModule.setTimer(milliSeconds, async);
    } else if (Platform.OS === 'android') {
      return BaseAndroidModule.setTimer(milliSeconds, async);
    } else {
      return Promise.reject(`Unsupported platform: ${Platform.OS}`);
    }
  },
};
