import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import { toast } from 'react-toastify';
import courseStore from '../stores/courseStore';
import * as courseActions from '../actions/courseActions';
import { Redirect } from 'react-router-dom';
// import { Prompt } from "react-router-dom";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: '',
    title: '',
    authorId: null,
    category: '',
  });
  const [invalidSlug, setInvalidSlug] = useState(false);

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; //pulled from the path '/courses/slug'
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      const _course = courseStore.getCourseBySlug(slug);
      if (_course) {
        setCourse(courseStore.getCourseBySlug(slug));
      } else {
        setInvalidSlug(true);
      }
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);
  // slug is a dependency. We are saying if the slug changes rerun use effect

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleChange({ target }) {
    //grabing target out of event via Array Destructure
    setCourse({
      ...course,
      [target.name]: target.value,
    });
    //Spread creates copy of course then updates value of target
    //[] in the case above means computed property which
    //Grabs name within the event/target and uses that as key
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = 'Title is required';
    if (!course.authorId) _errors.authorId = 'Author ID is required';
    if (!course.category) _errors.category = 'Category is required';
    setErrors(_errors);
    //Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      //Try using <Redirect from="/current-page" to="/courses" />
      //This is another way
      props.history.push('/courses');
      toast.success('Course Saved!');
    });
  }

  if (invalidSlug) {
    return <Redirect to="/invalid" />;
  } else {
    return (
      <>
        <h2>Manage Course</h2>
        <CourseForm
          errors={errors}
          course={course}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        {/* <Prompt when={true} message="Are you sure you want to leave?" /> */}
        {/* {props.match.params.slug} Information that is passed by router slug is the query param of router path*/}
      </>
    );
  }
};
export default ManageCoursePage;
