import React from 'react'

class Register extends React.Component {
  state = {

  }

  render(){
    return(
      <form>
        <input placeholder='Name'></input><br></br>
        <input placeholder='Userame'></input><br></br>
        <input placeholder='Password'></input><br></br>
        <input placeholder='Confirm Password'></input><br></br>
        <button>Sign Up</button><br></br>

      </form>
    )
  }
}

export default Login
