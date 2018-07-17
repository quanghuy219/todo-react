import React, {Component} from 'react';
import './Main.css';
import Task from './Task/Task';
import Footer from './Footer/Footer';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            maxID: 0,
            todos: [],
            view: ["active", "completed"],
            countActive: 0,
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
        let arr = [];
        if(e.target.checked) {
            arr = this.state.todos.map(todo => {
                todo.status = "completed";
                return todo;
            })
        } else {
            arr = this.state.todos.map(todo => {
                todo.status = "active"
                return todo;
            })
        }
        this.setState({
            todos: arr  
        })
    } 

    render() {
        const show = {
            dispay: "inherit"
        }
        const hide = {
            display: "none"
        }
        return (
            <div className="container">
                <div className="main">
                   
                    <section id="input-form">
                        <input value={this.state.input} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="What needs to be done?"/>
                    </section>

                    <section id="todo-list">
                        <input className="toggle-all" style={ this.state.todos.length ? show : hide } type="checkbox" onChange={this.toggleAll} checked={
                            !this.state.todos.filter(todo => {
                                return todo.status == "active"
                            }).length
                        }/>
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

                    <Footer updateView={this.updateView} todos={this.state.todos} view={this.state.view} clearCompletedTasks={this.clearCompletedTasks}/>
                </div>
            </div>
        )
    }
}

export default Main;