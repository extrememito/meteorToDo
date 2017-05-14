import React, {Component, PropTypes} from 'react';
import EmailPassForm from './EmailPassForm';

export default class Register extends Component{

  createUser(event){
    event.preventDefault();
    const email = $('#email').val();
    const pass = $('#pass').val().trim()
    console.log(email);
    console.log(pass);
    //Server Side creating.
    Meteor.call('createUsers', email, pass);
    Meteor.loginWithPassword(email, pass, (error) => {
      if(error){
        console.log(error.reason);
      }else{
        console.log('success');
      }
    });  
    // Client side creating
    // Accounts.createUser({
    //   email: email,
    //   password: pass
    // },function(error){
    //   if(error){
    //     console.log(error.reason);
    //   }else{
    //     console.log("success");
    //   }
    // } );
  }

  render(){
    return(
      <div>
        <span>Register new user</span>
      <EmailPassForm submitAction={this.createUser}/>
      </div>
    );
  }
}
