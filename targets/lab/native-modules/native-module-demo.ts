import {NativeModules} from 'react-native';

export interface TimeOutResult {
  timeOut: string;
}

interface NativeModuleDemo {
  test: (input: string, justReject: boolean) => Promise<string>;
  fetchLocalValue: () => Promise<number>;
  putLocalValue: (newValue: number) => Promise<number>;
  setTimer: (milliSeconds: number, async: boolean) => Promise<TimeOutResult>;
}

const BaseNativeModule: NativeModuleDemo = NativeModules.NativeDemo;

export const NativeModuleDemo: NativeModuleDemo = {
  test: async (input: string, justReject: boolean) => {
    return BaseNativeModule.test(input, justReject);
  },
  fetchLocalValue: async () => {
    return BaseNativeModule.fetchLocalValue();
  },
  putLocalValue: async (newValue: number) => {
    return BaseNativeModule.putLocalValue(newValue);
  },
  setTimer: async (milliSeconds: number, async: boolean) => {
    return BaseNativeModule.setTimer(milliSeconds, async);
  },
};
