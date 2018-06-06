import React from 'react';
import Login from './Login'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class Home extends React.Component{
  render(){
    return(
      <div>
        <h1>Welcome to Partify</h1>
          <Button color='grey' fluid size='large' href='http://localhost:3001/login'>
            LOGIN
          </Button>
          <br></br>
          <Button color='grey' fluid size='large' href='http://localhost:3001/register'>

            REGISTER
          </Button>
      </div>
    )
  }
}

export default Home
