import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class Login extends React.Component{

  state = {
    username: "",
    password: "",
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    const {username, password} = this.state;
    event.preventDefault();
    console.log(this.props);
    // if (this.state.password === this.state.passwordConfirmation){
    //this.props.onSubmit(this.state.email, this.state.password, this.props.history.push)
   // } else {
   //  this.setState({errors: ['Passwords do not match']})
   // }
   fetch('http://localhost:3000/sessions/', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
     },
     body: JSON.stringify({ username, password })})
     .then(res => res.json())
     .then(json => {
       if(json.token){
       localStorage.setItem('token', json.token);
       localStorage.setItem('user_id', json.user_id);
       localStorage.setItem('username', json.username);

       this.props.history.push('/partify');
     } else {
       this.setState({errors: [json.errors]})
     }
     });
  }

  render(){
     const errors = this.props.errors.map(error => <h3>{error}</h3>)
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
          <Header as='h2' color='grey' textAlign='center'>
            Log-in to your account
          </Header>
          {errors}
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' name='username' onChange={this.handleChange} value={this.state.username}/>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                onChange={this.handleChange}
                value={this.state.password}
              />

            <Button color='grey' fluid size='large' >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='http://localhost:3001/register'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  )
 }
}

export default Login
