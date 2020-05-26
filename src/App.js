import React ,{Component} from 'react';
import { withRouter } from "react-router";
import { Switch, Route,BrowserRouter as Router,} from "react-router-dom";
import Header from './component/header'
import Cdp from './pages/Cdp'
import Home from './pages/home'
import Listing from './pages/listingPage'

export default class App extends Component{
  render(){
    return(
      <Router>
    <div>
      <Route path="/" component={Header}/>
<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/cdp" component={Cdp}/>
  <Route path="/listing" component={Listing}/>
</Switch>
    </div>

    </Router>
    )
  }
}