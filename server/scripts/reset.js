import path from 'path';
import fs from 'fs';
import ejs from 'ejs';

import { capitalizeWord } from '../src/utils';

var gqlIndexJsTemplateStr = `
var <%-domain%>Generated<%=subType%>Defs = [];

export { <%=domain%>Generated<%=subType%>Defs };
`;

var resolverIndexJsTemplateStr = `
var <%-domain%>Generated<%=subType%>Resolvers = {};

export default <%=domain%>Generated<%=subType%>Resolvers;
`;

var serviceIndexJsTemplateStr = ``;

var sqlIndexJsTemplateStr = ``;

var indexJsTemplate = {
  'gql': ejs.compile(gqlIndexJsTemplateStr),
  'resolver': ejs.compile(resolverIndexJsTemplateStr),
  'service': ejs.compile(serviceIndexJsTemplateStr),
  'sql': ejs.compile(sqlIndexJsTemplateStr),
};

function genIndexJsCode(type, domain, subType) {
  var template = indexJsTemplate[type];
  return template({ domain, subType: subType ? capitalizeWord(subType) : subType });
}

function getCodegenDir(type, domain, subType) {
  return path.join(__dirname, '..', 'src', type, domain, subType ? subType : '', 'gen');
}

function resetIndex(type, domain, subType) {
  var dir = getCodegenDir(type, domain, subType);
  var filePath = path.join(dir, 'index.js');
  var jsCode = genIndexJsCode(type, domain, subType);
  fs.writeFileSync(filePath, jsCode);
}

function main() {
  var types = ['gql', 'resolver'];
  var domains = ['bi', 'core', 'ui'];
  var subTypes = ['mutation', 'query', 'type'];

  console.log('Start to reset generated code...\n');  
  for (var type of types) {
    for (var domain of domains) {
      for (var subType of subTypes) {
        console.log('  Start    reset index for type=' + type + ' domain=' + domain + ' subType=' + subType + '...');  
        resetIndex(type, domain, subType);
        console.log('  Finished reset index for type=' + type + ' domain=' + domain + ' subType=' + subType);  
      }
    }
  }
  
  types = ['service', 'sql'];
  for (var type of types) {
    for (var domain of domains) {
      console.log('  Start    reset index for type=' + type + ' domain=' + domain + '...');  
      resetIndex(type, domain);
      console.log('  Finished reset index for type=' + type + ' domain=' + domain);  
    }
  }
  console.log('\nReset generated code done');
}

main();
