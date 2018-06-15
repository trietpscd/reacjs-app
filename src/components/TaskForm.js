import React, { Component } from 'react';

class TaskForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id : '',
			name : '',
			status : false
		}
	}
	handleClose = () => {
		this.props.onCloseForm();
	}
	onChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value;
		if( name === "status" ) {
			value = target.value === "true" ? true : false;
		}
		this.setState({
			[name] : value
		});
	}
	onClearForm = () => {
		this.setState({
			name : '',
			status : false
		})
	}
	onSubmitForm = (event) =>{
		event.preventDefault();
		this.props.onSubmitForm(this.state);
	}
	componentWillMount() {
		if(this.props.taskUpdating) {
			this.setState({
				id : this.props.taskUpdating.id,
				name : this.props.taskUpdating.name,
				status : this.props.taskUpdating.status,
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps');
		if( nextProps && nextProps.taskUpdating) {
			this.setState({
				id : nextProps.taskUpdating.id,
				name : nextProps.taskUpdating.name,
				status : nextProps.taskUpdating.status,
			});
		} else {
			this.setState({
				id : '',
				name : '',
				status : false
			});
		}

	}
	render() {
	    return (
		    <div className="panel panel-warning">
		        <div className="panel-heading">
		            <h3 className="panel-title">{(this.state.id) ? "Edit" : "Add" }<i className="fa fa-times-circle fl-right" onClick={this.handleClose}></i></h3>
		        </div>
		        <div className="panel-body">
		            <form onSubmit = {this.onSubmitForm}>
		                <div className="form-group">
		                    <label>Name :</label>
		                    <input type="text" className="form-control" 
		                    	name = "name"
		                    	onChange = {this.onChange}
		                    	value = {this.state.name}
		                    />
		                </div>
		                <label>Status :</label>
		                <select className="form-control" required="required"
		                	name = "status"
	                    	onChange = {this.onChange}
	                    	value = {this.state.status}
		                >
		                    <option value={true}>Active</option>
		                    <option value={false}>Hide</option>
		                </select>
		                <br/>
		                <div className="text-center">
		                    <button type="submit" className="btn btn-warning"><i className="fa fa-plus mr-5"></i>Save</button>&nbsp;
		                    <button type="button" className="btn btn-danger" 
		                    	onClick = {this.onClearForm}
		                    ><i className="fa fa-times-circle mr-5"></i>Cancel</button>
		                </div>
		            </form>
		        </div>
		    </div>
	    );
	}
}

export default TaskForm;
