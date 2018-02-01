
import { configService, gqlService } from '../service';
import { InvoiceFin, FinInvoiceManual } from '../sql';
import exportConfig from '../exportConfig';
import nodeExcel from 'excel-export';


var supportSubscription = configService.get('gqlConfig.supportSubscription');
const subscriptionAuthWithConnectionParams = configService.get('gqlConfig.subscriptionAuthWithConnectionParams');

function handleExcelRoutes(httpServer) {

    httpServer.post('/_api/excel/import', function(req, res) {

        console.log(req.body.sheetData);
        res.sendStatus(200);
        return false;

        var sheetData = req.body.sheetData;
        if(!sheetData){
            //res.
            res.sendStatus(200);
            return false;
        }

        var dataObj =  JSON.parse(JSON.parse(sheetData));

        var criteria = {};
        criteria.records = [];

        const transNum = (param,num) => {
            if("" == param){
                return null;
            }
            var result = parseFloat(param);
            return result == 'NaN' ? null : result;
        };

        dataObj["sheet1"].forEach(function(value, index, array){

           /* criteria.records.push({
                "invoice_no":value['发票代码'],
                "invoice_code":value['发票号码'],
                "buyer_name":value['购方企业名称'],
                "buyer_tax_no":value['购方税号'],
                "bank_no":value['银行账号'],
                "adddress":value['地址电话'],
                "invoicing_date":new Date(value['开票日期']),
                "goods_version":value['商品编码版本号'],
                "voucher_no":value['单据号'],
                "goods_name":value['商品名称'],
                "goods_size":value['规格'],
                "goods_unit":value['单位'],
                "goods_count":value['数量'],
                "goods_price":transNum(value['单价']),
                "goods_amount":transNum(value['金额']),
                "tax_rate":transNum(value['税率']),
                "tax_amount":transNum(value['税额']),
                "tax_no":value['税收分类编码']
            });
*/

            FinInvoiceManual.create({
                "invoice_no":value['发票代码'],
                "invoice_code":value['发票号码'],
                "buyer_name":value['购方企业名称'],
                "buyer_tax_no":value['购方税号'],
                "bank_no":value['银行账号'],
                "adddress":value['地址电话'],
                "invoicing_date":new Date(value['开票日期']),
                "goods_version":value['商品编码版本号'],
                "voucher_no":value['单据号'],
                "goods_name":value['商品名称'],
                "goods_size":value['规格'],
                "goods_unit":value['单位'],
                "goods_count":value['数量'],
                "goods_price":transNum(value['单价']),
                "goods_amount":transNum(value['金额']),
                "tax_rate":transNum(value['税率']),
                "tax_amount":transNum(value['税额']),
                "tax_no":value['税收分类编码']
            });

        });

        //console.log(criteria.records);

        /*var options = {};
        options.fields = ['invoice_no','invoice_code','buyer_name','buyer_tax_no','bank_no','adddress','invoicing_date','goods_version',
            'voucher_no','goods_name','goods_size','goods_unit','goods_count','goods_price','goods_amount','tax_rate','tax_amount','tax_no'
        ];
        var result = FinInvoiceManual.bulkCreate(criteria);*/

        res.sendStatus(200);

    });


    httpServer.get('/_api/excel/exportExcel', function (req, res) {
        var param1 = req.query.excelId;
        var whereReq ;
        if(req.query){
            whereReq={};
            for(var paramProp in req.query){
                if(paramProp != 'excelId'){
                    //control_center 支持模糊查询
                    if(paramProp == 'control_center'){
                        whereReq[paramProp] = {};
                        whereReq[paramProp]['$like'] =  req.query[paramProp];
                    }else if(paramProp == 'dateLt'){//日期区间
                        whereReq['started_at'] = {};
                        whereReq['started_at']['$lte'] =  parseInt(req.query[paramProp]);
                    }else if(paramProp == 'dateGt'){
                        whereReq['started_at']['$gte'] =  parseInt(req.query[paramProp]);
                    }else{
                        whereReq[paramProp] = req.query[paramProp];
                    }
                }
            }
        }
        var config = exportConfig[param1];

        console.log('**** Excel Export post: **** param & config & where');
        console.log(param1);
        console.log(config);
        console.log(whereReq);

        var user = req.user;
        console.log('xxx: ' + JSON.stringify(user));

        //生成列
        var genAttributes = function (conf) {
            var result = new Array();
            for (var i = 0; i < conf.length; i++) {
                    result.push(conf[i].col);
            }
            return result;
        }

        //生成where条件
        //reqConf:前端传回的where   defaultConf：配置文件配置的默认条件
        var genWhere = function(reqConf,defaultConf){
            console.log('**** reqConf :');
            console.log(reqConf);
            var result = {};
            if(reqConf){
                for(var propReq in reqConf){
                    result[propReq] = reqConf[propReq];
                }
            }
            console.log(defaultConf);
            if(defaultConf){
                for(var propDe in defaultConf){
                    result[propDe] = defaultConf[propDe];
                }
            }
            console.log('**** final where : ');
            console.log(result);
            return result;
        };

        var criteria = {attributes: genAttributes(config.columns), where: genWhere(whereReq,config.where),order:["t_run"]};

        var finalArr = new Array();

        config.tableService.findAll(criteria).then(
            function (data) {
                console.log('**** query success ****');

                for (var i = 0; i < data.length; i++) {
                    var tmpArr = new Array();
                    for (var prop in data[i].dataValues) {
                        tmpArr.push(data[i].dataValues[prop]);
                    }
                    finalArr.push(tmpArr);
                }

                var conf = {};
                //conf.name = config.name;

                var generateCols = function (conf) {
                    var cols = new Array();

                    for (var i = 0; i < conf.length; i++) {
                        var colObjs = {};
                        colObjs.caption = conf[i].label;
                        colObjs.col = conf[i].col;
                        colObjs.type = conf[i].type;

                        if (colObjs.type == 'date') {
                            colObjs.beforeCellWrite = function () {
                                var originDate = new Date(Date.UTC(1899, 11, 30));
                                return function (row, cellData, eOpt) {
                                    if (cellData === null) {
                                        eOpt.cellType = 'string';
                                        return 'N/A';
                                    } else
                                        return (cellData - originDate + 8*60*60*1000) / (24 * 60 * 60 * 1000); //北京时间为UTC标准时间+8小时
                                    //return cellData ;
                                }
                            }();
                        }



                        if(colObjs.col == 'reflection_id'){
                            colObjs.beforeCellWrite = function () {
                                return function (row, cellData, eOpt) {
                                    if(cellData == '1'){
                                        return '新卡航';
                                    }

                                    if(cellData == '2'){
                                        return '老卡航';
                                    }
                                    return cellData;
                                }
                            }();
                        }

                        //是否需要code转换
                        if(colObjs.opsCode){
                            if(colObjs.opsCode == 'sd001'){
                                colObjs.beforeCellWrite = function () {
                                    return function (row, cellData, eOpt) {
                                        if(cellData == 'opened'){
                                            return '已开单';
                                        }

                                        if(cellData == 'departed'){
                                            return '已发车';
                                        }

                                        if(cellData == 'arrived'){
                                            return '已到车';
                                        }

                                        if(cellData == 'confirmed'){
                                            return '已签收';
                                        }

                                        if(cellData == 'billed'){
                                            return '已对账';
                                        }

                                        if(cellData == 'paid'){
                                            return '已付款';
                                        }

                                        if(cellData == 'entered'){
                                            return '待确认';
                                        }

                                        if(cellData == 'deleted'){
                                            return '无效删除';
                                        }
                                        return cellData;
                                    }
                                }();
                            }
                        }

                        colObjs.width = conf[i].hasOwnProperty("width") ? conf[i].width : 20;
                        cols.push(colObjs);
                    }
                    return cols;
                };

                conf.cols = generateCols(config.columns);
                conf.rows = finalArr;
                console.log('** start execute excel **');
                var result = nodeExcel.execute(conf);
                console.log('** execute excel end **');
                res.setHeader('Content-Type', 'application/vnd.openxmlformats&charset=utf-8');
                res.setHeader("Content-Disposition", "attachment; filename=Report.xlsx" );

                res.end(result, 'binary');
                //res.sendFile();

            }
        );
    });

}

export { handleExcelRoutes };
