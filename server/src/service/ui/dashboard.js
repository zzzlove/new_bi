import { configService, userService } from '../core';

var dashboardService = {
  get(user) {
    let dashboardConfigs = configService.get('uiConfig.dashboard');
    for (var key of Object.keys(dashboardConfigs)) {
      if (key == '*') {
        return dashboardConfigs[key];
      }
      if (userService.hasRole(user, key)) {
        return dashboardConfigs[key];
      }
    }
    return {};
  }
};

export { dashboardService };
