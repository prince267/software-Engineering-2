import React ,{Component} from 'react';
import { Switch, Route,BrowserRouter as Router,} from "react-router-dom";
import Header from './component/header'
import Cdp from './pages/cdp/Cdp'
import Home from './pages/Home/home'
import Listing from './pages/Listing/listingPage'

export default class App extends Component{
  render(){
    return(
      <div>
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
    </div>
    )
  }
}