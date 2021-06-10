package com.letslearnreactnative.nativemoduledemo;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Timer;
import java.util.TimerTask;

class NativeModuleDemoEvent {
    enum EVENT {
        timeOut
    }

    public EVENT event;

    NativeModuleDemoEvent(EVENT event) {
        this.event = event;
    }

    public String string() {
        switch (this.event) {
            case timeOut:
                return "timeOut";
        }
        return "";
    }
}

class NativeModuleDemoReject {
    enum REJECT {
        TEST_REJECT,
        INVALID_VALUE
    }

    public REJECT reject;

    NativeModuleDemoReject(REJECT reject) {
        this.reject = reject;
    }

    public String code() {
        switch (this.reject) {
            case TEST_REJECT:
                return "testReject";
            case INVALID_VALUE:
                return "invalidValue";
        }
        return "";
    }

    public String message() {
        switch (this.reject) {
            case TEST_REJECT:
                return "testReject";
            case INVALID_VALUE:
                return "invalidValue";
        }
        return "";
    }
}

public class NativeModuleDemo extends ReactContextBaseJavaModule {
    private ReactContext reactContext = null;

    @NonNull
    @Override
    public String getName() {
        return "NativeDemo";
    }

    public NativeModuleDemo(ReactApplicationContext reactAppContext) {
        super(reactAppContext);

        this.reactContext = reactAppContext;
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @ReactMethod
    public void test(String input, boolean justReject, Promise promise) {
        if (justReject) {
            NativeModuleDemoReject reject = new NativeModuleDemoReject(NativeModuleDemoReject.REJECT.TEST_REJECT);
            promise.reject(reject.code(), reject.message());
            return;
        }

        promise.resolve(String.format("Response from native Android to JavaScript app's input '%s'", input));
    }

    @ReactMethod
    public void setTimer(Integer milliSeconds, boolean async, Promise promise) {
        if (milliSeconds < 0) {
            NativeModuleDemoReject reject = new NativeModuleDemoReject(NativeModuleDemoReject.REJECT.INVALID_VALUE);
            promise.reject(reject.code(), reject.message());
            return;
        }

        NativeModuleDemoEvent event = new NativeModuleDemoEvent(NativeModuleDemoEvent.EVENT.timeOut);
        WritableMap params = Arguments.createMap();
        params.putString("milliseconds", String.format("%d", milliSeconds));

        if (async) {
            new Timer().schedule(new TimerTask() {
                @Override
                public void run() {
                    promise.resolve(params);
                }
            }, milliSeconds);
            return;
        }

        ReactContext reactContext = this.reactContext;
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                sendEvent(reactContext, event.string(), params);
            }
        }, milliSeconds);
    }
}
