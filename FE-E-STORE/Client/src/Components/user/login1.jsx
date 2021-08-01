import React, { Component } from 'react';

class login1 extends Component {
    render() {
        return (
            <div>
            <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
            <div className="login">
              <h2 className="active"> sign in </h2>
              <h2 className="nonactive"> sign up </h2>
              <form>
                <input type="text" className="text" name="username" />
                <span>username</span>
                <br />
                <br />
                <input type="password" className="text" name="password" />
                <span>password</span>
                <br />
                <input type="checkbox" id="checkbox-1-1" className="custom-checkbox" />
                <label htmlFor="checkbox-1-1">Keep me Signed in</label>
                <button className="signin">
                  Sign In
                </button>
                <hr />
                <a href="#">Forgot Password?</a>
              </form>
            </div>
          </div>
          
          
        );
    }
}

export default login1;