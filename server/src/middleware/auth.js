import { userService } from '../service';

function ensureLogined(isUrlNeedLogined) {
  return function(req, res, next) {
    if (!req.user && (!isUrlNeedLogined || isUrlNeedLogined(req.url))) {
      res.sendStatus(401);
      return;
    }
    next();
  }
}

function ensureHasAdminRole(isUrlNeedAdminRole) {
  return function(req, res, next) {
    if ((!req.user || !userService.hasRole(req.user, 'admin')) && (!isUrlNeedAdminRole || isUrlNeedAdminRole(req.url))) {
      res.sendStatus(401);
      return;
    }
    next();
  }
}

export { ensureLogined, ensureHasAdminRole };
