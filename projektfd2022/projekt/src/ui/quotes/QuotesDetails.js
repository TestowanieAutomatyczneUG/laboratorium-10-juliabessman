import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getQuotesList,
  deleteQuote,
} from '../../ducks/quotes/operations';
import { useEffect } from 'react';
import './QuotesDetails.scss'

const QuotesDetails = ({
  q,
quotes,
  getQuotesList,
  history,
  deleteQuote,
}) => {
  useEffect(() => {
    if (quotes.length === 0) {
      getQuotesList();
    }
  }, [getQuotesList, quotes.length]);

  const handleDeleteQuote = () => {
    deleteQuote(q.quote_id);
    history.push('/quotes');
  };

  return (
    <div className='detailsq'>
      <h1>Details</h1>
      {q ? (
        <>
          
          <p>Quote : {q.quote} </p>
          <p> Author : {q.author} </p>
          <p> Series : {q.series} </p>
  
          <Link to={`/quotes/${q.quote_id}/edit`}>
            <button type="button">Edit</button>
          </Link>
          <button onClick={handleDeleteQuote}>Delete</button>
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  q: state.quotes.quotes.find((quote) => {
    return String(quote.quote_id) === props.match.params.id;
  }),
  quotes: state.quotes.quotes,
});

const mapDispatchToProps = {
  getQuotesList,
  deleteQuote,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(QuotesDetails),
);

          