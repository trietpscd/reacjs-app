import React, { Component } from 'react';

class ListItem extends Component {
	// constructor(props) {
	// 	super(props);
	// }
	onChangeStatus = () => {
		this.props.onChangeStatus(this.props.task.id);
	}

	onDelete = () => {
		this.props.onDelete(this.props.task.id);
	}
	onEdit = () => {
		this.props.onEdit(this.props.task.id);
	}
	render() {
		var { task, index } = this.props;
	    return (
				<tr key={index + 1 }>
				    <td>{index + 1 }</td>
				    <td>{task.name}</td>
				    <td className="text-center">
				        <span 
				        	className={task.status === true ? "label label-success" : "label label-danger"}
				        	onClick = {this.onChangeStatus}
				        >
		                    {task.status === true ? "Active" : "Hide"}
		                </span>
				    </td>
				    <td className="text-center">
				        <button type="button" className="btn btn-warning" onClick={this.onEdit}>
				            <span className="fa fa-pencil mr-5"></span>Edit
				        </button>
				        &nbsp;
				        <button type="button" className="btn btn-danger" onClick={this.onDelete}>
				            <span className="fa fa-trash mr-5"></span>Delete
				        </button>
				    </td>
				</tr>
	    );
	}
}

export default ListItem;
