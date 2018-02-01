import { configService, userService } from '../core';

var menuService = {
  get(user) {
    let menuConfigs = configService.get('uiConfig.menu');
    for (var key of Object.keys(menuConfigs)) {
      if (key == '*') {
        return menuConfigs[key];
      }
      if (userService.hasRole(user, key)) {
        return menuConfigs[key];
      }
    }
    return {};
  }
};

export { menuService };
