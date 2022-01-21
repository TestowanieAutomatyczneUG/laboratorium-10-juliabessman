import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getCharactersList,
  deleteCharacter,
} from '../../ducks/characters/operations';
import { useEffect } from 'react';

const CharacterDetails = ({
  c,
  characters,
  getCharactersList,
  history,
  deleteCharacter,
}) => {
  useEffect(() => {
    if (characters.length === 0) {
      getCharactersList();
    }
  }, [getCharactersList, characters.length]);

  const handleDeleteCharacter = () => {
    deleteCharacter(c.char_id);
    history.push('/characters');
  };

  return (
    <div>
      <h1>Character Details</h1>
      {c ? (
        <>
          <p> Birthday : {c.birthday} </p>
          <p> Status : {c.status} </p>
          <p> Nickname : {c.nickname} </p>
          <p> Name : {c.name} </p>
          <p> Appeared in seasons : {c.appearance} </p>
          <Link to={`/characters/${c.char_id}/edit`}>
            <button type="button">Edit</button>
          </Link>
          <button onClick={handleDeleteCharacter}>Delete</button>
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  c: state.characters.characters.find((character) => {
    return String(character.char_id) === props.match.params.id;
  }),
  characters: state.characters.characters,
});

const mapDispatchToProps = {
  getCharactersList,
  deleteCharacter,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CharacterDetails),
);
