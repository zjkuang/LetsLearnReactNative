# LetsLearnReactNative

## Setup

(1) Clone this repository to your local machine
```
git clone https://github.com/zjkuang/LetsLearnReactNative.git
```

(2) Install Firebase configuration files

This app was configured to the author's personal Firebase project. If you want to run it on your own, you will have to create your own Firebase project and add this app to it with your own app id.

(2.1) Google service configuration files  
Go to https://console.firebase.google.com  
Choose `MyServerNodeTS`  
From the left side main menu choose `Project Overview` / `Project settings`  

<img width="426" alt="Firebase-ProjectOverview-ProjectSettings" src="https://user-images.githubusercontent.com/46003022/199762735-0b4931f3-2137-43ee-a506-ca80dc8f3f85.png">  

In `Project settings` / `General` tab, `Your apps` section,  
 - Download google-services.json from `Android apps` / `LetsLearnReactNative` and put it at `android/app` folder
 - Download GoogleService-Info.plist from `iOS apps` / `LetsLearnReactNative` and put it at `ios/LetsLearnReactNative` folder

Without installing Firebase configuration files you will see build errors, e.g. on iOS  

<img width="260" alt="missing-GoogleService-info-plist" src="https://user-images.githubusercontent.com/46003022/199759062-cb6b148b-43e8-4cd3-aea6-8605d2ca4848.png">  

and on Android
```
Execution failed for task ':app:processDebugGoogleServices'.
> File google-services.json is missing. The Google Services Plugin cannot function without it.
```

(2.2) `secrets.json`  
If in the app's root folder there is NOT a `secrets.json` file, you need to create one:
```
touch secrets.json
```
Then following https://github.com/zjkuang/LetsLearnReactNative/blob/bb6c069fcfafd145f9aaba3de66198ccfc2c4b5a/services/Firebase/firebase.ts#L6-L41 set up the secrets in `secrets.json`

(3) Build and run
```
cd LetsLearnReactNative
```
```
yarn
```
```
yarn pod
```
(In a new Terminal session)
```
yarn start
```
(Back to the previous Terminal session)
```
yarn ios
```
```
yarn android
```
