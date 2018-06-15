import React, { Component } from 'react';
import ListItem from './ListItem';
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1,
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        );
        this.setState({
            [name] : value
        });
    }
	render() {
        var { tasks } = this.props;
        var {filterName, filterStatus } = this.state;
        var listItemTemplate = tasks.map( (task,index ) => {
            return <ListItem 
                    key={index} 
                    index = {index} 
                    task = {task}
                    onChangeStatus = {this.props.onChangeStatus}
                    onDelete = {this.props.onDelete}
                    onEdit = {this.props.onEdit}
                />
        })
	    return (
			<div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">S.No</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="text" className="form-control" 
                                        name="filterName"
                                        onChange={this.onChange}
                                        value={filterName}
                                    />
                                </td>
                                <td>
                                    <select className="form-control"
                                        name="filterStatus"
                                        onChange={this.onChange}
                                        value={filterStatus}
                                    >
                                        <option value={-1}>All</option>
                                        <option value={0}>Hide</option>
                                        <option value={1}>Active</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {listItemTemplate}
                        </tbody>
                    </table>
                </div>
            </div>
	    );
	}
}

export default TaskList;
