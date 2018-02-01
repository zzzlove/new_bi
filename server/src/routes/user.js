import { isEmptyObject, wildcardMatch } from '../utils';
import { configService, userService, menuService, dashboardService, gqlService } from '../service';


const supportSubscription = configService.get('gqlConfig.supportSubscription');
const subscriptionAuthWithConnectionParams = configService.get('gqlConfig.subscriptionAuthWithConnectionParams');

function handleUserRoutes(httpServer) {

  httpServer.get('/_api/user/info', function(req, res) {
    let menu = menuService.get(req.user);
    let dashboard = dashboardService.get(req.user);
    if (supportSubscription && !subscriptionAuthWithConnectionParams && !req.user.gqlSubscriptionAuthToken) {
      req.user.gqlSubscriptionAuthToken = gqlService.generateSubscriptionAuthToken(req.user);
    }
    let user = {
      id: req.user.id,
      name: req.user.name,
      username: req.user.username,
      roles: req.user.roles,
      profile_id: req.user.profile_id,
      fin_id: req.user.fin_id,
      ops_id: req.user.ops_id,
      sales_id: req.user.sales_id,
      fin_code: req.user.fin_code,
      ops_code: req.user.ops_code,
      sales_code: req.user.sales_code,
      fin_code_all: req.user.fin_code_all,
      ops_code_all: req.user.ops_code_all,
      sales_code_all: req.user.sales_code_all,
      product_no_all: req.user.product_no_all,
      service_no_all: req.user.service_no_all,
      company_code: req.user.company_code,
      control_ids: false,
      concerning_ids: req.user.concerning_ids,
      menu: menu,
      dashboard: dashboard,
    };
    if (!subscriptionAuthWithConnectionParams) {
      user.gqlSubscriptionAuthToken = req.user.gqlSubscriptionAuthToken;
    }
    res.setHeader('Cache-Control', 'no-store');
    res.json({ user });
  });


  httpServer.get('/_api/user/list', function(req, res) {
    if (!isEmptyObject(req.query) && !(req.query.field && req.query.keyword)) {
      res.sendStatus(404);
      return;
    }
    userService.findAll().then(function(users) {
      users = users.filter((user) => {
        if (!isEmptyObject(req.query)) {
          if (req.query.field == 'id') {
            return wildcardMatch(user.id, req.query.keyword);
          }
          return wildcardMatch(user.username, req.query.keyword);
        }
        return true;
      }).map((user) => {
        return {
          id: user.id,
          username: user.username,
          password: user.password,
          roles: user.roles,
          created_at: user.created_at,
        };
      });
      res.setHeader('Cache-Control', 'no-store');
      res.json({ users });
    }).catch(function(err) {
      res.sendStatus(404);
    });
  });

  httpServer.post('/_api/user/add', function(req, res) {
    if (!req.body.username || !req.body.password) {
      res.sendStatus(404);
      return;
    }
    var values = {
      roles: []
    };

    var validKeys = ['username', 'password', 'roles'];
    for (var key of Object.keys(req.body)) {
      if (validKeys.indexOf(key) != -1) {
        values[key] = req.body[key];
      }
    }
    userService.addUser(values).then(function(user) {
      res.json({ id: user.id });
    }).catch(function(err) {
      res.sendStatus(404);
    });
  });
  
  httpServer.post('/_api/user/remove', function(req, res) {
    userService.removeUser(req.body.id).then(function() {
      res.sendStatus(200);
    }).catch(function(err) {
      res.sendStatus(404);
    });
  });
  
  httpServer.post('/_api/user/update', function(req, res) {
    if (!userService.hasRole(req.user, 'admin') && req.user.id != req.body.id) {
      res.sendStatus(401);
      return;
    }
    if (!req.body) {
      res.sendStatus(404);
      return;
    }
    var values = {};
    var validKeys = ['username', 'password', 'roles'];
    for (var key of Object.keys(req.body)) {
      if (validKeys.indexOf(key) != -1) {
        values[key] = req.body[key];
      }
    }
    userService.updateUser(req.body.id, values).then(function() {
      res.sendStatus(200);
    }).catch(function(err) {
      res.sendStatus(404);
    });
  });
  
  httpServer.get('/_api/user/menu', function(req, res) {
    let menu = menuService.get(req.user);
    res.setHeader('Cache-Control', 'no-store');
    res.json({ menu });
  });

  httpServer.get('/_api/user/dashboard', function(req, res) {
    let dashboard = dashboardService.get(req.user);
    res.setHeader('Cache-Control', 'no-store');
    res.json({ dashboard });
  });
  

}

export { handleUserRoutes };
