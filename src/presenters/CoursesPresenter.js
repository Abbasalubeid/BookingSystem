import React, { useState, useEffect } from 'react';
import CoursesView from '@/views/CoursesView';
import Course from '../models/Course';

const CoursesPresenter = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses', {
        method: 'GET',
        credentials: 'include', // Necessary to include the cookie with the request
      });
      if (response.ok) {
        const data = await response.json();
        const processedData = data.map(item => {
          const course = new Course(item);
          return {
            id: course.id,
            title: course.title
          };
        });
        setCourses(processedData);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return <CoursesView courses={courses} />;
};

export default CoursesPresenter;
