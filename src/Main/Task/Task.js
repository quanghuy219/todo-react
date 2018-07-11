import React, {Component} from 'react';
import './Task.css';

class Task extends Component {
    
    constructor(props) {
        super(props);
        this.state = this.props.todo;
        this.setState({
            editing: false
        })
    }

    handleCheckbox = (e) => {
        if(e.target.checked) {
            this.setState({
                status: "completed"
            })
        } else {
            this.setState({
                status: "active"
            })
        }
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
                    <input className="toggle" type="checkbox" onChange={this.handleCheckbox}/>
                    <label className={this.state.status === "completed" ? "completed" : ""}>{this.state.text}</label>
                    <button className="delete" onClick={this.handleClickDeleteBtn}><i className="fa fa-times"></i></button>
                </div>
        )
        const editInput = (
            <input className="edit" value={this.state.text} onChange={this.handleChange} onBlur={this.saveChanges} onKeyDown={this.handleKeyDown}  />
        )
            
        
        return (
            <li className={this.state.editing ? "editing" : ""} onDoubleClick={this.editTodo}>
               {
                   this.state.editing ? editInput : listTodo
               }
            </li>
        )
    }
}

export default Task;