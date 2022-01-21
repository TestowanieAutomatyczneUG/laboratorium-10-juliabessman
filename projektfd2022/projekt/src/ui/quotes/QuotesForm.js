import { Field, Form, Formik, FieldArray, ErrorMessage } from 'formik';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { withRouter } from 'react-router';
import {
  createQuote,
  editQuote,
  getQuotesList,
} from '../../ducks/quotes/operations';


const Quote = Yup.object().shape({
  quote: Yup.string().required('Correct quote should be provided'),
  author: Yup.string().required('Correct author should be provided'),
  series: Yup.string().required('Correct series should be provided'),
  
});

const QuotesForm = (
    {
      history,
      createQuote,
      quotes,
      getQuotesList,
      editMode = false,
      editQuote,
      editedQuote,
    },
    props,
  ) => {
    useEffect(() => {
      if (quotes.length === 0) {
        getQuotesList();
      }
    }, [getQuotesList, quotes.length]);
  
    const handleSubmit = (values) => {
      if (editMode) {
        editQuote(values);
      } else {
        console.log('fooo');
        createQuote(values);
      }
      history.push('/quotes');
    };
    console.log(quotes);
    return (
      <div>
        <h1> {editMode ? 'Edit Quote' : 'Add quote'}</h1>
        {((editMode && editedQuote) || !editMode) && (
          <Formik
            initialValues={{
              quote_id: editMode ? editedQuote.quote_id : uuidv4(),
              quote: editMode ? editedQuote.quote : '',
              series: editMode ? editedQuote.series : '',
              author: editMode ? editedQuote.author : '',
            }}
            validationSchema={Quote}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}
          >
            {({ errors, touched, values }) => (
              <Form>
                <Field name="quote" placeholder="Quote" />
                {touched.quote && errors.quote && <div>{errors.quote}</div>}
                <Field name="series" placeholder="Series" />
                {touched.series && errors.series && <div>{errors.series}</div>}
                <Field name="author" type="text" placeholder="author" />
                {touched.author && errors.author && (
                  <div>{errors.author}</div>
                )}
               
                <button type="submit">Zatwierdz</button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    );
  };
  
  const mapStateToProps = (state, props) => {
    return {
     quotes: state.quotes.quotes,
      editedQuote: state.quotes.quotes.find(
        (quote) => String(quote.quote_id) === props.match.params?.id,
      ),
    };
  };
  
  const mapDispatchToProps = {
    createQuote,
    getQuotesList,
    editQuote,
  };
  
  export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(QuotesForm),
  );
  