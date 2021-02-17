import React,{Component} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import SearchPage from '../pages/search-page/search-page';

class App extends Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return(
			<div>
				<Router>
					<Switch>
						<Route path="/" exact component={SearchPage} />
					</Switch>
				</Router>
			</div>
		)
	}
	
}

export default App;
