import React,{Component} from 'react';
import './search-result.css';
import MovieCard from '../movie-card/movie-card';

class SearchResult extends Component {
	
	constructor(props) {
		super(props); //props: list
	}
	
	
	loadSearchResult = (list) => {
		var resultList = [];
		list.forEach(e => {
			resultList.push(<MovieCard obj={e} />)
		});
		return resultList;
	}
	
	
	render() {
		return(
			<div>
				{this.loadSearchResult(this.props.list)}
				<div>
					<button className="btn prevBtn" onClick={() => this.props.prevFunc()} >{'< Prev'}</button>
					<button className="btn nextBtn" onClick={() => this.props.nextFunc()} >{'Next >'}</button>
				</div>
			</div>
		)
	}
	
}

export default SearchResult;

