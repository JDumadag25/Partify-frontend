import React from 'react'
import ChatArea from './ChatArea'
import ActionCable from 'actioncable'
import { Form } from 'semantic-ui-react'

class Chat extends React.Component{

  state = {
    currentMessage: '',
    chatLogs: []
  }


  componentDidMount = () => {
    this.createSocket()
  }

  chatMessage = (e) => {
    console.log(e.target.value)
    this.setState({currentMessage: e.target.value})
  }

  createSocket() {
  let cable = ActionCable.createConsumer('ws://localhost:3000/cable');
  this.chats = cable.subscriptions.create({
    channel: 'ChatChannel'
  }, {
    connected: () => {},
    received:  (data) => {
      let chatLogs = this.state.chatLogs;
      chatLogs.push(data);
      this.setState({ chatLogs: chatLogs });
    },
    create: function(chatContent) {
      this.perform('create', {
        content: chatContent
      });
    }
  });
}

handleSendEvent = (event) => {
  event.preventDefault();
  this.chats.create(this.state.currentMessage);
  this.setState({
    currentMessage: ''
  });
}

  render(){
    const chat = this.state.chatLogs.map(chat => {
      return <ChatArea chat={chat}/>
    })
    return(
    <div>
      <div id='chatbox'>
        {chat}
      </div>
      <Form>
        <Form.Field id='chatfield'>
          <label>Chat</label>
          <input placeholder='Chat' onChange={this.chatMessage}  value={ this.state.currentMessage }/>
          <button onClick={this.handleSendEvent}>Send</button>
        </Form.Field>
      </Form>
    </div>
    )
  }
}

export default Chat
