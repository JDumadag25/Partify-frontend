import React from 'react';
import { Button, Grid, Header } from 'semantic-ui-react'

class Home extends React.Component{
  render(){
    return(


      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h1' color='grey' textAlign='center'>
              WELCOME TO PARTIFY
            </Header>

            <Button color='grey' fluid size='large' href='http://localhost:3001/login'>
              LOGIN
            </Button>
            <br></br>
            <Button color='grey' fluid size='large' href='http://localhost:3001/register'>
              REGISTER
            </Button>
          </Grid.Column>
        </Grid>
      </div>

    )
  }
}

export default Home
