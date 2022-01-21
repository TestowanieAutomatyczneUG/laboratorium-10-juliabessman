import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CharactersList from './ui/characters/CharactersList';
import CharacterForm from './ui/characters/CharacterForm';
import DeathsList from './ui/deaths/DeathsList';
import EpisodesList from './ui/episodes/EpisodesList';
import QuotesList from './ui/quotes/QuotesList';
import CharacterDetails from './ui/characters/CharacterDetails';
import DeathsDetails from './ui/deaths/DeathsDetails';
import EpisodesDetails from './ui/episodes/EpisodesDetails';
import QuotesDetails from './ui/quotes/QuotesDetails';
import DeathsForm from './ui/deaths/DeathsForm';
import EpisodeForm from './ui/episodes/EpisodeForm';
import QuotesForm from './ui/quotes/QuotesForm';
import './App.css';
import './logobb.png';


function App() {
  return (
    

    <div className='body'>
      <Router>
       <div className='header'>
      <img className='photo' src={require('./logobb.png') } />
      </div>
        <div className='nav'>
          <nav >
            <ul>
              <li className='li'>
                <Link to="/characters">Characters</Link>
              </li>
              <li className='li'>
                <Link to="/deaths">Deaths</Link>
              </li>
              <li className='li'>
                <Link to="/episodes">Episodes</Link>
              </li>
              <li className='li'>
                <Link to="/quotes">Quotes</Link>
              </li>
            </ul>
          </nav>
          </div>
          <Switch>
            <Route exact path="/characters/add">
              <CharacterForm />
            </Route>
            <Route exact path="/characters/:id">
              <CharacterDetails />
            </Route>
            <Route exact path="/characters/:id/edit">
              <CharacterForm editMode />
            </Route>
            <Route path="/characters">
              <CharactersList />
            </Route>
            <Route exact path="/deaths/add">
              <DeathsForm />
            </Route>
            <Route exact path="/deaths/:id/edit">
              <DeathsForm editMode />
            </Route>
            <Route exact path="/deaths/:id">
              <DeathsDetails />
            </Route>
            <Route path="/deaths">
              <DeathsList />
            </Route>
            <Route path="/episodes/add">
              <EpisodeForm />
            </Route>
            <Route exact path="/episodes/:id">
              <EpisodesDetails />
            </Route>
            <Route exact path="/episodes/:id/edit">
              <EpisodeForm editMode />
            </Route>
            <Route path="/episodes">
              <EpisodesList />
            </Route>
            <Route exact path="/quotes/add">
              <QuotesForm />
            </Route>
            <Route exact path="/quotes/:id">
              <QuotesDetails />
              </Route>
              <Route exact path="/quotes/:id/edit">
              <QuotesForm editMode />
            </Route>
            <Route path="/quotes">
              <QuotesList />
            </Route>
          </Switch>
        
      </Router>
    </div>
  );
}

export default App;
