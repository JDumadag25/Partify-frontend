import React from 'react'
import Pic from '../images/song.jpg'
import { Image, Segment, Button, Card } from 'semantic-ui-react'


const SongVote = (props) => {
  return(
    <Card>
      <Image src={(props.data.album) ? (props.data.album.images[0].url) : Pic} size='small' centered />
        <Card.Content>
          <Card.Header>{props.data.info ? props.data.info.name : 'Name'}</Card.Header>
          <Card.Description>{props.data.album ? props.data.album.artists[0].name : 'Artist' }</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            { props.data.info ?
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
