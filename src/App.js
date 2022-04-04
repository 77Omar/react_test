import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './components/login/login'
import Transaction from "./components/transaction/transaction";
import AddTransaction from "./components/transaction/AddTransaction";

function App() {
  return (
      <>
        <Router>
          {/* <Layout>*/}
          <Switch>
             <Route exact path="/" component={Login}/>
             <Route  path="/login" component={Login}/>
              <Route  path="/transaction" component={Transaction}/>
              <Route  path="/add_transaction" component={AddTransaction}/>
          </Switch>
          {/*</Layout>*/}
        </Router>
      </>
  );
}

export default App;
