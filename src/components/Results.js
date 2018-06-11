import React from 'react'
import { Button, List } from 'semantic-ui-react'





const Results = (props) => {

    // const artist = this.props.results.artists.map(artist => <span>{artist.name}</span>)
    return (
      <List celled>
         <List.Item>
           <List.Content floated='right'>
             <Button compact size='small' onClick={props.handleClick} value={props.results.id} >Vote</Button>
           </List.Content>
           <List.Content floated='left'>
             <i class="large itunes note icon"></i>
           </List.Content>
           <List.Content>
             <List.Header>{props.results.name}</List.Header>
             {props.results.artists[0].name}
           </List.Content>
         </List.Item>
       </List>
    )
  }


export default Results
