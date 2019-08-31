import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

class Register extends React.Component {
  state = {
    username:'',
    password:'',
    passwordConfirmation:'',
    errors:[]
  }

  handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
 }

 handleSubmit = (event) => {
   const {username, password} = this.state;
 //   event.preventDefault();
 //   console.log(this.props);
 //   if (this.state.password === this.state.passwordConfirmation){
 //   this.props.onSubmit(this.state.username, this.state.password, this.props.history.push)
 // } else {
 //   this.setState({errors: ['Passwords do not match']})
 // }
 fetch('http://localhost:3000/users/', {
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

     this.props.history.push("/partify");
   } else {
     console.log(json.errors);
     this.setState({errors:[json.errors]})
   }
   });
 }

  render(){
    const errors = this.props.errors.map(error => <h2>Username and Password cannot be blank</h2>)
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
              Sign up
            </Header>
            <p>{errors}</p>
            <h3>{this.state.errors}</h3>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' name='username' onChange={this.handleChange} />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm Password'
                  type='password'
                  name='passwordConfirmation'
                  onChange={this.handleChange}
                />

              <Button color='grey' fluid size='large'>
                  Sign Up
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Register
