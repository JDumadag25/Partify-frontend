import React from 'react'
import Songs from './Songs'
import Search from './Search'
import SongVote from './SongVote'
import Chat from './Chat'
import ActionCable from 'actioncable'
import { Grid, Sidebar, Segment, Menu, Icon} from 'semantic-ui-react'
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi

//---Enter the playlist you would like to use here---//
const partyplaylist = '64W5bbmXSTUxg6negfo96k'

// const partyplaylist = '5TYxdDHbPlqDLm8mhtXBDM'
// spotify:playlist:64W5bbmXSTUxg6negfo96k

class PartyRoom extends React.Component{
  constructor(props){
    super(props)
      spotifyApi.setAccessToken(this.props.token)
      this.state={
        user:'',
        collabplaylist:'64W5bbmXSTUxg6negfo96k',
        currentplaylist:'',
        selectedplaylist:'',
        usersPlaylists:[],
        playlist:[],
        selectedSong :{
          name:'NAME',
          artist:'ARTIST',
          image:'',
          uri:''
        },
         upvotes:0,
         downvotes:0,
         isClicked: false,
         votedOn: false,
         renderTab: 'search'
       }
    }

  componentDidMount = () => {
    this.getUser()
    this.getUserPlaylists()
    this.getPlaylists()
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
    this.subscription = cable.subscriptions.create('SongsChannel', {
      received: this.handleNewSongs
    })
  }

  getUser = () => {
    spotifyApi.getMe()
    .then(res => this.setState({user: res.id}))
  }

  getUserPlaylists = () => {
    spotifyApi.getUserPlaylists()
    .then(res => this.setState({usersPlaylists: res.items}))
  }

  getPlaylists = () => {
    console.log('playlist rendered');
    spotifyApi.getPlaylist(this.state.user, this.state.collabplaylist)
    .then(res => res.tracks.items.map(item => {
      this.setState({playlist:[...this.state.playlist, item.track]})
    }) )
  }


  handleNewSongs = async({name, artist, image, uri, upvotes, downvotes, trackid, vote}) => {
    if(uri !== this.state.selectedSong.uri ){
      console.log('Song is different, Changing State');
        await this.setState({selectedSong: {
          name: name,
          artist: artist,
          image: image,
          uri: uri,
          trackid: trackid
        },
        upvotes:upvotes,
        downvotes:downvotes,
        isClicked:vote,
        votedOn: true
      })

    } else if (upvotes === 2) {

        const newSong = await spotifyApi.getTrack(this.state.selectedSong.trackid )
        await this.setState({playlist: [...this.state.playlist, newSong]})
        this.resetComponent()
        console.log("song is the same");
      } else {
        console.log(upvotes);
      }
  }




//-------------------------- METHODS FOR VOTING----------------------//
  getSong = async(e) => {
    const res = await spotifyApi.getTrack(e.target.value)
     await this.setState({chosenSong: res,
      selectedSong: {
      name: res.name,
      uri: res.uri,
      artist: res.album.artists[0].name,
      image: res.album.images[0].url,
      trackid: res.id
    },
    upvotes: 1,
    downvotes: 1,
    isClicked: true,
    votedOn: false
  }
 )
  await this.sendToBack()
}

  sendToBack = async() => {
    console.log("Sending to the backend");
    this.subscription.send({ name: this.state.selectedSong.name,
      artist: this.state.selectedSong.artist,
      uri: this.state.selectedSong.uri,
      image: this.state.selectedSong.image,
      upvotes: this.state.upvotes,
      downvotes: this.state.downvotes,
      trackid: this.state.selectedSong.trackid,
      vote: this.state.isClicked,
      id: 1 })
  }


  handleUpvote = async() => {
    const currentcount = this.state.upvotes
    console.log('upvotes',this.state.upvotes);
    await this.setState({upvotes: currentcount + 1 })
    await this.sendToBack()
    if (this.state.upvotes === 2 ) {
      this.addSong()
      this.resetComponent()
    }
  }

  handleDownVote = async() => {
    const currentcount = this.state.downvotes
    await this.setState({downvotes: currentcount + 1 })
    await this.sendToBack()
    if (this.state.downvotes === 2 ) {
     await this.resetComponent()
   }
  }

  addSong = async() => {
    let uri = this.state.selectedSong.uri
    const newSong = await spotifyApi.getTrack(this.state.selectedSong.trackid )
    spotifyApi.addTracksToPlaylist(this.state.user, partyplaylist, [uri])
    await this.setState({playlist: [...this.state.playlist, newSong]})

  }

  resetComponent = async() => {
    console.log('resetting state');
    await this.setState({chosenSong: '', selectedSong :{name:'', artist:'',image:'', uri:''}, upvotes:0, downvotes:0, isClicked: false, votedOn:false, renderTab: 'music' })
    await this.sendToBack()
  }

  changeTab = (tabName) => {
       this.setState({ renderTab: tabName })
   }


  render(){
    console.log(this.state.usersPlaylists);
    const { renderTab } = this.state

    const songs = this.state.playlist.map(song => {
      return <Songs song={song} removeSong={this.removeSong}  />
    })

    const RenderedContent = ({ tabName }) => {
      if (tabName === 'music') {
        return songs
    }
      if (tabName === 'search') {
        return <Search token={this.props.token} handleClick={this.getSong}/>
    }
  }

    return(
      <div>
      <SongVote id='songcard' data={this.state.selectedSong} handleUpvote={this.handleUpvote} handleDownVote={this.handleDownVote} upvotes={this.state.upvotes} downvotes={this.state.downvotes} votedOn={this.state.votedOn} isClicked={this.state.isClicked}/>

      <Grid>
        <Grid.Column width={12}>
          <div id='menu' style={{padding:20}}>
            <Sidebar.Pushable as={Segment} style={{maxHeight: 700}}>
              <Sidebar
                as={Menu}
                width='thin'
                visible
                icon='labeled'
                vertical
                inverted
              >
                <Menu.Item  onClick={() => this.changeTab('search')} name='search'>
                  <Icon name='search' />
                  Search
                </Menu.Item>
                <Menu.Item  onClick={() => this.changeTab('music')} name='music'>
                  <Icon name='music' />
                  Playlist
                </Menu.Item>
              </Sidebar>
              <Sidebar.Pusher id='component'>
                <Segment basic id='component' >
                  <RenderedContent tabName={renderTab} />
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
        </Grid.Column>
        <Grid.Column width={4} >
          <Chat/>
        </Grid.Column>
      </Grid>

      </div>
    )
  }


}





export default PartyRoom
