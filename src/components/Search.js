import React from 'react'
import Results from './Results'
import _ from 'lodash'
import { Button, Checkbox, Form, List } from 'semantic-ui-react'
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Search extends React.Component{

  state = {
    query:'',
    results:[]
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ results: [], query: '' })

 handleSearchChange = (e) => {
    this.setState({query: e.target.value})

    setTimeout(() => {
    if (this.state.query.length < 1) return this.resetComponent()

    spotifyApi.search(this.state.query, ['track'], {limit: 7})
    .then(res => this.setState({results: res.tracks.items}))

      }, 500)
   }

  render(){
    const songSearch = this.state.results.map(result => {
      return <Results results={result} token={this.props.token} handleClick={this.props.handleClick} />
    })
    return(
      <div>
        <Form>
          <Form.Field>
            <label>Search</label>
            <input placeholder='Search' onChange={this.handleSearchChange}  />
          </Form.Field>
        </Form>
        <div class="eight wide column" style={{overflow: 'auto', maxHeight: 440, padding: 50}}>{songSearch}</div>
      </div>
   )
  }
}

export default Search
