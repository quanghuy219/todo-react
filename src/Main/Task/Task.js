import React, {Component} from 'react';
import './Task.css';

class Task extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.todo.id,
            text: this.props.todo.text,
            status: this.props.todo.status,
            editing: false
        }
    }

    handleCheckbox = (e) => { 
        let currentStatus = e.target.checked ? "completed" : "active";
        this.setState({
            status: currentStatus
        }, () => {
            this.props.editTask(this.state);
        })
        
    }

    handleClickDeleteBtn = () => {
        return this.props.deleteTask(this.state.id);
    }

    editTodo = () => {
        this.setState({
            editing: true
        })
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        }, () => {
            this.props.editTask(this.state);
        })
        
    }

    saveChanges = (e) => {
        this.setState({
            editing: false,
        })
    }
    handleKeyDown = (e) => {
        if(e.keyCode == 13) 
            return this.saveChanges(e);
    }

    render() {
        const listTodo = (
            <div className="view">
                    <input className="toggle" type="checkbox" onChange={this.handleCheckbox} checked={this.props.todo.status === "completed" ? true : false}/>
                    <label className={this.props.todo.status === "completed" ? "completed" : ""} onDoubleClick={this.editTodo}>{this.state.text}</label>
                    <button className="delete" onClick={this.handleClickDeleteBtn}><i className="fa fa-times"></i></button>
                </div>
        )
        const editInput = (
            <input className="edit" value={this.state.text} onChange={this.handleChange} onBlur={this.saveChanges} onKeyDown={this.handleKeyDown}  autoFocus/>
        )
            
        
        return (
            <li className={this.state.editing ? "editing" : ""} >
               {
                   this.state.editing ? editInput : listTodo
               }
            </li>
        )
    }
}

export default Task;