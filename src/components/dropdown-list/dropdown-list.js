import React,{Component} from 'react';
import './dropdown-list.css';

class DropdownList extends Component {
	
	constructor(props) {
		super(props);
		this.dropdown = React.createRef();
		this.content = React.createRef();
	}
	
	componentDidMount() {
		this.content.current.style.display = "none";
		this.content.current.style.overflow = "hidden";
		this.dropdown.current.style.backgroundColor = this.props.color;
	}
	
	
	onButtonClick = () => {
		var content = this.content.current;
		if (content.style.display === "block") {
			content.style.display = "none";
		} 
		else {
			content.style.display = "block";
		}
	}
	
	render() {
		return(
			<div className="dropdown-div">
				<button type="button" class="btn dropdown-btn" ref={this.dropdown} onClick={()=> this.onButtonClick()} >{this.props.title}</button>
				<div ref={this.content}>
				  {this.props.content}
				</div>
			</div>
		)
	}
	
}

export default DropdownList;