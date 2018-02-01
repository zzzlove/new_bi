import React from 'react'
import {excelImport} from '../../services/excel'
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { Upload, Button, Icon } from 'antd';


import {connect} from 'dva'

//class RenderComponent extends React.Component {
function RenderComponent(props) {
    //const showPreview = state.showPreview;


    var XW = {
      msg: 'xlsx',
      worker: 'xlsxworker'
    };

    var global_wb;
    var global_excelData;
    //var excelModalVisible = false;
    const Commit = function(comment){
      props.showPreview();

      props.setExcelData(global_excelData);
      //excelImport({"sheetData":JSON.stringify(global_excelData).replace('\n','')});
    }

    var process_wb = (function () {
      var get_format = (function () {
        var radios = document.getElementsByName("format");
        return function () {
          for (var i = 0; i < radios.length; ++i) if (radios[i].checked || radios.length === 1) return radios[i].value;
        };
      })();

      var to_json = function to_json(workbook) {
        var result = {};

        workbook.SheetNames.forEach(function (sheetName) {
          var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          if (roa.length) result[sheetName] = roa;
        });
        return JSON.stringify(result, 2, 2);
      };

      return function process_wb(wb) {
        global_wb = wb;
        var output = to_json(wb);
        global_excelData = output;
        //执行提交
        //显示预览
        //props.showPreview(output);

        //执行上传
        //excelImport({"sheetData":JSON.stringify(output).replace('\n','')});
        //console.log('-----------------------------------------------------------');
        //console.log(output);
         props.showPreview(output);

      props.setExcelData(global_excelData);
        //excelImport({"sheetData":output});

      };
    })();

    var do_file = (function () {
      var rABS = typeof FileReader !== "undefined" && (FileReader.prototype || {}).readAsBinaryString;
      var use_worker = typeof Worker !== 'undefined';

      var xw = function xw(data, cb) {
        var worker = new Worker(XW.worker);
        worker.onMessage = function (e) {
          switch (e.data.t) {
            case 'ready':
              break;
            case 'e':
              //console.error(e.data.d);
              break;
            case XW.msg:
              //cb(JSON.parse(e.data.d));
              break;
          }
        };
        worker.postMessage({d: data, b: rABS ? 'binary' : 'array'});
      };
      return function do_file(files) {
        rABS = true;
        use_worker = true;
        var f = files;//files[0];

        var reader = new FileReader();
        reader.onload = function (e) {
          if (typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
          var data = e.target.result;

          if (!rABS) data = new Uint8Array(data);

          if (false) {
            xw(data, process_wb);
          } else {
            process_wb(XLSX.read(data, {type: rABS ? 'binary' : 'array'}));
          }
        };

        if (rABS){//
          reader.readAsBinaryString(f);
        } else {
          reader.readAsArrayBuffer(f);
        }
      };
    })();

    const  handleFile = function(info) {
      let fileList = info.fileList;
      do_file(fileList[0].originFileObj);
    }

    const UPprops = {
      //action: '/',
      onChange: handleFile,
      multiple: false,
    };

    return (
      <div>
        {/*<input type="file" name="xlfile" id="xlf" onChange={handleFile}/>
        <Button onClick={Commit}  >提交</Button>*/}


        <Upload {...UPprops} >
          <Button>
            <Icon type="upload" /> 选择Excel文件
          </Button>
        </Upload>

      </div>
    )

}


export default (RenderComponent)
