import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import apiKey from './config.js';
import { createBrowserHistory } from 'history';
import { 
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

//components
import PhotoList from './Components/PhotoList';
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import Error from './Components/Error';

const history = createBrowserHistory();

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      cosmos: [],
      nature: [],
      machines: [],
      loading: true
    };
  } 
  
  componentDidMount() {
    this.performSearch('machines');
    this.performSearch('nature');
    this.performSearch();
  }
  
  performSearch = (query = 'cosmos') => {
    this.setState({
      loading: true
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      if (query === 'cosmos') {
        this.setState({
          cosmos: response.data.photos.photo
        });
      } else if (query === 'nature') {
        this.setState({
          nature: response.data.photos.photo
        });
      } else if (query === 'machines') {
        this.setState({
          machines: response.data.photos.photo
        });
      }
      this.setState({
        photos: response.data.photos.photo,
        loading: false
      })
    })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} history={history} loading={this.state.loading} />
          <Nav />
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : 
              <Switch>
                <Route exact path={'/'} render={() => <PhotoList data={this.state.photos} /> } />
                <Route path={'/search/:search'} render={() => <PhotoList data={this.state.photos} /> } />
                <Route path={'/cosmos'} render={() => <PhotoList data={this.state.cosmos} /> } />
                <Route path={'/nature'} render={() => <PhotoList data={this.state.nature} /> } />
                <Route path={'/machines'} render={() => <PhotoList data={this.state.machines} /> } />
                <Route render={() => <Error /> } />
              </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }
}
