import React from 'react';
import { Card, Spin } from 'antd';
import {formatter,getDistinctValues} from '../../utils';

import cardStyle from './index.less';

const DetailCard = ({
                      loading = false,rowData
                   }) => {

  return (
    <div className={cardStyle.meta}>
      本月数值<span className={cardStyle.title} >&nbsp;&nbsp;&nbsp;{formatter.money(rowData.amount_1, ",")}</span>
      <br />
      上月数值<span className={cardStyle.title}>&nbsp;&nbsp;&nbsp;{formatter.money(rowData.amount_2, ",")}</span>
    </div>
  );
};

export default DetailCard;
