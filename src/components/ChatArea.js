import React from 'react'
import { Segment, List } from 'semantic-ui-react'

class ChatArea extends React.Component{

  render(){
console.log(this.props.chat);
    return(
      <Segment inverted id='chat'>
        <List divided inverted relaxed>
          <List.Item>
            <List.Content>
              <List.Header>{this.props.chat.content}</List.Header>
            {this.props.chat.created_at}
            </List.Content>
          </List.Item>
        </List>
      </Segment>
    )
  }
}

export default ChatArea
