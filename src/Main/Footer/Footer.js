import React, {Component} from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);

    }

    triggerClearComplete = () => {
        this.props.clearCompletedTasks()
    }

    render() {
        const show = {
            dispay: "inherit"
        }
        const hide = {
            display: "none"
        }
        return (
            <footer className="footer" style={this.props.todos.length ? show : hide}>
            <p className="todo-count">
                {
                   this.props.todos.filter(todo => {
                       return todo.status == "active"
                   }).length
                } items left
            </p>
            <ul>
                <li><a href="#" className={this.props.view.toString() == ["active", "completed"].toString() ? "selected" : ""} onClick={
                    () => {
                        this.props.updateView(["active","completed"])
                    }
                }>
                All
                </a></li>
                <li><a href="#" className={this.props.view.toString() == ["active"].toString() ? "selected" : ""} onClick={
                    () => {
                        this.props.updateView(["active"])
                    }
                }>
                Active
                </a></li>
                <li><a href="#" className={this.props.view.toString() == ["completed"].toString() ? "selected" : ""} onClick={
                    () => {
                        this.props.updateView(["completed"])
                    } 
                }>
                Completed
                </a></li>
            </ul>

            <button href="#" className="clear"  onClick={this.triggerClearComplete} disabled={ this.props.todos.filter(todo => todo.status === "completed").length ? false : true}>Clear completed</button>
        </footer> 
        )
    }
}

export default Footer;