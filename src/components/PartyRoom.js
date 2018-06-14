import React from 'react'
import Songs from './Songs'
import Search from './Search'
import Results from './Results'
import SongVote from './SongVote'
import ActionCable from 'actioncable'
import { Grid, Image } from 'semantic-ui-react'
// import Pic from '../images/song.jpg'
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi


class PartyRoom extends React.Component{
  constructor(props){
    super(props)
      spotifyApi.setAccessToken(this.props.token)
      this.state={
        playlist:[],
        selectedSong :{
          name:'NAME',
          artist:'ARTIST',
          image:'',
          uri:''
        },
         upvotes:0,
         downvotes:0
       }


    }

  componentDidMount = () => {
    this.getPlaylists()
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
    this.sub = cable.subscriptions.create('SongsChannel', {
      received: this.handleNewSongs
    })
  }

  getPlaylists = () => {
    console.log('playlist rendered');
    spotifyApi.getPlaylist('justdumi','5TYxdDHbPlqDLm8mhtXBDM')
    .then(res => res.tracks.items.map(item => {
      this.setState({playlist:[...this.state.playlist, item.track]})
    }) )
  }

  handleNewSongs = ({name, artist, image, uri, upvotes, downvotes, trackid}) => {
    if(uri !== this.state.selectedSong.uri ){
      console.log('Song is different, Changing State');
        this.setState({selectedSong: {
          name: name,
          artist: artist,
          image: image,
          uri: uri,
          trackid: trackid
        },
        upvotes:upvotes,
        downvotes:downvotes
      })
      } else {
        console.log("song is the same");
      }

  }




//-------------------------- METHODS FOR VOTING----------------------//
  getSong = async(e) => {

    const res = await spotifyApi.getTrack(e.target.value)
    console.log(res);
     await this.setState({chosenSong: res,
      selectedSong: {
      name: res.name,
      uri: res.uri,
      artist: res.album.artists[0].name,
      image: res.album.images[0].url,
      trackid: res.id
    },
    upvotes: 0,
  downvotes:0
  }
  )
  this.sendToBack()
}

  sendToBack = () => {
    console.log("Sending to the backend");
    this.sub.send({ name: this.state.selectedSong.name,
      artist: this.state.selectedSong.artist,
      uri: this.state.selectedSong.uri,
      image: this.state.selectedSong.image,
      upvotes: this.state.upvotes,
      downvotes: this.state.downvotes,
      trackid: this.state.selectedSong.trackid,
      id: 1 })
  }

//this.setState({selectedSong: {info: res, album: res.album}})

  handleUpvote = async() => {
    const currentcount = this.state.upvotes
    await this.setState({upvotes: currentcount + 1 })
     this.sendToBack()
    if (this.state.upvotes > 3 ) {
      this.addSong()
      this.resetComponent()
    }
  }

  handleDownVote = async() => {
    const currentcount = this.state.downvotes
    await this.setState({downvotes: currentcount + 1 })
    this.sendToBack()
    if (this.state.downvotes > 3 ) {
     this.resetComponent()
   }
  }

  addSong = async() => {
    let uri = this.state.selectedSong.uri
    const newSong = await spotifyApi.getTrack(this.state.selectedSong.trackid)
    spotifyApi.addTracksToPlaylist('justdumi','5TYxdDHbPlqDLm8mhtXBDM', [uri])
    this.setState({playlist: [...this.state.playlist, newSong]})
  }

  resetComponent = async() => {
    await this.setState({chosenSong: '', selectedSong :{name:'', artist:'',image:'', uri:''}, upvotes:0, downvotes:0 })
    this.sendToBack()
  }

  //---------------------------------------------------------------------------//
  //--------------------------Methods to remove songs--------------------------//
  //
  //----------ADVISED TO REMOVE CAUSE ANYONE CAN REMOVE (WILL MAYBE IMPLEMENT VOTE TO REMOVE)-----//
  //
  // removeSong = (e) => {
  //   console.log('remove song click');
  //   console.log(e.target.value);
  //   let trackUri = e.target.value
  //   spotifyApi.removeTracksFromPlaylist('justdumi','5TYxdDHbPlqDLm8mhtXBDM', [trackUri])
  //   const updatedPlaylist = this.state.playlist.filter(song => {
  //     return song.uri !== trackUri
  //   })
  //   this.setState({playlist: updatedPlaylist})
  // }
  //---------------------------------------------------------------------------//

  render(){

    const songs = this.state.playlist.map(song => {
      return <Songs song={song} removeSong={this.removeSong} />
    })

    return(
      <div>
        <SongVote id='songcard' data={this.state.selectedSong} handleUpvote={this.handleUpvote} handleDownVote={this.handleDownVote} />
        <div class="ui grid">
          <div class="eight wide column" style={{overflow: 'auto', maxHeight: 500, padding: 50}}>
            {songs}
          </div>
          <div class="eight wide column">
            <Search token={this.props.token} handleClick={this.getSong}/>
          </div>
        </div>
      </div>
    )
  }
}

export default PartyRoom
