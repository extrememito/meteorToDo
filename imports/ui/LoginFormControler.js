import React, {Component, PropTypes} from 'react';
import EmailPassForm from './EmailPassForm';

export default class LoginFormControler extends Component{

  constructor(props){
    super(props);
    this.state = {
      showRegister: false
    };
  }

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
  }

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

  singOut(){
    Meteor.logout((error)=>{
      if(error){
        console.log(error);
      }else{
        console.log('success log out');
      }
    });
  }

  getForm(){
    const loginLabel = <label>Log In</label>;
    const login = <EmailPassForm submitAction={this.signIn}/>;

    const regisLabel = <label>Register new user</label>;
    const regis = <EmailPassForm submitAction={this.createUser}/>;

    if(this.props.currentUser){
      return (<div><button onClick={this.singOut}>Logout</button></div>);
    }else{
      if(this.props.showRegister){
        return(
          <div>
            {regisLabel}
            {regis}
          </div>
        );
      }else{
        return(
          <div>
            {loginLabel}
            {login}
          </div>
        );
      }
    }


  }

  render(){
    return  this.getForm();
  }
}
