import React, { useState, useEffect } from 'react';
import courseStore from '../stores/courseStore';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import { loadCourses, deleteCourse } from '../actions/courseActions';
import { toast } from 'react-toastify';

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());

  //Can I move this to another file and call here??
  //setting value of courses to what is returned
  //but is that a good pattern ?
  useEffect(() => {
    courseStore.addChangeListener(onCourseChange);
    if (courseStore.getCourses().length === 0) loadCourses();
    return () => {
      courseStore.removeChangeListener(onCourseChange);
    }; // cleanup on unmount
  }, []);

  function onCourseChange() {
    setCourses(courseStore.getCourses());
  }

  function handleDelete(courseId) {
    deleteCourse(courseId);
    toast.error('Course Deleted!');
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} onDelete={handleDelete} />
    </>
  );
}
export default CoursesPage;
