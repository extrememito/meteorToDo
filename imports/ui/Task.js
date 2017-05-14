import React, { Component, PropTypes } from 'react';

import { Tasks } from '../api/tasks.js';

export default class Task extends Component{

  toggleCheck(){
    Meteor.call('setCheck', this.props.task._id, this.props.task.checked);
  }

  deleteTask(){
    Meteor.call('removeTask', this.props.task._id);
  }

  render (){
    const taskClassName = this.props.task.checked ? 'checked' : '';

    return(
      <li className={taskClassName}>
        <button
          className = "delete"
          onClick = {this.deleteTask.bind(this)}>&times;</button>
        <input
          type="checkbox"
          readOnly
          checked={this.props.task.checked}
          onClick={this.toggleCheck.bind(this)}
          />

        <span className="text">{this.props.task.text}</span>
      </li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
};
