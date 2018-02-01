import {ControlCenterActualService, OrderSalesExtKhService} from './service';



const exportConfig = {
    controlCenterActualMonthlyServiceInc:{
        id: '1',
        name:'线路单边月统计数据',
        columns: [
            {col:'control_center', label:'线路' ,type:'string' ,width:15},
            {col:'control_element', label:'运作方式' ,type:'string' ,width:15},
            {col:'t_run', label:'月份' ,type:'string' ,width:15},
            {col:'amount', label:'产值',type:'number' },
            {col:'count', label:'运单数',type:'number' },
            {col:'amount_avg', label:'平均价格',type:'number' },
            {col:'amount_acc', label:'年产值累计',type:'number' },
            {col:'count_distinct', label:'客户数',type:'number' },
            {col:'pct', label:'产值比',type:'number' }
        ],
        where: {record_type: 'monthly', type: 'service_inc'},
        tableService:ControlCenterActualService
    },

    controlCenterActualMonthlyLineInc:{
        id: '2',
        name:'线路往返月统计数据',
        columns: [
            {col:'control_center', label:'线路' ,type:'string' ,width:15},
            {col:'control_element', label:'运作方式' ,type:'string' ,width:15},
            {col:'t_run', label:'月份' ,type:'string' ,width:15},
            {col:'amount', label:'产值',type:'number' },
            {col:'count', label:'运单数',type:'number' },
            {col:'amount_avg', label:'平均价格',type:'number' },
            {col:'amount_acc', label:'年产值累计',type:'number' },
            {col:'count_distinct', label:'客户数',type:'number' },
            {col:'pct', label:'产值比',type:'number' },
            {col:'amount_budget_acc', label:'预算累计',type:'number' },
            {col:'amount_budget', label:'当月预算',type:'number' }
        ],
        where: {record_type: 'monthly', type: 'line_inc'},
        tableService:ControlCenterActualService
    },

    controlCenterActualMonthlyCityInc:{
        id: '3',
        name:'运营城市月统计数据',
        columns: [
            {col:'control_center', label:'运营城市' ,type:'string' ,width:15},
            {col:'control_element', label:'运作方式' ,type:'string' ,width:15},
            {col:'t_run', label:'月份' ,type:'string' ,width:15},
            {col:'amount', label:'产值',type:'number' },
            {col:'count', label:'运单数',type:'number' },
            {col:'amount_avg', label:'平均价格',type:'number' },
            {col:'amount_acc', label:'年产值累计',type:'number' },
            {col:'count_distinct', label:'客户数',type:'number' },
            {col:'pct', label:'产值比',type:'number' }
        ],
        where: {record_type: 'monthly', type: 'city_inc'},
        tableService:ControlCenterActualService
    },

    controlCenterActualDailyServiceInc:{
        id: '4',
        name:'线路单边日统计数据',
        columns: [
            {col:'control_center', label:'线路' ,type:'string' ,width:15},
            {col:'control_element', label:'运作方式' ,type:'string' ,width:15},
            {col:'t_run', label:'日期' ,type:'string' ,width:15},
            {col:'amount', label:'产值',type:'number' },
            {col:'count', label:'运单数',type:'number' },
            {col:'amount_avg', label:'平均价格',type:'number' },
            {col:'amount_acc', label:'月产值累计',type:'number' },
            {col:'count_distinct', label:'客户数',type:'number' },
            {col:'pct', label:'产值比',type:'number' }
        ],
        where: {record_type: 'daily', type: 'service_inc'},
        tableService:ControlCenterActualService
    },

    controlCenterActualDailyLineInc:{
        id: '5',
        name:'线路往返日统计数据',
        columns: [
            {col:'control_center', label:'线路' ,type:'string' ,width:15},
            {col:'control_element', label:'运作方式' ,type:'string' ,width:15},
            {col:'t_run', label:'日期' ,type:'string' ,width:15},
            {col:'amount', label:'产值',type:'number' },
            {col:'count', label:'运单数',type:'number' },
            {col:'amount_avg', label:'平均价格',type:'number' },
            {col:'amount_acc', label:'月产值累计',type:'number' },
            {col:'count_distinct', label:'客户数',type:'number' },
            {col:'pct', label:'产值比',type:'number' },
            {col:'amount_budget_acc', label:'预算累计',type:'number' },
            {col:'amount_budget', label:'当月预算',type:'number' }
        ],
        where: {record_type: 'daily', type: 'line_inc'},
        tableService:ControlCenterActualService
    },

    controlCenterActualDailyCityInc:{
        id: '6',
        name:'运营城市日统计数据',
        columns: [
            {col:'control_center', label:'运营城市' ,type:'string' ,width:15},
            {col:'control_element', label:'运作方式' ,type:'string' ,width:15},
            {col:'t_run', label:'日期' ,type:'string' ,width:15},
            {col:'amount', label:'产值',type:'number' },
            {col:'count', label:'运单数',type:'number' },
            {col:'amount_avg', label:'平均价格',type:'number' },
            {col:'amount_acc', label:'月产值累计',type:'number' },
            {col:'count_distinct', label:'客户数',type:'number' },
            {col:'pct', label:'产值比',type:'number' }
        ],
        where: {record_type: 'daily', type: 'city_inc'},
        tableService:ControlCenterActualService
    },

    orderListKHTotal:{
        id:'7',
        name:'运单明细',
        columns:[
            {col:'status_desc', label:'状态' ,type:'string',opsCode:'sd001'
            },
            {col:'term', label:'月份' ,type:'string'},
            {col:'service_no', label:'线路' ,type:'string'},
            {col:'line_name', label:'往返线路' ,type:'string'},
            {col:'control_element', label:'运作方式' ,type:'string'},
            {col:'fin_code', label:'财务主体' ,type:'string'},
            {col:'ops_code', label:'运营主体' ,type:'string'},
            {col:'order_no', label:'单号' ,type:'string'},
            {col:'trader_name', label:'会员名称' ,type:'string'},
            {col:'trader_code',label:'会员账号',type:'string'},
            {col:'consignee_name',label:'收货方',type:'string'},
            {col:'consignee_code',label:'收货电话',type:'string'},
            {col:'started_at', label:'开单时间' ,type:'date'},
            {col:'amount', label:'金额' ,type:'number'},
            {col:'cat_1st', label:'业务方式' ,type:'string'},
            {col:'billing_no', label:'对账单号' ,type:'string'},
            {col:'cargo_name', label:'货物名称' ,type:'string'},
            {col:'cargo_weight',label:'货物重量',type:'number'},
            {col:'cargo_volumn',label:'货物体积',type:'number'},
            {col:'carrier_name', label:'承运商' ,type:'string'},
            {col:'trader_name_act', label:'实际发货方' ,type:'string'},
            {col:'plate_no', label:'车牌号' ,type:'string'},
            {col:'manager_name', label:'客户经理' ,type:'string'},
            {col:'reflection_id', label:'数据来源' ,type:'string'},
            {col:'depart_time', label:'实际发车时间' ,type:'date'},
            {col:'arrived_time', label:'实际到达时间' ,type:'date'},
            {col:'plan_depart_time', label:'计划发车时间' ,type:'date'},
            {col:'plan_arrived_time', label:'计划到达时间' ,type:'date'},
            {col:'remote_pickup_charges',label:'远距离提货费',type:'number'},
            {col:'remote_delivery_charges',label:'远距离送货费',type:'number'},
            {col:'multipoint_pickup_charges',label:'多点提货费',type:'number'},
            {col:'multipoint_delivery_charges',label:'多点送货费',type:'number'},
            {col:'clean_freight',label:'基础运费',type:'number'},
            {col:'insured',label:'保价费',type:'number'},
            {col:'trans_type',label:'运输类型',type:'string'},
            {col:'remarks', label:'备注' ,type:'string'}

        ],
        where : {reflection_id: [1, 2]},
        tableService: OrderSalesExtKhService

    }

}


export default exportConfig;