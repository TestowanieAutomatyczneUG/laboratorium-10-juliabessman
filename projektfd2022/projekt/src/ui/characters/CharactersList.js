import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCharactersList } from '../../ducks/characters/operations';
import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import './characterList.scss';

const CharactersList = ({ characters, getCharactersList, loading }, props) => {
  const [sortedCharacters, setCharacters] = useState([]);
  const [moreThan4, setMoreThan4] = useState(false);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    if (characters.length === 0) {
      getCharactersList();
    } else {
      setCharacters(characters);
    }
  }, [getCharactersList, characters.length, setCharacters, characters]);

  useEffect(() => {
    if (filterName.length === '') {
      setCharacters([...characters]);
    } else {
      setCharacters(
        [...characters].filter((c) =>
          c.name.toLowerCase().includes(filterName.toLowerCase()),
        ),
      );
    }
  }, [filterName, characters]);

  const [sortType, setSortType] = useState({
    value: 'default',
    label: 'Default',
  });

  const [filterType, setFilterType] = useState({
    value: 'default',
    label: 'All',
  });

  const sortTypeOptions = [
    { value: 'default', label: 'Default' },
    { value: 'name', label: 'By Name' },
    { value: 'birthday', label: 'By birthday' },
    { value: 'appearance', label: 'By number of appearance in seasons' },
  ];

  const filterOptions = [
    { value: 'default', label: 'All' },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

  const handleSortTypeChange = (event) => {
    setSortType(event);
    if (event.value === 'default') {
      setCharacters([...characters]);
    } else if (event.value === 'name') {
      const sortedValues = characters.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      setCharacters([...sortedValues]);
    } else if (event.value === 'birthday') {
      const sortedValues = characters.sort(function (a, b) {
        if (a.birthday > b.birthday) {
          return 1;
        } else if (a.birthday < b.birthday) {
          return -1;
        }
        return 0;
      });
      setCharacters([...sortedValues]);
    } else {
      const sortedValues = characters.sort(function (a, b) {
        if (a.appearance.length > b.appearance.length) {
          return 1;
        } else if (a.appearance.length < b.appearance.length) {
          return -1;
        }
        return 0;
      });
      setCharacters([...sortedValues]);
    }
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event);
    if (event.value === 'default') {
      setCharacters([...characters]);
    } else {
      setCharacters((prev) => [
        ...prev.filter((b) => b.appearance.includes(event.value)),
      ]);
    }
  };

  return (
    <div className='cha'>
      <h3>Characters</h3>
      {loading ? (
        <div>Trwa ładowanie</div>
      ) : (
        <div>
          <Link to={`/characters/add`} >
            <button className='cbutton' type="button">Add new</button>
          </Link>
          <div className='filters'>
         <p><label className="label">Sort by</label></p> 
          <Select className='select'
            options={sortTypeOptions}
            menuPortalTarget={document.body}
            name="Sort by"
            placeholder="Sort by"
            onChange={handleSortTypeChange}
            value={sortType}
          
          />
         
            <p><div>Filters: </div></p>
            <label htmlFor="horns">Name</label>
            <input
              name="name"
              type="text"
              id="name"
              onChange={(e) => {
                setFilterName(e.target.value);
              }}
            />
            <div>
              <label htmlFor="horns">Appeared in more than 4 seasons</label>
              <input
                type="checkbox"
                id="appearance"
                name="appearance"
                onClick={() => {
                  if (moreThan4) {
                    setCharacters([...characters]);
                    setMoreThan4(false);
                  } else {
                    setCharacters((prev) => [
                      ...prev.filter((b) => b.appearance.length > 4),
                    ]);
                    setMoreThan4(true);
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="appearedIn">Appeared in season</label>
              <Select className='select'
                id="appearedIn"
                options={filterOptions}
                menuPortalTarget={document.body}
                name="Filter by"
                placeholder="Filter by"
                onChange={handleFilterTypeChange}
                value={filterType}
              />
            </div>
          </div>
          {sortedCharacters.map((c) => {
            return (
              <div className="qlist" key={c.char_id}>
                <div className="character">
                <img src={c.img} className="books" alt="book" />
                  <p>{c.name}</p>
                  
                  <p><Link to={`/characters/${c.char_id}`}>
                    <button type="button">Details</button>
                  </Link>
               {' '}</p>
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
    characters: state.characters.characters,
    loading: state.characters.loading,
  };
};
const mapDispatchToProps = {
  getCharactersList,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
