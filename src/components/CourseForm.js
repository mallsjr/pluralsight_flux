import React, { useState, useEffect } from 'react';
import TextInput from './common/TextInput';
import PropTypes from 'prop-types';
import authorStore from '../stores/authorStore';
import { loadAuthors } from '../actions/authorActions';

function CourseForm(props) {
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    authorStore.addChangeListener(onAuthorChange);
    if (authorStore.getAuthors().length === 0) loadAuthors();
    return () => {
      authorStore.removeChangeListener(onAuthorChange);
    }; // cleanup on unmount
  }, []);

  function onAuthorChange() {
    setAuthors(authorStore.getAuthors());
  }

  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        name="title"
        label="Title"
        onChange={props.onChange}
        value={props.course.title}
        error={props.errors.title}
      />

      {/* Creat reuseable select component as exercise */}
      <div className="form-group">
        <label htmlFor="author">Author</label>
        <div className="field">
          <select
            id="author"
            name="authorId"
            onChange={props.onChange}
            value={props.course.authorId || ''}
            className="form-control"
          >
            <option value="" />
            {authors.map(author => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        {props.errors.authorId && (
          <div className="alert alert-danger">{props.errors.authorId}</div>
        )}
      </div>

      <TextInput
        id="category"
        name="category"
        label="Category"
        onChange={props.onChange}
        value={props.course.category}
        error={props.errors.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CourseForm;
