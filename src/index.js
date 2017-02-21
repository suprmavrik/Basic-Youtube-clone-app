import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import YTsearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetails from './components/video_details';
import _ from 'lodash';

const API_KEY = 'AIzaSyAw4Qq4m-jYlkjNga4aRt_nxOo3Lr_RhvY';

class App extends Component {
    constructor(props){
      super(props);

      this.state = {
        videos : [] ,
        selectedVideo: null
            };
      this.videoSearch('surfboards');

    }

videoSearch(term){
  YTsearch({key : API_KEY, term: term}, (videos) => {
   this.setState({
     videos: videos ,
    selectedVideo: videos[0]});  //this.setState ({videos:videos});  for the ES5 version
});
}


	render() {
const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)

		return (
			<div>
	          <SearchBar onSearchTermChange={videoSearch}/>
	          <VideoDetails video={this.state.selectedVideo} />
	          <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos} />
			</div>
			);
		}
}



ReactDOM.render(<App /> , document.querySelector('.container'));
