import createG2 from 'g2-react';
import { Stat } from 'g2';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const Line = createG2(chart => {
  chart.line().position('status*amount').color('fin_code').shape('spline').size(2);
  chart.render();
});

class MyComponent extends React.Component {

 constructor(props) {
  super(props);
  this.state = {
    width: 800,
    height: 500,
    plotCfg: { margin: [10, 100, 50, 80],  },
  };
 }


render() {

 const { loading, error, dataSource } = this.props.data;   
 
 return (
    <div>
    <Line
      data={dataSource}
      width={this.state.width}
      height={this.state.height}
      plotCfg={this.state.plotCfg}
      forceFit={true}
       />
    </div>
    );
  }
}

const MyQuery = gql`
query MyQuery{
dataSource: order {fin_code, status, amount}
}
`;

export default graphql(MyQuery)(MyComponent);

// --------------- 柱形图，相对复杂的设置 -----

import createG2 from 'g2-react';
import { Stat } from 'g2';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const Line = createG2((chart,data) => {
  chart.legend({
          position: 'bottom'
        });
  chart.axis('status', {
          title: null
        });
  chart.axis('amount', {
          titleOffset: 60,
          position: 'right'
        });
  chart.source(data, {
          amount: {
            alias: '体重（kg）'
          },
          status: {
            alias: '身高（cm）'
          }
        });
  chart.col('fin_code',{alias: '城市'});
  chart.intervalStack().position('status*amount').color('fin_code').size(30);
  chart.render();
});

class MyComponent extends React.Component {

 constructor(props) {
  super(props);
  this.state = {
    width: 800,
    height: 500,
    plotCfg: { margin: [30, 80, 90, 40],  },
  };
 }


render() {

 const { loading, error, dataSource } = this.props.data;   
 
 return (
    <div>
    <Line
      data={dataSource}
      width={this.state.width}
      height={this.state.height}
      plotCfg={this.state.plotCfg}
      forceFit={true}
       />
    </div>
    );
  }
}

const MyQuery = gql`
query MyQuery{
dataSource: order {fin_code, status, amount}
}
`;

export default graphql(MyQuery)(MyComponent);




// ----------------- Pie with configs into ----------------

import createG2 from 'g2-react';
import { Stat } from 'g2';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';


const Line = createG2((chart, configs) => {
  chart.coord('theta', { alias: configs.xAlias });
  chart.intervalStack().position('amount').color('status');  
//  chart.line().position('status*amount').color('fin_code').shape('spline').size(2);
  chart.render();
});


class MyComponent extends React.Component {

 constructor(props) {
  super(props);
  
  this.state = {
    width: 800,
    height: 500,
    plotCfg: { margin: [10, 100, 50, 80],  },
  };
 }


render() {

 const { loading, error, dataSource } = this.props.data;   
 
 return (
    <div>
    <Line
      data={dataSource}
      width={this.state.width}
      height={this.state.height}
      plotCfg={this.state.plotCfg}
      forceFit={true}
      configs={{ xAlias: 'time' }}
       />
    </div>
    );
  }
}

const MyQuery = gql`
query MyQuery{
dataSource: order(fin_code: "a") {fin_code, status, amount}
}
`;

export default graphql(MyQuery)(MyComponent);

---- // 重大突破 ---

import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';



const Line = createG2((chart, data) => {
  
  
  var defs = {
  amount: {
    alias: '测试Amount'
  },
  status: { 
    alias: '测试'

  },
  fin_code: { 
    alias: '财务主体'

  },
  };
  
  chart.source(data, defs);
  

    
  chart.intervalStack().position('status*amount').color('fin_code').shape('spline');
  chart.render();
});

class MyComponent extends React.Component {

 constructor(props) {
  super(props);
  this.state = {
    width: 900,
    height: 500,
    plotCfg: { margin: [30, 80, 60, 80],  },
  };
 }


render() {

 const { loading, error, dataSource } = this.props.data;   
 
 return (
    <div>
    <Line
      data={dataSource}
      width={this.state.width}
      height={this.state.height}
      plotCfg={this.state.plotCfg}
      forceFit={true}
       />
    </div>
    );
  }
}

const MyQuery = gql`
query MyQuery{
dataSource: order {fin_code, status, amount}
}
`;

export default graphql(MyQuery)(MyComponent);

-- 参数注入 --

import createG2 from 'g2-react';
import { Stat, Global } from 'g2';
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';



const Line = createG2((chart, data, configs) => {
  
  chart.source(data, configs);
      
  chart.line().position('status*amount').color('fin_code').shape('spline');
  chart.render();
});

class MyComponent extends React.Component {

 constructor(props) {
  super(props);
  this.state = {
    width: 900,
    height: 500,
    plotCfg: { margin: [30, 80, 60, 80],  },
  };
 }


render() {

 const { loading, error, dataSource } = this.props.data;   
 
 var colDefs = {
  'amount': {
    alias: 'Amount'
  },
  'status': { 
    alias: '测试',
    type: 'cat',
    values: ['d', 'e', 'f']
  },
  'fin_code': { 
    alias: '财务主体',
    type: 'cat',
    values: ['a', 'b', 'c']
  },
  };
  
 
 return (
    <div>
    <Line
      data={dataSource}
      width={this.state.width}
      height={this.state.height}
      plotCfg={this.state.plotCfg}
      forceFit={true}
      configs={colDefs}
       />
    </div>
    );
  }
}

const MyQuery = gql`
query MyQuery{
dataSource: order {fin_code, status, amount}
}
`;

export default graphql(MyQuery)(MyComponent);
