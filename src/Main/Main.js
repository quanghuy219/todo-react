import React, {Component} from 'react';
import './Main.css';
import Task from './Task/Task';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            maxID: 0,
            todos: [],
            view: ["active", "completed"]
        }
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })

    }

    handleKeyDown = (e) => {
        if(e.keyCode === 13) {

            if(!this.state.input) return false;

            let newTask = {
                id: this.state.maxID + 1,
                text: this.state.input,
                status: 'active'
            }
            this.setState({
                todos: [...this.state.todos, newTask],
                input: '',
                maxID: this.state.maxID + 1,
            })
        }   
    }

    deleteTask = (...todoID) => {
        let arr = this.state.todos;
        arr = arr.filter(todo => {
            return !todoID.includes(todo.id);
        })
        this.setState({todos: arr});
    }

    editTask = ({id, text, status}) => {
        let arr = this.state.todos.map( todo => {
            if(todo.id == id) {
                todo = {id,text,status}
            }
            return todo;
        } );
        this.setState({
            todos: arr
        })
    }

    clearCompletedTasks = () => {
        let arr = this.state.todos;
        arr = arr.filter(todo => {
            return todo.status === "completed"
        })
        .map(todo => todo.id)
        this.deleteTask(...arr);
    }

    // default value: all tasks
    updateView = (status = ["active","completed"]) => {
        this.setState({
            view: status
        })
    }

    toggleAll = (e) => {
        
    } 

    render() {
        let activeTasks = this.state.todos.filter(todo => {
            return todo.status == "active";
        })
        let completedTasks = this.state.todos.filter(todo => {
            return todo.status == "completed";
        }) 
       
        return (
            <div className="container">
                <div className="main">
                   
                    <section id="input-form">
                        <input value={this.state.input} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="What needs to be done?"/>
                    </section>

                    <section id="todo-list">
                        <input className="toggle-all" type="checkbox" onChange={this.toggleAll}/>
                        <ul className="todo-list">
                            {
                                this.state.todos.filter(todo => {
                                    return this.state.view.includes(todo.status)
                                })
                                .map( todo => {
                                    return <Task key={todo.id} todo={todo} deleteTask={this.deleteTask} editTask={this.editTask}/>
                                })
                            }  
                        </ul>
                    </section>

                    <footer className="footer">
                        <p className="todo-count">
                            {
                               activeTasks.length
                            } items left
                        </p>
                        <ul>
                            <li><a href="#" className={this.state.view.toString() == ["active", "completed"].toString() ? "selected" : ""} onClick={
                                () => {
                                    this.updateView(["active","completed"])
                                }
                            }>
                            All
                            </a></li>
                            <li><a href="#" className={this.state.view.toString() == ["active"].toString() ? "selected" : ""} onClick={
                                () => {
                                    this.updateView(["active"])
                                }
                            }>
                            Active
                            </a></li>
                            <li><a href="#" className={this.state.view.toString() == ["completed"].toString() ? "selected" : ""} onClick={
                                () => {
                                    this.updateView(["completed"])
                                } 
                            }>
                            Completed
                            </a></li>
                        </ul>

                        <a href="#" className="clear"  onClick={this.clearCompletedTasks} >Clear completed</a>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Main;