import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getEpisodesList, deleteEpisode } from '../../ducks/episodes/operations';
import { getCharactersList } from '../../ducks/characters/operations';
import { useEffect } from 'react';

const EpisodesDetails = ({
  e,
  episodes,
  getEpisodesList,
  characters,
  getCharactersList,
  deleteEpisode,
  history,
}) => {
  useEffect(() => {
    if (episodes.length === 0) {
      getEpisodesList();
    }
    if (characters.length === 0) {
      getCharactersList();
    }
  }, [getEpisodesList, episodes.length, characters.length, getCharactersList]);

  const handleDeleteEpisode = () => {
    deleteEpisode(e.episode_id);
    history.push('/episodes');
  };

  return (
    <div className='detailsq'>
      <h1>Details</h1>
      {e ? (
        <>
          <div>Title: {e.title}</div>
          <div>Series: {e.series}</div>
          <div>Season: {e.season}</div>
          <div>Epiosde: {e.episode}</div>
          <div>Air date: {e.air_date}</div>
          <div>
            {e.characters.map((char, idx) => (
              <div key={idx}>
                <div>{char} </div>
                <Link
                  to={`/characters/${
                    characters.find((c) => c.name === char)?.char_id
                  }`}
                >
                  <button type="button">Details</button>
                </Link>
              </div>
            ))}
          </div>
          <Link to={`/episodes/${e.episode_id}/edit`}>
            <button type="button">Edit</button>
          </Link>
          <button onClick={handleDeleteEpisode}>Delete</button>
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  e: state.episodes.episodes.find((episodes) => {
    return String(episodes.episode_id) === props.match.params.id;
  }),
  characters: state.characters.characters,
  episodes: state.episodes.episodes,
});

const mapDispatchToProps = {
  getEpisodesList,
  getCharactersList,
  deleteEpisode,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EpisodesDetails),
);
