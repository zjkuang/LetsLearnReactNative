import {StackActions, CommonActions} from '@react-navigation/native';

class Navigator {
  navigator = undefined;

  setNavigator = navigatorInstance => {
    this.navigator = navigatorInstance;
  };

  isMounted = () => !!this.navigator;

  dispatch = action => {
    this.navigator?.dispatch(action);
  };

  navigate = (screenName, params) =>
    this.dispatch(CommonActions.navigate({name: screenName, params}));

  push = (screenName, params) =>
    this.dispatch(StackActions.push(screenName, params));
}

export default Navigator;
