import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getDeathsList } from '../../ducks/deaths/operations';
import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import './d.scss';

const DeathsList = ({ deaths, getDeathsList, loading }, props) => {
  const [sortedDeaths, setDeaths] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    if (deaths.length === 0) {
      getDeathsList();
    } else {
      setDeaths(deaths);
    }
  }, [getDeathsList, deaths.length, setDeaths, deaths]);

  useEffect(() => {
    if (filterName.length === '') {
      setDeaths([...deaths]);
    } else {
      setDeaths(
        [...deaths].filter((d) =>
          d.death.toLowerCase().includes(filterName.toLowerCase()),
        ),
      );
    }
  }, [filterName, deaths]);

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
  ];

  const handleSortTypeChange = (event) => {
    setSortType(event);
    if (event.value === 'default') {
      setDeaths([...deaths]);
    } else if (event.value === 'name') {
      const sortedValues = deaths.sort(function (a, b) {
        if (a.death > b.death) {
          return 1;
        } else if (a.death < b.death) {
          return -1;
        }
        return 0;
      });
      setDeaths([...sortedValues]);
    }
  };

  const handleFilterTypeChange = (event) => {
    if (event.target.value === '0') {
      setDeaths([...deaths]);
    } else {
      setDeaths([
        ...deaths.filter((b) => b.season === Number(event.target.value)),
      ]);
    }
  };

  return (
    <div className='qlist'>
      <h3>Deaths</h3>
      {loading ? (
        <div>Trwa ładowanie</div>
      ) : (
        <div>
             <div className='filters'>
          <Link to={`/deaths/add`}>
            <button type="button">Add new</button>
          </Link>
       
          <label className="label">Sort by</label>
          <Select 
            options={sortTypeOptions}
            menuPortalTarget={document.body}
            name="Sort by"
            placeholder="Sort by"
            onChange={handleSortTypeChange}
            value={sortType}
          />
          <div>
            <div>Filters: </div>
            <label htmlFor="horns">Season</label>
            <input
              season="season"
              type="number"
              id="season"
              onChange={handleFilterTypeChange}
            />
          </div>
          </div>
          {sortedDeaths.map((d) => {
            return (
              <div className="listq" key={d.death_id}>
                <div className="quote">
                  {d.death}
                  {d.season}
                  {d.episode}

                  <Link to={`/deaths/${d.death_id}`}>
                    <button type="button">Details</button>
                  </Link>
                </div>{' '}
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
    deaths: state.deaths.deaths,
    loading: state.deaths.loading,
  };
};
const mapDispatchToProps = {
  getDeathsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeathsList);
