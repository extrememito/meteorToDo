import React, {Component, PropTypes} from 'react';
import EmailPassForm from './EmailPassForm';

export default class Login extends Component{

  signIn(event){
    event.preventDefault();
    const email = $('#email').val();
    const pass = $('#pass').val().trim();

    Meteor.loginWithPassword(email, pass, (error) => {
      if(error){
        console.log(error.reason);
      }else{
        console.log('success');
      }
    });

  }

  render(){
    return(
      <div>
        <span>Sing in</span>
      <EmailPassForm submitAction={this.signIn}/>
      </div>
    );
  }
}
