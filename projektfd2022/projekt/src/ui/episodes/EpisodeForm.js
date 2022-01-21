import { Field, Form, Formik, FieldArray, ErrorMessage } from 'formik';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { withRouter } from 'react-router';
import {
  createEpisode,
  editEpisode,
  getEpisodesList,
} from '../../ducks/episodes/operations';
import { getCharactersList } from '../../ducks/characters/operations';

const Episode = Yup.object().shape({
  title: Yup.string().required('Correct title should be provided'),
  season: Yup.number().required('Correct season should be provided'),
  episode: Yup.number().required('Correct episode should be provided'),
  series: Yup.string().required('Correct series should be provided'),
  air_date: Yup.string().required('Correct air date should be provided'),
  characters: Yup.array().of(Yup.string()),
});

const EpisodeForm = (
  {
    history,
    createEpisode,
    episodes,
    getEpisodesList,
    editMode = false,
    editEpisode,
    editedEpisode,
    characters,
    getCharactersList,
  },
  props,
) => {
  useEffect(() => {
    if (episodes.length === 0) {
      getEpisodesList();
    }
    if (characters.length === 0) {
      getCharactersList();
    }
  }, [getEpisodesList, episodes.length, getCharactersList, characters.length]);

  const handleSubmit = (values) => {
    if (editMode) {
      editEpisode({
        ...values,
        characters: values.characters.filter((c) => c.name !== ''),
      });
    } else {
      createEpisode({
        ...values,
        characters: values.characters.filter((c) => c.name !== ''),
      });
    }
    history.push('/episodes');
  };

  return (
    <div>
      <h1> {editMode ? 'Edit episode' : 'Add episode'}</h1>
      {((editMode && editedEpisode) || !editMode) && (
        <Formik
          initialValues={{
            episode_id: editMode ? editedEpisode.episode_id : uuidv4(),
            episode: editMode ? editedEpisode.episode : 1,
            title: editMode ? editedEpisode.title : '',
            season: editMode ? editedEpisode.season : 1,
            series: editMode ? editedEpisode.series : '',
            air_date: editMode ? editedEpisode.air_date : '',
            characters: editMode ? editedEpisode.characters : [''],
          }}
          validationSchema={Episode}
          onSubmit={(values) => handleSubmit(values)}
          enableReinitialize={true}
        >
          {({ errors, touched, values }) => (
            <Form>
              <Field name="episode" placeholder="Episode id" type="number" />
              {touched.episode && errors.episode && <div>{errors.episode}</div>}
              <Field name="title" type="text" placeholder="Title" />
              {touched.title && errors.title && <div>{errors.title}</div>}
              <Field name="season" placeholder="Season" type="number" />
              {touched.season && errors.season && <div>{errors.season}</div>}
              <Field name="series" placeholder="Series" />
              {touched.series && errors.series && <div>{errors.series}</div>}
              <Field name="air_date" placeholder="Air date" />
              {touched.air_date && errors.air_date && (
                <div>{errors.air_date}</div>
              )}
              <FieldArray name="characters">
                {({ insert, remove, push }) => (
                  <div>
                    {values.characters.length > 0 &&
                      values.characters.map((character, index) => (
                        <div className="row" key={index}>
                          <div className="col">
                            <label htmlFor={`characters.${index}`}>
                              Character
                            </label>

                            <Field as="select" name={`characters.${index}`}>
                              <option value="">Select character</option>
                              {characters.map((c) => (
                                <option value={c.name}>{c.name}</option>
                              ))}
                            </Field>

                            <ErrorMessage
                              name={`characters.${index}`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col">
                            <button
                              type="button"
                              className="secondary"
                              onClick={() => remove(index)}
                            >
                              X
                            </button>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => push('')}
                    >
                      Add Character
                    </button>
                  </div>
                )}
              </FieldArray>
              {touched.characters && errors.characters && (
                <div>{errors.characters}</div>
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
    episodes: state.episodes.episodes,
    characters: state.characters.characters,
    editedEpisode: state.episodes.episodes.find(
      (episode) => String(episode.episode_id) === props.match.params?.id,
    ),
  };
};

const mapDispatchToProps = {
  createEpisode,
  editEpisode,
  getEpisodesList,
  getCharactersList,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EpisodeForm),
);
