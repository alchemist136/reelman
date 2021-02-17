import React,{Component} from 'react';
import './search-page.css';

import DropdownList from '../../components/dropdown-list/dropdown-list';
import HttpService from '../../services/http-service';
import TagCard from '../../components/tag-card/tag-card';
import AddTagTextfield from '../../components/add-tag-textfield/add-tag-textfield';
import { Hint } from 'react-autocomplete-hint';
import ISO6391 from 'iso-639-1';

import MovieCard from '../../components/movie-card/movie-card';
import SearchResult from '../../components/search-result/search-result';

import DataService from '../../services/data-service';
const data = new DataService();

const http = new HttpService();

class SearchPage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {genreList: [], genreSelected: [], checked: new Map(), adultCheck: false, result: [], resultPage: 1};
		this.getGenreList = this.getGenreList.bind(this);
		this.loadGenreList = this.loadGenreList.bind(this);
		this.onGenreCheckboxChanged = this.onGenreCheckboxChanged.bind(this);
		this.onSearchClicked = this.onSearchClicked.bind(this);
		this.checkbox = React.createRef();
		this.getGenreList();
	}
	
	getGenreList = async()  => {
		var self = this;
		const obj = await http.getGenres();
		const list = obj.genres;
		var checked = new Map();
		list.forEach(e => {
			checked[e.name] = false;
		});
		self.setState({genreList: list, checked: checked });
	}
	
	loadGenreList = () => {
		var list = [];
		var c = 0;
		var temp = [];
		for(var i=0;i<this.state.genreList.length;i++) {
			temp.push(
				<div className="col-4">
					<input className="checkbox" type="checkbox" value={this.state.genreList[i].id} ref={this.checkbox} onChange={(e) => this.onGenreCheckboxChanged(e)}/>
					<label>{this.state.genreList[i].name}</label>
				</div>
			);
			c++;
			if(c === 3) {
				list.push(<div className="row">{temp}</div>);
				c = 0;
				temp = [];
			}
		}
		if(c>0) {
			list.push(<div className="row">{temp}</div>)
		}
		return list;
	}
	
	onAdultCheckboxChanged = () => {
		this.setState({ adultCheck: !this.state.adultCheck });
	}
	
	onGenreCheckboxChanged = (e) => {
		var gl = this.state.genreSelected;
		const value = e.target.value.toString();
		var checked = this.state.checked;
		checked[value] = !checked[value];
		this.setState({ checked: checked });
		var glist = this.state.genreList;
		if(this.state.checked[value]) {
			gl.push(value);
		}
		else {
			gl = gl.filter((e) => {
				return e != value;
			})
		}
		this.setState({genreSelected: gl});	
		data.changeGenreList(this.state.genreSelected);
	}
	
	
	onSearchClicked = async (page) => {
		const language = data.getLanguageTags();
		const genres = data.getGenreList();
		let with_genres = "";
		let with_original_language = "";
		var fetchedData = [];
		for(var i=0;i<genres.length-1;i++) {
			with_genres = with_genres+genres[i]+',';
		}
		with_genres = with_genres+genres[genres.length-1];
		for(var i=0;i<language.length;i++) {
			const params = {
				page: page,
				sort_by: 'vote_average.desc',
				with_genres: with_genres,
				with_original_language: ISO6391.getCode(language[i]),
				include_adult: !this.state.adultCheck
			}
			var movies = await http.discover(params,'movie');
			fetchedData.push(movies);
		}
		data.changeMovieData(fetchedData);
		var result = await data.getModifiedMovieData();
		this.setState({ result: result });
	}
	
	prevFunc = async () => {
		const page = this.state.resultPage;
		if(page>1) {
			await this.onSearchClicked(page);
			this.setState({resultPage: page-1});
		}
	}
	
	nextFunc = async () => {
		const page = this.state.resultPage;
		await this.onSearchClicked(page);
		this.setState({resultPage: page+1});
	}
	
	render() {
		let languageField = <AddTagTextfield options={ISO6391.getAllNames()} inputPlaceholder='search language' />;
		return(
			<div className="container">
				<div className="card search-card">
				  <div className="card-body">
					<DropdownList content={this.loadGenreList()} title='-- Choose Genre --' color="rgba(255, 99, 132, 1)" />
					<DropdownList content={languageField} title='-- Choose Languages --' color="rgba(255, 99, 132, 1)" />
					<div className="form-check search-page-divs">
						<input className="form-check-input" type="checkbox" onChange={() => this.onAdultCheckboxChanged()} />
						<label className="form-check-label" for="defaultCheck1">
							<h6>Exclude Adult Contents (nudity, graphic violence, strong language)</h6>
						</label>
					</div>
				  </div>
					<button className="search-btn btn" onClick={() => this.onSearchClicked()}>Search</button>
				</div>
				<div>
					<SearchResult title='movies for you' list={this.state.result} prevFunc={this.prevFunc} nextFunc={this.nextFunc} />
				</div>
			</div>
		)
	}
	
}

export default SearchPage;