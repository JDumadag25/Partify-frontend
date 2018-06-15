import React from 'react'
import Pic from '../images/song.jpg'
import { Image, Segment, Button, Card } from 'semantic-ui-react'


const SongVote = (props) => {
  console.log(props.isClicked);
  return(
    <div class="ui centered card">
      <div class="image">
        <Image src={(props.data.image) ? (props.data.image) : Pic} centered />
      </div>
      <div class="content">
        <a class="header">{props.data.name ? props.data.name : 'Name'}</a>
      </div>
      <div class="description">
          {props.data.artist ? props.data.artist : 'Artist' }
      </div>
      <div>
      {props.isClicked && props.data.uri ?

          <div class="extra content">
              <div class="ui two buttons">
                <div class="ui disabled button">Vote</div>
                <div class="ui disabled button">Casted</div>
              </div>
            </div>
            :
            <div class="extra content">
              <div class="ui two buttons">
                <div class="ui basic green button" onClick={props.handleUpvote}>Yes</div>
                <div class="ui basic red button" onClick={props.handleDownVote}>No</div>
              </div>
            </div>

      }
      </div>
    </div>
    )
}


export default SongVote
