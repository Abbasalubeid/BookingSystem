import React, { useState, useEffect, Suspense } from 'react';
import List from '../models/List';
import CourseListView from '../views/CourseListView';

const CourseListPresenter = ({ id }) => {
  const [listData, setListData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLists();
  }, [id]);

  const fetchLists = async () => {
    try {
      const response = await fetch(`/api/course?id=${id}`);

      if (response.ok) {
        const data = await response.json();
        const processedData = data.map(item => {
          const list = new List(item);
          return {
            id: list.id,
            description: list.description,
            location: list.location,
            startTime: list.formatStartTime(),
            duration: list.interval,
            maxSlots: list.maxSlots,
            courseTitle: list.courseTitle,
            availableSlots: list.getAvailableSlots(),
            isFull: list.isFull()
          };
        });
        setListData(processedData);
      } else {
        setError('Failed to load course lists');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Suspense>
  <CourseListView listData={listData} error={error} />
  </Suspense>);
};

export default CourseListPresenter;
