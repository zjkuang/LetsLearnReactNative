package com.letslearnreactnative;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.letslearnreactnative.nativemoduledemo.NativeModuleDemo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


////////////////////////////////////////////////////////////////
//
// *** *** *** *** IMPORTANT!!! *** *** *** ***
//
// DON'T FORGET TO ADD THIS PACKAGE IN MainApplications.java
//   packages.add(new NativeModulesPackage());
//
////////////////////////////////////////////////////////////////

// We need only one package to add all the native modules

public class NativeModulesPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new NativeModuleDemo(reactContext));

        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
