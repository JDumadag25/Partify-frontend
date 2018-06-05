import React from 'react'

class Login extends React.Component {
  state = {
    signUp:false
  }

  handleClick = (e) => {
    e.preventDefault()
    console.log("clicked");
  }

  render(){
    return(
      <form>
        <input placeholder='Username'></input><br></br>
        <input placeholder='Password'></input><br></br>
        <button>Log In</button><br></br>
        <br></br>
        <span>Register</span><br></br>
        <button onClick={this.handleClick}>Sign up</button>
      </form>
    )
  }
}

export default Login
