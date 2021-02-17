import HttpService from './http-service';

const http = new HttpService();

let instance = null;

let languageTags = [];
let selectedGenreList = [];
let fetchedMovieData;

class DataSerivce {
	
	constructor() {
		if(!instance) {
			instance = this;
		}
		return instance;
	}
	
	changeLanguageTags = (list) => {
		languageTags = list;
	}
	
	getLanguageTags = () => {
		return languageTags;
	}
	
	changeGenreList = (list) => {
		selectedGenreList = list;
	}	
	
	getGenreList = () => {
		return selectedGenreList;
	}
	
	changeMovieData = (objList) => {
		fetchedMovieData = objList;
	}
	
	getMovieData = () => {
		return fetchedMovieData;
	}
	
	getModifiedMovieData = async () => {
		const genreData = await http.getGenres();
		const genreList = genreData.genres;
		var gMap = new Map();
		genreList.forEach(g => {
			gMap[g.id] = g.name;
		});
		var movieList = [];
		fetchedMovieData.forEach(obj => {
			obj.results.forEach(m => {
			var genre = "";
			m.genre_ids.forEach(i => {
				genre += gMap[i]+" ";
			})
			const movie = {
				poster_path: 'https://www.themoviedb.org/t/p/w1280'+m.poster_path,
				title: m.title,
				genre: genre,
				overview: m.overview,
				vote_average: m.vote_average
			};
			movieList.push(movie);
		})
		})
		return movieList;
	}
	
}

export default DataSerivce;