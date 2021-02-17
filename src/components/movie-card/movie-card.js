import React,{Component} from 'react';
import './movie-card.css';

class MovieCard extends Component {
	
	constructor(props) {
		super(props);
	}
	
	
	render() {
		return(
			<div className="card movie-card">
				<div className="card-body movie-card-body row">
					<div className="col-sm-2">
						<img src={this.props.obj.poster_path} className="poster" />
					</div>
					<div className="col-sm-10">
						<h5 className="card-movie-title">{this.props.obj.title}</h5>
						<p className="len-genre">{this.props.obj.genre}</p>
						<p className="vote">{this.props.obj.vote_average}</p>
						<p className='plot'>{this.props.obj.overview}</p>
					</div>
				</div>
			</div>
		)
	}
	
}

export default MovieCard;