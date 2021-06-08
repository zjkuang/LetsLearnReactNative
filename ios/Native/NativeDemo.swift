//
//  NativeDemo.swift
//  LetsLearnReactNative
//
//  Created by Zhengqian Kuang on 2021-06-05.
//

import Foundation

fileprivate enum NativeDemoEvent: String, CaseIterable {
  case timeOut
}

fileprivate enum NativeDemoError: Error {
  case testReject
  case invalidValue
  
  var code: String {
    switch self {
    case .testReject:
      return "testReject"
    case .invalidValue:
      return "invalidValue"
    }
  }
  
  var message: String {
    switch self {
    case .testReject:
      return "testReject"
    case .invalidValue:
      return "invalidValue"
    }
  }
}

@objc(NativeDemo)
class NativeDemo: RCTEventEmitter {
  override func supportedEvents() -> [String]! {
    return NativeDemoEvent.allCases.map { $0.rawValue };
  }
  
  @objc(test:justReject:resolve:reject:)
  func test(input: String, justReject: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    if (justReject) {
      let error: NativeDemoError = .testReject
      reject(error.code, error.message, error);
      return
    }
    
    resolve("Response from native iOS to JavaScript app's input '\(input)'");
  }
  
  @objc(setTimer:async:resolve:reject:)
  func setTimer(milliSeconds: Int, async: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    guard milliSeconds >= 0 else {
      let error: NativeDemoError = .invalidValue
      reject(error.code, error.message, error)
      return
    }
    
    if (async) {
      DispatchQueue.main.asyncAfter(deadline: .now() + .milliseconds(milliSeconds)) {
        resolve(milliSeconds);
      }
      return
    }
    
    DispatchQueue.main.asyncAfter(deadline: .now() + .milliseconds(milliSeconds)) {
      self.sendEvent(withName: NativeDemoEvent.timeOut.rawValue, body: milliSeconds)
    }
  }
}
