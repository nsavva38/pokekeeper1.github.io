// import stuff
// react
// usestate
// encryption???


// create registration route for frontend
// path /registration
// in react create a form containing
  // needs onSubmit and event default
  // if (fields empty then) 
  // {message user fields empty, enter credentials}
  // else {
    // user needs to have 
    // id? will the db give us a number?
    // username: string must be must be unique
    // password: string
    // teams? default is 0 
    // error? (db should throw correct errors)
    // are we giving token upon registration?
      // if so then access to protected routes
      // if not then direct to login path
      // }
// create login route for frontend
// path /login
// form for username and password
  // form login
  // takes in
  // username
  // password
  // onSubmit and event default
    // if empty then {}
      // message user: enter credentials
    // else {}
      // try
        // submit credentials (name of function) to our db (async) 
        // makes call to db/api (await)
        // check
        // if (!user) {}
          // then error(db should throw correct errors)
        // else {}
          // login user which includes 
          // give token
          // store token in local storage until logged out
          // take to user homepage
            // link to user protected path
            // should be able to view profile & teams
          // create logout component(separate)
            // button to link should only be available to logged in users on profile page
      // catch (e) {}
        // display error from db 
  // export the component and authentication
