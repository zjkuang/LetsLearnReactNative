//
//  NativeDemo.m
//  LetsLearnReactNative
//
//  Created by Zhengqian Kuang on 2021-06-05.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(NativeDemo, RCTEventEmitter)

RCT_EXTERN_METHOD(test:(NSString)input justReject:(BOOL)justReject resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(fetchLocalValue:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(putLocalValue:(NSInteger)newValue resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setTimer:(NSInteger)milliSeconds async:(BOOL)async resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

@end
