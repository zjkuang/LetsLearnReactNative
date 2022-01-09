const Navigator = require('./navigator');

export const {
  isMounted: isDetailsNavigatorMounted,
  push: detailsPush,
  navigate: detailsNavigate,
  setNavigator: setDetailsNavigator,
} = new Navigator();
