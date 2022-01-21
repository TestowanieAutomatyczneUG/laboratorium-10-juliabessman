import { Field, Form, Formik, FieldArray, ErrorMessage } from 'formik';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { withRouter } from 'react-router';
import {
  createDeath,
  editDeath,
  getDeathsList,
} from '../../ducks/deaths/operations';

const Death = Yup.object().shape({
  death: Yup.string().required('Correct death should be provided'),
  cause: Yup.string(),
  responsible: Yup.string().required('Correct responsible should be provided'),
  last_words: Yup.string().required('Correct last words should be provided'),
  season: Yup.number().required('Correct season should be provided'),
  episode: Yup.number().required('Correct episode should be provided'),
});

const DeathsForm = (
  {
    history,
    createDeath,
    deaths,
    getDeathsList,
    editMode = false,
    editDeath,
    editedDeath,
  },
  props,
) => {
  useEffect(() => {
    if (deaths.length === 0) {
      getDeathsList();
    }
  }, [getDeathsList, deaths.length]);

  const handleSubmit = (values) => {
    if (editMode) {
      editDeath(values);
    } else {
      console.log('fooo');
      createDeath(values);
    }
    history.push('/deaths');
  };
  console.log(deaths);
  return (
    <div>
      <h1> {editMode ? 'Edit death' : 'Add death'}</h1>
      {((editMode && editedDeath) || !editMode) && (
        <Formik
          initialValues={{
            death_id: editMode ? editedDeath.death_id : uuidv4(),
            death: editMode ? editedDeath.death : '',
            cause: editMode ? editedDeath.cause : '',
            responsible: editMode ? editedDeath.responsible : '',
            last_words: editMode ? editedDeath.last_words : '',
            season: editMode ? editedDeath.season : 0,
            episode: editMode ? editedDeath.episode : 0,
          }}
          validationSchema={Death}
          onSubmit={(values) => handleSubmit(values)}
          enableReinitialize={true}
        >
          {({ errors, touched, values }) => (
            <Form>
              <Field name="death" placeholder="Death" />
              {touched.death && errors.death && <div>{errors.death}</div>}
              <Field name="cause" placeholder="Cause" />
              {touched.cause && errors.cause && <div>{errors.cause}</div>}
              <Field name="responsible" type="text" placeholder="Responsible" />
              {touched.responsible && errors.responsible && (
                <div>{errors.responsible}</div>
              )}
              <Field name="last_words" placeholder="last_words" />
              {touched.last_words && errors.last_words && (
                <div>{errors.last_words}</div>
              )}
              <Field name="season" placeholder="season" />
              {touched.season && errors.season && <div>{errors.season}</div>}
              <Field name="episode" placeholder="episode" />
              {touched.episode && errors.episode && <div>{errors.episode}</div>}

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
    deaths: state.deaths.deaths,
    editedDeath: state.deaths.deaths.find(
      (death) => String(death.death_id) === props.match.params?.id,
    ),
  };
};

const mapDispatchToProps = {
  createDeath,
  getDeathsList,
  editDeath,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeathsForm),
);
