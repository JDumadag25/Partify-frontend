import { Button, List } from 'semantic-ui-react'
import React from 'react'
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class Songs extends React.Component{





  render(){
    // const artists = this.props.song.artists.map(artist => <span>{artist.name}</span>)
const { song } = this.props
    return(
      <List celled id='song-list'>
         <List.Item>
           <List.Content floated='right'>
           </List.Content>
           <List.Content floated='left'>
             <i class="large itunes note icon"></i>
           </List.Content>
           <List.Content>
             <List.Header> {song.name ? song.name : null} </List.Header>
             {song.artists[0].name}
           </List.Content>
         </List.Item>
       </List>
    )
  }
}

export default Songs
