import React from 'react'
import Pic from '../images/song.jpg'
import { Image, Segment, Button, Card } from 'semantic-ui-react'


const SongVote = (props) => {

  return(
    <Card>
      <Image src={(props.data.image) || Pic} size='small' centered />
        <Card.Content>
          <Card.Header>{props.data.name}</Card.Header>
          <Card.Description>{props.data.artist}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            { props.data.uri ?
          <div>
            <Button primary onClick={props.handleUpvote}>Yes</Button>
            <Button secondary onClick={props.handleDownVote}>No</Button>
          </div>
            :
          <div>
            <button class="ui disabled button">Voting</button>
            <button class="ui disabled button">Done</button>
          </div>
            }
          </div>
        </Card.Content>
      </Card>
    )
}


export default SongVote
