import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getEpisodesList } from '../../ducks/episodes/operations';
import { IconButton } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import EpisodesDetails from './EpisodesDetails.js';
import { Link } from 'react-router-dom';
import './Epi.scss'

const EpisodesList = ({ episodes, getEpisodesList, loading }, props) => {
  useEffect(() => {
    if (episodes.length === 0) {
      getEpisodesList();
    }
  }, [getEpisodesList, episodes.length]);

  const [open, setOpen] = React.useState(false);

  const [openDetails, setOpenDetails] = React.useState(false);
  const [c, setItem] = React.useState({});

  const handleClickOpenDetails = (c) => {
    setOpenDetails(true);
    setItem(c);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const [openForm, setOpenForm] = React.useState(false);
  const [cf, setItemForm] = React.useState({});

  const handleClickOpenForm = (cf) => {
    setOpenForm(true);
    setItemForm(cf);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };
  return (
    <div className='elist'>
      <h3>Episodes</h3>
      {loading ? (
        <div>Trwa ładowanie</div>
      ) : (
        <div>
          <Link to={`/episodes/add`}>
            <button className='add' type="button">Add new</button>
          </Link>
          {episodes.map((e) => {
            return (
              <div className="liste" key={e.episode_id}>
                <div className="epi">
                  {e.title}
                 
                  <Link to={`/episodes/${e.episode_id}`}>
                    <button type="button">Details</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    episodes: state.episodes.episodes,
    loading: state.episodes.episodes.loading,
  };
};
const mapDispatchToProps = {
  getEpisodesList,
};

export default connect(mapStateToProps, mapDispatchToProps)(EpisodesList);
