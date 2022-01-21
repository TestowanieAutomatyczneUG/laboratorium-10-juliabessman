import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getDeathsList,
  deleteDeath,
} from '../../ducks/deaths/operations';
import { useEffect } from 'react';

const DeathsDetails = ({
  d,
deaths,
  getDeathsList,
  history,
  deleteDeath,
}) => {
  useEffect(() => {
    if (deaths.length === 0) {
      getDeathsList();
    }
  }, [getDeathsList, deaths.length]);

  const handleDeleteDeath = () => {
    deleteDeath(d.death_id);
    history.push('/deaths');
  };

  return (
    <div>
      <h1>Deaths Details</h1>
      {d ? (
        <>
          <p> Cause : {d.cause} </p>
          <p> Responsible : {d.responsible} </p>
          <p> Nickname : {d.nickname} </p>
          <p> Season : {d.season} </p>
          <p> Episode : {d.episode} </p>
          <p> Number of deaths : {d.number_of_deaths} </p>
          <p> Last words: {d.last_words} </p>
  
          <Link to={`/deaths/${d.death_id}/edit`}>
            <button type="button">Edit</button>
          </Link>
          <button onClick={handleDeleteDeath}>Delete</button>
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  d: state.deaths.deaths.find((death) => {
    return String(death.death_id) === props.match.params.id;
  }),
  deaths: state.deaths.deaths,
});

const mapDispatchToProps = {
  getDeathsList,
  deleteDeath,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeathsDetails),
);
