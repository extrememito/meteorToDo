import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import Task from './Task';
import LoginFormControler from './LoginFormControler'
// import Register from './Register';
// import Login from './Login';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      hideCompleted: false,
      showRegister: false
    };
  }

  toggleHideCompleted(){
    this.setState({
      hideCompleted: !this.state.hideCompleted
    });
  }

  toggleShowRegister(){
    this.setState({
      showRegister: !this.state.showRegister
    });
  }

  handleSubmit(event){
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    try{
    Meteor.call('insertNewTask', text);
    }catch(e){
      console.log(e);
    }

    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  /*
  var tasks = [{ _id: 1, text: 'This is task 1' },
      { _id: 2, text: 'This is task 2' },
      { _id: 3, text: 'This is task 3' }];

      console.log(tasks);*/

  render() {

    // let tasks = [{ _id: 1, text: 'This is task 1' },
    //     { _id: 2, text: 'This is task 2' },
    //     { _id: 3, text: 'This is task 3' }];

    let filteredTasks =  this.props.tasks;
    if(this.state.hideCompleted){
        filteredTasks = filteredTasks.filter( task => !task.checked );
    }

   const list = filteredTasks.map( (task) => <Task key={task._id} task={task} /> );

  //  let logedIn;
  //  if(this.props.currentUser){
  //    logedIn = true;
  //  }else{
  //    logedIn = false
  //  }
   //
  //   const sigRegButton = <button onClick={this.toggleShowRegister.bind(this)}>{this.state.showRegister ? "Sign in" : "Register new user"}</button>
  //   const form = logedIn ? (<button onClick={Meteor.logout}>Logout</button>) : (this.state.showRegister ? <Register /> :<Login />);
   //
  //   let controler;
   //
  //   if(userReady){
  //
  //   }

    return (
      <div className="container" >
        <header>
          <h1>Todo List {this.props.incompleteCount}</h1>
        <label className="hide-Completed">
          <input
            type="checkbox"
            readOnly
            checked={this.state.hideCompleted}
            onClick={this.toggleHideCompleted.bind(this)}
          />
        Hide Completed Tasks
        </label>
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" ref="textInput" placeholder="Ta tu daj co treba spravic"/>
          </form>
        </header>
        <ul>
          {this.props.ready ? list : (<h3>Tasks Loading...</h3>)}
        </ul>
          {(this.props.currentUser !== undefined) ? (<LoginFormControler currentUser={this.props.currentUser}/>) : "User Loading" }
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired
};


export default createContainer(() => {
  let tasksSub = Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, {
      sort: {
        createdAt: -1
      }
    }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    ready: tasksSub.ready(),
    currentUser: Meteor.user()
  };
}, App);
