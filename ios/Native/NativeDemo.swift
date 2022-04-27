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
  private var localValue: Int = 0 // to test if the native module is a singleton or an individual instance
  
  override func supportedEvents() -> [String]! {
    return NativeDemoEvent.allCases.map { $0.rawValue }
  }
  
  @objc(test:justReject:resolve:reject:)
  func test(input: String, justReject: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    if (justReject) {
      let error: NativeDemoError = .testReject
      reject(error.code, error.message, error)
      return
    }
    
    resolve("Response from native iOS to JavaScript app's input '\(input)'")
  }
  
  @objc(fetchLocalValue:reject:)
  func fetchLocalValue(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    resolve(self.localValue)
  }
  
  @objc(putLocalValue:resolve:reject:)
  func putLocalValue(newValue: Int, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    self.localValue = newValue
    resolve(self.localValue)
  }
  
  @objc(setTimer:async:resolve:reject:)
  func setTimer(milliSeconds: Int, async: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    guard milliSeconds >= 0 else {
      let error: NativeDemoError = .invalidValue
      reject(error.code, error.message, error)
      return
    }
    
    let result = NSMutableDictionary()
    result["timeOut"] = "\(milliSeconds)"
    
    if (async) {
      DispatchQueue.main.asyncAfter(deadline: .now() + .milliseconds(milliSeconds)) {
        resolve(result)
      }
      return
    }
    
    DispatchQueue.main.asyncAfter(deadline: .now() + .milliseconds(milliSeconds)) {
      self.sendEvent(withName: NativeDemoEvent.timeOut.rawValue, body: result)
    }
  }
}
