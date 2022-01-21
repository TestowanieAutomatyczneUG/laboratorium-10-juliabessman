import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getQuotesList } from '../../ducks/quotes/operations';
import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import './Quotes.scss';
const QuotesList = ({ quotes, getQuotesList, loading }, props) => {
  const [sortedQuotes, setQuotes] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    if (quotes.length === 0) {
      getQuotesList();
    } else {
      setQuotes(quotes);
    }
  }, [getQuotesList, quotes.length, setQuotes, quotes]);

  useEffect(() => {
    if (filterName.length === '') {
      setQuotes([...quotes]);
    } else {
      setQuotes(
        [...quotes.filter((q) =>
          q.quote.toLowerCase().includes(filterName.toLowerCase()),
        )],
      );
    }
  }, [filterName, quotes]);
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
      setQuotes([...quotes]);
    } else if (event.value === 'name') {
      const sortedValues = quotes.sort(function (a, b) {
        if (a.quote > b.quote) {
          return 1;
        } else if (a.quote < b.quote) {
          return -1;
        }
        return 0;
      });
      setQuotes([...sortedValues]);
    }
  };

  const handleFilterTypeChange = (event) => {
    if (event.target.value === '0') {
      setQuotes([...quotes]);
    } else {
      setQuotes([
        ...quotes.filter((b) => b.series === event.target.value),
      ]);
    }
  };

  return (
    <div className='qlist'>
      <h3>Quotes</h3>
      {loading ? (
        <div>Trwa ładowanie</div>
      ) : (
        <div>
          <div className='filters'>
          <Link to={`/quotes/add`}>
            <p><button type="button">Add new</button></p>
          </Link>
          <p><label className="label">Sort by</label> </p>
         <p> <Select className='select'
            options={sortTypeOptions}
            menuPortalTarget={document.body}
            name="Sort by"
            placeholder="Sort by"
            onChange={handleSortTypeChange}
            value={sortType}
          />
          </p>
          
          <div>
          <p><div>Filters: </div>
           <label htmlFor="horns">Series</label>
            <input
              name="series"
              type="text"
              id="series"
              onChange={handleFilterTypeChange}
            />
            </p>
          </div>
          </div>
          {sortedQuotes.map((q) => {
            return (
              <div className="listq" key={q.quote_id}>
                <div className="quote">
                  {q.quote}
                  
                   ~{q.author}
<Link to={`/quotes/${q.quote_id}`}>
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
    quotes: state.quotes.quotes,
    loading: state.quotes.loading,
  };
};
const mapDispatchToProps = {
  getQuotesList,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotesList);
