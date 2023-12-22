"use client"
import React, { useState, useEffect } from 'react';
import List from '../models/List';
import CourseListView from '../views/CourseListView';

const CourseListPresenter = ({ id }) => {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLists(id);
  }, [id]);

  const fetchLists = async (courseId) => {
    try {
      const response = await fetch(`/api/course?id=${id}`);

      if (response.ok) {
        const data = await response.json();
        const listObjects = data.map(item => new List(item));
        setLists(listObjects);
      } else {
        setError('Failed to load course lists');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return <CourseListView lists={lists} error={error} />;
};

export default CourseListPresenter;
