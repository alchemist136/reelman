import React,{Component} from 'react';
import './add-tag-textfield.css';

import TagCard from '../tag-card/tag-card';
import { Hint } from 'react-autocomplete-hint';
import DataService from '../../services/data-service';

const data = new DataService();

class AddTagTextfield extends Component {
	
	constructor(props) {
		super(props);
		this.state = {Tags: []};
		this.onclickAddButton = this.onClickAddButton.bind(this);
		this.textField = React.createRef();
	}
	
	onClickAddButton = () => {
		const textField = this.textField;
		var text = textField.value;
		var newTags = this.state.Tags;
		newTags.push(text);
		textField.value = "";
		this.setState({Tags: newTags});
		data.changeLanguageTags(this.state.Tags);
	}
	
	onKeyPress =(e) => {
		if(e.keyCode == 13) {
			this.onClickAddButton();
		}
	}
	
	loadTags = (tagList) => {
		var rowList = [];
		var row = [];
		for(var i=0;i<tagList.length;i++) {
			row.push(<div className="col-sm tag-col"><TagCard text={tagList[i]} isRemovable={true} removeTagFun={this.removeTag} /></div>);
		}
		rowList.push(<div className="row">{row}</div>);
		return rowList;
	}
	
	removeTag = (ref) =>  {
		var text = ref.current.children[0].innerText;
		var tags = this.state.Tags;
		tags = tags.filter((t) => {
			return t != text; 
		});
		data.changeLanguageTags(tags);
		this.setState({Tags: tags});
	}
	
	render() {
		return(
			<div>
				<h4 className="add-tag-textfield-title">{this.props.title}</h4>
				<div className="row">
					<div className="col-sm-5">
						<div className="input-group mb-3 tag-input-textfield">
						  <Hint options={this.props.options}>
							  <input type="text" className="form-control" placeholder={this.props.inputPlaceholder}  aria-describedby="basic-addon2" onKeyDown={e => this.onKeyPress(e)} ref={(input) => {this.textField=input}} />
						  </Hint>
						  <div className="input-group-append">
							 <button className="btn btn-outline-secondary" type="button" onClick={()=>this.onClickAddButton()}>Add</button>
						  </div>
						</div>
					</div>
					<div className="col-sm-7">
						<div class="card tag-container-card">
						  <div class="card-body tag-container-card-body">
							 {this.loadTags(this.state.Tags)}
						  </div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	
}

export default AddTagTextfield;