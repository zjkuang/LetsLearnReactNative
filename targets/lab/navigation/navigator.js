import {StackActions, CommonActions} from '@react-navigation/native';

// JavaScript example: https://github.com/zjkuang/react-native-split-view-demo

class Navigator {
  navigator = null;

  setNavigator = navigatorInstance => {
    this.navigator = navigatorInstance;
  };

  isMounted = () => Boolean(this.navigator);

  dispatch = action => {
    this.navigator.dispatch(action);
  };

  navigate = (screenName, params) =>
    this.dispatch(CommonActions.navigate({name: screenName, params}));

  push = (screenName, params) =>
    this.dispatch(StackActions.push(screenName, params));
}

export default Navigator;
