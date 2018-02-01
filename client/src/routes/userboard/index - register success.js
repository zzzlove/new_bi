import Activecountpect from './tradeActive';
import Traderanalysis from './Traderanalysis';
import TraderHisanalysis from './TraderHisanalysis';



class DashBoard extends React.Component {


render() {


 return (
    <div>
    <Activecountpect/>
    <Traderanalysis/>
    <TraderHisanalysis/>
    </div>
    );
  }
}




export default DashBoard;


