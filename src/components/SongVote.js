import React from 'react'
import Pic from '../images/song.jpg'
import { Image, Segment, Button, Card, Modal, Header } from 'semantic-ui-react'


const SongVote = (props) => {

  return(
    <Modal open={props.isClicked} closeIcon>
      <Modal.Header>Vote</Modal.Header>
      <Modal.Content image>
          <Image src={(props.data.image) ? (props.data.image) : Pic} />
        <Modal.Description>
          <Header>{props.data.name ? props.data.name : 'Name'}</Header>
          <p>{props.data.artist ? props.data.artist : 'Artist' }</p>
          <p>{props.votedOn ?

            <div class="extra content">
              <div class="ui two buttons">
                <div class="ui basic green button" onClick={props.handleUpvote}>Yes</div>
                <div class="ui basic red button" onClick={props.handleDownVote}>No</div>
              </div>
            </div>
              :
              <div class="extra content">
                  <div class="ui two buttons">
                    <div class="ui disabled button">Vote</div>
                    <div class="ui disabled button">Casted</div>
                  </div>
                </div>
                

          }</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    )
}







export default SongVote
