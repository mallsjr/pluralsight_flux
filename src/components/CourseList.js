import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import authorStore from '../stores/authorStore';
import { loadAuthors } from '../actions/authorActions';

function CourseList(props) {
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

  function getAuthorName(id) {
    const _author = authors.find(author => author.id === id);
    return _author.name;
  }

  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th>Title</th>
          <th>Author ID</th>
          <th>Category</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {props.courses.map(course => {
          return (
            <tr key={course.id}>
              <td>
                <Link to={'/course/' + course.slug}>{course.title}</Link>
              </td>
              <td>{getAuthorName(course.authorId)}</td>
              {/* Exercise display author's name instead of ID */}
              <td>{course.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.onDelete(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default CourseList;
