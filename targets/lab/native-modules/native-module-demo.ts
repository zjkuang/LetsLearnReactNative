import {NativeModules} from 'react-native';

interface TimeOutResult {
  timeOut: string;
}

interface NativeModuleDemo {
  test: (input: string, justReject: boolean) => Promise<string>;
  setTimer: (milliSeconds: number, async: boolean) => Promise<TimeOutResult>;
}

const BaseNativeModule: NativeModuleDemo = NativeModules.NativeDemo;

export const NativeModuleDemo: NativeModuleDemo = {
  test: async (input: string, justReject: boolean) => {
    return BaseNativeModule.test(input, justReject);
  },
  setTimer: async (milliSeconds: number, async: boolean) => {
    return BaseNativeModule.setTimer(milliSeconds, async);
  },
};
