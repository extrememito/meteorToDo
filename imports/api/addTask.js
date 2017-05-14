import { Tasks } from '../api/tasks.js';

if(Meteor.isServer){

  Meteor.methods({
    insertNewTask(text){
      Tasks.insert({
        text,
        createdAt: new Date()
      });
    }
  });
}
