import React, {Component} from 'react';
import './Main.css';
import Task from './Task/Task';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            maxID: 0,
            todos: []
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

    deleteTask = (todoID) => {
        let arr = [...this.state.todos];
        let index = 0;
        for(index in this.state.todos) {
            if(this.state.todos[index].id === todoID)
                break;
        }
        arr.splice(index,1);
        this.setState({todos: arr});
    }

    render() {
        return (
            <div className="container">
                <div className="main">
                    <section id="input-form">
                        <input value={this.state.input} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="What needs to be done?"/>
                    </section>

                    <section>
                        <ul className="todo-list">
                            {
                                this.state.todos.map( todo => {
                                    return <Task key={todo.id} todo={todo} deleteTask={this.deleteTask}/>
                                })
                            }  
                        </ul>
                    </section>

                    <footer className="footer">
                        <p className="todo-count">{this.state.todos.length} items left</p>
                        <ul>
                            <li><a href="#" className="selected">All</a></li>
                            <li><a href="#">Active</a></li>
                            <li><a href="#">Completed</a></li>
                        </ul>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Main;