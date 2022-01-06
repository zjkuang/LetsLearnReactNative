import {StackActions, CommonActions} from '@react-navigation/native';

class Navigator {
  navigator: Navigator | undefined = undefined;

  setNavigator = (navigatorInstance: Navigator) => {
    this.navigator = navigatorInstance;
  };

  isMounted = () => !!this.navigator;

  dispatch = (action: any) => {
    this.navigator?.dispatch(action);
  };

  navigate = (screeenName: string, params?: object | undefined) =>
    this.dispatch(CommonActions.navigate({name: screeenName, params}));

  push = (screeenName: string, params?: object | undefined) =>
    this.dispatch(StackActions.push(screeenName, params));
}

export default Navigator;
