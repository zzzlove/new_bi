import { removeArrayItem } from '../../utils';

import { configService } from './config';
import { dbService } from './db';

import { User } from '../../sql';

var userService = {
  init() {
    let adminUser = configService.get('authConfig.adminDefault');
    return true
    /*
    return new Promise(function(resolve, reject) {
      User.findOne({ where: { username: adminUser.username } }).then(function(user) {
        resolve(false);
      }).catch(function(err) {
        User.sync({force: true}).then(function() {
          return User.create(adminUser);
        }).then(function(user) {
          resolve(true);
        }).catch(function(err) {
          reject(err);
        });
      });
    });
    */
  },
  
  get(id) {
    return User.findById(id);
  },
  
  create(values) { return User.create(values);  },
   
  getByUsername(username) {
    return User.findOne({ where: { username: username } });
  },
  
  findAll(criteria) {
    return User.findAll(criteria);
  },

  findOne(criteria) { return User.findOne(criteria);  },
  
  addUser(values) {
    return User.create(values);
  },
  
  removeUser(id) {
    return User.destroy({ where: { id: id } });
  },

  updateUser(id, values) {
    return User.update(values, { where: { id: id } });
  },
  
  changePassword(id, password) {
    return User.update({ password: password }, { where: { id: id } });
  },
  
  addRole(id, role) {
    return User.findById(id).then(function(user) {
      user.roles.push(role);
      return User.update({ roles: user.roles }, { where: { id: id } });
    });
  },
  
  removeRole(id, role) {
    return User.findById(id).then(function(user) {
      removeArrayItem(user.roles, role);
      return User.update({ roles: user.roles }, { where: { id: id } });
    });
  },
  
  hasRole(user, role) {
    return user.roles.indexOf(role) != -1;
  },

  
};

export { userService };