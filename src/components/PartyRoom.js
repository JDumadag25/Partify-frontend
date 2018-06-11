import React from 'react'
import Songs from './Songs'
import Search from './Search'
import Results from './Results'
import SongVote from './SongVote'
// import Pic from '../images/song.jpg'
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

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
  }

  getPlaylists = () => {
    console.log('playlist rendered');
    spotifyApi.getPlaylist('justdumi','5TYxdDHbPlqDLm8mhtXBDM')
    .then(res => res.tracks.items.map(item => {
      this.setState({playlist:[...this.state.playlist, item.track]})
    }) )
  }


//-------------------------- METHODS FOR VOTING----------------------//
  getSong = (e) => {

    spotifyApi.getTrack(e.target.value)
    .then(res =>  this.setState({selectedSong: {info: res, album: res.album}}))

}

  handleUpvote = () => {
    const currentcount = this.state.upvotes
    this.setState({upvotes: currentcount + 1 })
    if (currentcount > 3 ) {
      this.addSong()
      this.resetComponent()
    }
  }

  handleDownVote = () => {
    const currentcount = this.state.downvotes
    if (currentcount > 3 ) {
     this.setState({downvotes: currentcount + 1 })
     this.resetComponent()
   }
  }

  addSong = () => {
    let uri = this.state.selectedSong.info.uri
    spotifyApi.addTracksToPlaylist('justdumi','5TYxdDHbPlqDLm8mhtXBDM', [uri])
    this.setState({playlist: [...this.state.playlist, this.state.selectedSong.info]})
  }

  resetComponent = () => this.setState({selectedSong :{name:'NAME', artist:'ARTIST',image:'', uri:''}, upvotes:0, downvotes:0 })

  render(){
    const songs = this.state.playlist.map(song => {
      return <Songs song={song} />
    })

    return(
      <div>
      <SongVote data={this.state.selectedSong} handleUpvote={this.handleUpvote} handleDownVote={this.handleDownVote} />
      <div class="ui grid">
        <div class="eight wide column" style={{overflow: 'auto', maxHeight: 500, padding: 50}}>{songs}</div>
        <div class="eight wide column"><Search token={this.props.token} handleClick={this.getSong}/></div>
      </div>
      </div>
    )
  }
}

export default PartyRoom
