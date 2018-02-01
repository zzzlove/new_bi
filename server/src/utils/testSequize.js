import { dbService } from './../service';


function ttt(){
    console.log(' -- test sequize -- ')

    var queryStr = 'SELECT order_no,type,biz_code,fin_code,ops_code,sales_code FROM sd.orders WHERE 1=1 and  biz_code =$1 ';
    queryStr+=' and type=$2' ;
    queryStr+=' limit 5';

    console.log(queryStr);
    dbService.query(queryStr,
        { bind: ['KH','IntSellSvr'], type: dbService.QueryTypes.SELECT }
    ).then(projects => {
        console.log(projects)
    })
}

export default ttt;