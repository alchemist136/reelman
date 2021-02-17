import buildUrl from 'build-url';
const fetch = require('node-fetch');

const tmdbUrl = "https://api.themoviedb.org/3";
const apiKey = "3f75b78345cf411d014539c709efa240";


class HttpRequest {
	
	discover = async (params,type) => {
		const path = "discover/"+type;
		const queryParams = Object.assign({api_key: apiKey},params);
		const url = buildUrl(tmdbUrl, {
			path: path,
			queryParams: queryParams
		});
		let res = await fetch(url);
		let data = await res.text();
		return JSON.parse(data);
	}
	
	getGenres = async () => {
		const path = "genre/movie/list";
		const queryParams = {api_key: apiKey};
		const url = buildUrl(tmdbUrl, {
			path: path,
			queryParams: queryParams
		});
		let res = await fetch(url);
		let data = await res.text();
		return JSON.parse(data);
	}
	
}

export default HttpRequest;