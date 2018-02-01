import dbInit from '../src/db_init';
import { codegenService } from '../src/service';

function main() {
  dbInit().then(function() {
    var name;
    if (process.argv.length >= 3) {
      name = process.argv[2];
    } else {
      console.log('Start full code generating...');
    }
    codegenService.buildCodegenList(name, function(err, codegenList) {
      if (err) {
        console.log('Code generation error: ' + err);
        process.exit(1);
        return;
      }
      if (Object.keys(codegenList).length == 0) {
        console.log('Nothing need to be generated');
        process.exit(0);
        return;
      }
      codegenService.generateCodeForList(codegenList, function(err) {
        if (err) {
          console.log('Code generation error: ' + err);
          process.exit(1);
          return;
        }
        console.log('Code generation done');
        process.exit(0);
      }, function(what, name, count, total, type, domain, subType) {
        if (what == 'start') {
          console.log('\nStart code generating for "' + name + '" (' + count + '/' + total + ')...');
        } else if (what == 'done') {
          console.log('Finished code generating for "' + name + '" (' + count + '/' + total + ')');
        } else if (what == 'child_start') {
          console.log('  Start    name=' + name + ' type=' + type + ' domain=' + domain + ' sub_type=' + subType + '...');
        } else if (what == 'child_done') {
          console.log('  Finished name=' + name + ' type=' + type + ' domain=' + domain + ' sub_type=' + subType);
        }
      });
    });
  });
}

main();
