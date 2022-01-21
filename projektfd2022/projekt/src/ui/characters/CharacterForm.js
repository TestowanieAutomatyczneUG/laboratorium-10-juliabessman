import { Field, Form, Formik, FieldArray, ErrorMessage } from 'formik';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { withRouter } from 'react-router';
import {
  createCharacter,
  editCharacter,
  getCharactersList,
} from '../../ducks/characters/operations';

const Character = Yup.object().shape({
  name: Yup.string().required('Correct name should be provided'),
  nickname: Yup.string(),
  birthday: Yup.string().required('Correct birthday should be provided'),
  category: Yup.string().required('Correct category should be provided'),
  img: Yup.string().required('Correct img should be provided'),
  status: Yup.string().required('Correct status should be provided'),
  appearance: Yup.array().of(Yup.number()),
});

const CharacterForm = (
  {
    history,
    createCharacter,
    characters,
    getCharactersList,
    editMode = false,
    editCharacter,
    editedCharacter,
  },
  props,
) => {
  useEffect(() => {
    if (characters.length === 0) {
      getCharactersList();
    }
  }, [getCharactersList, characters.length]);
  console.log(editedCharacter);
  console.log(characters);

  const handleSubmit = (values) => {
    if (editMode) {
      editCharacter(values);
    } else {
      createCharacter(values);
    }
    history.push('/characters');
  };

  return (
    <div>
      <h1> {editMode ? 'Edit character' : 'Add character'}</h1>
      {((editMode && editedCharacter) || !editMode) && (
        <Formik
          initialValues={{
            char_id: editMode ? editedCharacter.char_id : uuidv4(),
            name: editMode ? editedCharacter.name : '',
            nickname: editMode ? editedCharacter.nickname : '',
            birthday: editMode ? editedCharacter.birthday : '',
            img: editMode ? editedCharacter.img : '',
            status: editMode ? editedCharacter.status : '',
            category: editMode ? editedCharacter.category : '',
            appearance: editMode ? editedCharacter.appearance : [1],
          }}
          validationSchema={Character}
          onSubmit={(values) => handleSubmit(values)}
          enableReinitialize={true}
        >
          {({ errors, touched, values }) => (
            <Form>
              <Field name="name" placeholder="Name" />
              {touched.name && errors.name && <div>{errors.name}</div>}
              <Field name="nickname" placeholder="Nickname" />
              {touched.nickname && errors.nickname && (
                <div>{errors.nickname}</div>
              )}
              <Field name="birthday" type="text" placeholder="Birthday" />
              {touched.birthday && errors.birthday && (
                <div>{errors.birthday}</div>
              )}
              <Field name="img" placeholder="img" />
              {touched.img && errors.img && <div>{errors.img}</div>}
              <Field name="status" placeholder="Status" />
              {touched.status && errors.status && <div>{errors.status}</div>}
              <Field name="category" placeholder="Category" />
              {touched.category && errors.category && (
                <div>{errors.category}</div>
              )}
              <FieldArray name="appearance">
                {({ insert, remove, push }) => (
                  <div>
                    {values.appearance.length > 0 &&
                      values.appearance.map((appearance, index) => (
                        <div className="row" key={index}>
                          <div className="col">
                            <label htmlFor={`appearance.${index}`}>
                              Appearance
                            </label>
                            <Field
                              name={`appearance.${index}`}
                              placeholder="Appearance"
                              type="number"
                            />
                            <ErrorMessage
                              name={`appearance.${index}`}
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
                      onClick={() => push(0)}
                    >
                      Add Appearance
                    </button>
                  </div>
                )}
              </FieldArray>
              {touched.appearance && errors.appearance && (
                <div>{errors.appearance}</div>
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
    characters: state.characters.characters,
    editedCharacter: state.characters.characters.find(
      (character) => String(character.char_id) === props.match.params?.id,
    ),
  };
};

const mapDispatchToProps = {
  createCharacter,
  getCharactersList,
  editCharacter,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CharacterForm),
);
