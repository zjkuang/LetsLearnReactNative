import {
  StackActions,
  StackActionType,
  CommonActions,
} from '@react-navigation/native';

// JavaScript example: https://github.com/zjkuang/react-native-split-view-demo

class Navigator {
  navigator: Navigator | undefined = undefined;

  setNavigator = (navigatorInstance: Navigator) => {
    this.navigator = navigatorInstance;
  };

  isMounted = () => Boolean(this.navigator);

  dispatch = (action: StackActionType | CommonActions.Action) => {
    this.navigator!.dispatch(action);
  };

  navigate = (screenName: string, params?: object) =>
    this.dispatch(CommonActions.navigate({name: screenName, params}));

  push = (screenName: string, params?: object) =>
    this.dispatch(StackActions.push(screenName, params));
}

export default Navigator;
