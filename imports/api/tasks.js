import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

if(Meteor.isServer){

  Meteor.publish('tasks', ()=>{
    return Tasks.find();
  });

  Meteor.methods({
    //Inster new task
    insertNewTask(text){
      if (! this.userId ) {
         throw new Meteor.Error('not-authorized');
      }

      Tasks.insert({
        text,
        createdAt: new Date(),
        owner: Meteor.userId()
      });
    },
    //Remove task
    removeTask(id){
      let task = Tasks.findOne(id);
      if(!this.userId || (task.owner !== this.userId)){
        throw new Meteor.Error('not-authorized');
      }
      Tasks.remove(id);
    },
    //Set check
    setCheck(id, check){
      Tasks.update(id, {
        $set : {
          checked : !check
        }
      });
    }
  });

}
