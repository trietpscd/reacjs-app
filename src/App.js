import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import _ from 'lodash';
// import demo from './trainning/demo';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			task : [],
			isDisplay: false,
			taskUpdating : null,
			filter : {
				name : '',
				status : -1,
			},
			keywords : '',
			bySortName : 'name',
			bySortValue : 1,
		}

	}
	onGenerate = () => {
		var tasks = [
			{
				id : this.generateID(),
				name : 'Iphone',
				status : true,
			},
			{
				id : this.generateID(),
				name : 'Samsung',
				status : false,
			},
			{
				id : this.generateID(),
				name : 'Oppo',
				status : true,
			},
			{
				id : this.generateID(),
				name : 'Sony',
				status : false,
			},
		];
		
		localStorage.setItem('tasks',JSON.stringify(tasks)); //string		
	}
	toggleForm = () => {
		if(this.state.taskUpdating !== null){
			this.setState({
				taskUpdating : null,
			});
		} else {
			this.setState({
				isDisplay : !this.state.isDisplay,
				taskUpdating : null,
			});
		}		
	}
	onCloseForm = () => {
		this.setState({
			isDisplay : !this.state.isDisplay
		});
	}
	onShowForm = () => {
		this.setState({
			isDisplay : true
		});
	}
	onClearForm = () => {
		this.setState({
			name : '',
			status : false
		})
	}
	onSubmitForm = (data) => {
		var { tasks } = this.state;
		if(data.id) {
			tasks.forEach( (task,index) => {
				if(task.id === data.id ) {
					tasks[index] = data;
				}
			});
		} else {
			data.id = this.generateID();
			tasks.push(data);
		}
		this.setState ({
			tasks : tasks,
			taskUpdating : null,
		});
		localStorage.setItem('tasks',JSON.stringify(tasks));
		this.onClearForm();
		this.onCloseForm();
	}
	onChangeStatus = (id) => {
		var { tasks } = this.state;
		tasks.forEach( (task,index) => {
			if(task.id === id ) {
				task.status = !task.status;
			}
		});
		this.setState({
			tasks : tasks
		});
		localStorage.setItem('tasks',JSON.stringify(tasks));
	}
	onDelete = (id) => {
		var { tasks } = this.state;
		tasks.forEach( (task,index) => {
			if( task.id === id ) {
				tasks.splice(index, 1);
			}
		});
		this.setState({
			tasks : tasks
		});
		localStorage.setItem('tasks',JSON.stringify(tasks));
	}
	onEdit = (id) => {
		this.onShowForm();
		var { tasks } = this.state;
		var taskUpdating = null;
		tasks.forEach( (task,index) => {
			if( task.id === id ) {
				taskUpdating = (tasks[index]);
			}
		});
		this.setState({
			taskUpdating : taskUpdating
		});
	}
	componentWillMount() {
		if(localStorage && localStorage.getItem('tasks')){
			var tasks = JSON.parse(localStorage.getItem('tasks'));//object
			this.setState({
				tasks : tasks
			});
  		}
  		console.log('componentWillMount');
	}
	randomStr = () => {
		return Math.floor(Math.random()*0x100).toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}
	generateID = () => {
		return this.randomStr() + this.randomStr() + '-' + this.randomStr() + '-' + this.randomStr() + '-' + this.randomStr() + '-' + this.randomStr();
	}
	onFilter = (filterName,filterStatus) => {
		filterStatus = parseInt(filterStatus, 10);
		this.setState({
			filter : {
				name : filterName.toLowerCase(),
				status : filterStatus,
			}
		});
	}
	onSearch = (keywords) => {
		this.setState({
			keywords : keywords.toLowerCase()
		})
	}
	onSort = (bySortName,bySortValue) => {
		this.setState({
			bySortName : bySortName,
			bySortValue : bySortValue
		})
	}
	render() {
		var { tasks, isDisplay, taskUpdating, filter, keywords, bySortName, bySortValue} = this.state;
		if(filter) {
			if (filter.name) {
				tasks = _.filter(tasks, (task) => {
					return task.name.toLowerCase().indexOf(filter.name) !== -1;
				})
			}
		tasks = _.filter(tasks, (task) => {
				if(filter.status === -1) {
					return task;
				} else {
					return task.status === (filter.status === 1 ? true : false);
				}
			})
		}
		if (keywords) {
			tasks = _.filter(tasks, (task) => {
				return task.name.toLowerCase().indexOf(keywords) !== -1;
			})
		}
		if(bySortName === "name") {
			tasks = tasks.sort((a, b) => {
				var sortAZ=a.name, sortZA=b.name;
				if (sortAZ < sortZA) return -bySortValue;
				else if (sortAZ > sortZA) return bySortValue;
				else return 0;
			})
		} else {
			tasks = tasks.sort((a, b) => {
				var sortAZ=a.status, sortZA=b.status;
				if (sortAZ < sortZA) return bySortValue;
				else if (sortAZ > sortZA) return -bySortValue;
				else return 0;
			})
		}
		
		var elementTaskForm = isDisplay 
			? <TaskForm 
				onCloseForm = {this.onCloseForm} 
				onSubmitForm = {this.onSubmitForm}
				taskUpdating = { taskUpdating }
				
			/> 
			: '';
	    return (
			<div className="container">
		        <div className="text-center">
		            <h1>Task Management System</h1>
		            <hr/>
		        </div>
		        <div className="row">
		        	<div className={isDisplay ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
		            	{ elementTaskForm }
		            </div>
		            <div className={isDisplay ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
			            <div className="form-group">
			            	<button type="button" className="btn btn-primary " onClick={this.toggleForm}>
			                    <span className="fa fa-plus mr-5 " ></span>Add
			                </button>
			                <button type="button" className="btn btn-danger ml-5" onClick={() => this.onGenerate()}>
			                    Generate Data
			                </button>
			            </div>
		                
		                <Control 
		                	onSearch={this.onSearch}
		                	onSort = {this.onSort}
		                	bySortName = { bySortName }
		                	bySortValue = { bySortValue }
		                />
		                <TaskList 
		                	tasks = {tasks}
		                	onChangeStatus = {this.onChangeStatus}
		                	onDelete = {this.onDelete}
		                	onEdit = {this.onEdit}
		                	onFilter = {this.onFilter}
		                />
		            </div>
		        </div>
		    </div>
	    );
	}
}
App.propTypes = {
  children: PropTypes.string
};
App.defaultProps = {
	children : 'Hello'
}
export default App;
