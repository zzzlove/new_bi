import path from 'path';
import fs from 'fs';
import ejs from 'ejs';

import { capitalizeWord } from '../../utils';

import { codegenConfigService } from './codegen_config';

var gqlIndexJsTemplateStr = `
<% list.forEach(function(name) { %>
import <%-name%><%=subType%>Defs from './<%-name%>';
<% }); %>
var <%-domain%>Generated<%=subType%>Defs = [
  <% list.forEach(function(name) { %>
    ...<%-name%><%=subType%>Defs,
  <% }); %>
];

export { <%=domain%>Generated<%=subType%>Defs };
`;

var resolverIndexJsTemplateStr = `
<% list.forEach(function(name) { %>
import <%-name%><%=subType%>Resolvers from './<%-name%>';
<% }); %>
var <%-domain%>Generated<%=subType%>Resolvers = {
  <% list.forEach(function(name) { %>
    ...<%-name%><%=subType%>Resolvers,
  <% }); %>
};

export default <%=domain%>Generated<%=subType%>Resolvers;
`;

var serviceIndexJsTemplateStr = `
<% list.forEach(function(name) { %>
export * from './<%-name%>';
<% }); %>
`;

var sqlIndexJsTemplateStr = `
<% list.forEach(function(name) { %>
export * from './<%-name%>';
<% }); %>
`;

var codegenService = {
  indexJsTemplate: {
    'gql': ejs.compile(gqlIndexJsTemplateStr),
    'resolver': ejs.compile(resolverIndexJsTemplateStr),
    'service': ejs.compile(serviceIndexJsTemplateStr),
    'sql': ejs.compile(sqlIndexJsTemplateStr),
  },
  
  buildCodegenList(name, cb) {
    var codegenList = {};
    if (name) {
      codegenConfigService.findByName(name).then(function(codegenConfigs) {
        if (codegenConfigs && codegenConfigs.length != 0) {
          if (!codegenList[name]) {
            codegenList[name] = [];
          }
          codegenList[name] = codegenList[name].concat(codegenConfigs);
        }
        cb(null, codegenList);
      }).catch(function(err) {
        cb(err);
      });
      return;
    }
    codegenConfigService.findAll().then(function(codegenConfigs) {
      if (codegenConfigs && codegenConfigs.length != 0) {
        for (var codegenConfig of codegenConfigs) {
          if (!codegenList[codegenConfig.name]) {
            codegenList[codegenConfig.name] = [];
          }
          codegenList[codegenConfig.name].push(codegenConfig);
        }
      }
      cb(null, codegenList);
    }).catch(function(err) {
      cb(err);
    });
  },

  generatePartialCodeForModel(name, count, total, type, domain, subType, jsCode, cb, progressCb) {
    progressCb('child_start', name, count.count, total, type, domain, subType);
    this.genCode(name, type, domain, subType, jsCode, true, function(err) {
      if (err) {
        cb(err);
        return;
      }
      count.count++;
      progressCb('child_done', name, count.count, total, type, domain, subType)
      if (count.count == total) {
        cb();
      }
    });
  },
  
  generateCodeForModel(name, codegenTaskList, cb, progressCb) {
    var count = { count: 0 };
    var total = codegenTaskList.length;
    for (var codegenTask of codegenTaskList) {
      this.generatePartialCodeForModel(name, count, total, codegenTask.type, codegenTask.domain, codegenTask.sub_type, codegenTask.js_code, cb, progressCb);
    }
  },

  generateCodeForList(codegenList, cb, progressCb) {
    var count = 0;
    var total = Object.keys(codegenList).length;
    for (var name of Object.keys(codegenList)) {
      progressCb('start', name, count, total)
      this.generateCodeForModel(name, codegenList[name], function(err) {
        if (err) {
          cb(err);
          return;
        }
        count++;
        progressCb('done', name, count, total)
        if (count == total) {
          cb(null);
        }
      }, progressCb);
    }
  },

  getCodegenDir(type, domain, subType) {
    return path.join(__dirname, '..', '..', type, domain, subType ? subType : '', 'gen');
  },
  
  genCode(name, type, domain, subType, jsCode, updateIndex, cb) {
    var dir = this.getCodegenDir(type, domain, subType);
    var filePath = path.join(dir, name + '.js');
    var me = this;
    fs.writeFile(filePath, jsCode, function(err) {
      if (err) {
        cb(err);
        return;
      }
      if (!updateIndex) {
        cb(null);
        return;
      }
      me.updateIndex(type, domain, subType, cb);
    });
  },

  genIndexJsCode(type, domain, subType, list) {
    var template = this.indexJsTemplate[type];
    return template({ domain, subType: subType ? capitalizeWord(subType) : subType, list });
  },
  
  updateIndex(type, domain, subType, cb) {
    var dir = this.getCodegenDir(type, domain, subType);
    var filePath = path.join(dir, 'index.js');
    var me = this;
    fs.readdir(dir, function(err, files) {
      var i = files.indexOf('index.js');
      if (i != -1) {
        files.splice(i, 1);
      }
      var list = files.map(function(file) {
        return file.substr(0, file.length - 3);
      });
      var jsCode = me.genIndexJsCode(type, domain, subType, list);
      fs.writeFile(filePath, jsCode, function(err) {
        if (err) {
          cb(err);
          return;
        }
        cb(null);
      });
    });
  },
};

export { codegenService };
