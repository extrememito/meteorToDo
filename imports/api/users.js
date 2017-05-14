if(Meteor.isServer){

  Accounts.config({
    forbidClientAccountCreation : true
  });

  // Accounts.validateNewUser((user) => {
  //     console.log(user);
  //     return true;
  //     // if(user.password.length >= 6){
  //     //   return true;
  //     // }else{
  //     //   throw new Meteor.Error(403, 'Password must be atleast 6 characters long');
  //     // }
  // });

  Meteor.methods({
    createUsers(email, pass){
      Accounts.createUser({
        email: email,
        password: pass,
        profile: {
          tacimascaju: 'single'
        }
      });
    }
  });
}
