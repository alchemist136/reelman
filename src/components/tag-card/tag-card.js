import React,{Component} from 'react';
import './tag-card.css';

class TagCard extends Component {
	
	constructor(props) {
		super(props);
		this.loadTagCardBody = this.loadTagCardBody.bind(this);
		this.tagCard = React.createRef();
	}
	
	loadTagCardBody = (removable,text) => {
		var body = [];
		body.push(<p className="tag-text">{text}</p>);
		if(removable) {
			body.push(<a href="javascript:void(0)" value={text} onClick={() => this.props.removeTagFun(this.tagCard)} className="tag-remove-btn">&#10060;</a>)
		}
		return body;
	}
	
	render() {
		return(
				<div className="tag-card" ref={this.tagCard}>
				 	{this.loadTagCardBody(this.props.isRemovable,this.props.text)}
				</div>
		)
	}
	
}

export default TagCard;