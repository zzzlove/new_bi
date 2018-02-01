var XLSX = require('xlsx'); 
 
var _exports = {}; 
module.exports = _exports; 
 
_exports.exportXlS = function(data) { 
  var ws = { 
    s:{ 
      "!row" : [{wpx: 67}] 
    } 
  }; 
  ws['!cols']= []; 
  for(var n = 0; n != data[0].length; ++n){ 
    ws['!cols'].push({ 
     wpx: 170 
   }); 
  } 
  var range = { 
    s : { 
      c : 10000000, 
      r : 10000000, 
    }, 
    e : { 
      c : 0, 
      r : 0 
    } 
  }; 
  for (var R = 0; R != data.length; ++R) { 
    for (var C = 0; C != data[R].length; ++C) { 
      if (range.s.r > R) 
        range.s.r = R; 
      if (range.s.c > C) 
        range.s.c = C; 
      if (range.e.r < R) 
        range.e.r = R; 
      if (range.e.c < C) 
        range.e.c = C; 
      var cell = { 
        v : data[R][C], 
        s:{ 
          fill: { fgColor: { rgb: "33000000"}}, 
          alignment: {horizontal: "center" ,vertical: "center"}, 
         } 
      }; 
      if (cell.v == null) 
        continue; 
      var cell_ref = XLSX.utils.encode_cell({ 
        c : C, 
        r : R 
      }); 
 
      if ( typeof cell.v === 'number') 
        cell.t = 'n'; 
      else if ( typeof cell.v === 'boolean') 
        cell.t = 'b'; 
      else if (cell.v instanceof Date) { 
        cell.t = 'n'; 
        cell.z = XLSX.SSF._table[14]; 
        cell.v = datenum(cell.v); 
      } else 
        cell.t = 's'; 
      if(R){ 
        delete cell.s.fill; 
      } 
      ws[cell_ref] = cell; 
    } 
  } 
  data.fileName = "sample.xlsx"; 
  var workbook = new Workbook(); 
  var wsName = data.fileName.split(".xlsx")[0]; 
  workbook.SheetNames.push(wsName); 
  workbook.Sheets[wsName] = ws; 
  if (range.s.c < 10000000) 
    ws['!ref'] = XLSX.utils.encode_range(range); 
  var wopts = { 
    bookType : 'xlsx', 
    bookSST : false, 
    type : 'binary' 
  }; 
  var wbout = XLSX.write(workbook, wopts); 
    XLSX.writeFile(workbook, data.fileName); 
  return wbout; 
}; 
 
function Workbook() { 
  if (!(this instanceof Workbook)) 
    return new Workbook(); 
  this.SheetNames = []; 
  this.Sheets = {}; 
} 