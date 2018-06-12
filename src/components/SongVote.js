import React from 'react'
import Pic from '../images/song.jpg'
import { Image, Segment, Button, Card } from 'semantic-ui-react'


const SongVote = (props) => {
  return(
    <div class="ui centered card">
      <div class="image">
        <Image src={(props.data.album) ? (props.data.album.images[0].url) : Pic} centered />
      </div>
      <div class="content">
        <a class="header">{props.data.info ? props.data.info.name : 'Name'}</a>
      </div>
      <div class="description">
          {props.data.album ? props.data.album.artists[0].name : 'Artist' }
      </div>
      <div>
      {props.data.info ?
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
      }
      </div>
    </div>
    )
}


export default SongVote
